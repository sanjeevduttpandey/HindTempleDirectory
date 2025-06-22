import { type NextRequest, NextResponse } from "next/server"
import { logoutDevotee, getCurrentDevotee } from "@/lib/auth"
import { logDevoteeActivity } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    // Get current devotee before logout
    const devotee = await getCurrentDevotee()

    if (devotee) {
      // Log logout activity
      await logDevoteeActivity(devotee.id, "logout", "Devotee logged out from Sanatan New Zealand platform")
    }

    // Logout devotee
    await logoutDevotee()

    return NextResponse.json({
      success: true,
      message: "Logged out successfully. Om Shanti!",
    })
  } catch (error: any) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: error.message || "Logout failed" }, { status: 500 })
  }
}
