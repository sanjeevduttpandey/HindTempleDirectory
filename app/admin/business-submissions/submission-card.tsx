"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, User, Calendar, Eye } from "lucide-react"
import type { JSX } from "react"

type Status = "pending" | "approved" | "rejected"

export interface BusinessSubmission {
  id: string
  businessName: string
  category: string
  description: string
  city: string
  ownerName: string
  email?: string | null
  phone?: string | null
  services?: string[] | null
  submittedAt: string
  status: Status
}

interface SubmissionCardProps {
  submission: BusinessSubmission
  openReview: () => void
  getStatusBadge: (status: Status) => JSX.Element
  formatDate: (iso: string) => string
}

export function SubmissionCard({ submission, openReview, getStatusBadge, formatDate }: SubmissionCardProps) {
  /* ---------- SAFETY: always work with an array ---------- */
  const services = Array.isArray(submission.services) ? submission.services : []

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Header row */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{submission.businessName}</h3>
            <p className="text-gray-600 mb-2">{submission.category}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
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
            <Button variant="outline" size="sm" onClick={openReview} className="gap-1 bg-transparent">
              <Eye className="h-4 w-4" />
              Review
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-2 mb-3">{submission.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {submission.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {submission.email}
              </span>
            )}
            {submission.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {submission.phone}
              </span>
            )}
          </div>

          {services.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {services.slice(0, 3).map((s) => (
                <Badge key={s} variant="secondary" className="text-xs">
                  {s}
                </Badge>
              ))}
              {services.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{services.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
