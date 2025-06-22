import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Import auth functions only when needed to avoid build-time issues
    const { loginDevotee } = await import("@/lib/auth")
    const { logDevoteeActivity } = await import("@/lib/database")

    // Login devotee - this will verify password and create session
    const devotee = await loginDevotee(email, password)

    // Log login activity
    await logDevoteeActivity(devotee.id, "login", "Devotee logged into Sanatan New Zealand platform")

    // Set additional cookie for remember me functionality
    if (rememberMe) {
      const cookieStore = await cookies()
      cookieStore.set("remember_devotee", email, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })
    }

    return NextResponse.json({
      success: true,
      message: "Login successful! Welcome back to our Sanatan community.",
      devotee: {
        id: devotee.id,
        email: devotee.email,
        first_name: devotee.first_name,
        last_name: devotee.last_name,
        spiritual_name: devotee.spiritual_name,
        city: devotee.city,
      },
    })
  } catch (error: any) {
    console.error("Login error:", error)

    // Provide specific error messages
    let errorMessage = "Login failed. Please try again."
    if (error.message.includes("Invalid email or password")) {
      errorMessage = "Invalid email or password. Please check your credentials."
    } else if (error.message.includes("not found")) {
      errorMessage = "No account found with this email. Please register first."
    }

    return NextResponse.json({ error: errorMessage }, { status: 401 })
  }
}
