// Example of how easy it would be to migrate to Supabase
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

// Your existing queries would work with minimal changes:
export async function getTemplesWithSupabase(city?: string) {
  const query = supabase
    .from("temples")
    .select(`
      id, name, main_deity, description, address, city,
      phone, email, website, image_url, rating, total_reviews,
      temple_services(service_name),
      temple_facilities(facility_name)
    `)
    .eq("is_verified", true)
    .eq("is_active", true)
    .order("rating", { ascending: false })

  if (city) {
    query.eq("city", city)
  }

  const { data, error } = await query.limit(10)

  if (error) throw error
  return data
}

// Real-time features for your app:
export function subscribeToEventUpdates(eventId: number, callback: Function) {
  return supabase
    .channel(`event-${eventId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "events",
        filter: `id=eq.${eventId}`,
      },
      callback,
    )
    .subscribe()
}

// Built-in auth (no more custom session management):
export async function signUpDevotee(email: string, password: string, metadata: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata, // spiritual_name, city, etc.
    },
  })
  return { data, error }
}
