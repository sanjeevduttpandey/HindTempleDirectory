import { type NextRequest, NextResponse } from "next/server"
import { addBusinessSubmission } from "@/lib/business-storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "businessName",
      "category",
      "description",
      "address",
      "city",
      "phone",
      "email",
      "ownerName",
      "ownerEmail",
      "ownerPhone",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email) || !emailRegex.test(body.ownerEmail)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    // Validate terms agreement
    if (!body.agreeToTerms) {
      return NextResponse.json({ success: false, error: "You must agree to the terms and conditions" }, { status: 400 })
    }

    // Create submission object
    const submission = {
      businessName: body.businessName,
      category: body.category,
      description: body.description,
      address: body.address,
      city: body.city,
      phone: body.phone,
      email: body.email,
      website: body.website || "",
      ownerName: body.ownerName,
      ownerEmail: body.ownerEmail,
      ownerPhone: body.ownerPhone,
      services: body.services || [],
      socialMedia: body.socialMedia || {},
      operatingHours: body.operatingHours || "",
      specialOffers: body.specialOffers || "",
      images: body.images || [], // Include uploaded images
    }

    // Add to storage
    const newSubmission = addBusinessSubmission(submission)

    console.log("New business submission:", {
      id: newSubmission.id,
      businessName: newSubmission.businessName,
      category: newSubmission.category,
      city: newSubmission.city,
      imagesCount: newSubmission.images?.length || 0,
    })

    return NextResponse.json({
      success: true,
      message: "Business registration submitted successfully! We'll review your application within 2-3 business days.",
      data: {
        id: newSubmission.id,
        businessName: newSubmission.businessName,
        submittedAt: newSubmission.submittedAt,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process registration. Please try again." },
      { status: 500 },
    )
  }
}
