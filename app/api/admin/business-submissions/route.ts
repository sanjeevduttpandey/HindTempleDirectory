import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAllBusinessSubmissions, getBusinessSubmissionStats } from "@/lib/business-storage"

/**
 * GET /api/admin/business-submissions
 *
 *  • Returns all pending / rejected submissions **and**
 *    aggregated stats.
 *  • Requires a valid `admin-session=authenticated` cookie.
 */
export async function GET() {
  // ─── Simple cookie-based auth guard ──────────────────────────────────────────
  const adminSession = cookies().get("admin-session")

  if (!adminSession || adminSession.value !== "authenticated") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  // ─── Fetch submissions ───────────────────────────────────────────────────────
  const { data: submissions, error: submissionsError } = await getAllBusinessSubmissions()

  if (submissionsError) {
    console.error("❌  Admin submissions fetch failed:", submissionsError)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }

  // ─── Fetch aggregated stats ─────────────────────────────────────────────────
  const { total, pending, approved, rejected, error: statsError } = await getBusinessSubmissionStats()

  if (statsError) {
    console.error("❌  Admin stats fetch failed:", statsError)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }

  // ─── Success ────────────────────────────────────────────────────────────────
  return NextResponse.json({
    success: true,
    data: {
      submissions, // ← now an ARRAY, not an object
      stats: { total, pending, approved, rejected },
    },
  })
}
