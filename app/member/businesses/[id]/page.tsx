"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Clock,
  Heart,
  Share2,
  Award,
  Verified,
  Calendar,
  Users,
  MessageCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

// Sample business detail data
const businessDetails = {
  1: {
    id: 1,
    name: "Spice Palace Indian Restaurant",
    category: "Restaurant",
    subcategory: "North Indian",
    description:
      "Authentic North Indian cuisine with traditional recipes passed down through generations. Our family-owned restaurant has been serving the Auckland community for over 8 years, bringing the rich flavors and aromas of India to New Zealand. We specialize in tandoor dishes, traditional curries, and an extensive vegetarian menu that caters to all dietary preferences.",
    owner: "Rajesh & Priya Sharma",
    address: "123 Queen Street, Auckland CBD",
    city: "Auckland",
    phone: "+64 9 123 4567",
    email: "info@spicepalace.co.nz",
    website: "www.spicepalace.co.nz",
    images: [
      "/placeholder.svg?height=400&width=600&text=Restaurant+Interior",
      "/placeholder.svg?height=400&width=600&text=Tandoor+Kitchen",
      "/placeholder.svg?height=400&width=600&text=Signature+Dishes",
      "/placeholder.svg?height=400&width=600&text=Dining+Area",
    ],
    rating: 4.8,
    reviews: 245,
    established: "2015",
    specialties: ["Tandoor Dishes", "Vegetarian", "Halal", "Catering"],
    hours: {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "11:00 AM - 11:00 PM",
      sunday: "11:00 AM - 10:00 PM",
    },
    verified: true,
    memberSince: "2023",
    featured: true,
    services: [
      "Dine-in Restaurant",
      "Takeaway Orders",
      "Catering Services",
      "Private Events",
      "Corporate Lunch",
      "Festival Catering",
    ],
    facilities: [
      "Air Conditioning",
      "Wheelchair Accessible",
      "Free WiFi",
      "Parking Available",
      "Family Friendly",
      "Halal Certified",
    ],
    story:
      "The Spice Palace was born from Rajesh and Priya Sharma's dream to share authentic North Indian flavors with New Zealand. Having immigrated from Punjab in 2014, they noticed a gap in truly authentic Indian cuisine in Auckland. With recipes passed down through three generations and a commitment to using traditional cooking methods, they opened Spice Palace in 2015. Today, it's become a beloved destination for both the Indian community and Kiwi food lovers seeking genuine Indian flavors.",
    awards: [
      "Best Indian Restaurant - Auckland Food Awards 2022",
      "Excellence in Service - Restaurant Association 2021",
      "Community Choice Award - Indian Business Awards 2020",
    ],
    reviews_sample: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment:
          "Absolutely amazing food! The butter chicken is the best I've had in Auckland. The staff are so friendly and welcoming.",
        date: "2 weeks ago",
      },
      {
        name: "Amit Patel",
        rating: 5,
        comment:
          "Finally found authentic North Indian food in Auckland! Reminds me of home. The naan is perfect and the dal makhani is outstanding.",
        date: "1 month ago",
      },
      {
        name: "Emma Wilson",
        rating: 4,
        comment:
          "Great vegetarian options and the atmosphere is lovely. Perfect for a family dinner. Will definitely be back!",
        date: "3 weeks ago",
      },
    ],
  },
  // Add more business details as needed
}

export default function BusinessDetailPage() {
  const params = useParams()
  const businessId = Number.parseInt(params.id as string)
  const business = businessDetails[businessId as keyof typeof businessDetails]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!business) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Not Found</h2>
            <p className="text-gray-600 mb-6">The business you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/member/businesses">Back to Directory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/member/businesses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Link>
        </Button>

        {/* Header Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative mb-6">
              <Image
                src={business.images[currentImageIndex] || "/placeholder.svg"}
                alt={business.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {business.featured && <Badge className="bg-orange-600">Featured</Badge>}
                {business.verified && (
                  <Badge className="bg-green-600">
                    <Verified className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {business.images.length}
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2 mb-6">
              {business.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${business.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline" className="text-sm">
                    {business.category}
                  </Badge>
                  <span className="text-gray-600">{business.subcategory}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{business.rating}</span>
                    <span className="text-gray-500 ml-1">({business.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{business.description}</p>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Owned by {business.owner}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    Established {business.established} • Member since {business.memberSince}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">{business.address}</div>
                    <div className="text-sm text-gray-600">{business.city}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-gray-500" />
                  <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                    {business.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gray-500" />
                  <a href={`mailto:${business.email}`} className="text-blue-600 hover:underline">
                    {business.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-3 text-gray-500" />
                  <a
                    href={`https://${business.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {business.website}
                  </a>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {business.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {business.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {business.awards && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-500" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {business.awards.map((award, index) => (
                      <li key={index} className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        {award}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Opening Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(business.hours).map(([day, hours]) => (
                    <div
                      key={day}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-medium capitalize">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {business.services.map((service, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Customer Reviews</span>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Write Review
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {business.reviews_sample.map((review, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-orange-600">{review.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-medium">{review.name}</div>
                              <div className="flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{business.story}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
