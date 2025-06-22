import { type NextRequest, NextResponse } from "next/server"
import { getTodayPanchang, getPanchangByDate } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    let panchang
    if (date) {
      panchang = await getPanchangByDate(date)
    } else {
      panchang = await getTodayPanchang()
    }

    if (!panchang) {
      return NextResponse.json(
        {
          success: false,
          message: "Panchang data not available for the requested date",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      panchang,
    })
  } catch (error: any) {
    console.error("Error fetching panchang:", error)
    return NextResponse.json({ error: "Failed to fetch panchang data" }, { status: 500 })
  }
}
