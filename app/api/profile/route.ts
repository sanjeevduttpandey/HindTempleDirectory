import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Import auth functions only when needed
    const { getCurrentDevotee } = await import("@/lib/auth")
    const { getDevoteeById } = await import("@/lib/database")

    const currentUser = await getCurrentDevotee()
    if (!currentUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const profile = await getDevoteeById(currentUser.id)
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Parse JSON fields
    const profileData = {
      ...profile,
      spiritual_practices: profile.spiritual_practices ? JSON.parse(profile.spiritual_practices) : [],
      interests: profile.interests ? JSON.parse(profile.interests) : [],
    }

    return NextResponse.json({ profile: profileData })
  } catch (error: any) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Import auth functions only when needed
    const { getCurrentDevotee } = await import("@/lib/auth")
    const { updateDevoteeProfile } = await import("@/lib/database")

    const currentUser = await getCurrentDevotee()
    if (!currentUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { updates } = body

    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 })
    }

    const updatedProfile = await updateDevoteeProfile(currentUser.id, updates)

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    })
  } catch (error: any) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
