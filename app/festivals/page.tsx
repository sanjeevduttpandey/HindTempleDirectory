"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const festivals = [
  {
    id: 1,
    title: "Diwali",
    date: "2024-11-12",
    description: "The five-day festival of lights, celebrated by Sanatan, Jains, Sikhs and some Buddhists.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Major Festival",
    significance:
      "Symbolizes the victory of light over darkness, good over evil, and knowledge over ignorance. Celebrated with lamps, fireworks, sweets, and family gatherings.",
    rituals: [
      "Lighting of diyas and candles",
      "Lakshmi Puja (worship of Goddess Lakshmi)",
      "Exchanging sweets and gifts",
      "Fireworks display",
      "Family gatherings and feasts",
    ],
    associatedDeities: ["Goddess Lakshmi", "Lord Ganesha", "Lord Rama"],
  },
  {
    id: 2,
    title: "Holi",
    date: "2025-03-14",
    description: "The festival of colors, celebrating the arrival of spring and the triumph of good over evil.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Major Festival",
    significance:
      "Celebrates the eternal and divine love of Radha Krishna. It also signifies the triumph of good over evil, as it commemorates the victory of Lord Vishnu as Narasimha over Hiranyakashipu.",
    rituals: [
      "Holika Dahan (bonfire on the eve of Holi)",
      "Playing with colors (gulal and water)",
      "Singing and dancing to folk songs",
      "Enjoying traditional sweets like Gujiya",
      "Visiting friends and family",
    ],
    associatedDeities: ["Lord Krishna", "Radha"],
  },
  {
    id: 3,
    title: "Navratri",
    date: "2024-10-03",
    description: "A nine-night festival dedicated to the worship of the Goddess Durga.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Major Festival",
    significance:
      "Celebrates the victory of Goddess Durga over the demon Mahishasura. Each of the nine nights is dedicated to a different form of Goddess Durga.",
    rituals: [
      "Fasting and prayers",
      "Garba and Dandiya Raas dances",
      "Worship of the nine forms of Durga",
      "Decorating homes and Mandir",
      "Feasting on the tenth day (Dussehra)",
    ],
    associatedDeities: ["Goddess Durga", "Goddess Lakshmi", "Goddess Saraswati"],
  },
  {
    id: 4,
    title: "Maha Shivaratri",
    date: "2025-02-26",
    description: "The Great Night of Shiva, celebrating the convergence of Shiva and Shakti.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Religious Observance",
    significance:
      "Commemorates the night when Lord Shiva performs the heavenly dance of creation, preservation and destruction. Devotees observe fasts and offer prayers to Lord Shiva.",
    rituals: [
      "Fasting throughout the day and night",
      "Performing Lingam Puja with milk, water, bilva leaves",
      "Chanting Om Namah Shivaya",
      "Staying awake all night (Jagran)",
      "Visiting Shiva Mandir",
    ],
    associatedDeities: ["Lord Shiva", "Goddess Parvati"],
  },
  {
    id: 5,
    title: "Janmashtami",
    date: "2024-08-26",
    description: "The birthday of Lord Krishna, celebrated with great devotion and enthusiasm.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Major Festival",
    significance:
      "Celebrates the birth of Lord Krishna, the eighth incarnation of Lord Vishnu. It signifies the victory of good over evil and the importance of dharma.",
    rituals: [
      "Fasting until midnight",
      "Decorating Mandir and homes with cradles and idols of baby Krishna",
      "Singing bhajans and kirtans",
      "Performing Abhishek (ritual bathing) of Krishna idol",
      "Breaking fast with Prasad (offerings)",
    ],
    associatedDeities: ["Lord Krishna", "Radha"],
  },
  {
    id: 6,
    title: "Ganesh Chaturthi",
    date: "2024-09-07",
    description: "A 10-day festival celebrating the birth of Lord Ganesha.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Major Festival",
    significance:
      "Celebrates the birth of Lord Ganesha, the god of wisdom, prosperity, and good fortune. He is worshipped before any new venture.",
    rituals: [
      "Installation of Ganesha idols in homes and public pandals",
      "Daily pujas and aartis",
      "Offering modaks (sweet dumplings)",
      "Cultural programs and community gatherings",
      "Immersion of idols (Visarjan) on the last day",
    ],
    associatedDeities: ["Lord Ganesha"],
  },
  {
    id: 7,
    title: "Rama Navami",
    date: "2025-04-06",
    description: "The birthday of Lord Rama, celebrated with devotion and spiritual fervor.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Religious Observance",
    significance:
      "Celebrates the birth of Lord Rama, the seventh incarnation of Lord Vishnu. It signifies the victory of good over evil and the establishment of Dharma.",
    rituals: [
      "Recitation of Ramayana and other sacred texts",
      "Fasting and prayers",
      "Processions and bhajans",
      "Decorating Mandir and homes",
      "Offering sweets and fruits",
    ],
    associatedDeities: ["Lord Rama", "Sita", "Lakshmana", "Hanuman"],
  },
  {
    id: 8,
    title: "Raksha Bandhan",
    date: "2024-08-19",
    description: "A festival celebrating the bond between brothers and sisters.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Cultural Festival",
    significance:
      "Symbolizes the bond of protection between siblings. Sisters tie a rakhi (sacred thread) on their brothers' wrists, who in turn promise to protect them.",
    rituals: [
      "Tying of rakhi by sisters on brothers' wrists",
      "Exchanging gifts and sweets",
      "Family gatherings and special meals",
      "Prayers for siblings' well-being",
    ],
    associatedDeities: [],
  },
  {
    id: 9,
    title: "Dussehra (Vijayadashami)",
    date: "2024-10-12",
    description: "Celebrates the victory of Lord Rama over the demon king Ravana.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Major Festival",
    significance:
      "Marks the end of Navratri and symbolizes the victory of good over evil. It also commemorates Goddess Durga's victory over Mahishasura.",
    rituals: [
      "Burning effigies of Ravana, Meghnad, and Indrajit",
      "Processions depicting scenes from Ramayana",
      "Aarti and prayers",
      "Feasting and family gatherings",
      "Visiting Mandir",
    ],
    associatedDeities: ["Lord Rama", "Goddess Durga"],
  },
  {
    id: 10,
    title: "Karwa Chauth",
    date: "2024-10-20",
    description: "A one-day festival observed by Sanatan women for the longevity and safety of their husbands.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Religious Observance",
    significance:
      "Married women observe a day-long fast for the well-being and longevity of their husbands. They break the fast after sighting the moon.",
    rituals: [
      "Nirjala Vrat (fasting without food or water)",
      "Listening to Karwa Chauth Katha (story)",
      "Worship of Goddess Parvati and Lord Shiva",
      "Sighting the moon and offering prayers",
      "Breaking fast with husband's hand",
    ],
    associatedDeities: ["Goddess Parvati", "Lord Shiva", "Lord Kartikeya", "Lord Ganesha", "Moon God"],
  },
]

