"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, Globe, Users, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const aucklandTemples = [
  {
    id: 1,
    name: "Shri Sanatan Dharm Mandir",
    address: "98 Balmoral Road, Mount Eden, Auckland",
    phone: "+64 9 630 5540",
    website: "https://www.aucklandmandir.org.nz",
    rating: 4.8,
    reviews: 120,
    image: "/images/shri-sanatan-dharm-mandir-main.jpg",
    description: "One of the largest Hindu temples in New Zealand, serving the community since 1992.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Multi-deity",
    established: 1992,
    featured: true,
    specialties: [
      "Daily Aarti",
      "Festival Celebrations",
      "Cultural Programs",
      "Community Kitchen",
      "Religious Counseling",
    ],
  },
  {
    id: 13,
    name: "Bharatiya Mandir",
    address: "252-254 Balmoral Road, Sandringham, Auckland 1024",
    phone: "+64 9 846 2677",
    website: "https://www.bharatiyamandir.org.nz/",
    rating: 4.7,
    reviews: 105,
    image: "/images/bharatiya-mandir-main.png", // Updated to use the new high-quality image
    description:
      "One of Auckland's oldest Hindu temples, serving the community with traditional worship and cultural programs since 1987.",
    timings: "6:00 AM - 8:30 PM",
    deity: "Multi-deity",
    established: 1987,
    featured: true,
    specialties: ["Traditional Pujas", "Cultural Events", "Language Classes", "Youth Programs", "Community Services"],
  },
  {
    id: 15,
    name: "Auckland Sri Ganesh Temple",
    address: "4 Dent Place, Papakura, Auckland",
    phone: "+64 9 298 4450",
    website: "https://www.aucklandsriganeshtemple.com/",
    rating: 4.9,
    reviews: 112,
    image: "/images/auckland-sri-ganesh-temple-main.jpg",
    description:
      "Established in 2002, this temple is dedicated to Lord Ganesha and has been developing with the grace of Lord Ganesha.",
    timings: "10:00 AM - 1:00 PM, 6:00 PM - 9:00 PM (Morning Arti at 11:30 AM, Evening Arti at 7:30 PM)",
    deity: "Ganesha",
    established: 2002,
    featured: true,
    specialties: [
      "Ganesh Chaturthi",
      "Daily Ganesha Aarti",
      "Cultural Programs",
      "Spiritual Discourses",
      "Community Events",
    ],
  },
  {
    id: 14,
    name: "Thiru Subramaniyar Aalayam",
    address: "69 Tidal Road, Mangere, Auckland 2022",
    phone: "+64 9 275 4500",
    website: "https://www.thirusubramaniyar.org.nz/",
    rating: 4.8,
    reviews: 98,
    image: "/images/thiru-subramaniyar-aalayam-main.jpg",
    description:
      "A beautiful temple dedicated to Lord Murugan, serving the Tamil Hindu community in Auckland with traditional South Indian worship.",
    timings: "6:30 AM - 8:00 PM",
    deity: "Murugan",
    established: 1995,
    featured: false,
    specialties: [
      "Thaipusam Celebrations",
      "Tamil Cultural Programs",
      "Kavadi Ceremonies",
      "South Indian Rituals",
      "Language Classes",
    ],
  },
  {
    id: 16,
    name: "NZ Thirumurugan Temple",
    address: "21 Killarney Street, Takanini, Auckland 2112",
    phone: "+64 9 296 2000",
    website: "https://www.nzthirumurugan.org.nz/",
    rating: 4.7,
    reviews: 87,
    image: "/images/nz-thirumurugan-temple-main.jpg",
    description:
      "A temple dedicated to Lord Murugan, offering traditional Tamil worship services and cultural programs.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Murugan",
    established: 2004,
    featured: false,
    specialties: [
      "Murugan Worship",
      "Tamil Cultural Events",
      "Youth Programs",
      "Community Services",
      "Festival Celebrations",
    ],
  },
  {
    id: 18,
    name: "BAPS Shri Swaminarayan Mandir, Avondale",
    address: "21 Fairlands Avenue, Avondale, Auckland 1026",
    phone: "+64 9 828 2277",
    website: "https://www.baps.org/Global-Network/Asia-Pacific/Auckland.aspx",
    rating: 4.9,
    reviews: 124,
    image: "/images/baps-avondale-mandir.jpg",
    description:
      "A magnificent Swaminarayan temple in Avondale serving the Auckland community with traditional worship and cultural programs.",
    timings: "6:00 AM - 8:30 PM",
    deity: "Swaminarayan",
    established: 2007,
    featured: true,
    specialties: [
      "Swaminarayan Worship",
      "Youth Programs",
      "Cultural Activities",
      "Spiritual Discourses",
      "Community Service",
    ],
  },
  {
    id: 17,
    name: "ISSO - International Swaminarayan Satsang Organisation",
    address: "117 Ormiston Road, Flat Bush, Auckland 2016",
    phone: "+64 9 274 6354",
    website: "https://isso.org.nz/",
    rating: 4.8,
    reviews: 95,
    image: "/images/isso-auckland-temple.jpg",
    description:
      "A Swaminarayan temple serving the Auckland community with spiritual guidance and cultural activities.",
    timings: "6:30 AM - 8:30 PM",
    deity: "Swaminarayan",
    established: 2005,
    featured: false,
    specialties: [
      "Swaminarayan Worship",
      "Cultural Programs",
      "Youth Activities",
      "Spiritual Discourses",
      "Community Events",
    ],
  },
  {
    id: 19,
    name: "Shirdi Sai Baba Temple",
    address: "12 Princes Street, Onehunga, Auckland 1061",
    phone: "+64 9 636 5400",
    website: "https://www.saibabatemple.org.nz/",
    rating: 4.7,
    reviews: 89,
    image: "/images/shirdi-sai-baba-auckland-main.jpg",
    description: "A temple dedicated to Shirdi Sai Baba, offering spiritual guidance and community service.",
    timings: "7:00 AM - 8:00 PM",
    deity: "Sai Baba",
    established: 2003,
    featured: false,
    specialties: [
      "Sai Bhajans",
      "Thursday Special Worship",
      "Community Service",
      "Spiritual Discourses",
      "Charitable Activities",
    ],
  },
  {
    id: 20,
    name: "Sanatan Dharam Hanuman Mandir",
    address: "159 Stoddard Road, Mt Roskill, Auckland 1041",
    phone: "+64 9 629 4354",
    rating: 4.6,
    reviews: 76,
    image: "/images/hanuman-mandir-auckland.jpg",
    description: "A temple dedicated to Lord Hanuman, offering traditional worship and spiritual activities.",
    timings: "6:30 AM - 8:00 PM",
    deity: "Hanuman",
    established: 2000,
    featured: false,
    specialties: [
      "Hanuman Chalisa",
      "Tuesday Special Worship",
      "Sundarkand Path",
      "Cultural Programs",
      "Community Services",
    ],
  },
  {
    id: 21,
    name: "Shri Ram Mandir",
    address: "11 Brick Street, Henderson, Auckland 0612",
    phone: "+64 9 836 6291",
    rating: 4.7,
    reviews: 82,
    image: "/images/ram-mandir-henderson.jpg",
    description:
      "A temple dedicated to Lord Ram, serving the West Auckland community with traditional worship and cultural programs.",
    timings: "6:00 AM - 8:00 PM",
    deity: "Rama",
    established: 2001,
    featured: false,
    specialties: [
      "Ram Navami Celebrations",
      "Ramcharitmanas Path",
      "Cultural Programs",
      "Spiritual Discourses",
      "Community Events",
    ],
  },
  {
    id: 22,
    name: "AIAI - Aotearoa Indian Association Incorporated",
    address: "57 Oakdale Road, Mt Roskill, Auckland 1041",
    phone: "+64 9 620 9509",
    website: "https://aiai.org.nz/",
    rating: 4.5,
    reviews: 68,
    image: "/images/aiai-auckland-center.jpg",
    description: "A cultural center promoting Indian heritage and community activities in Auckland.",
    timings: "9:00 AM - 6:00 PM",
    deity: "Cultural Center",
    established: 1995,
    featured: false,
    specialties: [
      "Cultural Events",
      "Community Support",
      "Educational Programs",
      "Festival Celebrations",
      "Youth Activities",
    ],
  },
]

