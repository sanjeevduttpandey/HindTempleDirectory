import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminPassword, createAdminSession, clearAdminSession } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  try {
    const { password, action } = await request.json()

    if (action === "logout") {
      await clearAdminSession()
      return NextResponse.json({ success: true })
    }

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    const isValid = await verifyAdminPassword(password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    await createAdminSession()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
