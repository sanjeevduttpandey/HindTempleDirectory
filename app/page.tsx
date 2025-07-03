"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  Star,
  ArrowRight,
  Building2,
  BookOpen,
  Clock,
  Phone,
  Mail,
  Globe,
  MapPin,
  Heart,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SanatanTimeWidget from "@/components/sanatan-time-widget"

export default function HomePage() {
  const featuredTemples = [
    {
      id: 1,
      name: "ISKCON Auckland",
      deity: "Krishna",
      city: "Auckland",
      image: "/images/baps-auckland-avondale-main.jpg",
      rating: 4.9,
      reviews: 156,
      description: "Beautiful Krishna temple with daily programs and festivals",
    },
    {
      id: 2,
      name: "Shiva Vishnu Temple",
      deity: "Shiva & Vishnu",
      city: "Auckland",
      image: "/images/auckland-sri-ganesh-temple.jpg",
      rating: 4.8,
      reviews: 203,
      description: "Traditional temple serving the Hindu community since 1979",
    },
    {
      id: 3,
      name: "Wellington Hindu Temple",
      deity: "Multiple Deities",
      city: "Wellington",
      image: "/images/baps-wellington-interior.jpg",
      rating: 4.7,
      reviews: 89,
      description: "Community hub for spiritual and cultural activities",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Janmashtami Celebration",
      date: "2024-08-26",
      time: "18:00",
      temple: "ISKCON Auckland",
      type: "Festival",
      attendees: 250,
    },
    {
      id: 2,
      title: "Ganesha Chaturthi",
      date: "2024-09-07",
      time: "10:00",
      temple: "Ganesh Temple",
      type: "Puja",
      attendees: 180,
    },
    {
      id: 3,
      title: "Bhagavad Gita Study",
      date: "2024-08-20",
      time: "19:00",
      temple: "Community Center",
      type: "Satsang",
      attendees: 45,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">🕉</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Sanatan New Zealand
                </h1>
                <p className="text-sm text-gray-600">Sanatan Community Platform</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/temples" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Mandirs
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Events
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Community
              </Link>
              <Link
                href="/business/directory"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Business
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg"
              >
                <Link href="/dashboard">Explore Platform</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/30 to-yellow-100/50"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-200 mb-6">
            <Sparkles className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Welcome to New Zealand's Sanatan Community</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              नमस्ते!
            </span>
            <br />
            <span className="text-gray-900">Sanatan New Zealand</span>
          </h1>

          <p className="text-xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
            Your spiritual home in Aotearoa. Connect with temples, join festivals, explore Hindu traditions, and build
            meaningful relationships with fellow devotees across New Zealand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-xl text-lg px-8 py-4"
              asChild
            >
              <Link href="/temples">
                <Building2 className="mr-2 h-5 w-5" />
                Find Mandirs
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-300 hover:bg-orange-50 text-lg px-8 py-4"
              asChild
            >
              <Link href="/events">
                <Calendar className="mr-2 h-5 w-5" />
                View Events
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "50+", label: "Sanatan Temples", icon: Building2 },
              { number: "200+", label: "Monthly Events", icon: Calendar },
              { number: "5000+", label: "Community Members", icon: Users },
              { number: "15+", label: "Cities Covered", icon: MapPin },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg"
              >
                <stat.icon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hindu Panchang Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full border border-amber-200 mb-4">
              <Clock className="h-4 w-4 text-amber-700" />
              <span className="text-sm font-medium text-amber-800">Live Sanatan Calendar</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">आज का पंचांग - Today's Panchang</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay connected with Sanatan time and auspicious moments. Access live panchang data, muhurat timings, and
              spiritual guidance for your daily practices.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <SanatanTimeWidget />
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="border-2 border-amber-300 hover:bg-amber-50" asChild>
              <Link href="/panchang">
                <BookOpen className="mr-2 h-5 w-5" />
                View Full Panchang
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border border-orange-200 mb-4">
              <Building2 className="h-4 w-4 text-orange-700" />
              <span className="text-sm font-medium text-orange-800">Sacred Spaces</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Mandirs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover beautiful Sanatan temples across New Zealand, each offering unique spiritual experiences and
              vibrant community programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredTemples.map((temple) => (
              <Card
                key={temple.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={temple.image || "/placeholder.svg"}
                    alt={temple.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{temple.rating}</span>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">{temple.name}</CardTitle>
                  <CardDescription className="text-base">
                    <span className="font-medium text-orange-600">{temple.deity}</span> • {temple.city}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">{temple.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {temple.reviews} reviews
                    </span>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700" asChild>
                      <Link href={`/temples/${temple.id}`}>
                        Visit Mandirs
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-300 hover:bg-orange-50 text-lg px-8 py-4"
              asChild
            >
              <Link href="/temples">
                View All Mandirs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border border-orange-200 mb-4">
              <Calendar className="h-4 w-4 text-orange-700" />
              <span className="text-sm font-medium text-orange-800">Community Gatherings</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our vibrant community in celebrating festivals, attending satsangs, and participating in spiritual
              activities across New Zealand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-base font-medium text-gray-600">{event.temple}</CardDescription>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{event.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-3 text-orange-600" />
                      <span className="font-medium">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-3 text-orange-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-3 text-orange-600" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                    <Link href={`/events/${event.id}`}>Join Event</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-300 hover:bg-orange-50 text-lg px-8 py-4"
              asChild
            >
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border border-orange-200 mb-4">
              <Sparkles className="h-4 w-4 text-orange-700" />
              <span className="text-sm font-medium text-orange-800">Platform Features</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive platform designed to keep you connected with the Hindu community in New Zealand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: "Temple Directory",
                description: "Find Sanatan temples across all major cities in New Zealand with detailed information",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Calendar,
                title: "Event Calendar",
                description: "Stay updated with festivals, pujas, and community events happening near you",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: Users,
                title: "Community Hub",
                description: "Connect with fellow devotees and join discussion groups and spiritual circles",
                color: "from-red-500 to-pink-500",
              },
              {
                icon: BookOpen,
                title: "Spiritual Tools",
                description: "Access panchang, Sanatan calendar, mantras, and other spiritual resources daily",
                color: "from-orange-500 to-amber-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-amber-50 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of devotees across New Zealand in our spiritual community. Discover temples, attend events,
            and grow in your spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-xl"
              asChild
            >
              <Link href="/dashboard">
                Explore Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-white hover:bg-gray text-orange-600 text-lg px-8 py-4"
              asChild
            >
              <Link href="/temples">
                Find Temples
                <Building2 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🕉</span>
                </div>
                <span className="text-2xl font-bold">Sanatan NZ</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Connecting the Sanatan community across New Zealand through dharma, culture, and unity.
              </p>
              <div className="text-sm text-gray-500">Serving the community since 2020</div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { href: "/temples", label: "Find Temples" },
                  { href: "/events", label: "Events" },
                  { href: "/community", label: "Community" },
                  { href: "/business/directory", label: "Business Directory" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Spiritual Tools</h3>
              <ul className="space-y-3">
                {[
                  { href: "/panchang", label: "Panchang" },
                  { href: "/festivals", label: "Festival Calendar" },
                  { href: "/datetime", label: "Hindu Time" },
                  { href: "/about", label: "About Us" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-3 text-orange-400" />
                  info@sanatannz.org
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-3 text-orange-400" />
                  +64 9 123 4567
                </li>
                <li className="flex items-center text-gray-400">
                  <Globe className="h-4 w-4 mr-3 text-orange-400" />
                  sanatannewzealand.org
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Sanatan New Zealand. Made with <Heart className="inline h-4 w-4 text-red-500" /> for the Hindu
              community. 🕉️
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
