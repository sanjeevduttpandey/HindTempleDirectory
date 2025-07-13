"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { EmptyState } from "./empty-state"
import type { EventSubmission } from "@/lib/types" // Assuming you have this type defined
import { SubmissionCard as EventSubmissionCard } from "./submission-card" // Renamed to avoid conflict
import { ApprovedCard as EventApprovedCard } from "./approved-card" // Renamed to avoid conflict
import { ReviewDialog as EventReviewDialog } from "./review-dialog" // Renamed to avoid conflict
import { EditDialog as EventEditDialog } from "./edit-dialog" // Renamed to avoid conflict
import { Button } from "@/components/ui/button"

export default function EventSubmissionsAdmin() {
  const [pendingSubmissions, setPendingSubmissions] = useState<EventSubmission[]>([])
  const [approvedEvents, setApprovedEvents] = useState<EventSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<EventSubmission | null>(null)
  const [selectedEventToEdit, setSelectedEventToEdit] = useState<EventSubmission | null>(null)

  const fetchSubmissions = async () => {
    setLoading(true)
    setError(null)
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        fetch("/api/admin/event-submissions?status=pending"),
        fetch("/api/admin/event-submissions?status=approved"),
      ])

      if (!pendingRes.ok || !approvedRes.ok) {
        throw new Error("Failed to fetch event submissions.")
      }

      const pendingData = await pendingRes.json()
      const approvedData = await approvedRes.json()

      if (pendingData.success && approvedData.success) {
        setPendingSubmissions(pendingData.events)
        setApprovedEvents(approvedData.events)
      } else {
        setError(pendingData.error || approvedData.error || "Failed to process data.")
      }
    } catch (err: any) {
      console.error("Error fetching event submissions:", err)
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const handleReview = (submission: EventSubmission) => {
    setSelectedSubmission(submission)
  }

  const handleEdit = (event: EventSubmission) => {
    setSelectedEventToEdit(event)
  }

  const handleStatusUpdate = async (eventId: number, status: "approved" | "rejected", reason?: string) => {
    try {
      const formData = new FormData()
      formData.append("action", status)
      if (reason) formData.append("reason", reason)

      const response = await fetch(`/api/admin/event-submissions/${eventId}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${status} event.`)
      }

      await fetchSubmissions() // Re-fetch data to update lists
      setSelectedSubmission(null) // Close dialog
    } catch (err: any) {
      console.error(`Error ${status} event:`, err)
      alert(`Error: ${err.message}`)
    }
  }

  const handleEventUpdate = async (eventId: number, updatedData: Partial<EventSubmission>) => {
    try {
      const formData = new FormData()
      formData.append("action", "update")
      for (const key in updatedData) {
        const value = updatedData[key as keyof Partial<EventSubmission>]
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // For array fields like features, image_urls
            formData.append(key, JSON.stringify(value))
          } else if (key === "image_url" && typeof value === "string") {
            // Special handling for image_url if it's a string (existing URL)
            formData.append(key, value)
          } else if (key === "images" && value instanceof File) {
            // For new image files
            formData.append(key, value)
          } else if (key === "is_free" || key === "is_featured") {
            formData.append(key, String(value))
          } else {
            formData.append(key, String(value))
          }
        }
      }

      // If image_urls is explicitly passed as an array of strings, handle it
      if (updatedData.image_urls && Array.isArray(updatedData.image_urls)) {
        formData.append("image_urls", JSON.stringify(updatedData.image_urls))
      }

      const response = await fetch(`/api/admin/event-submissions/${eventId}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to update event.`)
      }

      await fetchSubmissions() // Re-fetch data to update lists
      setSelectedEventToEdit(null) // Close dialog
    } catch (err: any) {
      console.error(`Error updating event:`, err)
      alert(`Error: ${err.message}`)
    }
  }

  const handleDeleteEvent = async (eventId: number) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return
    }
    try {
      const response = await fetch(`/api/admin/event-submissions/${eventId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to delete event.`)
      }

      await fetchSubmissions() // Re-fetch data to update lists
    } catch (err: any) {
      console.error(`Error deleting event:`, err)
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
              <p className="text-sm text-gray-600">Admin Panel - Event Submissions</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Event Submissions</h2>
          <p className="text-gray-600">Review and manage events submitted by the community.</p>
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
              <TabsTrigger value="approved">Approved ({approvedEvents.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-6">
              {pendingSubmissions.length === 0 ? (
                <EmptyState message="No pending event submissions." />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingSubmissions.map((submission) => (
                    <EventSubmissionCard
                      key={submission.id}
                      submission={submission}
                      onReview={() => handleReview(submission)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="approved" className="mt-6">
              {approvedEvents.length === 0 ? (
                <EmptyState message="No approved events." />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {approvedEvents.map((event) => (
                    <EventApprovedCard
                      key={event.id}
                      event={event}
                      onEdit={() => handleEdit(event)}
                      onDelete={() => handleDeleteEvent(event.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {selectedSubmission && (
          <EventReviewDialog
            submission={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
            onApprove={(reason) => handleStatusUpdate(selectedSubmission.id, "approved", reason)}
            onReject={(reason) => handleStatusUpdate(selectedSubmission.id, "rejected", reason)}
          />
        )}

        {selectedEventToEdit && (
          <EventEditDialog
            event={selectedEventToEdit}
            onClose={() => setSelectedEventToEdit(null)}
            onSave={(updatedData) => handleEventUpdate(selectedEventToEdit.id, updatedData)}
          />
        )}
      </div>
    </div>
  )
}
