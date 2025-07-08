interface BusinessSubmission {
  id: string
  businessName: string
  category: string
  description: string
  address: string
  city: string
  phone: string
  email: string
  website?: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  services: string[]
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  operatingHours?: string
  specialOffers?: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewNotes?: string
  rating?: number
  images?: string[] // Array of image URLs/data URLs
}

interface ApprovedBusiness extends BusinessSubmission {
  status: "approved"
  isActive: boolean
  approvedAt: string
}

// In-memory storage (replace with database in production)
const businessSubmissions: BusinessSubmission[] = []
const approvedBusinesses: ApprovedBusiness[] = []

export function addBusinessSubmission(
  submission: Omit<BusinessSubmission, "id" | "submittedAt" | "status">,
): BusinessSubmission {
  const newSubmission: BusinessSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "pending",
  }

  businessSubmissions.push(newSubmission)
  return newSubmission
}

export function getAllBusinessSubmissions(): BusinessSubmission[] {
  return businessSubmissions
}

export function getBusinessSubmissionById(id: string): BusinessSubmission | null {
  return businessSubmissions.find((submission) => submission.id === id) || null
}

export function updateBusinessSubmissionStatus(
  id: string,
  status: "pending" | "approved" | "rejected",
  reviewNotes?: string,
): BusinessSubmission | null {
  const submissionIndex = businessSubmissions.findIndex((submission) => submission.id === id)

  if (submissionIndex === -1) {
    return null
  }

  businessSubmissions[submissionIndex] = {
    ...businessSubmissions[submissionIndex],
    status,
    reviewedAt: new Date().toISOString(),
    reviewNotes,
  }

  // If approved, add to approved businesses
  if (status === "approved") {
    const approvedBusiness: ApprovedBusiness = {
      ...businessSubmissions[submissionIndex],
      status: "approved",
      isActive: true,
      approvedAt: new Date().toISOString(),
      rating: 4.5, // Default rating
    }
    approvedBusinesses.push(approvedBusiness)
  }

  return businessSubmissions[submissionIndex]
}

export function getApprovedBusinesses(): ApprovedBusiness[] {
  return approvedBusinesses.filter((business) => business.isActive)
}

export function updateApprovedBusiness(id: string, updates: Partial<ApprovedBusiness>): ApprovedBusiness | null {
  const businessIndex = approvedBusinesses.findIndex((business) => business.id === id)

  if (businessIndex === -1) {
    return null
  }

  approvedBusinesses[businessIndex] = {
    ...approvedBusinesses[businessIndex],
    ...updates,
  }

  return approvedBusinesses[businessIndex]
}

export function delistBusiness(id: string): boolean {
  const businessIndex = approvedBusinesses.findIndex((business) => business.id === id)

  if (businessIndex === -1) {
    return false
  }

  approvedBusinesses[businessIndex].isActive = false
  return true
}

export function getBusinessSubmissionStats() {
  const total = businessSubmissions.length
  const pending = businessSubmissions.filter((s) => s.status === "pending").length
  const approved = businessSubmissions.filter((s) => s.status === "approved").length
  const rejected = businessSubmissions.filter((s) => s.status === "rejected").length

  return { total, pending, approved, rejected }
}
