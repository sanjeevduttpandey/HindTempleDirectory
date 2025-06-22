/* lib/auth.ts */

import bcrypt from "bcryptjs" // NEW – replaces const bcrypt = require('bcrypt')
import { v4 as uuid } from "uuid" // NEW – replaces const { v4: uuid } = require('uuid')
import { sql } from "@vercel/postgres" // example DB client already ESM
import type { Devotee } from "@/types/devotee" // keep your existing type imports

// … any other top-level requires → change to import … from "…";

export async function registerDevotee(input: {
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
  // hash password
  const passwordHash = await bcrypt.hash(input.password, 10)

  // insert into DB  (example – adjust to your schema)
  const { rows } = await sql<Devotee[]>`
    INSERT INTO devotees (
      id, email, password_hash, first_name, last_name, spiritual_name,
      phone, date_of_birth, gender, city, address,
      gotra, rashi, nakshatra, spiritual_practices,
      interests, bio, subscribe_newsletter, allow_community_contact
    )
    VALUES (
      ${uuid()}, ${input.email}, ${passwordHash}, ${input.firstName}, ${input.lastName},
      ${input.spiritualName}, ${input.phone}, ${input.dateOfBirth}, ${input.gender},
      ${input.city}, ${input.address}, ${input.gotra}, ${input.rashi},
      ${input.nakshatra}, ${JSON.stringify(input.spiritualPractices ?? [])},
      ${JSON.stringify(input.interests ?? [])}, ${input.bio},
      ${input.subscribeNewsletter ?? false}, ${input.allowCommunityContact ?? true}
    )
    RETURNING
      id, email, first_name, last_name, spiritual_name, city;
  `

  return rows[0]!
}
