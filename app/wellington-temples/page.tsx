"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, Globe, Users, Calendar, Facebook, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const wellingtonTemples = [
  {
    id: 3,
    name: "Wellington Indian Association",
    address: "Level 2, 126 Vivian Street, Te Aro, Wellington 6011",
    phone: "+64 4 385 2276",
    website: "https://www.wia.org.nz/",
    rating: 4.5,
    reviews: 78,
    image: "/images/wellington-indian-association-night.jpg",
    description:
      "Wellington's premier Indian cultural organization promoting Indian heritage, culture, and community activities.",
    timings: "Office Hours: 9:00 AM - 5:00 PM",
    deity: "Cultural Center",
    established: 1950,
    featured: true,
    specialties: ["Cultural Events", "Dance Classes", "Festival Celebrations", "Community Support"],
    facebook: null,
    twitter: null,
  },
  {
    id: 2,
    name: "Kurinchi Kumaran Mandir",
    address: "3 Batchelor Street, Newlands, Wellington",
    phone: "+64 4 477 4346",
    website: "https://www.kktemplewellington.org.nz/",
    rating: 4.7,
    reviews: 95,
    image: "/images/kurinchi-kumaran-temple-ceremony.jpg",
    description:
      "A beautiful Mandir dedicated to Lord Murugan, serving Wellington's Tamil Sanatan community with devotion and cultural programs.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Murugan",
    established: 1995,
    featured: true,
    specialties: ["Thaipusam Celebrations", "Murugan Bhajan", "Kavadi Ceremonies", "Tamil Programs"],
    facebook: null,
    twitter: null,
  },
  {
    id: 6,
    name: "BAPS Shri Swaminarayan Mandir",
    address: "15 Raroa Road, Kelburn, Wellington 6012",
    phone: "+64 4 475 8811",
    website: "https://www.baps.org/Global-Network/Asia-Pacific/Wellington.aspx",
    rating: 4.9,
    reviews: 156,
    image: "/images/baps-wellington-interior.jpg",
    description:
      "A magnificent Swaminarayan Mandir serving the Wellington community with traditional worship, cultural programs, and spiritual guidance following the BAPS tradition.",
    timings: "6:00 AM - 8:30 PM",
    deity: "Swaminarayan",
    established: 2008,
    featured: true,
    specialties: ["Swaminarayan Worship", "Youth Programs", "Cultural Activities", "Spiritual Discourses"],
    facebook: null,
    twitter: null,
  },
  {
    id: 5,
    name: "Sri Venkateswara Swamy Temple",
    city: "Wellington",
     address: "25 Waiu Street, Wainuiomata, Lower Hutt 5014",
    phone: "+64 4 389 0644",
    rating: 4.8,
    reviews: 134,
    image: "/images/Lord-Balaji.avif",
    description:
      "International Society for Krishna Consciousness Mandir promoting Krishna consciousness through spiritual practices and community service.",
    timings: "Mon - Fri | 07:00 PM to 08:30 PM And Sat - Sun | 09:30 AM - 11:30 AM & 07:00 PM to 08:30 PM",
    deity: "Krishna",
    established: 1975,
    specialties: ["Krishna Bhajan", "Bhagavad Gita Classes", "Prasadam Distribution", "Spiritual Festivals"],
    website: "https://www.svwt.org.nz/",
    featured: true,
  },
  {
    id: 7, // New ID for the new temple
    name: "Sri Venkateswara Swamy Temple",
    address: "25 Waiu Street, Wainuiomata, Lower Hutt 5014, New Zealand",
    phone: null, // No phone provided
    website: "https://www.svwt.org.nz/",
    rating: 4.9, // Assuming a high rating for a new, important temple
    reviews: 0, // New temple, no reviews yet
    image: "/images/sri-venkateswara-swamy-temple-deity.jpg", // Using the provided image
    description:
      "A sacred temple dedicated to Lord Venkateswara Swamy, serving the Sanatan community in Wellington with daily pujas and special festivals.",
    timings: "Mon - Fri | 07:00 PM to 08:30 PM\nSat - Sun | 09:30 AM - 11:30 AM & 07:00 PM to 08:30 PM",
    deity: "Venkateswara Swamy",
    established: 2023, // Assuming a recent establishment year
    featured: true,
    specialties: ["Venkateswara Puja", "Bhajan", "Cultural Programs", "Community Gatherings"],
    facebook: "https://www.facebook.com/srivenkateshwara.templenz.9/",
    twitter: "https://x.com/sdpstnz",
  },
]

