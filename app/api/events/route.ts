import { type NextRequest, NextResponse } from "next/server"
import { getUpcomingEvents } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const events = await getUpcomingEvents(limit)

    return NextResponse.json({
      success: true,
      events,
    })
  } catch (error: any) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
