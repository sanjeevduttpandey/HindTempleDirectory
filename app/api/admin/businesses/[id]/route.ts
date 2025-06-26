import { type NextRequest, NextResponse } from "next/server"
import { updateApprovedBusiness, delistBusiness } from "@/lib/business-storage"
import { isAdminAuthenticated } from "@/lib/admin-auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()
    const updatedBusiness = updateApprovedBusiness(params.id, updates)

    if (!updatedBusiness) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: updatedBusiness,
    })
  } catch (error) {
    console.error("Error updating business:", error)
    return NextResponse.json({ error: "Failed to update business" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const success = delistBusiness(params.id)

    if (!success) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Business delisted successfully",
    })
  } catch (error) {
    console.error("Error delisting business:", error)
    return NextResponse.json({ error: "Failed to delist business" }, { status: 500 })
  }
}
