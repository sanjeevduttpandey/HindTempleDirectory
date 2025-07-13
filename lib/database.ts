import type { NeonQueryFunction } from "@neondatabase/serverless"

let sqlClient: NeonQueryFunction<false, false> | null = null

// Lazy initialization of SQL client - only at runtime
const getSqlClient = () => {
  if (!sqlClient) {
    // Only import and initialize when actually needed
    const { neon } = require("@neondatabase/serverless")

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set")
    }
    sqlClient = neon(process.env.DATABASE_URL)
  }
  return sqlClient
}

// Export the sql client for direct use - but wrapped to prevent build-time access
export const sql = () => getSqlClient()

// Database connection test
export async function testConnection() {
  try {
    const sqlInstance = getSqlClient()
    const result = await sqlInstance`SELECT 1 as test`
    console.log("Database connected successfully:", result)
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

// User/Devotee related queries
export async function createDevotee(devoteeData: {
  email: string
  password_hash: string
  first_name: string
  last_name: string
  spiritual_name?: string
  phone?: string
  date_of_birth?: string
  gender?: string
  city?: string
  address?: string
  gotra?: string
  rashi?: string
  nakshatra?: string
  spiritual_practices?: string[]
  interests?: string[]
  bio?: string
  subscribe_newsletter?: boolean
  allow_community_contact?: boolean
}) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    INSERT INTO devotees (
      email, password_hash, first_name, last_name,
      spiritual_name, phone, date_of_birth, gender,
      city, address, gotra, rashi, nakshatra,
      spiritual_practices, interests, bio,
      subscribe_newsletter, allow_community_contact,
      is_verified, is_active
    )
    VALUES (
      ${devoteeData.email},
      ${devoteeData.password_hash},
      ${devoteeData.first_name},
      ${devoteeData.last_name},
      ${devoteeData.spiritual_name || null},
      ${devoteeData.phone || null},
      ${devoteeData.date_of_birth || null},
      ${devoteeData.gender || null},
      ${devoteeData.city || null},
      ${devoteeData.address || null},
      ${devoteeData.gotra || null},
      ${devoteeData.rashi || null},
      ${devoteeData.nakshatra || null},
      ${JSON.stringify(devoteeData.spiritual_practices || [])},
      ${JSON.stringify(devoteeData.interests || [])},
      ${devoteeData.bio || null},
      ${devoteeData.subscribe_newsletter || false},
      ${devoteeData.allow_community_contact || true},
      false,
      true
    )
    RETURNING id, email, first_name, last_name, spiritual_name, city, created_at
  `
  return result[0]
}

export async function getDevoteeByEmail(email: string) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    SELECT id, email, password_hash, first_name, last_name,
           spiritual_name, phone, date_of_birth, gender, city, address,
           gotra, rashi, nakshatra, spiritual_practices, interests, bio,
           avatar_url, subscribe_newsletter, allow_community_contact,
           is_verified, is_active, created_at, updated_at
    FROM devotees
    WHERE email = ${email} AND is_active = true
  `
  return result[0] || null
}

export async function getDevoteeById(id: number) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    SELECT id, email, first_name, last_name, spiritual_name,
           phone, date_of_birth, gender, city, address, bio, avatar_url,
           gotra, rashi, nakshatra, spiritual_practices, interests,
           subscribe_newsletter, allow_community_contact,
           is_verified, is_active, created_at, updated_at
    FROM devotees
    WHERE id = ${id} AND is_active = true
  `
  return result[0] || null
}

export async function updateDevoteeProfile(id: number, updates: Record<string, any>) {
  const sqlInstance = getSqlClient()

  // Convert arrays to JSON strings for database storage
  const processedUpdates = { ...updates }
  if (processedUpdates.spiritual_practices && Array.isArray(processedUpdates.spiritual_practices)) {
    processedUpdates.spiritual_practices = JSON.stringify(processedUpdates.spiritual_practices)
  }
  if (processedUpdates.interests && Array.isArray(processedUpdates.interests)) {
    processedUpdates.interests = JSON.stringify(processedUpdates.interests)
  }

  // Build dynamic update query
  const updateFields = Object.keys(processedUpdates)
  if (updateFields.length === 0) {
    throw new Error("No fields to update")
  }

  // Create SET clause
  const setClause = updateFields.map((field, index) => `${field} = $${index + 2}`).join(", ")
  const values = [id, ...Object.values(processedUpdates)]

  const query = `
    UPDATE devotees
    SET ${setClause}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND is_active = true
    RETURNING id, email, first_name, last_name, spiritual_name, city, updated_at
  `

  const result = await sqlInstance(query, values)
  return result[0]
}

// Session management
export async function createSession(devoteeId: number, sessionToken: string, expiresAt: Date) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    INSERT INTO user_sessions (devotee_id, session_token, expires_at)
    VALUES (${devoteeId}, ${sessionToken}, ${expiresAt})
    RETURNING id, session_token, expires_at
  `
  return result[0]
}

