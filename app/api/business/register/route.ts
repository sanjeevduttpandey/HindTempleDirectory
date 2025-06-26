import { type NextRequest, NextResponse } from "next/server"
import { addBusinessSubmission } from "@/lib/business-storage"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

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
    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    // Store the business submission
    const submission = addBusinessSubmission({
      businessName: formData.businessName,
      category: formData.category,
      description: formData.description,
      address: formData.address,
      city: formData.city,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      ownerName: formData.ownerName,
      ownerEmail: formData.ownerEmail,
      ownerPhone: formData.ownerPhone,
      services: formData.services || [],
      socialMedia: formData.socialMedia || {},
      operatingHours: formData.operatingHours,
      specialOffers: formData.specialOffers,
    })

    console.log("Business registration stored:", submission)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Business registration submitted successfully!",
      data: {
        businessId: submission.id,
        status: submission.status,
        estimatedReviewTime: "2-3 business days",
      },
    })
  } catch (error) {
    console.error("Business registration error:", error)
    return NextResponse.json({ error: "Failed to process business registration" }, { status: 500 })
  }
}
