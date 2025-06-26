import { NextResponse } from "next/server"
import { getApprovedBusinesses } from "@/lib/business-storage"

export async function GET() {
  try {
    const businesses = getApprovedBusinesses()

    return NextResponse.json({
      success: true,
      data: businesses,
    })
  } catch (error) {
    console.error("Error fetching approved businesses:", error)
    return NextResponse.json({ error: "Failed to fetch businesses" }, { status: 500 })
  }
}
