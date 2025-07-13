import { type NextRequest, NextResponse } from "next/server"
import { getPendingEventSubmissions, getApprovedEventsForAdmin } from "@/lib/database"
import { getAdminSession } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get("status") || "pending" // 'pending' or 'approved'

    let events
    if (statusFilter === "pending") {
      events = await getPendingEventSubmissions()
    } else if (statusFilter === "approved") {
      events = await getApprovedEventsForAdmin()
    } else {
      return NextResponse.json({ error: "Invalid status filter" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      events,
    })
  } catch (error: any) {
    console.error("Error fetching event submissions:", error)
    return NextResponse.json({ error: "Failed to fetch event submissions" }, { status: 500 })
  }
}
