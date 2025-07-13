import { cookies } from "next/headers"

// ADMIN_PASSWORD will now strictly rely on the environment variable.
// If process.env.ADMIN_PASSWORD is not set, admin login will not be possible.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ADMIN_SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export async function verifyAdminPassword(password: string): Promise<boolean> {
  // Ensure ADMIN_PASSWORD is defined before comparison
  if (!ADMIN_PASSWORD) {
    console.warn("ADMIN_PASSWORD environment variable is not set. Admin login is disabled.")
    return false // No admin password set, so no access
  }
  return password === ADMIN_PASSWORD
}

export async function createAdminSession(): Promise<void> {
  const cookieStore = cookies()
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_DURATION)

  cookieStore.set("admin-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = cookies()
    const adminSession = cookieStore.get("admin-session")
    return adminSession?.value === "authenticated"
  } catch (error) {
    // This catch block is important for cases where cookies() might throw in non-request contexts
    console.error("Error checking admin authentication:", error)
    return false
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete("admin-session")
}

/**
 * Stubbed admin-auth helper — swap for real admin session validation later.
 */
export async function getAdminSession() {
  return null
}