export async function getSessionByToken(sessionToken: string) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    SELECT us.id, us.devotee_id, us.session_token, us.expires_at,
           d.email, d.first_name, d.last_name, d.spiritual_name, d.avatar_url
    FROM user_sessions us
    JOIN devotees d ON us.devotee_id = d.id
    WHERE us.session_token = ${sessionToken}
    AND us.expires_at > CURRENT_TIMESTAMP
    AND d.is_active = true
  `
  return result[0] || null
}

export async function deleteSession(sessionToken: string) {
  const sqlInstance = getSqlClient()
  await sqlInstance`
    DELETE FROM user_sessions
    WHERE session_token = ${sessionToken}
  `
}

// Activity logging
export async function logDevoteeActivity(
  devoteeId: number,
  activityType: string,
  description: string,
  relatedMandirId?: number,
  relatedEventId?: number,
) {
  const sqlInstance = getSqlClient()
  await sqlInstance`
    INSERT INTO devotee_activities (
      devotee_id, activity_type, activity_description,
      related_temple_id, related_event_id
    )
    VALUES (
      ${devoteeId}, ${activityType}, ${description},
      ${relatedMandirId || null}, ${relatedEventId || null}
    )
  `
}

export async function getDevoteeActivities(devoteeId: number, limit = 20) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    SELECT da.*, t.name as mandir_name, e.title as event_title
    FROM devotee_activities da
    LEFT JOIN temples t ON da.related_temple_id = t.id
    LEFT JOIN events e ON da.related_event_id = e.id
    WHERE da.devotee_id = ${devoteeId}
    ORDER BY da.created_at DESC
    LIMIT ${limit}
  `
  return result
}

export async function addDevoteeActivity(activityData: {
  devotee_id: number
  activity_type: string
  activity_description: string
  mandir_id?: number | null
  event_id?: number | null
  amount?: string | null
  metadata?: any
}) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    INSERT INTO devotee_activities (
      devotee_id, activity_type, activity_description,
      related_temple_id, related_event_id, amount, metadata
    )
    VALUES (
      ${activityData.devotee_id},
      ${activityData.activity_type},
      ${activityData.activity_description},
      ${activityData.mandir_id || null},
      ${activityData.event_id || null},
      ${activityData.amount || null},
      ${JSON.stringify(activityData.metadata || {})}
    )
    RETURNING *
  `
  return result[0]
}

// Mandir related queries
export async function getMandirs(city?: string, limit = 10) {
  const sqlInstance = getSqlClient()
  if (city) {
    return await sqlInstance`
      SELECT id, name, main_deity, description, address, city,
             phone, email, website, image_url, rating, total_reviews
      FROM temples
      WHERE city = ${city} AND is_verified = true AND is_active = true
      ORDER BY rating DESC, total_reviews DESC
      LIMIT ${limit}
    `
  }

  return await sqlInstance`
    SELECT id, name, main_deity, description, address, city,
           phone, email, website, image_url, rating, total_reviews
    FROM temples
    WHERE is_verified = true AND is_active = true
    ORDER BY rating DESC, total_reviews DESC
    LIMIT ${limit}
  `
}

/**
 * ---------------------------------------------------------------------------
 *  BACKWARD-COMPATIBILITY ALIAS
 * ---------------------------------------------------------------------------
 * Some parts of the codebase still import `getTemples`.  We keep an alias that
 * simply calls the new `getMandirs` implementation, avoiding any breaking
 * changes while we finish migrating all call-sites.
 */
export const getTemples = getMandirs

// Event related queries
export async function createEvent(eventData: {
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
  registration_fee?: number
  is_free?: boolean
  image_url?: string
  image_urls?: string[]
  requirements?: string
  features?: string[]
  status?: "pending" | "approved" | "rejected"
  is_featured?: boolean
}) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    INSERT INTO events (
      title, description, full_description, event_type, temple_id,
      organizer_devotee_id, organizer_name, organizer_email, organizer_phone, organizer_website,
      start_date, end_date, start_time, end_time, location, address, city,
      max_participants, registration_fee, is_free, image_url, image_urls,
      requirements, features, status, is_featured
    )
    VALUES (
      ${eventData.title}, ${eventData.description}, ${eventData.full_description || null}, ${eventData.event_type}, ${eventData.temple_id || null},
      ${eventData.organizer_devotee_id || null}, ${eventData.organizer_name || null}, ${eventData.organizer_email || null}, ${eventData.organizer_phone || null}, ${eventData.organizer_website || null},
      ${eventData.start_date}, ${eventData.end_date || null}, ${eventData.start_time || null}, ${eventData.end_time || null}, ${eventData.location}, ${eventData.address || null}, ${eventData.city},
      ${eventData.max_participants || null}, ${eventData.registration_fee || 0.0}, ${eventData.is_free || true}, ${eventData.image_url || null}, ${JSON.stringify(eventData.image_urls || [])},
      ${eventData.requirements || null}, ${JSON.stringify(eventData.features || [])}, ${eventData.status || "pending"}, ${eventData.is_featured || false}
    )
    RETURNING *
  `
  return result[0]
}

