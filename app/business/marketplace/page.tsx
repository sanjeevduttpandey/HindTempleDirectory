"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Heart, ShoppingCart, Star, MapPin, Clock } from "lucide-react"
import { StaticHeader } from "@/components/static-header"

const marketplaceItems = [
  {
    id: 1,
    title: "Handmade Brass Diya Set (12 pieces)",
    price: 45,
    originalPrice: 60,
    seller: "Divine Crafts NZ",
    location: "Auckland",
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=200&width=200&text=Brass+Diya+Set",
    category: "Religious Items",
    condition: "New",
    shipping: "Free shipping",
    featured: true,
  },
  {
    id: 2,
    title: "Organic Turmeric Powder - 500g",
    price: 18,
    seller: "Spice Garden",
    location: "Wellington",
    rating: 4.9,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=200&text=Turmeric+Powder",
    category: "Grocery & Spices",
    condition: "New",
    shipping: "$5 shipping",
  },
  {
    id: 3,
    title: "Beautiful Silk Saree - Wedding Collection",
    price: 280,
    originalPrice: 350,
    seller: "Elegant Sarees",
    location: "Christchurch",
    rating: 4.7,
    reviews: 15,
    image: "/placeholder.svg?height=200&width=200&text=Silk+Saree",
    category: "Clothing",
    condition: "New",
    shipping: "Free shipping",
  },
  {
    id: 4,
    title: "Ayurvedic Herbal Tea Blend - 100g",
    price: 25,
    seller: "Wellness Herbs",
    location: "Hamilton",
    rating: 4.6,
    reviews: 32,
    image: "/placeholder.svg?height=200&width=200&text=Herbal+Tea",
    category: "Health & Wellness",
    condition: "New",
    shipping: "$3 shipping",
  },
  {
    id: 5,
    title: "Tabla Set with Carrying Case",
    price: 450,
    originalPrice: 520,
    seller: "Music Instruments NZ",
    location: "Auckland",
    rating: 4.9,
    reviews: 8,
    image: "/placeholder.svg?height=200&width=200&text=Tabla+Set",
    category: "Musical Instruments",
    condition: "New",
    shipping: "Free shipping",
    featured: true,
  },
  {
    id: 6,
    title: "Homemade Ghee - Pure & Organic 500ml",
    price: 22,
    seller: "Pure Dairy",
    location: "Tauranga",
    rating: 4.8,
    reviews: 45,
    image: "/placeholder.svg?height=200&width=200&text=Pure+Ghee",
    category: "Food & Dairy",
    condition: "New",
    shipping: "$4 shipping",
  },
]

const categories = [
  "All Categories",
  "Religious Items",
  "Grocery & Spices",
  "Clothing",
  "Health & Wellness",
  "Musical Instruments",
  "Food & Dairy",
  "Books & Media",
  "Home Decor",
  "Jewelry",
]

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("featured")
  const [activeTab, setActiveTab] = useState("all")

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
    const matchesTab = activeTab === "all" || (activeTab === "featured" && item.featured)

    return matchesSearch && matchesCategory && matchesTab
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hindu Community Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Buy and sell authentic Hindu products, handmade items, and specialty goods within our community
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
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

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-orange-600 hover:bg-orange-700">Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="local">Local Sellers</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {item.featured && <Badge className="absolute top-2 left-2 bg-orange-600">Featured</Badge>}
                    <Button size="sm" variant="outline" className="absolute top-2 right-2 p-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{item.rating}</span>
                        <span className="text-xs text-gray-500">({item.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-orange-600">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                    </div>

                    <div className="text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.shipping}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3">Sold by {item.seller}</p>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems
                .filter((item) => item.featured)
                .map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    {/* Same card content as above */}
                    <div className="relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-orange-600">Featured</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-orange-600">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                        )}
                      </div>
                      <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="local" className="mt-6">
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Local sellers feature coming soon!</p>
              <Button variant="outline">Browse All Products</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Seller CTA */}
        <Card className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Sell Your Products?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join our marketplace and reach thousands of Hindu community members across New Zealand
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Start Selling Today
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
