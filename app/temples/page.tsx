"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const temples = [
  {
    id: 1,
    name: "Shri Sanatan Dharm Mandir",
    city: "Auckland",
    address: "98 Balmoral Road, Mount Eden",
    phone: "+64 9 630 5540",
    rating: 4.8,
    reviews: 120,
    image: "/images/shri-sanatan-dharm-mandir-auckland.jpg",
    description: "One of the largest Sanatan Mandir in New Zealand, serving the community since 1992.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Multi-deity",
    established: 1992,
    featured: true,
  },
  {
    id: 13,
    name: "Bharatiya Mandir",
    city: "Auckland",
    address: "252-254 Balmoral Road, Sandringham, Auckland 1024",
    phone: "+64 9 846 2677",
    rating: 4.7,
    reviews: 105,
    image: "/images/bharatiya-mandir-interior.jpg",
    description:
      "One of Auckland's oldest Sanatan Mandir, serving the community with traditional worship and cultural programs since 1987.",
    timings: "6:00 AM - 8:30 PM",
    deity: "Multi-deity",
    established: 1987,
    website: "https://www.bharatiyamandir.org.nz/",
    featured: true,
  },
  {
    id: 14,
    name: "Thiru Subramaniyar Aalayam",
    city: "Auckland",
    address: "69 Tidal Road, Mangere, Auckland 2022",
    phone: "+64 9 275 4500",
    rating: 4.8,
    reviews: 98,
    image: "/images/thiru-subramaniyar-aalayam-naga.jpg",
    description:
      "A beautiful Mandir dedicated to Lord Murugan, serving the Tamil Sanatan community in Auckland with traditional South Indian worship.",
    timings: "6:30 AM - 8:00 PM",
    deity: "Murugan",
    established: 1995,
    website: "https://www.thirusubramaniyar.org.nz/",
    featured: false,
  },
  {
    id: 15,
    name: "Auckland Sri Ganesh Mandir",
    city: "Auckland",
    address: "4 Dent Place, Papakura, Auckland",
    phone: "+64 9 298 4450",
    rating: 4.9,
    reviews: 112,
    image: "/images/auckland-sri-ganesh-temple-deity.jpg",
    description:
      "Established in 2002, this Mandir is dedicated to Lord Ganesha and has been developing with the grace of Lord Ganesha.",
    timings: "10:00 AM - 1:00 PM, 6:00 PM - 9:00 PM (Morning Arti at 11:30 AM, Evening Arti at 7:30 PM)",
    deity: "Ganesha",
    established: 2002,
    website: "https://www.aucklandsriganeshtemple.com/",
    featured: true,
  },
  {
    id: 16,
    name: "NZ Thirumurugan Mandir",
    city: "Auckland",
    address: "21 Killarney Street, Takanini, Auckland 2112",
    phone: "+64 9 296 2000",
    rating: 4.7,
    reviews: 87,
    image: "/images/nz-thirumurugan-temple-deity.jpg",
    description:
      "A Mandir dedicated to Lord Murugan, offering traditional Tamil worship services and cultural programs.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Murugan",
    established: 2004,
    website: "https://www.nzthirumurugan.org.nz/",
    featured: false,
  },
  {
    id: 17,
    name: "ISSO - International Swaminarayan Satsang Organisation",
    city: "Auckland",
    address: "117 Ormiston Road, Flat Bush, Auckland 2016",
    phone: "+64 9 274 6354",
    rating: 4.8,
    reviews: 95,
    image: "/images/isso-auckland-golden-shrine.jpg",
    description:
      "A Swaminarayan Mandir serving the Auckland community with spiritual guidance and cultural activities.",
    timings: "6:30 AM - 8:30 PM",
    deity: "Swaminarayan",
    established: 2005,
    website: "https://isso.org.nz/",
    featured: false,
  },
  {
    id: 18,
    name: "BAPS Shri Swaminarayan Mandir, Avondale",
    city: "Auckland",
    address: "21 Fairlands Avenue, Avondale, Auckland 1026",
    phone: "+64 9 828 2277",
    rating: 4.9,
    reviews: 124,
    image: "/images/baps-auckland-avondale-main.jpg",
    description:
      "A magnificent Swaminarayan Mandir in Avondale serving the Auckland community with traditional worship and cultural programs.",
    timings: "6:00 AM - 8:30 PM",
    deity: "Swaminarayan",
    established: 2007,
    website: "https://www.baps.org/Global-Network/Asia-Pacific/Auckland.aspx",
    featured: true,
  },
  {
    id: 19,
    name: "Shirdi Sai Baba Mandir",
    city: "Auckland",
    address: "12 Princes Street, Onehunga, Auckland 1061",
    phone: "+64 9 636 5400",
    rating: 4.7,
    reviews: 89,
    image: "/images/shirdi-sai-baba-temple-auckland-exterior.jpg",
    description: "A Mandir dedicated to Shirdi Sai Baba, offering spiritual guidance and community service.",
    timings: "7:00 AM - 8:00 PM",
    deity: "Sai Baba",
    established: 2003,
    website: "https://www.saibabatemple.org.nz/",
    featured: false,
  },
  {
    id: 20,
    name: "Sanatan Dharam Hanuman Mandir",
    city: "Auckland",
    address: "159 Stoddard Road, Mt Roskill, Auckland 1041",
    phone: "+64 9 629 4354",
    rating: 4.6,
    reviews: 76,
    image: "/images/sanatan-dharam-hanuman-mandir-deity.jpg",
    description: "A Mandir dedicated to Lord Hanuman, offering traditional worship and spiritual activities.",
    timings: "6:30 AM - 8:00 PM",
    deity: "Hanuman",
    established: 2000,
    featured: false,
  },
  {
    id: 21,
    name: "Shri Ram Mandir",
    city: "Auckland",
    address: "11 Brick Street, Henderson, Auckland 0612",
    phone: "+64 9 836 6291",
    rating: 4.7,
    reviews: 82,
    image: "/images/shri-ram-mandir-auckland-exterior.jpg",
    description:
      "A Mandir dedicated to Lord Ram, serving the West Auckland community with traditional worship and cultural programs.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Rama",
    established: 2001,
    featured: false,
  },
  {
    id: 22,
    name: "AIAI - Aotearoa Indian Association Incorporated",
    city: "Auckland",
    address: "57 Oakdale Road, Mt Roskill, Auckland 1041",
    phone: "+64 9 620 9509",
    rating: 4.5,
    reviews: 68,
    image: "/images/aiai-cultural-center-main.jpg",
    description: "A cultural center promoting Indian heritage and community activities in Auckland.",
    timings: "9:00 AM - 6:00 PM",
    deity: "Cultural Center",
    established: 1995,
    website: "https://aiai.org.nz/",
    featured: false,
  },
  {
    id: 3,
    name: "Wellington Indian Association",
    city: "Wellington",
    address: "Level 2, 126 Vivian Street, Te Aro, Wellington 6011",
    phone: "+64 4 385 2276",
    rating: 4.5,
    reviews: 78,
    image: "/images/wellington-indian-association-night.jpg",
    description:
      "Wellington's premier Indian cultural organization promoting Indian heritage, culture, and community activities.",
    timings: "Office Hours: 9:00 AM - 5:00 PM",
    deity: "Cultural Center",
    established: 1950,
    website: "https://www.wia.org.nz/",
    featured: true,
  },
  {
    id: 2,
    name: "Kurinchi Kumaran Mandir",
    city: "Wellington",
    address: "3 Batchelor Street, Newlands, Wellington",
    phone: "+64 4 477 4346",
    rating: 4.7,
    reviews: 95,
    image: "/images/kurinchi-kumaran-temple-ceremony.jpg",
    description:
      "A beautiful Mandir dedicated to Lord Murugan, serving the Wellington Sanatan community with devotion and cultural programs.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Murugan",
    established: 1995,
    website: "https://www.kktemplewellington.org.nz/",
    email: "secretary@kktemplewellington.org",
    featured: true,
  },
  {
    id: 6,
    name: "BAPS Shri Swaminarayan Mandir",
    city: "Wellington",
    address: "15 Raroa Road, Kelburn, Wellington 6012",
    phone: "+64 4 475 8811",
    rating: 4.9,
    reviews: 156,
    image: "/images/baps-wellington-interior.jpg",
    description:
      "A magnificent Swaminarayan Mandir serving the Wellington community with traditional worship, cultural programs, and spiritual guidance following the BAPS tradition.",
    timings: "6:00 AM - 8:30 PM",
    deity: "Swaminarayan",
    established: 2008,
    website: "https://www.baps.org/",
    email: "wellington@baps.org",
    featured: true,
  },
  {
    id: 5,
    name: "Sri Venkateswara Swamy Temple",
    city: "Wellington",
     address: "25 Waiu Street, Wainuiomata, Lower Hutt 5014",
    phone: "+64 4 389 0644",
    rating: 4.8,
    reviews: 134,
    image: "/images/svt.avif",
    description:
      "International Society for Krishna Consciousness Mandir promoting Krishna consciousness through spiritual practices and community service.",
    timings: "07:00 PM to 08:30 PM",
    deity: "Krishna",
    established: 1975,
    website: "https://www.svwt.org.nz/",
    featured: true,
  },
  {
    id: 7,
    name: "Sanatan Mandir Society of Canterbury",
    city: "Christchurch",
    address: "20 Ombersley Terrace, Opawa, Christchurch 8023",
    phone: "+64 3 332 1952",
    rating: 4.8,
    reviews: 92,
    image: "/images/hindu-temple-society-canterbury-exterior.jpg",
    description:
      "The main Sanatan Mandir in Christchurch, serving the Canterbury region with traditional worship and cultural programs.",
    timings: "6:30 AM - 8:00 PM",
    deity: "Multi-deity",
    established: 2010,
    website: "https://www.hindutemple.org.nz/",
    featured: true,
  },
  {
    id: 23,
    name: "BAPS Shri Swaminarayan Mandir",
    city: "Christchurch",
    address: "19 Grahams Road, Papanui, Christchurch 8053",
    phone: "+64 3 352 5000",
    rating: 4.9,
    reviews: 78,
    image: "/images/baps-christchurch-interior.jpg",
    description:
      "A beautiful Swaminarayan Mandir serving the Christchurch community with traditional worship and spiritual guidance.",
    timings: "7:00 AM - 8:00 PM (Daily Arti at 7:00 AM & 7:00 PM)",
    deity: "Swaminarayan",
    established: 2012,
    website: "https://www.baps.org/Global-Network/Asia-Pacific/Christchurch.aspx",
    featured: true,
  },
  {
    id: 25,
    name: "ISKCON Christchurch",
    city: "Christchurch",
    address: "83 Bealey Avenue, Christchurch Central, Christchurch 8013",
    phone: "+64 3 366 7699",
    rating: 4.8,
    reviews: 72,
    image: "/images/iskcon-christchurch-deities.jpg",
    description:
      "International Society for Krishna Consciousness Mandir promoting Krishna consciousness through spiritual practices and community service in Christchurch.",
    timings: "5:00 AM - 8:30 PM",
    deity: "Krishna",
    established: 1980,
    website: "https://harekrishnachristchurch.co.nz/",
    featured: true,
  },
  {
    id: 8,
    name: "Hamilton Shiva Mandir",
    city: "Hamilton",
    address: "12 Temple View Road, Hillcrest",
    phone: "+64 7 855 9876",
    rating: 4.5,
    reviews: 67,
    image: "/images/hamilton-shiva-temple-main.jpg",
    description: "A beautiful Mandir dedicated to Lord Shiva, known for its peaceful atmosphere.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Shiva",
    established: 2005,
  },
  {
    id: 9,
    name: "Tauranga Sanatan Society",
    city: "Tauranga",
    address: "78 Cameron Road, Tauranga",
    phone: "+64 7 578 4321",
    rating: 4.4,
    reviews: 45,
    image: "/images/tauranga-hindu-society-altar.jpg",
    description: "Serving the Bay of Plenty Sanatan community with devotion and cultural programs.",
    timings: "7:00 AM - 7:00 PM",
    deity: "Ganesha",
    established: 2010,
  },
  {
    id: 10,
    name: "Dunedin Sanatan Mandir",
    city: "Dunedin",
    address: "156 Great King Street, North Dunedin",
    phone: "+64 3 474 5678",
    rating: 4.3,
    reviews: 38,
    image: "/images/dunedin-hindu-temple-interior.jpg",
    description: "The southernmost Sanatan Mandir in New Zealand, serving the Otago region.",
    timings: "6:30 AM - 7:00 PM",
    deity: "Durga",
    established: 2008,
  },
  {
    id: 11,
    name: "Palmerston North Mandir",
    city: "Palmerston North",
    address: "89 College Street, Palmerston North",
    phone: "+64 6 356 7890",
    rating: 4.6,
    reviews: 52,
    image: "/images/palmerston-north-mandir.jpg",
    description: "A vibrant Mandir serving the Manawatu region with regular festivals and events.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Krishna",
    established: 2003,
  },
  {
    id: 12,
    name: "Napier Sanatan Centre",
    city: "Napier",
    address: "34 Munroe Street, Napier",
    phone: "+64 6 835 1234",
    rating: 4.2,
    reviews: 29,
    image: "/images/napier-hindu-centre.jpg",
    description: "Serving the Hawke's Bay Sanatan community with traditional worship and cultural activities.",
    timings: "7:00 AM - 7:00 PM",
    deity: "Hanuman",
    established: 2012,
  },
]