export async function getEventById(id: number) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    SELECT e.*, t.name as temple_name
    FROM events e
    LEFT JOIN temples t ON e.temple_id = t.id
    WHERE e.id = ${id} AND e.is_active = true
  `
  return result[0] || null
}

export async function getUpcomingEvents(limit = 10) {
  const sqlInstance = getSqlClient()
  return await sqlInstance`
    SELECT e.id, e.title, e.description, e.event_type, e.start_date,
           e.start_time, e.location, e.city, e.max_participants,
           e.current_participants, e.registration_fee, e.image_url, e.image_urls,
           t.name as temple_name, e.is_featured
    FROM events e
    LEFT JOIN temples t ON e.temple_id = t.id
    WHERE e.start_date >= CURRENT_DATE AND e.is_active = true AND e.status = 'approved'
    ORDER BY e.is_featured DESC, e.start_date ASC, e.start_time ASC
    LIMIT ${limit}
  `
}

export async function getPendingEventSubmissions(limit = 100) {
  const sqlInstance = getSqlClient()
  return await sqlInstance`
    SELECT e.*, d.first_name, d.last_name, d.email as submitter_email
    FROM events e
    LEFT JOIN devotees d ON e.organizer_devotee_id = d.id
    WHERE e.status = 'pending' AND e.is_active = true
    ORDER BY e.created_at ASC
    LIMIT ${limit}
  `
}

export async function getApprovedEventsForAdmin(limit = 100) {
  const sqlInstance = getSqlClient()
  return await sqlInstance`
    SELECT e.*, d.first_name, d.last_name, d.email as submitter_email
    FROM events e
    LEFT JOIN devotees d ON e.organizer_devotee_id = d.id
    WHERE e.status = 'approved' AND e.is_active = true
    ORDER BY e.created_at DESC
    LIMIT ${limit}
  `
}

export async function updateEventStatus(eventId: number, status: "pending" | "approved" | "rejected") {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    UPDATE events
    SET status = ${status}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${eventId}
    RETURNING id, title, status
  `
  return result[0]
}

