"use client"

/**
 * Singleton Supabase browser client.
 * Uses NEXT_PUBLIC_-prefixed env vars that are automatically
 * exposed to the client in Next.js.
 */

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast - helps you notice mis-configured env vars in dev / CI.
  throw new Error(
    "Supabase environment variables are missing. " +
      "Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
  )
}

/**
 * We store the client on the window object to ensure the same
 * instance is reused across React Fast Refresh and page navigations.
 */
const _supabase = (globalThis as any).__supabaseClient ?? createClient(supabaseUrl, supabaseAnonKey)
;(globalThis as any).__supabaseClient = _supabase

export const supabase = _supabase
export default supabase
