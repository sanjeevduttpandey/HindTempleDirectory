import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      firstName,
      lastName,
      spiritualName,
      phone,
      dateOfBirth,
      gender,
      city,
      address,
      gotra,
      rashi,
      nakshatra,
      spiritualPractices,
      interests,
      bio,
      subscribeNewsletter,
      allowCommunityContact,
    } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Email, password, first name, and last name are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Import auth functions only when needed
    const { registerDevotee } = await import("@/lib/auth")

    // Register devotee
    const devotee = await registerDevotee({
      email,
      password,
      firstName,
      lastName,
      spiritualName,
      phone,
      dateOfBirth,
      gender,
      city,
      address,
      gotra,
      rashi,
      nakshatra,
      spiritualPractices,
      interests,
      bio,
      subscribeNewsletter,
      allowCommunityContact,
    })

    return NextResponse.json({
      success: true,
      message: "Registration successful! Welcome to our Sanatan community.",
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
    console.error("Registration error:", error)

    // Provide specific error messages
    let errorMessage = "Registration failed. Please try again."
    if (error.message.includes("already exists")) {
      errorMessage = "An account with this email already exists. Please login instead."
    } else if (error.message.includes("Password must be")) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }
}
