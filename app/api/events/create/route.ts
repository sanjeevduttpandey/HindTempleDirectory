import { type NextRequest, NextResponse } from "next/server"
import { createEvent } from "@/lib/database"
import { uploadImage } from "@/lib/business-storage" // Reusing for event images
import { getSession } from "@/lib/auth" // Assuming you have a getSession function

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const full_description = formData.get("fullDescription") as string | undefined
    const event_type = formData.get("category") as string
    const start_date = formData.get("date") as string
    const start_time = formData.get("startTime") as string | undefined
    const end_time = formData.get("endTime") as string | undefined
    const location = formData.get("venue") as string
    const address = formData.get("address") as string | undefined
    const city = formData.get("city") as string
    const organizer_name = formData.get("organizer") as string
    const organizer_email = formData.get("contactEmail") as string
    const organizer_phone = formData.get("contactPhone") as string
    const organizer_website = formData.get("website") as string | undefined
    const max_participants = formData.get("maxAttendees")
      ? Number.parseInt(formData.get("maxAttendees") as string)
      : undefined
    const is_free = formData.get("isFree") === "true"
    const registration_fee = is_free
      ? 0.0
      : formData.get("price")
        ? Number.parseFloat(formData.get("price") as string)
        : 0.0
    const requirements = formData.get("requirements") as string | undefined
    const features = formData.getAll("features[]") as string[]

    const imageFiles = formData.getAll("images") as File[]
    const imageUrls: string[] = []

    for (const file of imageFiles) {
      if (file instanceof File && file.size > 0) {
        const uploadResult = await uploadImage(file, "events") // Use 'events' folder
        if (uploadResult.success) {
          imageUrls.push(uploadResult.url)
        } else {
          console.error("Image upload failed:", uploadResult.error)
          // Decide whether to fail the whole submission or continue without the image
        }
      }
    }

    const newEvent = await createEvent({
      title,
      description,
      full_description,
      event_type,
      start_date,
      end_date: (formData.get("endDate") as string) || undefined, // Assuming an endDate field might be added
      start_time,
      end_time,
      location,
      address,
      city,
      organizer_name,
      organizer_email,
      organizer_phone,
      organizer_website,
      max_participants,
      is_free,
      registration_fee,
      requirements,
      features,
      image_url: imageUrls[0] || undefined, // Use first image as main, if any
      image_urls: imageUrls,
      status: "pending", // All new events are pending by default
      organizer_devotee_id: session.user.id, // Link to the submitting devotee
    })

    return NextResponse.json({
      success: true,
      message: "Event submitted successfully for review!",
      event: newEvent,
    })
  } catch (error: any) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event", details: error.message }, { status: 500 })
  }
}
