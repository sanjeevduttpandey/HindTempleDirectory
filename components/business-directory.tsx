"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Phone, Globe, Star, Mail, Facebook, Instagram, Twitter, Loader2 } from "lucide-react"
import StaticHeader from "@/components/static-header"
import Link from "next/link"
import Image from "next/image" // Import Image component

/* ---------- CATEGORY OPTIONS ---------- */
const businessCategories = [
  "All Categories",
  "Arts & Culture",
  "Beauty & Salon",
  "Cleaning Services",
  "Clothing & Jewelry",
  "Education & Tutoring",
  "Event Services",
  "Grocery & Spices",
  "Health & Wellness",
  "IT",
  "Professional Services",
  "Religious Items",
  "Restaurants & Food",
  "Travel & Tourism",
]

/* ---------- DATA TYPES ---------- */
interface ApprovedBusiness {
  id: string
  business_name: string // Changed to match database column
  category: string
  description: string
  address: string
  city: string
  phone: string
  email: string
  website?: string
  owner_name: string // Changed to match database column
  services: string[]
  operating_hours?: string // Changed to match database column
  special_offers?: string // Changed to match database column
  rating: number
  images?: string[] // Changed to match database column
  social_media?: {
    // Added social_media
    facebook?: string
    instagram?: string
    x?: string
  }
  // Removed established, founder, owner, specialties as they are not in BusinessSubmission
}

/* ---------- COMPONENT ---------- */
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

  /* -- API FETCH ------------------------------------------------------- */
  const fetchApprovedBusinesses = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/business/approved")
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)

      const result = await response.json()

      if (result.success) {
        // Transform data to match the ApprovedBusiness interface if necessary
        // Assuming the API now returns data directly matching the database columns
        setBusinesses(result.data)
      } else {
        throw new Error(result.message || "Failed to fetch businesses")
      }
    } catch (err: any) {
      console.error("Error fetching businesses:", err)
      setError(err.message || "Failed to load businesses")
    } finally {
      setLoading(false)
    }
  }

  /* -- FILTER RESULTS -------------------------------------------------- */
  const filtered = businesses.filter((b) => {
    const term = searchTerm.toLowerCase()

    // Safely normalise strings, defaulting to ""
    const businessName = (b.business_name ?? "").toLowerCase()
    const description = (b.description ?? "").toLowerCase()
    const category = b.category ?? ""
    const city = b.city ?? ""
    const services = b.services?.map((s) => s?.toLowerCase()) || [] // Ensure services are lowercased and handled safely

    const matchesSearch =
      businessName.includes(term) || description.includes(term) || services.some((s) => s.includes(term))

    const matchesCategory = selectedCategory === "All Categories" || category === selectedCategory

    const matchesLocation = selectedLocation === "All Locations" || city.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

  /* -------------------- RENDER --------------------------------------- */
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <Loader2 className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4" />
          <p>Loading businesses...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
          <Button onClick={fetchApprovedBusinesses} className="bg-orange-600">
            Try Again
          </Button>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        {/* ----------- HEADER ----------- */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sanatan Business Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and support Sanatan-owned businesses across New Zealand. From authentic restaurants to spiritual
            services, find what you need in our community.
          </p>
        </div>

        {/* ----------- SEARCH + FILTERS ----------- */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {businessCategories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location */}
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

              <Button className="bg-orange-600">Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* ----------- RESULTS COUNT ----------- */}
        <div className="mb-6 text-gray-600">
          Showing {filtered.length} business{filtered.length !== 1 && "es"}
          {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
          {selectedLocation !== "All Locations" && ` in ${selectedLocation}`}
        </div>

        {/* ----------- LISTINGS GRID ----------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <Card key={b.id} className="hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={b.images?.[0] || "/placeholder.svg?height=200&width=300&query=Business%20Image"}
                  alt={b.business_name}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/modern-office-collaboration.png"
                  }}
                />
              </div>

              {/* Card body */}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{b.business_name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{b.rating}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {b.category}
                </Badge>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4">{b.description}</CardDescription>

                {b.services && b.services.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {b.services.map((s, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{b.city}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{b.phone}</span>
                  </div>

                  {b.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${b.email}`} className="text-orange-600 hover:underline">
                        {b.email}
                      </a>
                    </div>
                  )}

                  {b.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a
                        href={b.website.startsWith("http") ? b.website : `https://${b.website}`}
                        className="text-orange-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {b.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {b.social_media && (
                    <div className="flex items-center gap-2">
                      {b.social_media.facebook && (
                        <Link href={b.social_media.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-4 w-4 text-muted-foreground hover:text-primary" />
                        </Link>
                      )}
                      {b.social_media.instagram && (
                        <Link href={b.social_media.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4 text-muted-foreground hover:text-primary" />
                        </Link>
                      )}
                      {b.social_media.x && (
                        <Link href={b.social_media.x} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4 text-muted-foreground hover:text-primary" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  {b.email ? (
                    <Button size="sm" className="flex-1 bg-orange-600" asChild>
                      <a href={`mailto:${b.email}`}>Contact</a>
                    </Button>
                  ) : b.phone ? (
                    <Button size="sm" className="flex-1 bg-orange-600" asChild>
                      <a href={`tel:${b.phone}`}>Contact</a>
                    </Button>
                  ) : (
                    <Button size="sm" className="flex-1 bg-orange-600" disabled>
                      Contact
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href={`/business/directory/${b.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ----------- EMPTY STATE ----------- */}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No businesses found</h3>
            <p>Try adjusting your search criteria or check back later.</p>
          </div>
        )}

        {/* ----------- CTA ----------- */}
        <Card className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Own a Sanatan Business?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join our directory and connect with the Sanatan community across New Zealand
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
