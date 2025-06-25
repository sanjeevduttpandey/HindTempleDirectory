"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Phone, Globe, Star } from "lucide-react"
import { StaticHeader } from "@/components/static-header"

const businessCategories = [
  "All Categories",
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

const sampleBusinesses = [
  {
    id: 1,
    name: "Spice Palace Indian Grocery",
    category: "Grocery & Spices",
    description: "Authentic Indian spices, vegetables, and specialty items",
    location: "Auckland Central",
    phone: "+64 9 123 4567",
    website: "www.spicepalace.co.nz",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Spice+Palace",
  },
  {
    id: 2,
    name: "Maharaja Restaurant",
    category: "Restaurants & Food",
    description: "Traditional North Indian cuisine and vegetarian specialties",
    location: "Wellington",
    phone: "+64 4 987 6543",
    website: "www.maharaja.co.nz",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300&text=Maharaja+Restaurant",
  },
  {
    id: 3,
    name: "Ayurveda Wellness Centre",
    category: "Health & Wellness",
    description: "Traditional Ayurvedic treatments and consultations",
    location: "Christchurch",
    phone: "+64 3 456 7890",
    website: "www.ayurvedanz.co.nz",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300&text=Ayurveda+Centre",
  },
  {
    id: 4,
    name: "Sanskrit Learning Academy",
    category: "Education & Tutoring",
    description: "Sanskrit language classes and Hindu philosophy courses",
    location: "Auckland North Shore",
    phone: "+64 9 234 5678",
    website: "www.sanskritacademy.co.nz",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300&text=Sanskrit+Academy",
  },
  {
    id: 5,
    name: "Devi Sarees & Jewelry",
    category: "Clothing & Jewelry",
    description: "Beautiful Indian sarees, lehengas, and traditional jewelry",
    location: "Hamilton",
    phone: "+64 7 345 6789",
    website: "www.devisarees.co.nz",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=Devi+Sarees",
  },
  {
    id: 6,
    name: "Om Shanti Event Planning",
    category: "Event Services",
    description: "Hindu wedding planning and religious ceremony coordination",
    location: "Auckland",
    phone: "+64 9 567 8901",
    website: "www.omshantievents.co.nz",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300&text=Om+Shanti+Events",
  },
]

export default function BusinessDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")

  const filteredBusinesses = sampleBusinesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || business.category === selectedCategory
    const matchesLocation = selectedLocation === "All Locations" || business.location.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

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
            Showing {filteredBusinesses.length} businesses
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
                  src={business.image || "/placeholder.svg"}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{business.name}</CardTitle>
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
                <CardDescription className="mb-4">{business.description}</CardDescription>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{business.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{business.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <a
                      href={`https://${business.website}`}
                      className="text-orange-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {business.website}
                    </a>
                  </div>
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

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Own a Hindu Business?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join our directory and connect with the Hindu community across New Zealand
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Register Your Business
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
