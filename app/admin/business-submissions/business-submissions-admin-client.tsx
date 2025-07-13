"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import type { BusinessSubmission } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubmissionCard } from "./submission-card"
import { ApprovedCard } from "./approved-card"
import { ReviewDialog } from "./review-dialog"
import { EditDialog } from "./edit-dialog"
import { EmptyState } from "./empty-state"

export default function BusinessSubmissionsAdmin() {
  const router = useRouter()

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
      // The API checks the same cookie we validated on the server
      const res = await fetch("/api/admin/business-submissions", { credentials: "include" })

      if (res.status === 401) {
        // Session expired while the page was open – force re-login
        router.push("/admin/login")
        return
      }

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || "Failed to fetch business submissions.")
      }

      const {
        success,
        data: { submissions },
      } = await res.json()

      if (!success) throw new Error("Failed to process data.")

      setPendingSubmissions(submissions.filter((s: BusinessSubmission) => s.status === "pending"))
      setApprovedBusinesses(submissions.filter((s: BusinessSubmission) => s.status === "approved" && s.is_active))
    } catch (err: any) {
      console.error("Error fetching business submissions:", err)
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* --- the remainder of the UI (unchanged) -------------------------------- */
  const handleReview = (submission: BusinessSubmission) => setSelectedSubmission(submission)
  const handleEdit = (business: BusinessSubmission) => setSelectedBusinessToEdit(business)

  const handleStatusUpdate = async (id: number, status: "approved" | "rejected", reason?: string) => {
    try {
      const body = new FormData()
      body.append("action", status)
      if (reason) body.append("reason", reason)

      const res = await fetch(`/api/admin/business-submissions/${id}`, { method: "PUT", body })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || `Failed to ${status} business.`)
      }

      await fetchSubmissions()
      setSelectedSubmission(null)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleBusinessUpdate = async (id: number, updated: Partial<BusinessSubmission>) => {
    try {
      const body = new FormData()
      body.append("action", "update")
      Object.entries(updated).forEach(([k, v]) => body.append(k, typeof v === "object" ? JSON.stringify(v) : String(v)))

      const res = await fetch(`/api/admin/business-submissions/${id}`, { method: "PUT", body })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || "Failed to update business.")
      }

      await fetchSubmissions()
      setSelectedBusinessToEdit(null)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDeleteBusiness = async (id: number) => {
    if (!confirm("Delete this business permanently?")) return
    try {
      const res = await fetch(`/api/admin/business-submissions/${id}`, { method: "DELETE" })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || "Failed to delete business.")
      }

      await fetchSubmissions()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full grid place-content-center">
            <span className="text-white font-bold text-lg">🕉</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
            <p className="text-sm text-gray-600">Admin – Business Submissions</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Submissions</h2>
          <p className="text-gray-600">Review and manage businesses submitted by the community.</p>
        </section>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            <span className="ml-2 text-gray-600">Loading submissions…</span>
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
              {pendingSubmissions.length ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingSubmissions.map((s) => (
                    <SubmissionCard key={s.id} submission={s} onReview={() => handleReview(s)} />
                  ))}
                </div>
              ) : (
                <EmptyState message="No pending business submissions." />
              )}
            </TabsContent>

            <TabsContent value="approved" className="mt-6">
              {approvedBusinesses.length ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {approvedBusinesses.map((b) => (
                    <ApprovedCard
                      key={b.id}
                      business={b}
                      onEdit={() => handleEdit(b)}
                      onDelete={() => handleDeleteBusiness(b.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="No approved businesses." />
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
            onSave={(data) => handleBusinessUpdate(selectedBusinessToEdit.id, data)}
          />
        )}
      </main>
    </div>
  )
}
