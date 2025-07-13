"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, User, Mail, Phone, Globe, DollarSign, Users, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { EventSubmission } from "@/lib/types" // Assuming this type is defined
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

interface ReviewDialogProps {
  submission: EventSubmission
  onClose: () => void
  onApprove: (reason?: string) => Promise<void>
  onReject: (reason?: string) => Promise<void>
}

export function ReviewDialog({ submission, onClose, onApprove, onReject }: ReviewDialogProps) {
  const [reason, setReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApprove = async () => {
    setIsProcessing(true)
    setError(null)
    try {
      await onApprove(reason)
    } catch (err: any) {
      setError(err.message || "Failed to approve event.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    setIsProcessing(true)
    setError(null)
    try {
      await onReject(reason)
    } catch (err: any) {
      setError(err.message || "Failed to reject event.")
    } finally {
      setIsProcessing(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-NZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const displayPrice = submission.is_free ? "Free" : `NZD $${submission.registration_fee?.toFixed(2)}`
  const displayAttendees = submission.max_participants
    ? `${submission.current_participants || 0}/${submission.max_participants} attending`
    : `${submission.current_participants || 0} attending`

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Event Submission</DialogTitle>
          <DialogDescription>
            Review the details of this event submission and decide to approve or reject.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
              <Image
                src={
                  submission.image_url ||
                  submission.image_urls?.[0] ||
                  "/placeholder.svg?height=192&width=768&query=event"
                }
                alt={submission.title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">Pending</Badge>
              <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900">{submission.event_type}</Badge>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">{submission.title}</h3>
            <p className="text-gray-600">{submission.description}</p>

            {submission.full_description && (
              <div className="space-y-2">
                <h4 className="font-semibold">Full Description:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{submission.full_description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>Date:</strong> {formatDate(submission.start_date)}
                    {submission.end_date &&
                      submission.start_date !== submission.end_date &&
                      ` - ${formatDate(submission.end_date)}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>Time:</strong> {submission.start_time}{" "}
                    {submission.end_time ? `- ${submission.end_time}` : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>Location:</strong> {submission.location}, {submission.city}
                  </span>
                </div>
                {submission.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>
                      <strong>Address:</strong> {submission.address}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>Price:</strong> {displayPrice}
                  </span>
                </div>
                {submission.max_participants && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>
                      <strong>Attendees:</strong> {displayAttendees}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>Organizer:</strong> {submission.organizer_name || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>Email:</strong> {submission.organizer_email || "N/A"}
                  </span>
                </div>
                {submission.organizer_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>
                      <strong>Phone:</strong> {submission.organizer_phone}
                    </span>
                  </div>
                )}
                {submission.organizer_website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <Link
                      href={submission.organizer_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-orange-600"
                    >
                      Visit Website
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>Submitted by:</strong> {submission.submitter_email || "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            {submission.requirements && (
              <div className="space-y-2">
                <h4 className="font-semibold">Requirements/What to Know:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{submission.requirements}</p>
              </div>
            )}

            {submission.features && submission.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {submission.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {submission.image_urls && submission.image_urls.length > 1 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Additional Images:</h4>
                <div className="flex flex-wrap gap-2">
                  {submission.image_urls.map((url, index) => (
                    <div key={index} className="relative w-24 h-16 rounded-md overflow-hidden">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`Event image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reason">Reason (Optional, for rejection)</Label>
              <Textarea
                id="reason"
                placeholder="Provide a reason for approval or rejection..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleReject} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Rejecting...
              </>
            ) : (
              "Reject"
            )}
          </Button>
          <Button onClick={handleApprove} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Approving...
              </>
            ) : (
              "Approve"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
