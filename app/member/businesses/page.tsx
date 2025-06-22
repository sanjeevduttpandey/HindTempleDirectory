"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Star, Clock, Search, Heart, Share2, ExternalLink, Users, Verified } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample Hindu business data from New Zealand
const businessData = [
  {
    id: 1,
    name: "Spice Palace Indian Restaurant",
    category: "Restaurant",
    subcategory: "North Indian",
    description:
      "Authentic North Indian cuisine with traditional recipes passed down through generations. Specializing in tandoor dishes and vegetarian options.",
    owner: "Rajesh & Priya Sharma",
    address: "123 Queen Street, Auckland CBD",
    city: "Auckland",
    phone: "+64 9 123 4567",
    email: "info@spicepalace.co.nz",
    website: "www.spicepalace.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Spice+Palace",
    rating: 4.8,
    reviews: 245,
    established: "2015",
    specialties: ["Tandoor Dishes", "Vegetarian", "Halal", "Catering"],
    hours: "Mon-Sun: 11:00 AM - 10:00 PM",
    verified: true,
    memberSince: "2023",
    featured: true,
  },
  {
    id: 2,
    name: "Ganesh Grocery & Spices",
    category: "Grocery",
    subcategory: "Indian Groceries",
    description:
      "Your one-stop shop for authentic Indian groceries, spices, and religious items. Fresh vegetables and specialty items imported directly from India.",
    owner: "Suresh Patel",
    address: "456 Dominion Road, Mt Eden",
    city: "Auckland",
    phone: "+64 9 234 5678",
    email: "ganeshgrocery@gmail.com",
    website: "www.ganeshgrocery.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Ganesh+Grocery",
    rating: 4.6,
    reviews: 189,
    established: "2010",
    specialties: ["Fresh Spices", "Religious Items", "Fresh Vegetables", "Ayurvedic Products"],
    hours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
    verified: true,
    memberSince: "2023",
    featured: false,
  },
  {
    id: 3,
    name: "Dr. Anjali Mehta - Ayurvedic Clinic",
    category: "Healthcare",
    subcategory: "Ayurveda",
    description:
      "Certified Ayurvedic practitioner offering traditional healing methods, herbal treatments, and wellness consultations.",
    owner: "Dr. Anjali Mehta",
    address: "789 Remuera Road, Remuera",
    city: "Auckland",
    phone: "+64 9 345 6789",
    email: "dr.mehta@ayurveda.co.nz",
    website: "www.mehtaayurveda.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Ayurvedic+Clinic",
    rating: 4.9,
    reviews: 156,
    established: "2018",
    specialties: ["Panchakarma", "Herbal Medicine", "Wellness Consultation", "Yoga Therapy"],
    hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM",
    verified: true,
    memberSince: "2023",
    featured: true,
  },
  {
    id: 4,
    name: "Bollywood Dance Academy",
    category: "Education",
    subcategory: "Dance & Arts",
    description:
      "Learn traditional and modern Indian dance forms including Bharatanatyam, Bollywood, and Bhangra. Classes for all ages and skill levels.",
    owner: "Kavita Singh",
    address: "321 Great South Road, Epsom",
    city: "Auckland",
    phone: "+64 9 456 7890",
    email: "info@bollywooddance.co.nz",
    website: "www.bollywooddanceacademy.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Dance+Academy",
    rating: 4.7,
    reviews: 98,
    established: "2016",
    specialties: ["Bharatanatyam", "Bollywood Dance", "Bhangra", "Kids Classes"],
    hours: "Mon-Fri: 4:00 PM - 9:00 PM, Sat-Sun: 10:00 AM - 6:00 PM",
    verified: true,
    memberSince: "2023",
    featured: false,
  },
  {
    id: 5,
    name: "Maharaja Catering Services",
    category: "Services",
    subcategory: "Catering",
    description:
      "Premium Indian catering for weddings, festivals, and corporate events. Specializing in authentic vegetarian and non-vegetarian Indian cuisine.",
    owner: "Vikram & Sunita Gupta",
    address: "654 Sandringham Road, Sandringham",
    city: "Auckland",
    phone: "+64 9 567 8901",
    email: "bookings@maharajacatering.co.nz",
    website: "www.maharajacatering.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Maharaja+Catering",
    rating: 4.8,
    reviews: 167,
    established: "2012",
    specialties: ["Wedding Catering", "Festival Events", "Corporate Catering", "Vegetarian Specialist"],
    hours: "By Appointment Only",
    verified: true,
    memberSince: "2023",
    featured: true,
  },
  {
    id: 6,
    name: "Sari Palace Fashion",
    category: "Retail",
    subcategory: "Clothing & Jewelry",
    description:
      "Exquisite collection of traditional Indian clothing, jewelry, and accessories. Specializing in bridal wear and festival outfits.",
    owner: "Meera Joshi",
    address: "987 New North Road, Kingsland",
    city: "Auckland",
    phone: "+64 9 678 9012",
    email: "info@saripalace.co.nz",
    website: "www.saripalace.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Sari+Palace",
    rating: 4.5,
    reviews: 134,
    established: "2014",
    specialties: ["Bridal Wear", "Festival Outfits", "Traditional Jewelry", "Custom Tailoring"],
    hours: "Tue-Sat: 10:00 AM - 7:00 PM, Sun: 11:00 AM - 5:00 PM",
    verified: true,
    memberSince: "2023",
    featured: false,
  },
  {
    id: 7,
    name: "Vedic Astrology Consultations",
    category: "Services",
    subcategory: "Astrology",
    description:
      "Traditional Vedic astrology readings, birth chart analysis, and spiritual guidance by certified Jyotish practitioner.",
    owner: "Pandit Ramesh Shastri",
    address: "159 Hillsborough Road, Hillsborough",
    city: "Auckland",
    phone: "+64 9 789 0123",
    email: "panditji@vedicastrology.co.nz",
    website: "www.vedicastrology.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Vedic+Astrology",
    rating: 4.9,
    reviews: 89,
    established: "2019",
    specialties: ["Birth Chart Reading", "Marriage Compatibility", "Career Guidance", "Gemstone Consultation"],
    hours: "Mon-Sat: 10:00 AM - 6:00 PM",
    verified: true,
    memberSince: "2023",
    featured: false,
  },
  {
    id: 8,
    name: "Himalayan Sweets & Snacks",
    category: "Restaurant",
    subcategory: "Sweets & Snacks",
    description:
      "Traditional Indian sweets, snacks, and chaats made fresh daily. Perfect for festivals, celebrations, and everyday treats.",
    owner: "Deepak & Asha Agarwal",
    address: "753 Mt Albert Road, Three Kings",
    city: "Auckland",
    phone: "+64 9 890 1234",
    email: "orders@himalayansweets.co.nz",
    website: "www.himalayansweets.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Himalayan+Sweets",
    rating: 4.6,
    reviews: 203,
    established: "2011",
    specialties: ["Fresh Sweets", "Chaat Items", "Festival Specials", "Custom Orders"],
    hours: "Daily: 10:00 AM - 9:00 PM",
    verified: true,
    memberSince: "2023",
    featured: false,
  },
  {
    id: 9,
    name: "Lotus Beauty & Wellness Spa",
    category: "Services",
    subcategory: "Beauty & Wellness",
    description:
      "Holistic beauty and wellness treatments inspired by ancient Indian traditions. Offering Ayurvedic massages, facials, and wellness therapies.",
    owner: "Ritu Sharma",
    address: "246 Ponsonby Road, Ponsonby",
    city: "Auckland",
    phone: "+64 9 901 2345",
    email: "bookings@lotusspa.co.nz",
    website: "www.lotusbeautywellness.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Lotus+Spa",
    rating: 4.7,
    reviews: 142,
    established: "2017",
    specialties: ["Ayurvedic Massage", "Herbal Facials", "Meditation Sessions", "Wellness Packages"],
    hours: "Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    verified: true,
    memberSince: "2023",
    featured: true,
  },
  {
    id: 10,
    name: "Ganga Music Academy",
    category: "Education",
    subcategory: "Music",
    description:
      "Learn classical Indian music including vocal, tabla, sitar, and harmonium. Traditional guru-shishya teaching method with modern techniques.",
    owner: "Ustad Harish Kumar",
    address: "135 Blockhouse Bay Road, Blockhouse Bay",
    city: "Auckland",
    phone: "+64 9 012 3456",
    email: "info@gangamusic.co.nz",
    website: "www.gangamusicacademy.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Music+Academy",
    rating: 4.8,
    reviews: 76,
    established: "2020",
    specialties: ["Classical Vocal", "Tabla", "Sitar", "Harmonium"],
    hours: "Mon-Fri: 4:00 PM - 8:00 PM, Sat-Sun: 10:00 AM - 6:00 PM",
    verified: true,
    memberSince: "2023",
    featured: false,
  },
  // Wellington businesses
  {
    id: 11,
    name: "Curry Express Wellington",
    category: "Restaurant",
    subcategory: "South Indian",
    description:
      "Authentic South Indian cuisine featuring dosas, idlis, and traditional curries. Family-owned restaurant serving Wellington for over a decade.",
    owner: "Ravi & Lakshmi Krishnan",
    address: "78 Courtenay Place, Wellington",
    city: "Wellington",
    phone: "+64 4 123 4567",
    email: "info@curryexpress.co.nz",
    website: "www.curryexpresswellington.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Curry+Express",
    rating: 4.5,
    reviews: 198,
    established: "2013",
    specialties: ["Dosas", "South Indian Thali", "Vegetarian Options", "Lunch Specials"],
    hours: "Mon-Sun: 11:30 AM - 9:30 PM",
    verified: true,
    memberSince: "2023",
    featured: false,
  },
  {
    id: 12,
    name: "Christchurch Spice Market",
    category: "Grocery",
    subcategory: "Indian Groceries",
    description:
      "Comprehensive Indian grocery store serving the South Island. Fresh produce, spices, and specialty items with home delivery available.",
    owner: "Amit & Pooja Shah",
    address: "234 Riccarton Road, Riccarton",
    city: "Christchurch",
    phone: "+64 3 234 5678",
    email: "orders@spicemarket.co.nz",
    website: "www.christchurchspicemarket.co.nz",
    image: "/placeholder.svg?height=200&width=300&text=Spice+Market",
    rating: 4.7,
    reviews: 156,
    established: "2016",
    specialties: ["Home Delivery", "Fresh Produce", "Bulk Spices", "Religious Items"],
    hours: "Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    verified: true,
    memberSince: "2023",
    featured: false,
  },
]

