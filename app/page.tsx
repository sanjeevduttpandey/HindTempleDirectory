import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, Gift, BookOpen } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Hindu Community Platform</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/temples" className="text-gray-700 hover:text-orange-600">
              Mandirs
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-orange-600">
              Satsangs
            </Link>
            <Link href="/panchang" className="text-gray-700 hover:text-orange-600">
              Panchang
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-orange-600">
              Community
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="outline" asChild>
              <Link href="/donate">Daan (Donate)</Link>
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-100 to-amber-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Connecting Hindu Community Across New Zealand
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Join our vibrant community to discover temples, events, and connect with fellow devotees on your
                spiritual journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href="/dashboard">Explore Platform</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/temples">Find Nearby Mandirs</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-80">
                <Image
                  src="/placeholder.svg?key=xikd0"
                  alt="Hindu Temple in New Zealand"
                  fill
                  className="rounded-lg object-cover shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Discover Our Community Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-100 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Find Mandirs</h3>
                <p className="text-gray-600 text-center">
                  Discover Hindu temples across New Zealand with detailed information, services, and contact details.
                </p>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-orange-600" asChild>
                    <Link href="/temples">Explore Mandirs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Attend Satsangs</h3>
                <p className="text-gray-600 text-center">
                  Join spiritual gatherings, festivals, and cultural events happening in your area.
                </p>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-orange-600" asChild>
                    <Link href="/events">View Events</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Connect with Devotees</h3>
                <p className="text-gray-600 text-center">
                  Build meaningful connections with fellow devotees and participate in spiritual discussions.
                </p>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-orange-600" asChild>
                    <Link href="/community">Join Community</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Satsangs</h2>
            <Button variant="outline" asChild>
              <Link href="/events">View All</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event 1 */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?key=m8vyj" alt="Janmashtami Celebration" fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">Janmashtami Celebration</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Festival</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>August 26, 2024 • 6:00 PM</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Shri Krishna Mandir, Auckland</span>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href="/events/1">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Event 2 */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?key=lpo2z" alt="Ganesha Chaturthi" fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">Ganesha Chaturthi</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Puja</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>September 7, 2024 • 10:00 AM</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Ganesh Temple, Wellington</span>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href="/events/2">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Event 3 */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?key=1ykqn" alt="Bhagavad Gita Study" fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">Bhagavad Gita Study</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Satsang</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>August 20, 2024 • 7:00 PM</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Sanatan Dharm Mandir, Christchurch</span>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href="/events/3">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Spiritual Resources</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-orange-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Daily Panchang</h3>
                  <p className="text-gray-600 mb-4">
                    Access daily Hindu calendar with tithi, nakshatra, and auspicious timings for your spiritual
                    practices.
                  </p>
                  <Button variant="outline" className="text-orange-600 border-orange-600" asChild>
                    <Link href="/panchang">View Panchang</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Gift className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Support Dharma</h3>
                  <p className="text-gray-600 mb-4">
                    Contribute to temple development, community services, and spiritual initiatives across New Zealand.
                  </p>
                  <Button variant="outline" className="text-orange-600 border-orange-600" asChild>
                    <Link href="/donate">Give Daan</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Spiritual Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with the Hindu community across New Zealand and enrich your spiritual journey.
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
            <Link href="/dashboard">Explore Dashboard</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🕉</span>
                </div>
                <span className="text-xl font-bold">Sanatan NZ</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting the Hindu community across New Zealand through dharma, culture, and unity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/temples" className="text-gray-400 hover:text-white">
                    Mandirs
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-400 hover:text-white">
                    Satsangs
                  </Link>
                </li>
                <li>
                  <Link href="/panchang" className="text-gray-400 hover:text-white">
                    Panchang
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-400 hover:text-white">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="text-gray-400 hover:text-white">
                    Donate
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <p className="text-gray-400 mb-4">
                Follow us on social media for updates on events, festivals, and community news.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Sanatan New Zealand. All rights reserved. 🕉️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
