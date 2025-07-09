"use client"

import { useState, type Dispatch, type SetStateAction } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail } from "lucide-react"
import type { BusinessSubmission } from "./submission-card"

interface ReviewDialogProps {
  submission: BusinessSubmission
  reviewNotes: string
  setReviewNotes: Dispatch<SetStateAction<string>>
  close: () => void
  onApprove: () => void
  onReject: () => void
  onPending: () => void
}

export function ReviewDialog({
  submission,
  reviewNotes,
  setReviewNotes,
  close,
  onApprove,
  onReject,
  onPending,
}: ReviewDialogProps) {
  const [tab, setTab] = useState<"details" | "review">("details")

  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{submission.businessName}</DialogTitle>
          <DialogDescription>Review business registration details</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Business Details</TabsTrigger>
            <TabsTrigger value="review">Review &amp; Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {/* very condensed details view */}
            <div className="space-y-2 text-sm">
              <p>
                <strong>Category:</strong> {submission.category}
              </p>
              <p>
                <strong>Description:</strong> {submission.description}
              </p>
              <p>
                <strong>City:</strong> {submission.city}
              </p>
              <p className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {submission.phone}
              </p>
              <p className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {submission.email}
              </p>
            </div>

            {submission.services && submission.services.length > 0 && (
              <div className="space-y-1">
                <strong>Services:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {submission.services.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <Label htmlFor="review-notes">Review Notes</Label>
            <Textarea
              id="review-notes"
              placeholder="Add notes about your review decision…"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={4}
            />

            <div className="flex gap-2 flex-wrap">
              <Button onClick={onApprove} className="bg-green-600 hover:bg-green-700">
                Approve
              </Button>
              <Button onClick={onReject} variant="destructive">
                Reject
              </Button>
              <Button onClick={onPending} variant="outline">
                Mark as Pending
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
