import { type NextRequest, NextResponse } from "next/server"
import { getCurrentDevotee } from "@/lib/auth"
import { updateDevoteeProfile, getDevoteeById } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const devotee = await getCurrentDevotee()

    if (!devotee) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { interest } = await request.json()

    if (!interest || typeof interest !== "string") {
      return NextResponse.json({ error: "Valid interest is required" }, { status: 400 })
    }

    // Get current profile to update interests
    const currentProfile = await getDevoteeById(devotee.id)
    const currentInterests = currentProfile?.interests || []

    // Add new interest if not already present
    if (!currentInterests.includes(interest)) {
      const updatedInterests = [...currentInterests, interest]

      await updateDevoteeProfile(devotee.id, {
        interests: updatedInterests,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Interest added successfully",
    })
  } catch (error: any) {
    console.error("Interest addition error:", error)
    return NextResponse.json({ error: "Failed to add interest" }, { status: 500 })
  }
}
