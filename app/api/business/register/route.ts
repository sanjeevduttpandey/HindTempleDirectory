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

    // Create submission object matching the database schema
    const submission = {
      business_name: body.businessName,
      category: body.category,
      description: body.description,
      address: body.address,
      city: body.city,
      phone: body.phone,
      email: body.email,
      website: body.website || null, // Use null for optional empty strings
      owner_name: body.ownerName,
      owner_email: body.ownerEmail,
      owner_phone: body.ownerPhone,
      services: body.services || [],
      social_media: body.socialMedia || {},
      operating_hours: body.operatingHours || null,
      special_offers: body.specialOffers || null,
      images: body.images || [],
    }

    // Add to storage (now using Supabase)
    const { data, error } = await addBusinessSubmission(submission)

    if (error) {
      console.error("Error in API route:", error)
      return NextResponse.json(
        { success: false, error: error.message || "Failed to register business" },
        { status: 500 },
      )
    }

    console.log("New business submission saved to DB:", {
      id: data?.id,
      business_name: data?.business_name,
      category: data?.category,
      city: data?.city,
      imagesCount: data?.images?.length || 0,
    })

    return NextResponse.json({
      success: true,
      message: "Business registration submitted successfully! We'll review your application within 2-3 business days.",
      data: {
        id: data?.id,
        business_name: data?.business_name,
        submittedAt: data?.created_at,
      },
    })
  } catch (error) {
    console.error("Unexpected error in business registration API:", error)
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to process registration. Please try again." },
      { status: 500 },
    )
  }
}
