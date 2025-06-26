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

    // Convert file to base64 for storage
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")
    const mimeType = file.type
    const dataUrl = `data:${mimeType};base64,${base64}`

    // Generate unique filename for reference
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split(".").pop()
    const filename = `business-${timestamp}-${randomString}.${extension}`

    console.log(`File uploaded: ${filename} (${file.size} bytes, ${file.type})`)

    return NextResponse.json({
      success: true,
      data: {
        filename,
        url: dataUrl, // Return base64 data URL for immediate display
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
