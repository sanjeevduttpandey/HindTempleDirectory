import { type NextRequest, NextResponse } from "next/server"
import { updateBusinessSubmissionStatus, getBusinessSubmissionById } from "@/lib/business-storage"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status, reviewNotes } = await request.json()

    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updatedSubmission = updateBusinessSubmissionStatus(params.id, status, reviewNotes)

    if (!updatedSubmission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: updatedSubmission,
    })
  } catch (error) {
    console.error("Error updating submission:", error)
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const submission = getBusinessSubmissionById(params.id)

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: submission,
    })
  } catch (error) {
    console.error("Error fetching submission:", error)
    return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 })
  }
}
