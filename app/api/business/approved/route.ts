import { NextResponse } from "next/server"
import { getApprovedBusinessesFromDb } from "@/lib/business-storage"

/**
 * GET /api/business/approved
 * Success → 200 { success: true, data: Business[] }
 * Error   → 500 { success: false, error: string    }
 *
 * We ALWAYS return JSON so callers can safely call res.json().
 */
export async function GET() {
  try {
    const businesses = await getApprovedBusinessesFromDb()
    return NextResponse.json({ success: true, data: businesses }, { status: 200 })
  } catch (err) {
    console.error("GET /api/business/approved failed:", err)
    const message = err instanceof Error ? err.message : "Unexpected error while fetching businesses"
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
