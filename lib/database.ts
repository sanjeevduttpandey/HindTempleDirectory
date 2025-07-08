import { neon } from "@neondatabase/serverless"

/**
 * Returns an instance of the neon SQL client (singleton-style so we don’t
 * reconnect on every invocation).
 *
 * We support several env var names so the project works in local/dev/preview
 * and production without change.
 */
let cachedSql: ReturnType<typeof neon> | null = null

export function sql() {
  if (cachedSql) return cachedSql

  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING

  if (!url) {
    throw new Error(
      "DATABASE_URL (or POSTGRES_URL / POSTGRES_PRISMA_URL / POSTGRES_URL_NON_POOLING) environment variable is not set",
    )
  }

  cachedSql = neon(url)
  return cachedSql
}

// Database connection test
export async function testConnection() {
  try {
    const rows = await sql()`
      SELECT 1                      -- ping
    `
    console.log("✅  Database connected:", rows)
  } catch (err) {
    /* eslint-disable no-console */
    console.error("❌  Database connection failed:", err)
    /* eslint-enable  no-console */
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
  const sqlInstance = sql()
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
  const sqlInstance = sql()
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
  const sqlInstance = sql()
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
  const sqlInstance = sql()

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
  const sqlInstance = sql()
  const result = await sqlInstance`
    INSERT INTO user_sessions (devotee_id, session_token, expires_at)
    VALUES (${devoteeId}, ${sessionToken}, ${expiresAt})
    RETURNING id, session_token, expires_at
  `
  return result[0]
}

export async function getSessionByToken(sessionToken: string) {
  const sqlInstance = sql()
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
  const sqlInstance = sql()
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
  relatedTempleId?: number,
  relatedEventId?: number,
) {
  const sqlInstance = sql()
  await sqlInstance`
    INSERT INTO devotee_activities (
      devotee_id, activity_type, activity_description,
      related_temple_id, related_event_id
    )
    VALUES (
      ${devoteeId}, ${activityType}, ${description},
      ${relatedTempleId || null}, ${relatedEventId || null}
    )
  `
}

export async function getDevoteeActivities(devoteeId: number, limit = 20) {
  const sqlInstance = sql()
  const result = await sqlInstance`
    SELECT da.*, t.name as temple_name, e.title as event_title
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
  temple_id?: number | null
  event_id?: number | null
  amount?: string | null
  metadata?: any
}) {
  const sqlInstance = sql()
  const result = await sqlInstance`
    INSERT INTO devotee_activities (
      devotee_id, activity_type, activity_description,
      related_temple_id, related_event_id, amount, metadata
    )
    VALUES (
      ${activityData.devotee_id},
      ${activityData.activity_type},
      ${activityData.activity_description},
      ${activityData.temple_id || null},
      ${activityData.event_id || null},
      ${activityData.amount || null},
      ${JSON.stringify(activityData.metadata || {})}
    )
    RETURNING *
  `
  return result[0]
}

// Temple related queries
export async function getTemples(city?: string, limit = 10) {
  const sqlInstance = sql()
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

// Event related queries
export async function getUpcomingEvents(limit = 10) {
  const sqlInstance = sql()
  return await sqlInstance`
    SELECT e.id, e.title, e.description, e.event_type, e.start_date, 
           e.start_time, e.location, e.city, e.max_participants, 
           e.current_participants, e.registration_fee, e.image_url,
           t.name as temple_name
    FROM events e
    LEFT JOIN temples t ON e.temple_id = t.id
    WHERE e.start_date >= CURRENT_DATE AND e.is_active = true
    ORDER BY e.start_date ASC, e.start_time ASC
    LIMIT ${limit}
  `
}

// Panchang data
export async function getTodayPanchang() {
  const sqlInstance = sql()
  const today = new Date().toISOString().split("T")[0]
  const result = await sqlInstance`
    SELECT * FROM panchang_data 
    WHERE date = ${today}
  `
  return result[0] || null
}

// Get Panchang data for a specific date
export async function getPanchangByDate(date: string) {
  const sqlInstance = sql()
  const result = await sqlInstance`
    SELECT * FROM panchang_data 
    WHERE date = ${date}
  `
  return result[0] || null
}
