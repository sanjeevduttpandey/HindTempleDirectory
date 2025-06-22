"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  Video,
  Users,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "New to our platform? Start here",
      icon: BookOpen,
      links: [
        { title: "Complete User Manual", href: "/help/user-manual", badge: "Comprehensive" },
        { title: "Registration Guide", href: "/help/user-manual#registration" },
        { title: "Login Instructions", href: "/help/user-manual#login" },
        { title: "Profile Setup", href: "/help/user-manual#profile" },
      ],
    },
    {
      title: "Account & Security",
      description: "Manage your account safely",
      icon: HelpCircle,
      links: [
        { title: "Password Management", href: "/help/user-manual#password", badge: "Important" },
        { title: "Two-Factor Authentication", href: "/help/security" },
        { title: "Privacy Settings", href: "/help/privacy" },
        { title: "Account Recovery", href: "/help/recovery" },
      ],
    },
    {
      title: "Community Features",
      description: "Connect with fellow devotees",
      icon: Users,
      links: [
        { title: "Finding Mandirs", href: "/help/temples" },
        { title: "Joining Satsangs", href: "/help/events" },
        { title: "Community Discussions", href: "/help/discussions" },
        { title: "Making Donations", href: "/help/donations" },
      ],
    },
    {
      title: "Technical Support",
      description: "Troubleshooting and technical help",
      icon: MessageCircle,
      links: [
        { title: "Common Issues", href: "/help/user-manual#troubleshooting" },
        { title: "Browser Compatibility", href: "/help/technical" },
        { title: "Mobile App Guide", href: "/help/mobile" },
        { title: "System Requirements", href: "/help/requirements" },
      ],
    },
  ]

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
              <p className="text-sm text-gray-600">Help & Support Center</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <HelpCircle className="h-10 w-10 text-orange-600" />
              Help & Support
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to your questions and get the help you need to make the most of our spiritual community
              platform
            </p>
          </div>

          {/* Quick Access to User Manual */}
          <Card className="mb-12 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                    Complete User Manual
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Comprehensive guide covering registration, login, password management, and all platform features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Step-by-step guides</Badge>
                    <Badge variant="outline">Screenshots included</Badge>
                    <Badge variant="outline">Troubleshooting tips</Badge>
                  </div>
                </div>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
                  <Link href="/help/user-manual">
                    View User Manual
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-orange-600" />
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 group-hover:text-orange-600">{link.title}</span>
                          {link.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {link.badge}
                            </Badge>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>Can't find what you're looking for? Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <Mail className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-sm text-gray-600 mb-4">Get detailed help via email</p>
                  <Button variant="outline" asChild className="w-full">
                    <a href="mailto:support@sanatannz.com">
                      support@sanatannz.com
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="text-center p-6 border rounded-lg">
                  <Phone className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                  <p className="text-sm text-gray-600 mb-4">Speak directly with our team</p>
                  <Button variant="outline" asChild className="w-full">
                    <a href="tel:+6491234567">
                      +64 9 123 4567
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="text-center p-6 border rounded-lg">
                  <MessageCircle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-sm text-gray-600 mb-4">Instant help during business hours</p>
                  <Button variant="outline" className="w-full">
                    Start Chat
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Support Hours</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM NZST
                  </div>
                  <div>
                    <strong>Saturday - Sunday:</strong> 10:00 AM - 4:00 PM NZST
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Additional Resources
              </CardTitle>
              <CardDescription>More ways to learn and get help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Documentation</h4>
                  <div className="space-y-2">
                    <Link href="/help/api" className="flex items-center text-orange-600 hover:underline">
                      <FileText className="h-4 w-4 mr-2" />
                      API Documentation
                    </Link>
                    <Link href="/help/developers" className="flex items-center text-orange-600 hover:underline">
                      <FileText className="h-4 w-4 mr-2" />
                      Developer Guide
                    </Link>
                    <Link href="/help/changelog" className="flex items-center text-orange-600 hover:underline">
                      <FileText className="h-4 w-4 mr-2" />
                      Changelog
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Community</h4>
                  <div className="space-y-2">
                    <Link href="/community/discussions" className="flex items-center text-orange-600 hover:underline">
                      <Users className="h-4 w-4 mr-2" />
                      Community Forum
                    </Link>
                    <Link href="/help/tutorials" className="flex items-center text-orange-600 hover:underline">
                      <Video className="h-4 w-4 mr-2" />
                      Video Tutorials
                    </Link>
                    <Link href="/help/faq" className="flex items-center text-orange-600 hover:underline">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Frequently Asked Questions
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
