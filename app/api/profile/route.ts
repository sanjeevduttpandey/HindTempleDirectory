import { type NextRequest, NextResponse } from "next/server"
import { getDevoteeById, updateDevoteeProfile } from "@/lib/database"
import { getSession } from "@/lib/auth"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const devotee = await getDevoteeById(session.user.id)
    if (!devotee) {
      return NextResponse.json({ error: "Devotee not found" }, { status: 404 })
    }

    // Exclude sensitive data like password_hash
    const { password_hash, ...safeDevotee } = devotee

    return NextResponse.json({
      success: true,
      devotee: safeDevotee,
    })
  } catch (error: any) {
    console.error("Error fetching devotee profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    // Prevent updating sensitive fields directly via this route
    delete updates.email
    delete updates.password_hash
    delete updates.is_verified
    delete updates.is_active
    delete updates.created_at
    delete updates.updated_at

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    const updatedDevotee = await updateDevoteeProfile(session.user.id, updates)

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      devotee: updatedDevotee,
    })
  } catch (error: any) {
    console.error("Error updating devotee profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
