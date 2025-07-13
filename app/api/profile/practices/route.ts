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
      spiritual_practices: devotee.spiritual_practices || [],
    })
  } catch (error: any) {
    console.error("Error fetching devotee spiritual practices:", error)
    return NextResponse.json({ error: "Failed to fetch spiritual practices" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { spiritual_practices } = await request.json()

    if (!Array.isArray(spiritual_practices)) {
      return NextResponse.json({ error: "Spiritual practices must be an array" }, { status: 400 })
    }

    const updatedDevotee = await updateDevoteeProfile(session.user.id, { spiritual_practices })

    return NextResponse.json({
      success: true,
      message: "Spiritual practices updated successfully",
      devotee: updatedDevotee,
    })
  } catch (error: any) {
    console.error("Error updating devotee spiritual practices:", error)
    return NextResponse.json({ error: "Failed to update spiritual practices" }, { status: 500 })
  }
}
