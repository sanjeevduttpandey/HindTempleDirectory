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
  images?: string[] // Array of image URLs
}

interface ApprovedBusiness extends BusinessSubmission {
  status: "approved"
  isActive: boolean
  approvedAt: string
}

// In-memory storage (replace with database in production)
const businessSubmissions: BusinessSubmission[] = []
const approvedBusinesses: ApprovedBusiness[] = [
  {
    id: "1",
    businessName: "Natraj School of Dance",
    category: "Arts & Culture",
    description:
      "Offering Bharatanatyam classes for all ages, gender, and ethnicity. Established by Mrs. Prabha Ravi with 28 years of experience in classical Indian dance education.",
    address: "123 Dance Street",
    city: "Lower Hutt",
    phone: "Contact via Facebook",
    email: "info@natrajdance.co.nz",
    website: "facebook.com/share/1DbNEYPh9k",
    ownerName: "Mrs. Prabha Ravi",
    ownerEmail: "prabha@natrajdance.co.nz",
    ownerPhone: "04 123 4567",
    services: ["Bharatanatyam", "Classical Indian Dance", "All Ages Welcome", "Cultural Education"],
    socialMedia: { facebook: "facebook.com/share/1DbNEYPh9k" },
    operatingHours: "Mon-Fri: 4-8 PM, Sat: 9 AM-5 PM",
    specialOffers: "Free trial class for new students",
    status: "approved",
    submittedAt: "2024-01-15T10:00:00Z",
    reviewedAt: "2024-01-16T09:00:00Z",
    approvedAt: "2024-01-16T09:00:00Z",
    reviewNotes: "Excellent dance school with great reputation",
    rating: 4.9,
    images: ["/placeholder.svg?height=200&width=300&text=Natraj+School+of+Dance"],
    isActive: true,
  },
  {
    id: "2",
    businessName: "Wash Rite",
    category: "Cleaning Services",
    description:
      "Professional residential and commercial external cleaning services. Specializing in building wash, house wash, gutter cleaning, roof wash/treatment, driveway, paths, fence cleaning, and window cleaning.",
    address: "456 Clean Avenue",
    city: "Wellington",
    phone: "021 117 7343",
    email: "wellington@washrite.co.nz",
    website: null,
    ownerName: "Happy",
    ownerEmail: "happy@washrite.co.nz",
    ownerPhone: "021 117 7343",
    services: [
      "Building Wash",
      "House Wash",
      "Gutter Cleaning",
      "Roof Wash/Treatment",
      "Driveway Cleaning",
      "Window Cleaning",
      "Commercial Cleaning",
      "Residential Cleaning",
    ],
    socialMedia: {},
    operatingHours: "Mon-Sat: 7 AM-6 PM",
    specialOffers: "10% discount for first-time customers",
    status: "approved",
    submittedAt: "2024-01-10T14:30:00Z",
    reviewedAt: "2024-01-11T10:15:00Z",
    approvedAt: "2024-01-11T10:15:00Z",
    reviewNotes: "Reliable cleaning service with good customer feedback",
    rating: 4.8,
    images: ["/placeholder.svg?height=200&width=300&text=Wash+Rite+Cleaning"],
    isActive: true,
  },
]

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
