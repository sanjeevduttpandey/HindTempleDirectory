"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Store,
  Utensils,
  GraduationCap,
  Heart,
  Scissors,
  Plane,
  Briefcase,
  Calendar,
  Sparkles,
  ShoppingBag,
} from "lucide-react"
import { StaticHeader } from "@/components/static-header"

const serviceCategories = [
  {
    icon: Utensils,
    title: "Restaurants & Food",
    description: "Authentic Indian cuisine, vegetarian specialties, catering services",
    services: ["North Indian Cuisine", "South Indian Dishes", "Vegetarian/Vegan", "Catering", "Sweets & Snacks"],
    color: "bg-red-100 text-red-700",
  },
  {
    icon: Store,
    title: "Grocery & Spices",
    description: "Indian groceries, spices, vegetables, and specialty items",
    services: ["Fresh Vegetables", "Spices & Masalas", "Lentils & Grains", "Frozen Foods", "Religious Items"],
    color: "bg-green-100 text-green-700",
  },
  {
    icon: ShoppingBag,
    title: "Clothing & Jewelry",
    description: "Traditional Indian clothing, jewelry, and accessories",
    services: ["Sarees & Lehengas", "Men's Kurtas", "Gold Jewelry", "Fashion Accessories", "Custom Tailoring"],
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Ayurvedic treatments, yoga, meditation, and holistic health",
    services: ["Ayurvedic Consultation", "Yoga Classes", "Meditation", "Herbal Medicine", "Wellness Coaching"],
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: GraduationCap,
    title: "Education & Tutoring",
    description: "Language classes, cultural education, and academic tutoring",
    services: ["Hindi Language", "Sanskrit Classes", "Music & Dance", "Academic Tutoring", "Cultural Programs"],
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Legal, financial, and business consulting services",
    services: ["Immigration Law", "Tax Services", "Business Consulting", "Real Estate", "Insurance"],
    color: "bg-gray-100 text-gray-700",
  },
  {
    icon: Scissors,
    title: "Beauty & Salon",
    description: "Hair, beauty, and personal care services",
    services: ["Hair Styling", "Bridal Makeup", "Henna/Mehndi", "Spa Services", "Beauty Treatments"],
    color: "bg-pink-100 text-pink-700",
  },
  {
    icon: Plane,
    title: "Travel & Tourism",
    description: "Travel planning, tours, and travel-related services",
    services: ["India Travel", "Group Tours", "Visa Services", "Travel Insurance", "Pilgrimage Tours"],
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    icon: Sparkles,
    title: "Religious Items",
    description: "Puja items, books, statues, and spiritual accessories",
    services: ["Puja Supplies", "Religious Books", "Deity Statues", "Incense & Oils", "Spiritual Jewelry"],
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: Calendar,
    title: "Event Services",
    description: "Wedding planning, religious ceremonies, and event management",
    services: ["Wedding Planning", "Religious Ceremonies", "Catering", "Photography", "Venue Decoration"],
    color: "bg-teal-100 text-teal-700",
  },
]

export default function BusinessServices() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Business Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the wide range of services offered by Hindu businesses across New Zealand. From traditional cuisine
            to spiritual wellness, find everything you need in our community.
          </p>
        </div>

        {/* Service Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {serviceCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-700">Popular Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.services.map((service, serviceIndex) => (
                        <Badge key={serviceIndex} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700" size="sm">
                      Find Businesses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Services Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Featured Services This Month</CardTitle>
            <CardDescription>Special highlights from our business community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
                <Utensils className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                <h3 className="font-semibold mb-2">Festival Catering</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Special catering packages for Diwali, Holi, and other Hindu festivals
                </p>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">Wedding Collections</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete bridal collections and wedding attire for the season
                </p>
                <Button size="sm" variant="outline">
                  Explore
                </Button>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg">
                <Heart className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Wellness Programs</h3>
                <p className="text-sm text-gray-600 mb-4">
                  New year wellness programs including yoga, meditation, and Ayurveda
                </p>
                <Button size="sm" variant="outline">
                  Join Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a Specific Service?</h2>
            <p className="text-lg mb-6 opacity-90">
              Can't find what you're looking for? Let us help you connect with the right business in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                Request a Service
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                Browse All Businesses
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
