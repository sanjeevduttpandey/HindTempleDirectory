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
  // ─── Simple cookie-based auth guard ───────────────────────────────────────────
  const adminSession = cookies().get("admin-session")

  if (!adminSession || adminSession.value !== "authenticated") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  // ─── Fetch submissions & stats safely ─────────────────────────────────────────
  try {
    const submissions = getAllBusinessSubmissions()
    const stats = getBusinessSubmissionStats()

    return NextResponse.json({
      success: true,
      data: { submissions, stats },
    })
  } catch (err) {
    console.error("❌  Admin submissions fetch failed:", err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
