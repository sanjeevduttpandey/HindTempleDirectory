import { supabaseAdmin } from "@/lib/supabaseServer" // Import the server-side Supabase client

export type BusinessCategory =
  | "Arts & Culture"
  | "Cleaning Services"
  | "Restaurants & Food"
  | "Grocery & Spices"
  | "Clothing & Jewelry"
  | "Health & Wellness"
  | "Education & Tutoring"
  | "Professional Services"
  | "Beauty & Salon"
  | "Travel & Tourism"
  | "Religious Items"
  | "Event Services"
  | "IT"
  | "Other"

export interface BusinessSubmission {
  id?: string
  business_name: string
  category: BusinessCategory
  description: string
  address: string
  city: string
  phone: string
  email: string
  website?: string
  owner_name: string
  owner_email: string
  owner_phone: string
  services?: string[]
  social_media?: {
    facebook?: string
    instagram?: string
    x?: string
  }
  operating_hours?: string
  special_offers?: string
  images?: string[]
  status?: "pending" | "approved" | "rejected"
  created_at?: string
  reviewed_at?: string
  review_notes?: string
  rating?: number
  is_active?: boolean
  approved_at?: string
}

// Function to add a new business submission
export async function addBusinessSubmission(
  submission: Omit<
    BusinessSubmission,
    "id" | "created_at" | "status" | "reviewed_at" | "approved_at" | "is_active" | "rating"
  >,
): Promise<{ data?: BusinessSubmission; error?: any }> {
  const { data, error } = await supabaseAdmin
    .from("businesses")
    .insert({
      business_name: submission.business_name,
      category: submission.category,
      description: submission.description,
      address: submission.address,
      city: submission.city,
      phone: submission.phone,
      email: submission.email,
      website: submission.website,
      owner_name: submission.owner_name,
      owner_email: submission.owner_email,
      owner_phone: submission.owner_phone,
      services: submission.services || [],
      social_media: submission.social_media || {},
      operating_hours: submission.operating_hours,
      special_offers: submission.special_offers,
      images: submission.images || [],
      status: "pending", // New submissions are always pending
      is_active: false, // New submissions are not active until approved
    })
    .select()
    .single()

  if (error) {
    console.error("Error adding business submission:", error)
    return { error }
  }
  return { data }
}

// Function to get all business submissions (for admin review)
export async function getAllBusinessSubmissions(): Promise<{ data?: BusinessSubmission[]; error?: any }> {
  const { data, error } = await supabaseAdmin.from("businesses").select("*").order("created_at", { ascending: false })
  if (error) {
    console.error("Error fetching all business submissions:", error)
    return { error }
  }
  return { data: data as BusinessSubmission[] }
}

// Function to get approved businesses (for public directory)
export async function getApprovedBusinesses(): Promise<{ data?: BusinessSubmission[]; error?: any }> {
  const { data, error } = await supabaseAdmin
    .from("businesses")
    .select("*")
    .eq("status", "approved")
    .eq("is_active", true)
    .order("business_name", { ascending: true })

  if (error) {
    console.error("Error fetching approved businesses:", error)
    return { error }
  }
  return { data: data as BusinessSubmission[] }
}

// Function to update a business submission's status
export async function updateBusinessStatus(
  id: string,
  status: "pending" | "approved" | "rejected",
  reviewNotes?: string,
): Promise<{ data?: BusinessSubmission; error?: any }> {
  const updateData: any = {
    status: status,
    reviewed_at: new Date().toISOString(),
    review_notes: reviewNotes,
  }

  if (status === "approved") {
    updateData.approved_at = new Date().toISOString()
    updateData.is_active = true // Set to active when approved
  } else {
    updateData.is_active = false // Set to inactive if pending/rejected
  }

  const { data, error } = await supabaseAdmin.from("businesses").update(updateData).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating business status for ${id}:`, error)
    return { error }
  }
  return { data }
}

// ---------------------------------------------------------------------------
// Legacy wrapper – kept for backward compatibility with older imports.
// It delegates to `updateBusinessStatus`, so no logic is duplicated.
export async function updateBusinessSubmissionStatus(
  id: string,
  status: "pending" | "approved" | "rejected",
  reviewNotes?: string,
): Promise<{ data?: BusinessSubmission; error?: any }> {
  return updateBusinessStatus(id, status, reviewNotes)
}

// ---------------------------------------------------------------------------

// Function to get a single business submission by ID
export async function getBusinessSubmissionById(id: string): Promise<{ data?: BusinessSubmission; error?: any }> {
  const { data, error } = await supabaseAdmin.from("businesses").select("*").eq("id", id).single()
  if (error) {
    console.error(`Error fetching business submission by ID ${id}:`, error)
    return { error }
  }
  return { data }
}

// Function to update an approved business (e.g., by admin)
export async function updateApprovedBusiness(
  id: string,
  updates: Partial<BusinessSubmission>,
): Promise<{ data?: BusinessSubmission; error?: any }> {
  const { data, error } = await supabaseAdmin
    .from("businesses")
    .update(updates)
    .eq("id", id)
    .eq("status", "approved") // Only update approved businesses
    .select()
    .single()

  if (error) {
    console.error(`Error updating approved business ${id}:`, error)
    return { error }
  }
  return { data }
}

// Function to delist a business (set is_active to false)
export async function delistBusiness(id: string): Promise<{ success: boolean; error?: any }> {
  const { error } = await supabaseAdmin.from("businesses").update({ is_active: false }).eq("id", id)

  if (error) {
    console.error(`Error delisting business ${id}:`, error)
    return { success: false, error }
  }
  return { success: true }
}

// Function to get business submission stats
export async function getBusinessSubmissionStats(): Promise<{
  total: number
  pending: number
  approved: number
  rejected: number
  error?: any
}> {
  const { data, error } = await supabaseAdmin.from("businesses").select("status")

  if (error) {
    console.error("Error fetching business submission stats:", error)
    return { total: 0, pending: 0, approved: 0, rejected: 0, error }
  }

  const total = data.length
  const pending = data.filter((s: any) => s.status === "pending").length
  const approved = data.filter((s: any) => s.status === "approved").length
  const rejected = data.filter((s: any) => s.status === "rejected").length

  return { total, pending, approved, rejected }
}
