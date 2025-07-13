import { type NextRequest, NextResponse } from "next/server"
import { updateEventStatus, getEventById, updateEvent } from "@/lib/database"
import { getAdminSession } from "@/lib/admin-auth"
import { uploadImage } from "@/lib/business-storage" // Reusing for event images

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const eventId = Number.parseInt(params.id)
    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 })
    }

    const event = await getEventById(eventId)

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      event,
    })
  } catch (error: any) {
    console.error("Error fetching event for admin:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const eventId = Number.parseInt(params.id)
    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 })
    }

    const formData = await request.formData()
    const action = formData.get("action") as string // 'approve', 'reject', 'update'

    if (action === "approve" || action === "reject") {
      const status = action === "approve" ? "approved" : "rejected"
      const updatedEvent = await updateEventStatus(eventId, status)
      return NextResponse.json({
        success: true,
        message: `Event ${updatedEvent.title} ${status}.`,
        event: updatedEvent,
      })
    } else if (action === "update") {
      const updates: Record<string, any> = {}
      for (const [key, value] of formData.entries()) {
        if (key !== "action" && key !== "images") {
          if (key === "features") {
            // Features are sent as a single comma-separated string from the form
            updates[key] = (value as string)
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          } else if (key === "isFree") {
            updates[key] = value === "true"
          } else if (key === "maxAttendees" || key === "registrationFee") {
            updates[key] = value ? Number(value) : null
          } else {
            updates[key] = value
          }
        }
      }

      // Handle image uploads
      const existingEvent = await getEventById(eventId)
      let imageUrls = existingEvent?.image_urls || []

      const imageFiles = formData.getAll("images") as File[]
      for (const file of imageFiles) {
        if (file instanceof File && file.size > 0) {
          const uploadResult = await uploadImage(file, "events")
          if (uploadResult.success) {
            imageUrls.push(uploadResult.url)
          } else {
            console.error("Image upload failed:", uploadResult.error)
          }
        }
      }
      // If images were removed from the form, the `images` field might be empty or not present.
      // The frontend should send a list of *current* image URLs, or we need a more robust way to track removals.
      // For now, we'll assume the frontend sends all current URLs + new files.
      // A more advanced solution would involve sending a list of URLs to *keep* and new files.
      // For simplicity, if the frontend sends an empty 'images' array, we'll clear them.
      // If the frontend sends 'imageUrls' as a separate field, we'd use that.
      // Let's assume the frontend sends `imageUrls` as a comma-separated string for existing images.
      const currentImageUrlsString = formData.get("currentImageUrls") as string
      if (currentImageUrlsString !== undefined && currentImageUrlsString !== null) {
        const currentUrls = currentImageUrlsString
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
        imageUrls = [...currentUrls, ...imageUrls.filter((url) => !currentUrls.includes(url))] // Merge new uploads with kept old ones
      }
      updates.image_urls = imageUrls
      updates.image_url = imageUrls[0] || null // Update main image_url

      const updatedEvent = await updateEvent(eventId, updates)
      return NextResponse.json({
        success: true,
        message: `Event ${updatedEvent.title} updated successfully.`,
        event: updatedEvent,
      })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Error updating event submission:", error)
    return NextResponse.json({ error: "Failed to update event submission", details: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const eventId = Number.parseInt(params.id)
    if (Number.isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 })
    }

    // For deletion, we can set is_active to false or actually delete.
    // Setting is_active to false is safer for auditing.
    const updatedEvent = await updateEvent(eventId, { is_active: false, status: "rejected" })

    return NextResponse.json({
      success: true,
      message: `Event ${updatedEvent.title} has been deactivated/rejected.`,
      event: updatedEvent,
    })
  } catch (error: any) {
    console.error("Error deleting event:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
