import { type NextRequest, NextResponse } from "next/server"
import { getCurrentDevotee, verifyPassword, hashPassword } from "@/lib/auth"
import { sql } from "@/lib/database"
import { logDevoteeActivity } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    // Get current user
    const currentUser = await getCurrentDevotee()
    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 },
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Current password and new password are required",
        },
        { status: 400 },
      )
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "New password must be at least 8 characters long",
        },
        { status: 400 },
      )
    }

    // Get user's current password hash from database
    const userResult = await sql`
      SELECT password_hash FROM devotees 
      WHERE id = ${currentUser.id} AND is_active = true
    `

    if (!userResult[0]) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 },
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, userResult[0].password_hash)
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Current password is incorrect",
        },
        { status: 400 },
      )
    }

    // Check if new password is different from current
    const isSamePassword = await verifyPassword(newPassword, userResult[0].password_hash)
    if (isSamePassword) {
      return NextResponse.json(
        {
          success: false,
          error: "New password must be different from current password",
        },
        { status: 400 },
      )
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword)

    // Update password in database
    await sql`
      UPDATE devotees 
      SET password_hash = ${newPasswordHash}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${currentUser.id}
    `

    // Log password update activity
    await logDevoteeActivity(
      currentUser.id,
      "password_update",
      `Password updated successfully for devotee ${currentUser.first_name} ${currentUser.last_name}`,
    )

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error: any) {
    console.error("Password update error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update password. Please try again.",
      },
      { status: 500 },
    )
  }
}
