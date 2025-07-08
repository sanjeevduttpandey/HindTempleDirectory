import { unstable_noStore as noStore } from "next/cache"
import { sql } from "@vercel/postgres"

/**
 * Shape of a business record returned to the front-end.
 * (Matches what our SQL SELECT query fetches.)
 */
export interface Business {
  id: string
  name: string
  description: string
  logoUrl: string | null
  website: string | null
  phone: string | null
  email: string | null
  address: string | null
}

interface BusinessSubmission {
  id: string
  businessName: string
  category: string
  description: string
  address: string
  city: string
  phone: string
  email: string
  website?: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  services: string[]
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
    website?: string
  }
  operatingHours?: string
  specialOffers?: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewNotes?: string
  rating?: number
  images?: string[]
}

interface ApprovedBusiness extends BusinessSubmission {
  status: "approved"
  isActive: boolean
  approvedAt: string
}

export async function addBusinessSubmission(
  submission: Omit<BusinessSubmission, "id" | "submittedAt" | "status">,
): Promise<BusinessSubmission> {
  const sqlInstance = sql()

  const result = await sqlInstance`
    INSERT INTO business_submissions (
      business_name, category, description, address, city, phone, email, website,
      owner_name, owner_email, owner_phone, services, social_media, 
      operating_hours, special_offers, status, submitted_at, images
    )
    VALUES (
      ${submission.businessName},
      ${submission.category},
      ${submission.description},
      ${submission.address},
      ${submission.city},
      ${submission.phone},
      ${submission.email},
      ${submission.website || ""},
      ${submission.ownerName},
      ${submission.ownerEmail},
      ${submission.ownerPhone},
      ${JSON.stringify(submission.services)},
      ${JSON.stringify(submission.socialMedia)},
      ${submission.operatingHours || ""},
      ${submission.specialOffers || ""},
      'pending',
      NOW(),
      ${JSON.stringify(submission.images || [])}
    )
    RETURNING id, business_name as "businessName", category, description, 
              address, city, phone, email, website, owner_name as "ownerName",
              owner_email as "ownerEmail", owner_phone as "ownerPhone",
              services, social_media as "socialMedia", operating_hours as "operatingHours",
              special_offers as "specialOffers", status, submitted_at as "submittedAt",
              images
  `

  const newSubmission = result[0]
  return {
    ...newSubmission,
    services: JSON.parse(newSubmission.services || "[]"),
    socialMedia: JSON.parse(newSubmission.socialMedia || "{}"),
    images: JSON.parse(newSubmission.images || "[]"),
  }
}

export async function getAllBusinessSubmissions(): Promise<BusinessSubmission[]> {
  const sqlInstance = sql()

  const result = await sqlInstance`
    SELECT id, business_name as "businessName", category, description, 
           address, city, phone, email, website, owner_name as "ownerName",
           owner_email as "ownerEmail", owner_phone as "ownerPhone",
           services, social_media as "socialMedia", operating_hours as "operatingHours",
           special_offers as "specialOffers", status, submitted_at as "submittedAt",
           reviewed_at as "reviewedAt", review_notes as "reviewNotes", rating, images
    FROM business_submissions
    ORDER BY submitted_at DESC
  `

  return result.map((submission) => ({
    ...submission,
    services: JSON.parse(submission.services || "[]"),
    socialMedia: JSON.parse(submission.socialMedia || "{}"),
    images: JSON.parse(submission.images || "[]"),
  }))
}

export async function getBusinessSubmissionById(id: string): Promise<BusinessSubmission | null> {
  const sqlInstance = sql()

  const result = await sqlInstance`
    SELECT id, business_name as "businessName", category, description, 
           address, city, phone, email, website, owner_name as "ownerName",
           owner_email as "ownerEmail", owner_phone as "ownerPhone",
           services, social_media as "socialMedia", operating_hours as "operatingHours",
           special_offers as "specialOffers", status, submitted_at as "submittedAt",
           reviewed_at as "reviewedAt", review_notes as "reviewNotes", rating, images
    FROM business_submissions
    WHERE id = ${id}
  `

  if (result.length === 0) return null

  const submission = result[0]
  return {
    ...submission,
    services: JSON.parse(submission.services || "[]"),
    socialMedia: JSON.parse(submission.socialMedia || "{}"),
    images: JSON.parse(submission.images || "[]"),
  }
}