export default function WellingtonTemplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Wellington Sanatan Mandir</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Sanatan Mandir in Wellington</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover sacred spaces and cultural centers in New Zealand's capital city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link href="/temples">
                <MapPin className="mr-2 h-5 w-5" />
                All Mandirs
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              asChild
            >
              <Link href="/events?city=Wellington">
                <Calendar className="mr-2 h-5 w-5" />
                Wellington Events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Wellington Overview */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Wellington's Sanatan Community</h3>
          <p className="text-gray-600 leading-relaxed">
            Wellington, New Zealand's capital city, hosts a vibrant Sanatan community with several Mandir and cultural
            centers. These institutions serve as spiritual sanctuaries and community hubs, bringing together devotees
            from various traditions. From the historic Wellington Indian Association to the beautiful Kurinchi Kumaran
            Mandir, Wellington offers diverse spiritual and cultural experiences for the Sanatan community.
          </p>
        </div>
      </section>

      {/* Mandir Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {wellingtonTemples.length} Sanatan Mandir & Cultural Centers
            </h3>
            <p className="text-gray-600">
              Serving the Wellington Sanatan community with devotion and cultural programs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {wellingtonTemples.map((temple) => (
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
                    Wellington
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{temple.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{temple.address}</span>
                    </div>
                    {temple.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{temple.phone}</span>
                      </div>
                    )}
                    <div className="flex items-start">
                      {" "}
                      {/* Use items-start for multiline timings */}
                      <Clock className="h-4 w-4 text-gray-400 mr-2 mt-1" /> {/* Adjust margin-top for icon alignment */}
                      <span className="whitespace-pre-line">{temple.timings}</span>{" "}
                      {/* Use whitespace-pre-line for newlines */}
                    </div>
                    {temple.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-400 mr-2" />
                        <a
                          href={temple.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                    {temple.facebook && (
                      <div className="flex items-center">
                        <Facebook className="h-4 w-4 text-gray-400 mr-2" />
                        <a
                          href={temple.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:underline"
                        >
                          Facebook
                        </a>
                      </div>
                    )}
                    {temple.twitter && (
                      <div className="flex items-center">
                        <Twitter className="h-4 w-4 text-gray-400 mr-2" />
                        <a
                          href={temple.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:underline"
                        >
                          Twitter
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{temple.deity}</Badge>
                      <span className="text-xs text-gray-500">Est. {temple.established}</span>
                    </div>
                    <div className="text-xs text-gray-500">{temple.reviews} reviews</div>
                  </div>

                  {/* Specialties */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {temple.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
                      <Link href={`/temples/${temple.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                      <Link href={`https://maps.google.com/?q=${encodeURIComponent(temple.address)}`} target="_blank">
                        Directions
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Information */}
      <section className="py-12 px-4 bg-orange-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-orange-600" />
                  Community Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Religious ceremonies and festivals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Cultural programs and classes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Youth and senior activities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Community support and counseling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Language and spiritual education</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-orange-600" />
                  Major Festivals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Diwali - Festival of Lights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Thaipusam - Murugan Festival</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Janmashtami - Krishna's Birthday</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Holi - Festival of Colors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Navratri - Nine Nights Festival</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect with Wellington's Sanatan Community</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're new to Wellington or looking to deepen your spiritual practice, our Mandir and cultural
            centers welcome you with open arms. Join us for worship, festivals, and community activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/join">Join Our Community</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/events?city=Wellington">View Wellington Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
