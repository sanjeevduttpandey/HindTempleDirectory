import { type NextRequest, NextResponse } from "next/server"
import { getEventById } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const eventId = Number.parseInt(params.id)
    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 })
    }

    const event = await getEventById(eventId)

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Only return approved events for public access
    if (event.status !== "approved") {
      return NextResponse.json({ error: "Event not found or not yet approved" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      event,
    })
  } catch (error: any) {
    console.error("Error fetching event:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}
