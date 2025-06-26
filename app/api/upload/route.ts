import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
        { status: 400 },
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, error: "File size too large. Maximum 5MB allowed." }, { status: 400 })
    }

    // For now, we'll use a placeholder URL since we can't write to filesystem in this environment
    // In production, you would upload to a cloud storage service like AWS S3, Cloudinary, etc.

    // Generate a unique filename for reference
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split(".").pop()
    const filename = `business-${timestamp}-${randomString}.${extension}`

    // Create a placeholder URL that includes the original filename for better UX
    const imageUrl = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(file.name.replace(/\.[^/.]+$/, ""))}`

    // In a real application, you would:
    // 1. Upload to cloud storage (AWS S3, Cloudinary, Vercel Blob, etc.)
    // 2. Return the actual URL from the storage service
    // 3. Store the URL in your database

    console.log(`File upload simulated: ${filename} (${file.size} bytes, ${file.type})`)

    return NextResponse.json({
      success: true,
      data: {
        filename,
        url: imageUrl,
        size: file.size,
        type: file.type,
        originalName: file.name,
      },
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, error: "Failed to process upload" }, { status: 500 })
  }
}
