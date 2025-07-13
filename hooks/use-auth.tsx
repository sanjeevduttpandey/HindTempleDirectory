"use client"

import { useEffect, useState } from "react"
import { getSession } from "@/lib/auth"

/**
 * Tiny hook that exposes the current session + helpers.
 * Expand with real auth provider when ready.
 */
export function useAuth() {
  const [user, setUser] = useState<null | { id: string; email?: string }>(null)

  useEffect(() => {
    ;(async () => {
      const session = await getSession()
      setUser(session?.user ?? null)
    })()
  }, [])

  const signIn = () => {
    /* TODO: trigger sign-in flow */
  }
  const signOut = () => {
    /* TODO: trigger sign-out flow */
  }

  return { user, signIn, signOut }
}
