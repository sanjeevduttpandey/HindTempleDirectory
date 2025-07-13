// This file should contain all shared types
// For example:

export interface Devotee {
  id: number
  email: string
  first_name: string
  last_name: string
  spiritual_name?: string
  phone?: string
  date_of_birth?: string
  gender?: string
  city?: string
  address?: string
  bio?: string
  avatar_url?: string
  gotra?: string
  rashi?: string
  nakshatra?: string
  spiritual_practices?: string[]
  interests?: string[]
  subscribe_newsletter?: boolean
  allow_community_contact?: boolean
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Temple {
  id: number
  name: string
  registration_number?: string
  established_year?: number
  main_deity?: string
  description?: string
  address: string
  city: string
  pincode?: string
  phone?: string
  email?: string
  website?: string
  image_url?: string
  admin_name?: string
  admin_email?: string
  admin_phone?: string
  admin_role?: string
  is_verified: boolean
  is_active: boolean
  rating: number
  total_reviews: number
  created_at: string
  updated_at: string
}

export interface Event {
  id: number
  title: string
  description: string
  full_description?: string
  event_type: string
  temple_id?: number
  organizer_devotee_id?: number
  organizer_name?: string
  organizer_email?: string
  organizer_phone?: string
  organizer_website?: string
  start_date: string
  end_date?: string
  start_time?: string
  end_time?: string
  location: string
  address?: string
  city: string
  max_participants?: number
  current_participants?: number
  registration_fee?: number
  is_free: boolean
  image_url?: string
  image_urls?: string[] // New: For multiple images
  requirements?: string
  features?: string[]
  status: "pending" | "approved" | "rejected" // New: For approval workflow
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  // Joined fields (optional, for API responses)
  temple_name?: string
  submitter_email?: string
  first_name?: string // from submitter devotee
  last_name?: string // from submitter devotee
}

export interface Business {
  id: number
  name: string
  category: string
  description?: string
  address: string
  city: string
  pincode?: string
  phone?: string
  email?: string
  website?: string
  image_url?: string
  services?: string[] // Stored as JSONB array in DB
  operating_hours?: Array<{ day: string; open: string; close: string }> // Stored as JSONB array in DB
  special_offers?: string
  social_media?: {
    facebook?: string
    instagram?: string
    twitter?: string
    // Add other platforms as needed
  } // Stored as JSONB object in DB
  submitted_by_devotee_id?: number
  status: "pending" | "approved" | "rejected"
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

// Types for admin submissions (including submitter info)
export interface BusinessSubmission extends Business {
  submitter_email?: string
  first_name?: string
  last_name?: string
}

export interface EventSubmission extends Event {
  submitter_email?: string
  first_name?: string
  last_name?: string
}
