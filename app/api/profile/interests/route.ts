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

    return NextResponse.json({
      success: true,
      interests: devotee.interests || [],
    })
  } catch (error: any) {
    console.error("Error fetching devotee interests:", error)
    return NextResponse.json({ error: "Failed to fetch interests" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { interests } = await request.json()

    if (!Array.isArray(interests)) {
      return NextResponse.json({ error: "Interests must be an array" }, { status: 400 })
    }

    const updatedDevotee = await updateDevoteeProfile(session.user.id, { interests })

    return NextResponse.json({
      success: true,
      message: "Interests updated successfully",
      devotee: updatedDevotee,
    })
  } catch (error: any) {
    console.error("Error updating devotee interests:", error)
    return NextResponse.json({ error: "Failed to update interests" }, { status: 500 })
  }
}
