import { NextResponse } from "next/server"
import { getApprovedBusinesses } from "@/lib/business-storage"

export async function GET() {
  try {
    const { data, error } = await getApprovedBusinesses()

    if (error) {
      console.error("Error fetching approved businesses:", error)
      return NextResponse.json({ success: false, message: "Failed to fetch businesses" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data ?? [] }, { status: 200 })
  } catch (err) {
    console.error("Unexpected error in approved businesses API:", err)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
