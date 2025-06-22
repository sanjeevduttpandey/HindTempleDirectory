"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart, Users, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Welcome to Our Community</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Message */}
          <Card className="shadow-lg mb-8">
            <CardContent className="pt-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🕉️ Welcome to Our Spiritual Family!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your registration is complete! You are now part of the vibrant Hindu community across New Zealand.
              </p>
              <div className="bg-orange-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-orange-800 mb-3 flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5" />
                  Your Spiritual Journey Begins Here
                </h3>
                <p className="text-orange-700 text-sm">
                  "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥"
                  <br />
                  <em className="text-xs">
                    May all beings be happy, may all beings be healthy, may all beings experience prosperity, may none
                    suffer.
                  </em>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Explore Your Community
              </CardTitle>
              <CardDescription>Discover the rich spiritual life waiting for you in New Zealand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="h-16 bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href="/dashboard" className="flex flex-col items-center">
                    <Users className="h-6 w-6 mb-1" />
                    <span>Visit Dashboard</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-16" asChild>
                  <Link href="/temples" className="flex flex-col items-center">
                    <MapPin className="h-6 w-6 mb-1" />
                    <span>Find Mandirs</span>
                  </Link>
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-16" asChild>
                  <Link href="/events" className="flex flex-col items-center">
                    <Calendar className="h-6 w-6 mb-1" />
                    <span>Join Satsangs</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-16" asChild>
                  <Link href="/community" className="flex flex-col items-center">
                    <Users className="h-6 w-6 mb-1" />
                    <span>Community Discussions</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Community Benefits */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>What You Can Do Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Connect with Local Mandirs</h4>
                    <p className="text-sm text-gray-600">Find temples near you and join their activities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Participate in Satsangs</h4>
                    <p className="text-sm text-gray-600">Join spiritual gatherings and cultural events</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Access Daily Panchang</h4>
                    <p className="text-sm text-gray-600">Get daily Hindu calendar and auspicious timings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Join Spiritual Discussions</h4>
                    <p className="text-sm text-gray-600">Engage with fellow devotees on dharmic topics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Contribute to Community</h4>
                    <p className="text-sm text-gray-600">Share knowledge and support fellow devotees</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Need help getting started? Our community is here to support you.</p>
            <div className="space-x-4">
              <Button variant="outline" asChild>
                <Link href="/help">Help Center</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🕉</span>
            </div>
            <span className="text-xl font-bold">Sanatan New Zealand</span>
          </div>
          <p className="text-gray-400 text-sm">
            Connecting the Hindu community across New Zealand through dharma, culture, and unity.
          </p>
        </div>
      </footer>
    </div>
  )
}
