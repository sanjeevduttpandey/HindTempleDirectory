"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, Eye, EyeOff, Facebook, Chrome, Github, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get("message")

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store user session data if needed
        if (typeof window !== "undefined") {
          localStorage.setItem("devotee", JSON.stringify(data.devotee))
        }

        // Redirect to dashboard
        window.location.href = "/dashboard"
      } else {
        setError(data.error || "Login failed. Please check your credentials.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
              <p className="text-sm text-gray-600">Welcome Back, Devotee</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Success Message */}
          {message && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{message}</AlertDescription>
            </Alert>
          )}

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">🕉️ Welcome Back</CardTitle>
              <CardDescription>Sign in to continue your spiritual journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Login Options */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("Google")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("Facebook")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Continue with Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("GitHub")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Continue with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      className="pl-10"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-10 pr-10"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="rememberMe" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-orange-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              {/* Register Link */}
              <div className="text-center">
                <Separator className="my-4" />
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">New to our spiritual community?</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/register">Create Your Devotee Account</Link>
                  </Button>
                  <p className="text-xs text-gray-500">Join thousands of devotees across New Zealand</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="text-center space-y-2 pt-4 border-t">
                <p className="text-sm font-medium text-gray-700">Quick Access</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <Link href="/temples" className="text-orange-600 hover:underline">
                    Find Mandirs
                  </Link>
                  <Link href="/events" className="text-orange-600 hover:underline">
                    View Satsangs
                  </Link>
                  <Link href="/community" className="text-orange-600 hover:underline">
                    Join Discussions
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-gray-600">Need help with your account?</p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/help" className="text-orange-600 hover:underline">
                Help Center
              </Link>
              <Link href="/contact" className="text-orange-600 hover:underline">
                Contact Support
              </Link>
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
          <p className="text-gray-400 text-sm mb-4">
            Connecting the Hindu community across New Zealand through dharma, culture, and unity.
          </p>
          <div className="text-sm text-gray-400">
            <p>&copy; 2024 Sanatan New Zealand. All rights reserved. 🕉️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
