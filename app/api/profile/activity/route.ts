import { type NextRequest, NextResponse } from "next/server"
import { getDevoteeActivities } from "@/lib/database"
import { getSession } from "@/lib/auth"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    const activities = await getDevoteeActivities(session.user.id, limit)

    return NextResponse.json({
      success: true,
      activities,
    })
  } catch (error: any) {
    console.error("Error fetching devotee activities:", error)
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}
