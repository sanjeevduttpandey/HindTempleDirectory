"use client"

import { useEffect } from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubmissionCard } from "./submission-card"
import { ApprovedCard } from "./approved-card"
import { ReviewDialog } from "./review-dialog"
import { EditDialog } from "./edit-dialog"
import { EmptyState } from "./empty-state"
import { Loader2 } from "lucide-react"
import type { BusinessSubmission } from "@/lib/types" // Assuming you have this type defined

// Load the interactive dashboard on the client only
const BusinessSubmissionsAdminClient = dynamic(() => import("./business-submissions-admin-client"), { ssr: false })

/**
 * Server-side entry for /admin/business-submissions
 * Guards the route and sends unauthenticated users to /admin/login
 */
export default async function BusinessSubmissionsPage() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    redirect("/admin/login")
  }

  // ✅ Already authenticated → render the interactive dashboard
  return <BusinessSubmissionsAdminClient />
}

function BusinessSubmissionsAdmin() {
  const [pendingSubmissions, setPendingSubmissions] = useState<BusinessSubmission[]>([])
  const [approvedBusinesses, setApprovedBusinesses] = useState<BusinessSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<BusinessSubmission | null>(null)
  const [selectedBusinessToEdit, setSelectedBusinessToEdit] = useState<BusinessSubmission | null>(null)

  const fetchSubmissions = async () => {
    setLoading(true)
    setError(null)

    try {
      // The API checks a cookie, so we must forward it with the request:
      const res = await fetch("/api/admin/business-submissions", {
        credentials: "include",
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || "Failed to fetch business submissions.")
      }

      const {
        success,
        data: { submissions },
      } = await res.json()

      if (!success) {
        throw new Error("Failed to process data.")
      }

      // Split the single list into the two columns we need.
      setPendingSubmissions((submissions as BusinessSubmission[]).filter((s) => s.status === "pending"))
      setApprovedBusinesses((submissions as BusinessSubmission[]).filter((s) => s.status === "approved" && s.is_active))
    } catch (err: any) {
      console.error("Error fetching business submissions:", err)
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const handleReview = (submission: BusinessSubmission) => {
    setSelectedSubmission(submission)
  }

  const handleEdit = (business: BusinessSubmission) => {
    setSelectedBusinessToEdit(business)
  }

  const handleStatusUpdate = async (submissionId: number, status: "approved" | "rejected", reason?: string) => {
    try {
      const formData = new FormData()
      formData.append("action", status)
      if (reason) formData.append("reason", reason)

      const response = await fetch(`/api/admin/business-submissions/${submissionId}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${status} business.`)
      }

      await fetchSubmissions() // Re-fetch data to update lists
      setSelectedSubmission(null) // Close dialog
    } catch (err: any) {
      console.error(`Error ${status} business:`, err)
      alert(`Error: ${err.message}`)
    }
  }

  const handleBusinessUpdate = async (businessId: number, updatedData: Partial<BusinessSubmission>) => {
    try {
      const formData = new FormData()
      formData.append("action", "update")
      for (const key in updatedData) {
        const value = updatedData[key as keyof Partial<BusinessSubmission>]
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // For array fields like services, operating_hours
            formData.append(key, JSON.stringify(value))
          } else if (typeof value === "object" && value !== null) {
            // For object fields like social_media
            formData.append(key, JSON.stringify(value))
          } else {
            formData.append(key, String(value))
          }
        }
      }

      const response = await fetch(`/api/admin/business-submissions/${businessId}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to update business.`)
      }

      await fetchSubmissions() // Re-fetch data to update lists
      setSelectedBusinessToEdit(null) // Close dialog
    } catch (err: any) {
      console.error(`Error updating business:`, err)
      alert(`Error: ${err.message}`)
    }
  }

  const handleDeleteBusiness = async (businessId: number) => {
    if (!confirm("Are you sure you want to delete this business? This action cannot be undone.")) {
      return
    }
    try {
      const response = await fetch(`/api/admin/business-submissions/${businessId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to delete business.`)
      }

      await fetchSubmissions() // Re-fetch data to update lists
    } catch (err: any) {
      console.error(`Error deleting business:`, err)
      alert(`Error: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Admin Panel - Business Submissions</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Submissions</h2>
          <p className="text-gray-600">Review and manage businesses submitted by the community.</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            <p className="ml-2 text-gray-600">Loading submissions...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 py-8">
            <p>{error}</p>
            <Button onClick={fetchSubmissions} className="mt-4">
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && (
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending">Pending ({pendingSubmissions.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedBusinesses.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-6">
              {pendingSubmissions.length === 0 ? (
                <EmptyState message="No pending business submissions." />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingSubmissions.map((submission) => (
                    <SubmissionCard
                      key={submission.id}
                      submission={submission}
                      onReview={() => handleReview(submission)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="approved" className="mt-6">
              {approvedBusinesses.length === 0 ? (
                <EmptyState message="No approved businesses." />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {approvedBusinesses.map((business) => (
                    <ApprovedCard
                      key={business.id}
                      business={business}
                      onEdit={() => handleEdit(business)}
                      onDelete={() => handleDeleteBusiness(business.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {selectedSubmission && (
          <ReviewDialog
            submission={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
            onApprove={(reason) => handleStatusUpdate(selectedSubmission.id, "approved", reason)}
            onReject={(reason) => handleStatusUpdate(selectedSubmission.id, "rejected", reason)}
          />
        )}

        {selectedBusinessToEdit && (
          <EditDialog
            business={selectedBusinessToEdit}
            onClose={() => setSelectedBusinessToEdit(null)}
            onSave={(updatedData) => handleBusinessUpdate(selectedBusinessToEdit.id, updatedData)}
          />
        )}
      </div>
    </div>
  )
}
