import { getBusinessSubmissionById } from "@/lib/business-storage"
import StaticHeader from "@/components/static-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BusinessDetailPageProps {
  params: {
    id: string
  }
}

export default async function BusinessDetailPage({ params }: BusinessDetailPageProps) {
  const { id } = params
  const { data: business, error } = await getBusinessSubmissionById(id)

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error.message || "Failed to load business details."}
          </div>
          <Button asChild variant="outline">
            <Link href="/business/directory">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            Business not found.
          </div>
          <Button asChild variant="outline">
            <Link href="/business/directory">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StaticHeader />
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6 bg-transparent">
          <Link href="/business/directory">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
          </Link>
        </Button>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            {business.images && business.images.length > 0 && (
              <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden">
                <Image
                  src={business.images[0] || "/placeholder.svg?height=400&width=600&query=Business%20Detail%20Image"}
                  alt={business.business_name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <CardTitle className="text-3xl font-bold">{business.business_name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{business.category}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 text-base">{business.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {business.address}, {business.city}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{business.email}</span>
                  </div>
                  {business.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Link
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Website
                      </Link>
                    </div>
                  )}
                  {business.social_media && (
                    <div className="flex items-center gap-2 mt-2">
                      {business.social_media.facebook && (
                        <Link href={business.social_media.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
                        </Link>
                      )}
                      {business.social_media.instagram && (
                        <Link href={business.social_media.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
                        </Link>
                      )}
                      {business.social_media.x && (
                        <Link href={business.social_media.x} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                {business.services && business.services.length > 0 && (
                  <>
                    <h3 className="font-semibold text-lg mb-2">Services Offered</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {business.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </>
                )}

                {business.operating_hours && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">Operating Hours</h3>
                    <p className="text-sm text-gray-700">{business.operating_hours}</p>
                  </div>
                )}

                {business.special_offers && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">Special Offers</h3>
                    <p className="text-sm text-gray-700">{business.special_offers}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