export async function updateBusinessSubmissionStatus(
  id: string,
  status: "pending" | "approved" | "rejected",
  reviewNotes?: string,
): Promise<BusinessSubmission | null> {
  const sqlInstance = sql()

  const result = await sqlInstance`
    UPDATE business_submissions 
    SET status = ${status}, 
        reviewed_at = NOW(),
        review_notes = ${reviewNotes || ""}
    WHERE id = ${id}
    RETURNING id, business_name as "businessName", category, description, 
              address, city, phone, email, website, owner_name as "ownerName",
              owner_email as "ownerEmail", owner_phone as "ownerPhone",
              services, social_media as "socialMedia", operating_hours as "operatingHours",
              special_offers as "specialOffers", status, submitted_at as "submittedAt",
              reviewed_at as "reviewedAt", review_notes as "reviewNotes", rating, images
  `

  if (result.length === 0) return null

  const submission = result[0]
  return {
    ...submission,
    services: JSON.parse(submission.services || "[]"),
    socialMedia: JSON.parse(submission.socialMedia || "{}"),
    images: JSON.parse(submission.images || "[]"),
  }
}

/* ------------------------------------------------------------------ *
 * Server-side DB fetcher – used by the API route                      *
 * ------------------------------------------------------------------ */
export async function getApprovedBusinessesFromDb(): Promise<Business[]> {
  // Disable ISR/SSR caching – we want fresh data each call
  noStore()

  const { rows } = await sql<Business>`SELECT id,
       name,
       description,
       logo_url  AS "logoUrl",
       website,
       phone,
       email,
       address
     FROM businesses
     WHERE approved = true
     ORDER BY name`

  return rows
}

/**
 * Universal helper – works both on the server (RSC / Server Action) and the
 * client (React CSR).  It avoids a network round-trip when running on the
 * server, fixing “Failed to fetch” errors in `/business/directory`.
 */
export async function getApprovedBusinesses(): Promise<Business[]> {
  // Server-side?  Fetch data directly from the DB.
  if (typeof window === "undefined") {
    return getApprovedBusinessesFromDb()
  }

  // Client-side: call the API route so we don’t bundle pg driver etc.
  return getApprovedBusinessesClient()
}

export async function getApprovedBusinessesClient(): Promise<Business[]> {
  try {
    const res = await fetch("/api/business/approved", { cache: "no-store" })
    const payload = await res.json()

    if (payload.success && Array.isArray(payload.data)) return payload.data

    console.error("getApprovedBusinessesClient → API error:", payload.error)
    return []
  } catch (err) {
    console.error("getApprovedBusinessesClient → fetch or JSON parse failed:", err)
    return []
  }
}

export async function updateApprovedBusiness(
  id: string,
  updates: Partial<ApprovedBusiness>,
): Promise<ApprovedBusiness | null> {
  const sqlInstance = sql()

  // Build dynamic update query
  const updateFields = []
  const values = []
  let paramIndex = 1

  if (updates.businessName) {
    updateFields.push(`business_name = $${paramIndex++}`)
    values.push(updates.businessName)
  }
  if (updates.description) {
    updateFields.push(`description = $${paramIndex++}`)
    values.push(updates.description)
  }
  if (updates.rating) {
    updateFields.push(`rating = $${paramIndex++}`)
    values.push(updates.rating)
  }

  if (updateFields.length === 0) return null

  const query = `
    UPDATE business_submissions 
    SET ${updateFields.join(", ")}, reviewed_at = NOW()
    WHERE id = $${paramIndex} AND status = 'approved'
    RETURNING id, business_name as "businessName", category, description, 
              address, city, phone, email, website, owner_name as "ownerName",
              owner_email as "ownerEmail", owner_phone as "ownerPhone",
              services, social_media as "socialMedia", operating_hours as "operatingHours",
              special_offers as "specialOffers", status, submitted_at as "submittedAt",
              reviewed_at as "reviewedAt", review_notes as "reviewNotes", rating, images
  `

  values.push(id)
  const result = await sqlInstance(query, values)

  if (result.length === 0) return null

  const business = result[0]
  return {
    ...business,
    services: JSON.parse(business.services || "[]"),
    socialMedia: JSON.parse(business.socialMedia || "{}"),
    images: JSON.parse(business.images || "[]"),
    isActive: true,
    approvedAt: business.reviewedAt || business.submittedAt,
  }
}

export async function delistBusiness(id: string): Promise<boolean> {
  const sqlInstance = sql()

  const result = await sqlInstance`
    UPDATE business_submissions 
    SET status = 'rejected', 
        reviewed_at = NOW(),
        review_notes = 'Business delisted by admin'
    WHERE id = ${id}
  `

  return result.length > 0
}

export async function getBusinessSubmissionStats() {
  const sqlInstance = sql()

  const result = await sqlInstance`
    SELECT 
      COUNT(*) as total,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
      COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
      COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
    FROM business_submissions
  `

  return {
    total: Number.parseInt(result[0].total),
    pending: Number.parseInt(result[0].pending),
    approved: Number.parseInt(result[0].approved),
    rejected: Number.parseInt(result[0].rejected),
  }
}
