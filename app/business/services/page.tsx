"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Phone, Globe, Star, Mail, Loader2, AlertCircle, Briefcase, Clock } from "lucide-react"
import StaticHeader from "@/components/static-header"
import Link from "next/link"
import Image from "next/image"

interface ServiceBusiness {
  id: string
  businessName: string
  category: string
  description: string
  city: string
  phone: string
  email: string
  website?: string
  services: string[]
  operatingHours?: string
  rating: number
  images?: string[]
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Services")
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [businesses, setBusinesses] = useState<ServiceBusiness[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const serviceCategories = [
    "All Services",
    "Professional Services",
    "IT",
    "Health & Wellness",
    "Education & Tutoring",
    "Event Services",
    "Cleaning Services",
    "Beauty & Salon",
    "Travel & Tourism",
  ]

  const cities = ["All Cities", "Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga"]

  useEffect(() => {
    fetchServiceBusinesses()
  }, [])

  const fetchServiceBusinesses = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/business/approved")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        // Filter for service-based businesses
        const serviceCategories = [
          "Professional Services",
          "IT",
          "Health & Wellness",
          "Education & Tutoring",
          "Event Services",
          "Cleaning Services",
          "Beauty & Salon",
          "Travel & Tourism",
        ]
        const filtered = result.data.filter((business: any) => serviceCategories.includes(business.category))
        setBusinesses(filtered)
      } else {
        throw new Error(result.message || "Failed to fetch services")
      }
    } catch (err: any) {
      console.error("Error fetching service businesses:", err)
      setError(err.message || "Failed to load services")
    } finally {
      setLoading(false)
    }
  }

  const filteredBusinesses = businesses.filter((business) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      business.businessName.toLowerCase().includes(term) ||
      business.description.toLowerCase().includes(term) ||
      business.services?.some((s) => s.toLowerCase().includes(term))

    const matchesCategory = selectedCategory === "All Services" || business.category === selectedCategory
    const matchesCity = selectedCity === "All Cities" || business.city === selectedCity

    return matchesSearch && matchesCategory && matchesCity
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading services...</p>
            </div>
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
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Services</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={fetchServiceBusinesses} className="bg-orange-600 hover:bg-orange-700">
                  Try Again
                </Button>
              </CardContent>
            </Card>
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
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full border border-blue-200 mb-4">
            <Briefcase className="h-4 w-4 text-blue-700" />
            <span className="text-sm font-medium text-blue-800">Professional Services</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sanatan Business Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find professional services from trusted Sanatan business owners. From IT solutions to wellness services,
            connect with experts who understand your needs.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Service Category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-orange-600 hover:bg-orange-700">Find Services</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          {filteredBusinesses.length} service provider{filteredBusinesses.length !== 1 ? "s" : ""} found
          {selectedCategory !== "All Services" && ` in ${selectedCategory}`}
          {selectedCity !== "All Cities" && ` in ${selectedCity}`}
        </div>

        {/* Service Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <div className="flex">
                <div className="w-1/3 relative">
                  <div className="aspect-square relative overflow-hidden rounded-l-lg">
                    <Image
                      src={business.images?.[0] || "/placeholder.svg?height=200&width=200&query=Service"}
                      alt={business.businessName}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?key=services"
                      }}
                    />
                  </div>
                </div>

                <div className="w-2/3 flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-1">{business.businessName}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {business.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{business.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      {business.city}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>

                    {business.services && business.services.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {business.services.slice(0, 2).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {business.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{business.services.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {business.operatingHours && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                        <Clock className="h-3 w-3" />
                        <span className="truncate">{business.operatingHours}</span>
                      </div>
                    )}

                    <div className="space-y-1 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{business.phone}</span>
                      </div>

                      {business.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 flex-shrink-0" />
                          <a href={`mailto:${business.email}`} className="text-orange-600 hover:underline truncate">
                            {business.email}
                          </a>
                        </div>
                      )}

                      {business.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-3 w-3 flex-shrink-0" />
                          <a
                            href={
                              business.website.startsWith("http") ? business.website : `https://${business.website}`
                            }
                            className="text-orange-600 hover:underline truncate"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700 text-xs" asChild>
                        <a href={`tel:${business.phone}`}>Contact</a>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        Get Quote
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or check back later for new service providers.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All Services")
                setSelectedCity("All Cities")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Popular Services */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceCategories.slice(1, 4).map((category) => (
              <Card
                key={category}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCategory(category)}
              >
                <CardContent className="p-6 text-center">
                  <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                  <p className="text-sm text-gray-600">
                    {businesses.filter((b) => b.category === category).length} providers
                  </p>
                  <Button size="sm" variant="outline" className="mt-3">
                    View Services
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Offer Your Professional Services</h2>
            <p className="text-lg mb-6 opacity-90">
              Join our network of trusted service providers and grow your business within the Sanatan community
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/business/register">Register Your Services</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