export default function FestivalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const categories = ["All Categories", ...Array.from(new Set(festivals.map((f) => f.category)))]

  const filteredFestivals = festivals.filter((festival) => {
    const matchesSearch =
      festival.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      festival.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      festival.significance.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || festival.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Formats date to New Zealand locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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
                <p className="text-sm text-gray-600">Sanatan Festivals</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium">
                Home
              </Link>
              <Link href="/temples" className="text-gray-700 hover:text-orange-600 font-medium">
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
          <h2 className="text-4xl font-bold mb-4">Sanatan Festivals in New Zealand</h2>
          <p className="text-xl mb-8 opacity-90">
            Explore the rich calendar of Sanatan festivals celebrated across Aotearoa
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search festivals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-white text-gray-900">
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
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredFestivals.length} Festival{filteredFestivals.length !== 1 ? "s" : ""} Found
            </h3>
            <p className="text-gray-600">
              {selectedCategory !== "All Categories" ? `in ${selectedCategory}` : "across all categories"}
            </p>
          </div>

          {/* Festivals Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFestivals.map((festival) => (
              <Card key={festival.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={festival.image || "/placeholder.svg"}
                    alt={festival.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">{festival.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{festival.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(festival.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{festival.description}</p>

                  <div className="space-y-2 text-sm">
                    <h4 className="font-medium text-gray-900">Significance:</h4>
                    <p className="text-gray-600">{festival.significance}</p>
                  </div>

                  {festival.rituals.length > 0 && (
                    <div className="space-y-2 text-sm">
                      <h4 className="font-medium text-gray-900">Key Rituals:</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {festival.rituals.map((ritual, index) => (
                          <li key={index}>{ritual}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {festival.associatedDeities.length > 0 && (
                    <div className="space-y-2 text-sm">
                      <h4 className="font-medium text-gray-900">Associated Deities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {festival.associatedDeities.map((deity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {deity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
                      <Link href={`/festivals/${festival.id}`}>Learn More</Link>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                      <Link href="/events">Find Events</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFestivals.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No festivals found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all festivals.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All Categories")
                }}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="py-12 px-4 bg-orange-50">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Know of a festival not listed?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Help us enrich our festival calendar. Share details about Sanatan festivals important to your community.
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700" asChild>
            <Link href="/contact">Contribute Information</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
