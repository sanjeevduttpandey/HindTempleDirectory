import { type NextRequest, NextResponse } from "next/server"
import { getCurrentDevotee } from "@/lib/auth"
import { getDevoteeActivities, addDevoteeActivity } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const devotee = await getCurrentDevotee()

    if (!devotee) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const activities = await getDevoteeActivities(devotee.id)

    return NextResponse.json({
      success: true,
      activities,
    })
  } catch (error: any) {
    console.error("Activity fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const devotee = await getCurrentDevotee()

    if (!devotee) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const activityData = await request.json()

    const newActivity = await addDevoteeActivity({
      devotee_id: devotee.id,
      activity_type: activityData.type,
      activity_description: activityData.description,
      temple_id: activityData.temple_id,
      event_id: activityData.event_id,
      amount: activityData.amount,
      metadata: activityData.metadata,
    })

    return NextResponse.json({
      success: true,
      activity: newActivity,
      message: "Activity added successfully",
    })
  } catch (error: any) {
    console.error("Activity creation error:", error)
    return NextResponse.json({ error: "Failed to add activity" }, { status: 500 })
  }
}
