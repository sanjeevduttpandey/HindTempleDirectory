"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Share2, Users, MapPin, Plus, Search, TrendingUp } from "lucide-react"
import Link from "next/link"

const discussions = [
  {
    id: 1,
    title: "Best places for vegetarian food in Auckland?",
    author: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    city: "Auckland",
    category: "Food & Dining",
    replies: 12,
    likes: 8,
    timeAgo: "2 hours ago",
    content: "Looking for authentic vegetarian restaurants that serve good Indian food. Any recommendations?",
    tags: ["vegetarian", "restaurants", "auckland"],
  },
  {
    id: 2,
    title: "Organizing Karva Chauth celebration in Wellington",
    author: "Meera Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    city: "Wellington",
    category: "Festivals",
    replies: 8,
    likes: 15,
    timeAgo: "4 hours ago",
    content: "Planning a community Karva Chauth celebration. Looking for volunteers and venue suggestions.",
    tags: ["karva-chauth", "festival", "wellington", "volunteers"],
  },
  {
    id: 3,
    title: "Sanskrit learning group in Hamilton",
    author: "Raj Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    city: "Hamilton",
    category: "Education",
    replies: 15,
    likes: 22,
    timeAgo: "1 day ago",
    content: "Starting a Sanskrit study group for beginners. Meeting every Saturday at the local temple.",
    tags: ["sanskrit", "learning", "hamilton", "study-group"],
  },
  {
    id: 4,
    title: "Yoga classes for children in Christchurch",
    author: "Anita Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    city: "Christchurch",
    category: "Health & Wellness",
    replies: 6,
    likes: 11,
    timeAgo: "2 days ago",
    content: "Looking for qualified yoga instructors who can teach children aged 6-12. Cultural context important.",
    tags: ["yoga", "children", "christchurch", "wellness"],
  },
]

const groups = [
  {
    id: 1,
    name: "Auckland Hindu Families",
    members: 245,
    city: "Auckland",
    description: "Connect with Hindu families in Auckland for playdates, cultural events, and community support.",
    image: "/placeholder.svg?height=100&width=100",
    category: "Family",
  },
  {
    id: 2,
    name: "Wellington Young Professionals",
    members: 89,
    city: "Wellington",
    description: "Networking and social group for young Hindu professionals in the capital.",
    image: "/placeholder.svg?height=100&width=100",
    category: "Professional",
  },
  {
    id: 3,
    name: "Christchurch Cultural Society",
    members: 156,
    city: "Christchurch",
    description: "Preserving and celebrating Hindu culture through events, workshops, and festivals.",
    image: "/placeholder.svg?height=100&width=100",
    category: "Cultural",
  },
  {
    id: 4,
    name: "Hamilton Bhajan Group",
    members: 67,
    city: "Hamilton",
    description: "Weekly bhajan sessions and spiritual discussions for devotees in Hamilton.",
    image: "/placeholder.svg?height=100&width=100",
    category: "Spiritual",
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [searchTerm, setSearchTerm] = useState("")

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
                <p className="text-sm text-gray-600">Community Hub</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium">
                Home
              </Link>
              <Link href="/temples" className="text-gray-700 hover:text-orange-600 font-medium">
                Temples
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-orange-600 font-medium">
                Events
              </Link>
              <Link href="/community" className="text-orange-600 font-medium">
                Community
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Community Hub</h2>
          <p className="text-xl mb-8 opacity-90">
            Connect, share, and grow together with the Hindu community across New Zealand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link href="/community/discussions/new">
                <Plus className="mr-2 h-5 w-5" />
                Start Discussion
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600"
              asChild
            >
              <Link href="/community/groups">
                <Users className="mr-2 h-5 w-5" />
                Browse Groups
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="groups">Local Groups</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href="/community/discussions/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Discussion
                  </Link>
                </Button>
              </div>

              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-orange-600" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">#diwali2024</Badge>
                    <Badge variant="secondary">#vegetarian-recipes</Badge>
                    <Badge variant="secondary">#sanskrit-learning</Badge>
                    <Badge variant="secondary">#temple-events</Badge>
                    <Badge variant="secondary">#yoga-classes</Badge>
                    <Badge variant="secondary">#cultural-programs</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Discussions List */}
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                          <AvatarFallback>
                            {discussion.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-600 cursor-pointer">
                              {discussion.title}
                            </h3>
                            <Badge variant="outline">{discussion.category}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{discussion.content}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="font-medium">{discussion.author}</span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {discussion.city}
                              </span>
                              <span>{discussion.timeAgo}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-orange-600">
                                <Heart className="h-4 w-4" />
                                <span className="text-sm">{discussion.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-orange-600">
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-sm">{discussion.replies}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-gray-500 hover:text-orange-600">
                                <Share2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input placeholder="Search groups..." className="pl-10" />
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href="/community/groups/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Group
                  </Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {groups.map((group) => (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Users className="h-8 w-8 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                            <Badge variant="outline">{group.category}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {group.members} members
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {group.city}
                              </span>
                            </div>
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700" asChild>
                              <Link href={`/community/groups/${group.id}/join`}>Join Group</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Member Directory</h3>
                <p className="text-gray-600 mb-6">Connect with fellow community members across New Zealand</p>
                <Button className="bg-orange-600 hover:bg-orange-700">Coming Soon</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
