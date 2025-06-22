import { type NextRequest, NextResponse } from "next/server"
import { getCurrentDevotee } from "@/lib/auth"
import { updateDevoteeProfile, getDevoteeById } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const devotee = await getCurrentDevotee()

    if (!devotee) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { practice } = await request.json()

    if (!practice || typeof practice !== "string") {
      return NextResponse.json({ error: "Valid practice is required" }, { status: 400 })
    }

    // Get current profile to update practices
    const currentProfile = await getDevoteeById(devotee.id)
    const currentPractices = currentProfile?.spiritual_practices || []

    // Add new practice if not already present
    if (!currentPractices.includes(practice)) {
      const updatedPractices = [...currentPractices, practice]

      await updateDevoteeProfile(devotee.id, {
        spiritual_practices: updatedPractices,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Spiritual practice added successfully",
    })
  } catch (error: any) {
    console.error("Practice addition error:", error)
    return NextResponse.json({ error: "Failed to add practice" }, { status: 500 })
  }
}
