"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Phone, Globe, Clock } from "lucide-react"
import StaticHeader from "@/components/static-header"
import Link from "next/link"
import Image from "next/image"

const wellingtonTemples = [
  {
    id: "baps-wellington",
    name: "BAPS Shri Swaminarayan Mandir Wellington",
    tradition: "Swaminarayan",
    address: "15 Mahoe Street, Te Aro, Wellington 6011",
    phone: "+64 4 385 2685",
    email: "wellington@baps.org",
    website: "www.baps.org",
    description:
      "Beautiful Swaminarayan temple serving the Wellington Hindu community with daily prayers, festivals, and cultural programs.",
    services: ["Daily Aarti", "Weekend Programs", "Cultural Classes", "Youth Activities"],
    timings: "Daily: 7:00 AM - 12:00 PM, 6:00 PM - 8:30 PM",
    established: "2008",
    image: "/images/baps-wellington-interior.jpg",
    deity: "Swaminarayan Bhagwan",
    festivals: ["Diwali", "Holi", "Janmashtami", "Ram Navami"],
    languages: ["Hindi", "Gujarati", "English"],
    facilities: ["Prayer Hall", "Community Kitchen", "Library", "Parking"],
  },
  {
    id: "wellington-indian-association",
    name: "Wellington Indian Association Temple",
    tradition: "Multi-denominational",
    address: "Level 1, 17 Garrett Street, Wellington Central",
    phone: "+64 4 385 9525",
    email: "info@wellingtonindian.org.nz",
    website: "www.wellingtonindian.org.nz",
    description:
      "Community temple serving all Hindu traditions with regular prayers, cultural events, and festival celebrations.",
    services: ["Weekly Prayers", "Festival Celebrations", "Cultural Programs", "Community Events"],
    timings: "Sundays: 11:00 AM - 1:00 PM, Special events as scheduled",
    established: "1975",
    image: "/images/wellington-indian-association-night.jpg",
    deity: "Multiple Deities",
    festivals: ["Diwali", "Holi", "Navaratri", "Dussehra"],
    languages: ["Hindi", "English", "Tamil", "Telugu"],
    facilities: ["Multi-purpose Hall", "Kitchen", "Stage", "Audio System"],
  },
]

const traditions = ["All Traditions", "Swaminarayan", "Multi-denominational", "Shaiva", "Vaishnava"]

export default function WellingtonTemplesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTradition, setSelectedTradition] = useState("All Traditions")

  const filteredTemples = wellingtonTemples.filter((temple) => {
    const matchesSearch =
      temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTradition = selectedTradition === "All Traditions" || temple.tradition === selectedTradition

    return matchesSearch && matchesTradition
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wellington Temples</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Hindu temples and spiritual centers in Wellington. Connect with your faith and community in New
            Zealand's capital.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search temples..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedTradition} onValueChange={setSelectedTradition}>
                <SelectTrigger>
                  <SelectValue placeholder="Tradition" />
                </SelectTrigger>
                <SelectContent>
                  {traditions.map((tradition) => (
                    <SelectItem key={tradition} value={tradition}>
                      {tradition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-orange-600 hover:bg-orange-700">Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6 text-gray-600">
          Found {filteredTemples.length} temple{filteredTemples.length !== 1 ? "s" : ""} in Wellington
        </div>

        {/* Temple Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTemples.map((temple) => (
            <Card key={temple.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image src={temple.image || "/placeholder.svg"} alt={temple.name} fill className="object-cover" />
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{temple.name}</CardTitle>
                  <Badge variant="secondary">{temple.tradition}</Badge>
                </div>
                <CardDescription>{temple.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{temple.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a href={`tel:${temple.phone}`} className="text-orange-600 hover:underline">
                      {temple.phone}
                    </a>
                  </div>

                  {temple.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a
                        href={`https://${temple.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline"
                      >
                        {temple.website}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{temple.timings}</span>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="font-medium mb-2">Services</h4>
                  <div className="flex flex-wrap gap-1">
                    {temple.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Festivals */}
                <div>
                  <h4 className="font-medium mb-2">Major Festivals</h4>
                  <div className="flex flex-wrap gap-1">
                    {temple.festivals.map((festival, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-orange-50">
                        {festival}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
                    <Link href={`/temples/${temple.id}`}>View Details</Link>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                    <a href={`tel:${temple.phone}`}>Call Temple</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemples.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No temples found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Know of a Temple We're Missing?</h2>
            <p className="text-lg mb-6 opacity-90">
              Help us build a comprehensive directory of Hindu temples in Wellington
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link href="/temples/add">Add Temple</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
