import { type NextRequest, NextResponse } from "next/server"
import { getUpcomingEvents } from "@/lib/database" // Import the function from your database utility

export const runtime = "nodejs" // use Node runtime so `require()` is available

// ---------- GET  /api/events ----------
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Use the getUpcomingEvents function which already filters by status='approved' and is_active=true
    const events = await getUpcomingEvents(limit)

    return NextResponse.json({ success: true, events })
  } catch (err: any) {
    console.error("Unhandled error fetching events:", err)
    return NextResponse.json({ success: false, error: "Failed to fetch events" }, { status: 500 })
  }
}
