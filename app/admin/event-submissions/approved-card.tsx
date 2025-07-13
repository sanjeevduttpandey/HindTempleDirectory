"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, User, Mail, Edit, Trash2, CheckCircle } from "lucide-react"
import Image from "next/image"
import type { EventSubmission } from "@/lib/types" // Assuming this type is defined

interface ApprovedCardProps {
  event: EventSubmission
  onEdit: (event: EventSubmission) => void
  onDelete: (eventId: number) => void
}

export function ApprovedCard({ event, onEdit, onDelete }: ApprovedCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const displayPrice = event.is_free ? "Free" : `NZD $${event.registration_fee?.toFixed(2)}`
  const displayAttendees = event.max_participants
    ? `${event.current_participants || 0}/${event.max_participants} attending`
    : `${event.current_participants || 0} attending`

  return (
    <Card className="flex flex-col">
      <CardHeader className="relative pb-0">
        <div className="relative h-32 w-full rounded-t-lg overflow-hidden">
          <Image
            src={event.image_url || event.image_urls?.[0] || "/placeholder.svg?height=128&width=256&query=event"}
            alt={event.title}
            fill
            className="object-cover"
          />
          {event.is_featured && <Badge className="absolute top-2 left-2 bg-orange-600 text-white">Featured</Badge>}
          <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900">{event.event_type}</Badge>
        </div>
        <div className="pt-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            {event.title}
            {event.status === "approved" && <CheckCircle className="h-5 w-5 text-green-500" />}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 mt-1">
            Submitted by: {event.submitter_email || event.organizer_name || "N/A"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-3 text-sm text-gray-700">
        <p className="line-clamp-3">{event.description}</p>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>
            {formatDate(event.start_date)}
            {event.end_date && event.start_date !== event.end_date && ` - ${formatDate(event.end_date)}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>
            {event.start_time} {event.end_time ? `- ${event.end_time}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>
            {event.location}, {event.city}
          </span>
        </div>
        {event.organizer_name && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span>Organizer: {event.organizer_name}</span>
          </div>
        )}
        {event.organizer_email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{event.organizer_email}</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-2 border-t mt-3">
          <span className="text-base font-bold text-orange-600">{displayPrice}</span>
          {event.max_participants && <span className="text-sm text-gray-500">{displayAttendees}</span>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4 border-t">
        <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(event.id)}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
