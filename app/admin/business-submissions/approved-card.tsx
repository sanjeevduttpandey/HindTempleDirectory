"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, User, Star, Edit, Trash2 } from "lucide-react"

export interface ApprovedBusiness {
  id: string
  businessName: string
  category: string
  description: string
  address: string // Added address
  city: string
  phone: string
  email: string
  website?: string | null
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  services?: string[] | null
  socialMedia?: {
    // Added socialMedia
    facebook?: string | null
    instagram?: string | null
    twitter?: string | null
  } | null
  operatingHours?: string | null // Added operatingHours
  specialOffers?: string | null // Added specialOffers
  rating?: number | null
  isActive?: boolean | null // Added isActive
  images?: string[] | null // Added images
  updatedAt?: string
}

interface ApprovedCardProps {
  business: ApprovedBusiness
  onEdit: () => void
  onDelist: () => void
  formatDate: (iso: string) => string
}

export function ApprovedCard({ business, onEdit, onDelist, formatDate }: ApprovedCardProps) {
  const services = Array.isArray(business.services) ? business.services : []
  const images = Array.isArray(business.images) ? business.images : []

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{business.businessName}</h3>
            <p className="text-gray-600 mb-2">{business.category}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
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
              {business.isActive === false && (
                <Badge variant="destructive" className="text-xs">
                  Inactive
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onEdit} className="gap-1 bg-transparent">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelist} className="gap-1">
              <Trash2 className="h-4 w-4" />
              Delist
            </Button>
          </div>
        </div>

        <p className="text-gray-700 text-sm line-clamp-2 mb-3">{business.description}</p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {business.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {business.email}
              </span>
            )}
            {business.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {business.phone}
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

        {images.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img || "/placeholder.svg"}
                alt={`Business image ${index + 1}`}
                className="h-16 w-16 object-cover rounded-md flex-shrink-0"
              />
            ))}
          </div>
        )}

        {business.updatedAt && (
          <p className="text-xs text-gray-400 mt-4">Last updated: {formatDate(business.updatedAt)}</p>
        )}
      </CardContent>
    </Card>
  )
}
