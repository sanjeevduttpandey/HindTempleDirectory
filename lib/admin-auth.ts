/** Server-only helpers for admin authentication */
"use server"

import { cookies } from "next/headers"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ADMIN_SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 h

export async function verifyAdminPassword(password: string) {
  if (!ADMIN_PASSWORD) return false
  return password === ADMIN_PASSWORD
}

export async function createAdminSession() {
  const store = cookies()
  const expires = new Date(Date.now() + ADMIN_SESSION_DURATION)

  store.set("admin-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: "/",
  })
}

export async function isAdminAuthenticated() {
  return cookies().get("admin-session")?.value === "authenticated"
}

export async function clearAdminSession() {
  cookies().delete("admin-session")
}

export async function getAdminSession() {
  return (await isAdminAuthenticated()) ? { role: "admin" } : null
}
