import { type NextRequest, NextResponse } from "next/server"
import { getPanchangByDate, getTodayPanchang } from "@/lib/database"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    let panchangData
    if (date) {
      panchangData = await getPanchangByDate(date)
    } else {
      panchangData = await getTodayPanchang()
    }

    if (!panchangData) {
      return NextResponse.json({ error: "Panchang data not found for the specified date" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      panchang: panchangData,
    })
  } catch (error: any) {
    console.error("Error fetching panchang data:", error)
    return NextResponse.json({ error: "Failed to fetch panchang data" }, { status: 500 })
  }
}
