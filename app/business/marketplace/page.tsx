"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Phone, Globe, Star, Mail, Loader2, AlertCircle, ShoppingBag } from "lucide-react"
import StaticHeader from "@/components/static-header"
import Link from "next/link"
import Image from "next/image"

interface MarketplaceBusiness {
  id: string
  businessName: string
  category: string
  description: string
  city: string
  phone: string
  email: string
  website?: string
  services: string[]
  specialOffers?: string
  rating: number
  images?: string[]
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [businesses, setBusinesses] = useState<MarketplaceBusiness[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    "All Categories",
    "Restaurants & Food",
    "Grocery & Spices",
    "Clothing & Jewelry",
    "Religious Items",
    "IT",
    "Health & Wellness",
    "Arts & Culture",
    "Professional Services",
  ]

  useEffect(() => {
    fetchMarketplaceBusinesses()
  }, [])

  const fetchMarketplaceBusinesses = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/business/approved")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        // Filter for businesses that offer products/services suitable for marketplace
        const marketplaceCategories = [
          "Restaurants & Food",
          "Grocery & Spices",
          "Clothing & Jewelry",
          "Religious Items",
          "IT",
          "Health & Wellness",
          "Arts & Culture",
        ]
        const filtered = result.data.filter((business: any) => marketplaceCategories.includes(business.category))
        setBusinesses(filtered)
      } else {
        throw new Error(result.message || "Failed to fetch businesses")
      }
    } catch (err: any) {
      console.error("Error fetching marketplace businesses:", err)
      setError(err.message || "Failed to load marketplace")
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

    const matchesCategory = selectedCategory === "All Categories" || business.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading marketplace...</p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Marketplace</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={fetchMarketplaceBusinesses} className="bg-orange-600 hover:bg-orange-700">
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
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border border-orange-200 mb-4">
            <ShoppingBag className="h-4 w-4 text-orange-700" />
            <span className="text-sm font-medium text-orange-800">Sanatan Marketplace</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sanatan Business Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover products and services from Sanatan businesses. Support our community by shopping local and
            connecting with businesses that share our values.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products & services..."
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-orange-600 hover:bg-orange-700">Search Marketplace</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? "es" : ""} offering products & services
          {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
        </div>

        {/* Marketplace Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={business.images?.[0] || "/placeholder.svg?height=200&width=300&query=Business"}
                  alt={business.businessName}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?key=xqfcs"
                  }}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-600">{business.category}</Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{business.businessName}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{business.rating}</span>
                  </div>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  {business.city}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{business.description}</p>

                {business.services && business.services.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Products & Services:</h4>
                    <div className="flex flex-wrap gap-1">
                      {business.services.slice(0, 3).map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {business.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{business.services.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {business.specialOffers && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-sm font-medium text-green-800 mb-1">Special Offer</h4>
                    <p className="text-xs text-green-700">{business.specialOffers}</p>
                  </div>
                )}

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{business.phone}</span>
                  </div>

                  {business.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <a href={`mailto:${business.email}`} className="text-orange-600 hover:underline truncate">
                        {business.email}
                      </a>
                    </div>
                  )}

                  {business.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 flex-shrink-0" />
                      <a
                        href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                        className="text-orange-600 hover:underline truncate"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Store
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
                    <a href={`tel:${business.phone}`}>Contact</a>
                  </Button>
                  {business.website && (
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a
                        href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Store
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or check back later for new marketplace listings.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All Categories")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Featured Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(1, 5).map((category) => (
              <Card
                key={category}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCategory(category)}
              >
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium text-gray-900">{category}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {businesses.filter((b) => b.category === category).length} businesses
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Sell Your Products & Services</h2>
            <p className="text-lg mb-6 opacity-90">
              Join our marketplace and reach thousands of Sanatan community members across New Zealand
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link href="/business/register">List Your Business</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
