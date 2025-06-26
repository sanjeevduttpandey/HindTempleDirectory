"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Phone, Globe, Star, Mail } from "lucide-react"
import StaticHeader from "@/components/static-header"
import Link from "next/link"

const businessCategories = [
  "All Categories",
  "Arts & Culture",
  "Cleaning Services",
  "Restaurants & Food",
  "Grocery & Spices",
  "Clothing & Jewelry",
  "Health & Wellness",
  "Education & Tutoring",
  "Professional Services",
  "Beauty & Salon",
  "Travel & Tourism",
  "Religious Items",
  "Event Services",
]

interface ApprovedBusiness {
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
  services: string[]
  operatingHours?: string
  specialOffers?: string
  rating: number
  image?: string
  images?: string[]
  established?: string
  founder?: string
  owner?: string
  specialties?: string[]
}

export default function BusinessDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [businesses, setBusinesses] = useState<ApprovedBusiness[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchApprovedBusinesses()
  }, [])

  const fetchApprovedBusinesses = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/business/approved")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        // Transform the data to match the expected format
        const transformedBusinesses = result.data.map((business: any) => ({
          ...business,
          location: `${business.address}, ${business.city}`,
          specialties: business.services,
          // Handle both single image and multiple images
          image: business.images?.[0] || business.image,
          images: business.images || (business.image ? [business.image] : []),
        }))
        setBusinesses(transformedBusinesses)
      } else {
        throw new Error(result.message || "Failed to fetch businesses")
      }
    } catch (error: any) {
      console.error("Error fetching businesses:", error)
      setError(error.message || "Failed to load businesses")
    } finally {
      setLoading(false)
    }
  }

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (business.specialties &&
        business.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())))
    const matchesCategory = selectedCategory === "All Categories" || business.category === selectedCategory
    const matchesLocation = selectedLocation === "All Locations" || business.city.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p>Loading businesses...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Error:</strong> {error}
            </div>
            <Button onClick={fetchApprovedBusinesses} className="bg-orange-600 hover:bg-orange-700">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hindu Business Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and support Hindu-owned businesses across New Zealand. From authentic restaurants to spiritual
            services, find what you need in our community.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {businessCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Locations">All Locations</SelectItem>
                  <SelectItem value="Auckland">Auckland</SelectItem>
                  <SelectItem value="Wellington">Wellington</SelectItem>
                  <SelectItem value="Christchurch">Christchurch</SelectItem>
                  <SelectItem value="Hamilton">Hamilton</SelectItem>
                  <SelectItem value="Tauranga">Tauranga</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-orange-600 hover:bg-orange-700">Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? "es" : ""}
            {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
            {selectedLocation !== "All Locations" && ` in ${selectedLocation}`}
          </p>
        </div>

        {/* Business Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={
                    business.images?.[0] ||
                    business.image ||
                    "/placeholder.svg?height=200&width=300&text=Business+Image"
                  }
                  alt={business.businessName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=300&text=Business+Image"
                  }}
                />
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{business.businessName}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{business.rating}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {business.category}
                </Badge>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4">
                  {business.description}
                  {business.established && (
                    <div className="mt-2 text-sm text-orange-600 font-medium">
                      Established: {business.established} • Founded by: {business.founder}
                    </div>
                  )}
                  {business.owner && !business.established && (
                    <div className="mt-2 text-sm text-orange-600 font-medium">Owner: {business.owner}</div>
                  )}
                </CardDescription>

                {business.specialties && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {business.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{business.city}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{business.phone}</span>
                  </div>

                  {business.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${business.email}`} className="text-orange-600 hover:underline">
                        {business.email}
                      </a>
                    </div>
                  )}

                  {business.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a
                        href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                        className="text-orange-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {business.website.replace("https://", "").replace("http://", "")}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Contact
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBusinesses.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium">No businesses found</h3>
              <p>Try adjusting your search criteria or check back later for new listings.</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Own a Hindu Business?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join our directory and connect with the Hindu community across New Zealand
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link href="/business/register">Register Your Business</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
