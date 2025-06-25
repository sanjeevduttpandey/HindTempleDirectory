import { cookies } from "next/headers"

export interface DevoteeSession {
  id: number
  email: string
  first_name: string
  last_name: string
  spiritual_name?: string
  avatar_url?: string
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import("bcryptjs")
  return bcrypt.default.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const bcrypt = await import("bcryptjs")
  return bcrypt.default.compare(password, hashedPassword)
}

export async function generateSessionToken(): Promise<string> {
  const jwt = await import("jsonwebtoken")
  return jwt.default.sign({ timestamp: Date.now(), random: Math.random() }, JWT_SECRET)
}

export async function registerDevotee(userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  spiritualName?: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  city?: string
  address?: string
  gotra?: string
  rashi?: string
  nakshatra?: string
  spiritualPractices?: string[]
  interests?: string[]
  bio?: string
  subscribeNewsletter?: boolean
  allowCommunityContact?: boolean
}) {
  // Import database functions dynamically
  const { createDevotee, getDevoteeByEmail, logDevoteeActivity } = await import("@/lib/database")

  // Check if user already exists
  const existingUser = await getDevoteeByEmail(userData.email)
  if (existingUser) {
    throw new Error("A devotee with this email already exists")
  }

  // Validate password strength
  if (userData.password.length < 8) {
    throw new Error("Password must be at least 8 characters long")
  }

  // Hash password
  const passwordHash = await hashPassword(userData.password)

  // Create devotee
  const devotee = await createDevotee({
    email: userData.email,
    password_hash: passwordHash,
    first_name: userData.firstName,
    last_name: userData.lastName,
    spiritual_name: userData.spiritualName,
    phone: userData.phone,
    date_of_birth: userData.dateOfBirth,
    gender: userData.gender,
    city: userData.city,
    address: userData.address,
    gotra: userData.gotra,
    rashi: userData.rashi,
    nakshatra: userData.nakshatra,
    spiritual_practices: userData.spiritualPractices,
    interests: userData.interests,
    bio: userData.bio,
    subscribe_newsletter: userData.subscribeNewsletter,
    allow_community_contact: userData.allowCommunityContact,
  })

  // Log registration activity
  await logDevoteeActivity(
    devotee.id,
    "registration",
    `New devotee ${userData.firstName} ${userData.lastName} joined the Sanatan New Zealand community`,
  )

  return devotee
}

export async function loginDevotee(email: string, password: string) {
  // Import database functions dynamically
  const { getDevoteeByEmail, createSession } = await import("@/lib/database")

  // Get devotee by email
  const devotee = await getDevoteeByEmail(email)
  if (!devotee) {
    throw new Error("No account found with this email address")
  }

  // Check if account is active
  if (!devotee.is_active) {
    throw new Error("Your account has been deactivated. Please contact support.")
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, devotee.password_hash)
  if (!isValidPassword) {
    throw new Error("Invalid email or password")
  }

  // Generate session token
  const sessionToken = await generateSessionToken()
  const expiresAt = new Date(Date.now() + SESSION_DURATION)

  // Create session in database
  await createSession(devotee.id, sessionToken, expiresAt)

  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  // Return devotee info (without password hash)
  return {
    id: devotee.id,
    email: devotee.email,
    first_name: devotee.first_name,
    last_name: devotee.last_name,
    spiritual_name: devotee.spiritual_name,
    city: devotee.city,
    avatar_url: devotee.avatar_url,
  }
}

export async function getCurrentDevotee(): Promise<DevoteeSession | null> {
  try {
    // Import database functions dynamically
    const { getSessionByToken } = await import("@/lib/database")

    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session")?.value

    if (!sessionToken) {
      return null
    }

    const session = await getSessionByToken(sessionToken)
    if (!session) {
      return null
    }

    return {
      id: session.devotee_id,
      email: session.email,
      first_name: session.first_name,
      last_name: session.last_name,
      spiritual_name: session.spiritual_name,
      avatar_url: session.avatar_url,
    }
  } catch (error) {
    console.error("Error getting current devotee:", error)
    return null
  }
}

export async function logoutDevotee() {
  try {
    // Import database functions dynamically
    const { getSessionByToken, deleteSession, logDevoteeActivity } = await import("@/lib/database")

    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session")?.value

    if (sessionToken) {
      // Get current user for logging
      const session = await getSessionByToken(sessionToken)
      if (session) {
        await logDevoteeActivity(
          session.devotee_id,
          "logout",
          `Devotee ${session.first_name} ${session.last_name} logged out of the platform`,
        )
      }

      await deleteSession(sessionToken)
    }

    cookieStore.delete("session")
  } catch (error) {
    console.error("Error logging out devotee:", error)
  }
}

export async function requireAuth(): Promise<DevoteeSession> {
  const devotee = await getCurrentDevotee()
  if (!devotee) {
    throw new Error("Authentication required")
  }
  return devotee
}