export default function AucklandTemplesPage() {
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
              <p className="text-sm text-gray-600">Auckland Hindu Temples</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Hindu Temples in Auckland</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover sacred spaces and cultural centers in New Zealand's largest city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link href="/temples">
                <MapPin className="mr-2 h-5 w-5" />
                All Temples
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600"
              asChild
            >
              <Link href="/events?city=Auckland">
                <Calendar className="mr-2 h-5 w-5" />
                Auckland Events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Auckland Overview */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Auckland's Hindu Community</h3>
          <p className="text-gray-600 leading-relaxed">
            Auckland, New Zealand's largest city, is home to a vibrant and diverse Hindu community. With over a dozen
            temples and cultural centers representing various traditions and deities, Auckland offers numerous spiritual
            and cultural spaces for the Hindu community. These institutions serve not only as places of worship but also
            as community hubs that bring people together for festivals, cultural events, and spiritual growth.
          </p>
        </div>
      </section>

      {/* Temples Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {aucklandTemples.length} Hindu Temples & Cultural Centers
            </h3>
            <p className="text-gray-600">Serving the Auckland Hindu community with devotion and cultural programs</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {aucklandTemples.map((temple) => (
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
                    Auckland
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Button size="sm" variant="outline" className="flex-1" asChild>
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
                  <span className="text-sm">Janmashtami - Krishna's Birthday</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  <span className="text-sm">Ganesh Chaturthi - Ganesha Festival</span>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect with Auckland's Hindu Community</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're new to Auckland or looking to deepen your spiritual practice, our temples and cultural
            centers welcome you with open arms. Join us for worship, festivals, and community activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/join">Join Our Community</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/events?city=Auckland">View Auckland Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
