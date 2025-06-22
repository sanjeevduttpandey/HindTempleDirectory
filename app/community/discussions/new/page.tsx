"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CheckCircle, X, Hash } from "lucide-react"
import Link from "next/link"

export default function NewDiscussionPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    tags: [] as string[],
    currentTag: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    "General Discussion",
    "Food & Dining",
    "Festivals",
    "Education",
    "Health & Wellness",
    "Travel & Tourism",
    "Business & Professional",
    "Family & Relationships",
    "Spirituality",
    "Culture & Traditions",
    "Technology",
    "Housing & Accommodation",
    "Events & Meetups",
    "Help & Support",
    "Other",
  ]

  const cities = [
    "All Cities",
    "Auckland",
    "Wellington",
    "Christchurch",
    "Hamilton",
    "Tauranga",
    "Dunedin",
    "Palmerston North",
    "Napier",
    "Rotorua",
    "New Plymouth",
    "Other",
  ]

  const popularTags = [
    "vegetarian",
    "temples",
    "festivals",
    "yoga",
    "sanskrit",
    "cooking",
    "music",
    "dance",
    "meditation",
    "community",
    "children",
    "seniors",
    "volunteers",
    "recommendations",
    "advice",
    "help-needed",
  ]

  const addTag = (tag: string) => {
    const cleanTag = tag.toLowerCase().trim().replace(/\s+/g, "-")
    if (cleanTag && !formData.tags.includes(cleanTag) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, cleanTag], currentTag: "" })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(formData.currentTag)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Discussion Posted!</h2>
            <p className="text-gray-600 mb-6">
              Your discussion has been posted successfully. Community members can now view and respond to your topic.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link href="/community">View Discussions</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/community/discussions/new">Start Another Discussion</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/community" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Start Discussion</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Start a Discussion</h2>
            <p className="text-xl text-gray-600">
              Share your thoughts, ask questions, or start conversations with the Hindu community
            </p>
          </div>

          {/* Guidelines */}
          <Card className="mb-8 bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg text-orange-800">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-orange-700">
              <ul className="space-y-2 text-sm">
                <li>• Be respectful and kind to all community members</li>
                <li>• Keep discussions relevant to the Hindu community in New Zealand</li>
                <li>• Use clear, descriptive titles that help others understand your topic</li>
                <li>• Add relevant tags to help others find your discussion</li>
                <li>• Avoid spam, self-promotion, or inappropriate content</li>
              </ul>
            </CardContent>
          </Card>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>New Discussion</CardTitle>
              <CardDescription>Share your thoughts, questions, or ideas with the community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Discussion Title *</Label>
                  <Input
                    id="title"
                    required
                    placeholder="e.g., Best places for vegetarian food in Auckland?"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    maxLength={100}
                  />
                  <p className="text-sm text-gray-500">{formData.title.length}/100 characters</p>
                </div>

                {/* Category and City */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select required onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
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
                  <div className="space-y-2">
                    <Label htmlFor="city">Relevant City (Optional)</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, city: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Discussion Content *</Label>
                  <Textarea
                    id="content"
                    required
                    placeholder="Share your thoughts, ask your question, or describe what you'd like to discuss..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    maxLength={2000}
                  />
                  <p className="text-sm text-gray-500">{formData.content.length}/2000 characters</p>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <p className="text-sm text-gray-500 mb-2">Add up to 5 tags to help others find your discussion</p>
                  </div>

                  {/* Current Tags */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-600">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Add Tag Input */}
                  {formData.tags.length < 5 && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={formData.currentTag}
                        onChange={(e) => setFormData({ ...formData, currentTag: e.target.value })}
                        onKeyPress={handleKeyPress}
                        maxLength={20}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addTag(formData.currentTag)}
                        disabled={!formData.currentTag.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  )}

                  {/* Popular Tags */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Popular tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularTags
                        .filter((tag) => !formData.tags.includes(tag))
                        .slice(0, 8)
                        .map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => addTag(tag)}
                            disabled={formData.tags.length >= 5}
                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-orange-100 rounded-full text-gray-700 hover:text-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            #{tag}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Post Discussion
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Need help with posting?{" "}
              <Link href="/help/discussions" className="text-orange-600 hover:underline">
                View posting guidelines
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
