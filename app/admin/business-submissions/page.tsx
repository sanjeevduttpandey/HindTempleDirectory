"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StaticHeader from "@/components/static-header"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Search,
  BarChart3,
  LogOut,
  Edit,
  Trash2,
  Star,
} from "lucide-react"

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
  isActive?: boolean
}

interface SubmissionStats {
  total: number
  pending: number
  approved: number
  rejected: number
}

export default function BusinessSubmissionsAdmin() {
  const [submissions, setSubmissions] = useState<BusinessSubmission[]>([])
  const [approvedBusinesses, setApprovedBusinesses] = useState<BusinessSubmission[]>([])
  const [stats, setStats] = useState<SubmissionStats>({ total: 0, pending: 0, approved: 0, rejected: 0 })
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<BusinessSubmission | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("submissions")
  const [editingBusiness, setEditingBusiness] = useState<BusinessSubmission | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuthAndFetchData()
  }, [])

  const checkAuthAndFetchData = async () => {
    try {
      // ─── Fetch pending & rejected submissions ────────────────────────────────────
      const response = await fetch("/api/admin/business-submissions")

      if (response.status === 401) {
        router.push("/admin/login")
        return
      }

      if (!response.ok) {
        throw new Error(`Submissions fetch failed – ${response.status}`)
      }

      const result = await response.json()
      setSubmissions(result.data.submissions)
      setStats(result.data.stats)

      // ─── Fetch approved businesses ───────────────────────────────────────────────
      const approvedResponse = await fetch("/api/business/approved")

      if (approvedResponse.ok) {
        const approvedResult = await approvedResponse.json()
        setApprovedBusinesses(approvedResult.data)
      }
    } catch (err) {
      console.error("Error fetching data:", err)
      alert("Unable to load admin data. Please try again later.")
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "logout" }),
      })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateSubmissionStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/business-submissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, reviewNotes: notes }),
      })

      if (response.ok) {
        checkAuthAndFetchData() // Refresh the data
        setSelectedSubmission(null)
        setReviewNotes("")
      }
    } catch (error) {
      console.error("Error updating submission:", error)
    }
  }

  const updateBusiness = async (id: string, updates: Partial<BusinessSubmission>) => {
    try {
      const response = await fetch(`/api/admin/businesses/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        checkAuthAndFetchData()
        setEditingBusiness(null)
      }
    } catch (error) {
      console.error("Error updating business:", error)
    }
  }

  const delistBusiness = async (id: string) => {
    if (!confirm("Are you sure you want to delist this business?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/businesses/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        checkAuthAndFetchData()
      }
    } catch (error) {
      console.error("Error delisting business:", error)
    }
  }

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesStatus = filterStatus === "all" || submission.status === filterStatus
    const matchesSearch =
      searchTerm === "" ||
      submission.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.ownerName.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const filteredApprovedBusinesses = approvedBusinesses.filter((business) => {
    const matchesSearch =
      searchTerm === "" ||
      business.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.ownerName.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Management Admin</h1>
            <p className="text-gray-600">Review submissions and manage approved businesses</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Businesses</p>
                  <p className="text-2xl font-bold text-blue-600">{approvedBusinesses.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="submissions">Pending Submissions</TabsTrigger>
            <TabsTrigger value="approved">Approved Businesses</TabsTrigger>
          </TabsList>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by business name, category, or owner..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                {activeTab === "submissions" && (
                  <div>
                    <Label htmlFor="status-filter">Filter by Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
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

          <TabsContent value="submissions" className="space-y-4">
            {filteredSubmissions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                  <p className="text-gray-600">
                    {searchTerm || filterStatus !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "No business registration requests have been submitted yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{submission.businessName}</h3>
                        <p className="text-gray-600 mb-2">{submission.category}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {submission.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {submission.ownerName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(submission.submittedAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(submission.status)}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(submission)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{submission.businessName}</DialogTitle>
                              <DialogDescription>Review business registration details</DialogDescription>
                            </DialogHeader>

                            {selectedSubmission && (
                              <Tabs defaultValue="details" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="details">Business Details</TabsTrigger>
                                  <TabsTrigger value="review">Review & Actions</TabsTrigger>
                                </TabsList>

                                <TabsContent value="details" className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <div>
                                        <Label className="font-semibold">Business Information</Label>
                                        <div className="mt-2 space-y-2 text-sm">
                                          <p>
                                            <strong>Name:</strong> {selectedSubmission.businessName}
                                          </p>
                                          <p>
                                            <strong>Category:</strong> {selectedSubmission.category}
                                          </p>
                                          <p>
                                            <strong>Description:</strong> {selectedSubmission.description}
                                          </p>
                                        </div>
                                      </div>

                                      <div>
                                        <Label className="font-semibold">Location</Label>
                                        <div className="mt-2 space-y-1 text-sm">
                                          <p>{selectedSubmission.address}</p>
                                          <p>{selectedSubmission.city}</p>
                                        </div>
                                      </div>

                                      <div>
                                        <Label className="font-semibold">Services</Label>
                                        <div className="mt-2 flex flex-wrap gap-1">
                                          {selectedSubmission.services.map((service) => (
                                            <Badge key={service} variant="secondary" className="text-xs">
                                              {service}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="space-y-4">
                                      <div>
                                        <Label className="font-semibold">Contact Information</Label>
                                        <div className="mt-2 space-y-2 text-sm">
                                          <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {selectedSubmission.phone}
                                          </p>
                                          <p className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {selectedSubmission.email}
                                          </p>
                                          {selectedSubmission.website && (
                                            <p>
                                              <strong>Website:</strong> {selectedSubmission.website}
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      <div>
                                        <Label className="font-semibold">Owner Information</Label>
                                        <div className="mt-2 space-y-2 text-sm">
                                          <p>
                                            <strong>Name:</strong> {selectedSubmission.ownerName}
                                          </p>
                                          <p>
                                            <strong>Email:</strong> {selectedSubmission.ownerEmail}
                                          </p>
                                          <p>
                                            <strong>Phone:</strong> {selectedSubmission.ownerPhone}
                                          </p>
                                        </div>
                                      </div>

                                      {selectedSubmission.operatingHours && (
                                        <div>
                                          <Label className="font-semibold">Operating Hours</Label>
                                          <p className="mt-2 text-sm">{selectedSubmission.operatingHours}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {selectedSubmission.specialOffers && (
                                    <div>
                                      <Label className="font-semibold">Special Offers</Label>
                                      <p className="mt-2 text-sm">{selectedSubmission.specialOffers}</p>
                                    </div>
                                  )}
                                </TabsContent>

                                <TabsContent value="review" className="space-y-4">
                                  <div className="flex items-center gap-2 mb-4">
                                    <span className="text-sm font-medium">Current Status:</span>
                                    {getStatusBadge(selectedSubmission.status)}
                                  </div>

                                  <div>
                                    <Label htmlFor="review-notes">Review Notes</Label>
                                    <Textarea
                                      id="review-notes"
                                      placeholder="Add notes about your review decision..."
                                      value={reviewNotes}
                                      onChange={(e) => setReviewNotes(e.target.value)}
                                      rows={4}
                                    />
                                  </div>

                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() =>
                                        updateSubmissionStatus(selectedSubmission.id, "approved", reviewNotes)
                                      }
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        updateSubmissionStatus(selectedSubmission.id, "rejected", reviewNotes)
                                      }
                                      variant="destructive"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        updateSubmissionStatus(selectedSubmission.id, "pending", reviewNotes)
                                      }
                                      variant="outline"
                                    >
                                      <AlertCircle className="h-4 w-4 mr-2" />
                                      Mark as Pending
                                    </Button>
                                  </div>

                                  {selectedSubmission.reviewedAt && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                      <p className="text-sm text-gray-600">
                                        <strong>Last reviewed:</strong> {formatDate(selectedSubmission.reviewedAt)}
                                      </p>
                                      {selectedSubmission.reviewNotes && (
                                        <p className="text-sm text-gray-600 mt-2">
                                          <strong>Previous notes:</strong> {selectedSubmission.reviewNotes}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-2 mb-3">{submission.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {submission.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {submission.phone}
                        </span>
                      </div>

                      {submission.services.length > 0 && (
                        <div className="flex gap-1">
                          {submission.services.slice(0, 3).map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {submission.services.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{submission.services.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {filteredApprovedBusinesses.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No approved businesses found</h3>
                  <p className="text-gray-600">
                    {searchTerm ? "Try adjusting your search criteria." : "No businesses have been approved yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredApprovedBusinesses.map((business) => (
                <Card key={business.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{business.businessName}</h3>
                        <p className="text-gray-600 mb-2">{business.category}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {business.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {business.ownerName}
                          </span>
                          {business.rating && (
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {business.rating}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingBusiness(business)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Business</DialogTitle>
                              <DialogDescription>Update business information</DialogDescription>
                            </DialogHeader>

                            {editingBusiness && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-name">Business Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingBusiness.businessName}
                                      onChange={(e) =>
                                        setEditingBusiness({
                                          ...editingBusiness,
                                          businessName: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Input
                                      id="edit-category"
                                      value={editingBusiness.category}
                                      onChange={(e) =>
                                        setEditingBusiness({
                                          ...editingBusiness,
                                          category: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor="edit-description">Description</Label>
                                  <Textarea
                                    id="edit-description"
                                    value={editingBusiness.description}
                                    onChange={(e) =>
                                      setEditingBusiness({
                                        ...editingBusiness,
                                        description: e.target.value,
                                      })
                                    }
                                    rows={3}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-phone">Phone</Label>
                                    <Input
                                      id="edit-phone"
                                      value={editingBusiness.phone}
                                      onChange={(e) =>
                                        setEditingBusiness({
                                          ...editingBusiness,
                                          phone: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input
                                      id="edit-email"
                                      value={editingBusiness.email}
                                      onChange={(e) =>
                                        setEditingBusiness({
                                          ...editingBusiness,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => updateBusiness(editingBusiness.id, editingBusiness)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Save Changes
                                  </Button>
                                  <Button onClick={() => setEditingBusiness(null)} variant="outline">
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm" onClick={() => delistBusiness(business.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delist
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-2 mb-3">{business.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {business.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {business.phone}
                        </span>
                      </div>

                      {business.services.length > 0 && (
                        <div className="flex gap-1">
                          {business.services.slice(0, 3).map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {business.services.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{business.services.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