export default function TemplesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const cities = ["all", ...Array.from(new Set(temples.map((temple) => temple.city)))]

  const filteredTemples = temples
    .filter((temple) => {
      const matchesSearch =
        temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        temple.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        temple.address.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCity = selectedCity === "all" || temple.city === selectedCity
      return matchesSearch && matchesCity
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "city":
          return a.city.localeCompare(b.city)
        case "established":
          return b.established - a.established
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕉</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
                <p className="text-sm text-gray-600">Sanatan Mandir Directory</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium">
                Home
              </Link>
              <Link href="/temples" className="text-orange-600 font-medium">
                Mandirs
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-orange-600 font-medium">
                Events
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-orange-600 font-medium">
                Community
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Sanatan Mandir in New Zealand</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover sacred spaces across Aotearoa where devotees gather to worship and celebrate
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search mandirs, cities, or deities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full sm:w-48 bg-white text-gray-900">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city === "all" ? "All Cities" : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {filteredTemples.length} Mandir{filteredTemples.length !== 1 ? "s" : ""} Found
              </h3>
              <p className="text-gray-600">{selectedCity !== "all" ? `in ${selectedCity}` : "across New Zealand"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="established">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mandir Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemples.map((temple) => (
              <Card key={temple.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={temple.image || "/placeholder.svg"} alt={temple.name} fill className="object-cover" />
                  {temple.featured && <Badge className="absolute top-4 left-4 bg-orange-600">Featured</Badge>}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{temple.rating}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{temple.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {temple.city}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{temple.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{temple.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{temple.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{temple.timings}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{temple.deity}</Badge>
                      <span className="text-xs text-gray-500">Est. {temple.established}</span>
                    </div>
                    <div className="text-xs text-gray-500">{temple.reviews} reviews</div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
                      <Link href={`/temples/${temple.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                      <Link
                        href={`https://maps.google.com/?q=${encodeURIComponent(temple.address + ", " + temple.city)}`}
                        target="_blank"
                      >
                        Get Directions
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemples.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MapPin className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Mandirs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all Mandirs.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCity("all")
                }}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Add Mandir CTA */}
      <section className="py-12 px-4 bg-orange-50">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Know of a Mandir that's not listed?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Help us build a comprehensive directory of Sanatan Mandir in New Zealand. Submit Mandir information to help
            fellow devotees discover sacred spaces.
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700" asChild>
            <Link href="/temples/add">Add a Mandir</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