const categories = ["All Categories", "Restaurant", "Grocery", "Healthcare", "Education", "Services", "Retail"]

const cities = ["All Cities", "Auckland", "Wellington", "Christchurch", "Hamilton", "Dunedin"]

export default function BusinessListingsPage() {
  const [businesses, setBusinesses] = useState(businessData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    let filtered = businessData

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((business) => business.category === selectedCategory)
    }

    // Filter by city
    if (selectedCity !== "All Cities") {
      filtered = filtered.filter((business) => business.city === selectedCity)
    }

    // Sort businesses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setBusinesses(filtered)
  }, [searchTerm, selectedCategory, selectedCity, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="h-8 w-8 text-orange-600 mr-3" />
                Hindu Business Directory
              </h1>
              <p className="text-gray-600 mt-2">Discover and support Hindu-owned businesses across New Zealand</p>
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Members Only
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{businessData.length}</div>
                <div className="text-sm text-gray-600">Total Businesses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{businessData.filter((b) => b.verified).length}</div>
                <div className="text-sm text-gray-600">Verified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{businessData.filter((b) => b.featured).length}</div>
                <div className="text-sm text-gray-600">Featured</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
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
                {categories.map((category) => (
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Business Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={business.image || "/placeholder.svg"}
                  alt={business.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {business.featured && <Badge className="absolute top-2 left-2 bg-orange-600">Featured</Badge>}
                {business.verified && (
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    <Verified className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{business.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">
                        {business.category}
                      </Badge>
                      {business.subcategory}
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{business.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({business.reviews})</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">{business.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{business.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{business.hours}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {business.specialties.slice(0, 3).map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {business.specialties.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{business.specialties.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/member/businesses/${business.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {businesses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No businesses found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">List Your Business</h3>
            <p className="text-gray-600 mb-6">
              Join our growing community of Hindu businesses and connect with customers across New Zealand
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/member/businesses/add">Add Your Business</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
