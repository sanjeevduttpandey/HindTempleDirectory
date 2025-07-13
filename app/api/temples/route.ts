import { type NextRequest, NextResponse } from "next/server"
import { getMandirs } from "@/lib/database"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city") || undefined
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const temples = await getMandirs(city, limit)

    return NextResponse.json({
      success: true,
      temples,
    })
  } catch (error: any) {
    console.error("Error fetching temples:", error)
    return NextResponse.json({ error: "Failed to fetch temples" }, { status: 500 })
  }
}
