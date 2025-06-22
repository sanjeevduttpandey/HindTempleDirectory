import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Import auth functions only when needed
    const { getCurrentDevotee } = await import("@/lib/auth")

    const devotee = await getCurrentDevotee()

    if (!devotee) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      devotee: {
        id: devotee.id,
        email: devotee.email,
        first_name: devotee.first_name,
        last_name: devotee.last_name,
        spiritual_name: devotee.spiritual_name,
        avatar_url: devotee.avatar_url,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Authentication check failed" }, { status: 500 })
  }
}
