"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, User, Mail, Eye } from "lucide-react"
import Image from "next/image"
import type { EventSubmission } from "@/lib/types" // Assuming this type is defined

interface SubmissionCardProps {
  submission: EventSubmission
  onReview: (submission: EventSubmission) => void
}

export function SubmissionCard({ submission, onReview }: SubmissionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="relative pb-0">
        <div className="relative h-32 w-full rounded-t-lg overflow-hidden">
          <Image
            src={
              submission.image_url || submission.image_urls?.[0] || "/placeholder.svg?height=128&width=256&query=event"
            }
            alt={submission.title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900">{submission.event_type}</Badge>
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">Pending</Badge>
        </div>
        <div className="pt-4">
          <CardTitle className="text-xl font-bold">{submission.title}</CardTitle>
          <CardDescription className="text-sm text-gray-600 mt-1">
            Submitted by: {submission.submitter_email || submission.organizer_name || "N/A"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-3 text-sm text-gray-700">
        <p className="line-clamp-3">{submission.description}</p>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>
            {formatDate(submission.start_date)}
            {submission.end_date &&
              submission.start_date !== submission.end_date &&
              ` - ${formatDate(submission.end_date)}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>
            {submission.start_time} {submission.end_time ? `- ${submission.end_time}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>
            {submission.location}, {submission.city}
          </span>
        </div>
        {submission.organizer_name && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span>Organizer: {submission.organizer_name}</span>
          </div>
        )}
        {submission.organizer_email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{submission.organizer_email}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end p-4 border-t">
        <Button onClick={() => onReview(submission)}>
          <Eye className="h-4 w-4 mr-2" />
          Review
        </Button>
      </CardFooter>
    </Card>
  )
}
