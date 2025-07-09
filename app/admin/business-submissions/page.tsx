"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StaticHeader from "@/components/static-header"
import { Building2, CheckCircle, XCircle, AlertCircle, Search, BarChart3, LogOut } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "./empty-state"
import { SubmissionCard } from "./submission-card"
import { ApprovedCard } from "./approved-card"
import { ReviewDialog } from "./review-dialog"
import { EditDialog } from "./edit-dialog"

/* -------------------------------------------------------------------------- */
/*                                 TYPE DEFS                                  */
/* -------------------------------------------------------------------------- */
type Status = "pending" | "approved" | "rejected"

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
  status: Status
  submittedAt: string
  reviewedAt?: string
  reviewNotes?: string
  rating?: number
  isActive?: boolean
  images?: string[] // Added images field
}

interface SubmissionStats {
  total: number
  pending: number
  approved: number
  rejected: number
}

/* -------------------------------------------------------------------------- */

export default function BusinessSubmissionsAdmin() {
  const router = useRouter()

  /* ----------------------------- Local state ------------------------------ */
  const [submissions, setSubmissions] = useState<BusinessSubmission[]>([])
  const [approvedBusinesses, setApprovedBusinesses] = useState<BusinessSubmission[]>([])
  const [stats, setStats] = useState<SubmissionStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  })
  const [loading, setLoading] = useState<boolean>(true)

  const [selectedSubmission, setSelectedSubmission] = useState<BusinessSubmission | null>(null)
  const [reviewNotes, setReviewNotes] = useState<string>("")

  const [filterStatus, setFilterStatus] = useState<Status | "all">("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [activeTab, setActiveTab] = useState<"submissions" | "approved">("submissions")

  const [editingBusiness, setEditingBusiness] = useState<BusinessSubmission | null>(null)

  /* --------------------------- Utility helpers --------------------------- */
  const safeArray = <T,>(val: unknown): T[] => (Array.isArray(val) ? (val as T[]) : [])

  const fetchAdminData = useCallback(async () => {
    setLoading(true)
    try {
      /* ---------- Pending / rejected submissions ---------- */
      const resp = await fetch("/api/admin/business-submissions")
      if (resp.status === 401) {
        router.push("/admin/login")
        return
      }
      if (!resp.ok) {
        throw new Error(`Submissions fetch failed (${resp.status})`)
      }
      const resJson = await resp.json()
      setSubmissions(safeArray<BusinessSubmission>(resJson?.data?.submissions))
      setStats(
        resJson?.data?.stats ?? {
          total: 0,
          pending: 0,
          approved: 0,
          rejected: 0,
        },
      )

      /* ---------------- Approved businesses -------------- */
      const approvedResp = await fetch("/api/business/approved")
      if (approvedResp.ok) {
        const approvedJson = await approvedResp.json()
        setApprovedBusinesses(safeArray<BusinessSubmission>(approvedJson?.data))
      }
    } catch (err) {
      /* eslint-disable no-console */
      console.error("Admin fetch error:", err)
      alert("Unable to load admin data right now. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchAdminData()
  }, [fetchAdminData])

  /* ---------------------------- Auth logout ------------------------------ */
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      })
    } finally {
      router.push("/admin/login")
    }
  }

  /* ----------------------- Update submission status ---------------------- */
  const updateSubmissionStatus = async (id: string, status: Status, notes?: string) => {
    try {
      const resp = await fetch(`/api/admin/business-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reviewNotes: notes }),
      })
      if (!resp.ok) throw new Error("Update failed")
      fetchAdminData()
      setSelectedSubmission(null)
      setReviewNotes("")
    } catch (e) {
      console.error(e)
      alert("Could not update submission. Please try again.")
    }
  }

  /* ---------------------------- Business CRUD --------------------------- */
  const updateBusiness = async (id: string, updates: Partial<BusinessSubmission>) => {
    try {
      const resp = await fetch(`/api/admin/businesses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!resp.ok) throw new Error("Update failed")
      fetchAdminData()
      setEditingBusiness(null)
    } catch (e) {
      console.error(e)
      alert("Could not update business.")
    }
  }

  const delistBusiness = async (id: string) => {
    if (!confirm("Are you sure you want to delist this business?")) return
    try {
      const resp = await fetch(`/api/admin/businesses/${id}`, { method: "DELETE" })
      if (!resp.ok) throw new Error("Delete failed")
      fetchAdminData()
    } catch (e) {
      console.error(e)
      alert("Could not delist business.")
    }
  }

  /* -------------------------- Filtering helpers ------------------------- */
  const textIncludes = (text: string | undefined, query: string) =>
    (text ?? "").toLowerCase().includes(query.toLowerCase())

  const filteredSubmissions = submissions.filter((s) => {
    const matchesStatus = filterStatus === "all" || s.status === filterStatus
    const matchesSearch =
      searchTerm === "" ||
      textIncludes(s.businessName, searchTerm) ||
      textIncludes(s.category, searchTerm) ||
      textIncludes(s.ownerName, searchTerm)
    return matchesStatus && matchesSearch
  })

  const filteredApproved = approvedBusinesses.filter((b) => {
    const matchesSearch =
      searchTerm === "" ||
      textIncludes(b.businessName, searchTerm) ||
      textIncludes(b.category, searchTerm) ||
      textIncludes(b.ownerName, searchTerm)
    return matchesSearch
  })

  /* ---------------------------- Render helpers -------------------------- */
  const getStatusBadge = (status: Status) => {
    const shared = "h-3 w-3 mr-1"
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <AlertCircle className={shared} />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className={shared} />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <XCircle className={shared} />
            Rejected
          </Badge>
        )
    }
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  /* ---------------------------------------------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <StaticHeader />
        <div className="flex items-center justify-center py-12">
          <span className="text-gray-600">Loading…</span>
        </div>
      </div>
    )
  }

  /* ---------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        {/* ---------------------------------------------------------------- */}
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Management Admin</h1>
            <p className="text-gray-600">Review submissions and manage approved businesses</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {(
            [
              {
                label: "Total Submissions",
                value: stats.total,
                icon: BarChart3,
                color: "text-blue-600",
              },
              {
                label: "Pending Review",
                value: stats.pending,
                icon: AlertCircle,
                color: "text-yellow-600",
              },
              {
                label: "Approved",
                value: stats.approved,
                icon: CheckCircle,
                color: "text-green-600",
              },
              {
                label: "Active Businesses",
                value: approvedBusinesses.length,
                icon: Building2,
                color: "text-blue-600",
              },
            ] as const
          ).map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className={`text-2xl font-bold ${color}`}>{value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
          <TabsList>
            <TabsTrigger value="submissions">Pending Submissions</TabsTrigger>
            <TabsTrigger value="approved">Approved Businesses</TabsTrigger>
          </TabsList>

          {/* ------------------- Search & Filter bar ------------------- */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by name, category, or owner…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {activeTab === "submissions" && (
                  <div className="w-full md:w-auto">
                    <Label htmlFor="status-filter">Filter by Status</Label>
                    <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ------------------------------------------------------------------ */}
          {/* Pending / Rejected Tab */}
          <TabsContent value="submissions" className="space-y-4">
            {filteredSubmissions.length === 0 ? (
              <EmptyState
                icon={Building2}
                title="No submissions found"
                subtitle={
                  searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No business registration requests have been submitted yet."
                }
              />
            ) : (
              filteredSubmissions.map((s) => (
                <SubmissionCard
                  key={s.id}
                  submission={s}
                  openReview={() => setSelectedSubmission(s)}
                  getStatusBadge={getStatusBadge}
                  formatDate={formatDate}
                  onApprove={(notes) => updateSubmissionStatus(s.id, "approved", notes)}
                  onReject={(notes) => updateSubmissionStatus(s.id, "rejected", notes)}
                  onPending={(notes) => updateSubmissionStatus(s.id, "pending", notes)}
                />
              ))
            )}
          </TabsContent>

          {/* ------------------------------------------------------------------ */}
          {/* Approved Tab */}
          <TabsContent value="approved" className="space-y-4">
            {filteredApproved.length === 0 ? (
              <EmptyState
                icon={Building2}
                title="No approved businesses found"
                subtitle={searchTerm ? "Try adjusting your search criteria." : "No businesses have been approved yet."}
              />
            ) : (
              filteredApproved.map((b) => (
                <ApprovedCard
                  key={b.id}
                  business={b}
                  onEdit={() => setEditingBusiness(b)}
                  onDelist={() => delistBusiness(b.id)}
                  formatDate={formatDate}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Review Dialog */}
      {selectedSubmission && (
        <ReviewDialog
          submission={selectedSubmission}
          reviewNotes={reviewNotes}
          setReviewNotes={setReviewNotes}
          close={() => setSelectedSubmission(null)}
          onApprove={() => updateSubmissionStatus(selectedSubmission.id, "approved", reviewNotes)}
          onReject={() => updateSubmissionStatus(selectedSubmission.id, "rejected", reviewNotes)}
          onPending={() => updateSubmissionStatus(selectedSubmission.id, "pending", reviewNotes)}
        />
      )}

      {/* -------------------------------------------------------------------- */}
      {/* Edit Dialog */}
      {editingBusiness && (
        <EditDialog
          business={editingBusiness}
          setBusiness={setEditingBusiness}
          onSave={(updates) => updateBusiness(editingBusiness.id, updates)}
          close={() => setEditingBusiness(null)}
        />
      )}
    </div>
  )
}
