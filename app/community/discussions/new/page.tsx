"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewDiscussionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to discussions page
      router.push("/community/discussions")
    } catch (error) {
      console.error("Error creating discussion:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <Link
          href="/community/discussions"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discussions
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Start a New Discussion</CardTitle>
          <CardDescription>
            Share your thoughts, ask questions, or start a conversation with the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Discussion Title</Label>
              <Input
                id="title"
                placeholder="What would you like to discuss?"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Discussion</SelectItem>
                  <SelectItem value="spiritual">Spiritual Guidance</SelectItem>
                  <SelectItem value="events">Events & Festivals</SelectItem>
                  <SelectItem value="temples">Temples & Worship</SelectItem>
                  <SelectItem value="culture">Culture & Traditions</SelectItem>
                  <SelectItem value="community">Community Support</SelectItem>
                  <SelectItem value="questions">Questions & Answers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, experiences, or questions..."
                className="min-h-[200px]"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (optional)</Label>
              <Input
                id="tags"
                placeholder="Add tags separated by commas (e.g., meditation, festivals, prayer)"
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">Tags help others find your discussion more easily.</p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Discussion"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