export async function updateEvent(eventId: number, updates: Record<string, any>) {
  const sqlInstance = getSqlClient()

  const processedUpdates = { ...updates }
  if (processedUpdates.features && Array.isArray(processedUpdates.features)) {
    processedUpdates.features = JSON.stringify(processedUpdates.features)
  }
  if (processedUpdates.image_urls && Array.isArray(processedUpdates.image_urls)) {
    processedUpdates.image_urls = JSON.stringify(processedUpdates.image_urls)
  }

  const updateFields = Object.keys(processedUpdates)
  if (updateFields.length === 0) {
    throw new Error("No fields to update")
  }

  const setClause = updateFields.map((field, index) => `${field} = $${index + 2}`).join(", ")
  const values = [eventId, ...Object.values(processedUpdates)]

  const query = `
    UPDATE events
    SET ${setClause}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `
  const result = await sqlInstance(query, values)
  return result[0]
}

// Panchang data
export async function getTodayPanchang() {
  const sqlInstance = getSqlClient()
  const today = new Date().toISOString().split("T")[0]
  const result = await sqlInstance`
    SELECT * FROM panchang_data
    WHERE date = ${today}
  `
  return result[0] || null
}

// Get Panchang data for a specific date
export async function getPanchangByDate(date: string) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    SELECT * FROM panchang_data
    WHERE date = ${date}
  `
  return result[0] || null
}

// Business related queries
export async function getBusinessById(id: number) {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    SELECT * FROM businesses
    WHERE id = ${id} AND is_active = true
  `
  return result[0] || null
}

export async function getPendingBusinessSubmissions(limit = 100) {
  const sqlInstance = getSqlClient()
  return await sqlInstance`
    SELECT b.*, d.first_name, d.last_name, d.email as submitter_email
    FROM businesses b
    LEFT JOIN devotees d ON b.submitted_by_devotee_id = d.id
    WHERE b.status = 'pending' AND b.is_active = true
    ORDER BY b.created_at ASC
    LIMIT ${limit}
  `
}

export async function getApprovedBusinessesForAdmin(limit = 100) {
  const sqlInstance = getSqlClient()
  return await sqlInstance`
    SELECT b.*, d.first_name, d.last_name, d.email as submitter_email
    FROM businesses b
    LEFT JOIN devotees d ON b.submitted_by_devotee_id = d.id
    WHERE b.status = 'approved' AND b.is_active = true
    ORDER BY b.created_at DESC
    LIMIT ${limit}
  `
}

export async function updateBusinessStatus(businessId: number, status: "pending" | "approved" | "rejected") {
  const sqlInstance = getSqlClient()
  const result = await sqlInstance`
    UPDATE businesses
    SET status = ${status}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${businessId}
    RETURNING id, name, status
  `
  return result[0]
}

export async function updateBusiness(businessId: number, updates: Record<string, any>) {
  const sqlInstance = getSqlClient()

  const processedUpdates = { ...updates }
  if (processedUpdates.services && Array.isArray(processedUpdates.services)) {
    processedUpdates.services = JSON.stringify(processedUpdates.services)
  }
  if (processedUpdates.operating_hours && Array.isArray(processedUpdates.operating_hours)) {
    processedUpdates.operating_hours = JSON.stringify(processedUpdates.operating_hours)
  }
  if (processedUpdates.social_media && typeof processedUpdates.social_media === "object") {
    processedUpdates.social_media = JSON.stringify(processedUpdates.social_media)
  }

  const updateFields = Object.keys(processedUpdates)
  if (updateFields.length === 0) {
    throw new Error("No fields to update")
  }

  const setClause = updateFields.map((field, index) => `${field} = $${index + 2}`).join(", ")
  const values = [businessId, ...Object.values(processedUpdates)]

  const query = `
    UPDATE businesses
    SET ${setClause}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `
  const result = await sqlInstance(query, values)
  return result[0]
}

export async function getApprovedBusinesses(city?: string, category?: string, limit = 10) {
  const sqlInstance = getSqlClient()
  let query = `
    SELECT id, name, category, description, address, city,
           phone, email, website, image_url, services,
           operating_hours, special_offers, social_media, is_featured
    FROM businesses
    WHERE status = 'approved' AND is_active = true
  `
  const params: string[] = []
  if (city) {
    query += ` AND city = $${params.length + 1}`
    params.push(city)
  }
  if (category) {
    query += ` AND category = $${params.length + 1}`
    params.push(category)
  }
  query += ` ORDER BY is_featured DESC, name ASC LIMIT $${params.length + 1}`
  params.push(limit.toString())

  const result = await sqlInstance(query, params)
  return result
}
