"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Lock, Mail, CheckCircle, Info, ArrowRight, Chrome, Shield, BookOpen, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function UserManualPage() {
  const [activeSection, setActiveSection] = useState("overview")

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
              <p className="text-sm text-gray-600">User Manual & Guide</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 text-orange-600" />
              Complete User Manual
            </h1>
            <p className="text-xl text-gray-600">
              Your comprehensive guide to joining and using the Sanatan New Zealand platform
            </p>
          </div>

          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="registration" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Registration
              </TabsTrigger>
              <TabsTrigger value="login" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Password
              </TabsTrigger>
              <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Help
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">🕉️ Welcome to Sanatan New Zealand</CardTitle>
                  <CardDescription>
                    Your spiritual community platform connecting Hindu devotees across New Zealand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Platform Features</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Connect with local mandirs and devotees
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Join satsangs and spiritual events
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Access daily panchang and spiritual content
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Participate in community discussions
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Make donations (daan) to temples
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Getting Started</h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                          <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            1
                          </span>
                          <span className="text-gray-700">Create your devotee account</span>
                        </div>
                        <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                          <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            2
                          </span>
                          <span className="text-gray-700">Complete your spiritual profile</span>
                        </div>
                        <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                          <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            3
                          </span>
                          <span className="text-gray-700">Explore mandirs and join events</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      This manual covers everything you need to know about registering, logging in, and managing your
                      account on the Sanatan New Zealand platform.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Registration Tab */}
            <TabsContent value="registration" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Devotee Registration Guide
                  </CardTitle>
                  <CardDescription>Step-by-step guide to creating your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Registration Methods */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Registration Methods</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Chrome className="h-4 w-4" />
                          Quick Social Registration
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Use existing Google, Facebook, or GitHub account</li>
                          <li>• Instant account creation</li>
                          <li>• Optional profile completion later</li>
                          <li>• Best for quick access</li>
                        </ul>
                        <Badge variant="outline" className="mt-2">
                          Recommended for beginners
                        </Badge>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Detailed Email Registration
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Complete spiritual profile setup</li>
                          <li>• Custom password creation</li>
                          <li>• Detailed preferences and interests</li>
                          <li>• Full community integration</li>
                        </ul>
                        <Badge variant="outline" className="mt-2">
                          Recommended for active users
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Process */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Email Registration Process</h3>

                    {/* Step 1 */}
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-medium text-gray-900 mb-2">Step 1: Choose Registration Method</h4>
                      <p className="text-gray-600 mb-3">
                        Visit the registration page and select "Register with Email" for detailed profile setup.
                      </p>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <strong>URL:</strong> <code>https://sanatannz.com/register</code>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-medium text-gray-900 mb-2">Step 2: Personal Information</h4>
                      <p className="text-gray-600 mb-3">Fill in your basic personal details:</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Required Fields:</strong>
                          <ul className="mt-1 space-y-1 text-gray-600">
                            <li>• First Name</li>
                            <li>• Last Name</li>
                            <li>• Email Address</li>
                            <li>• City (New Zealand)</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Optional Fields:</strong>
                          <ul className="mt-1 space-y-1 text-gray-600">
                            <li>• Spiritual Name</li>
                            <li>• Phone Number</li>
                            <li>• Date of Birth</li>
                            <li>• Gender</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-medium text-gray-900 mb-2">Step 3: Password Creation</h4>
                      <p className="text-gray-600 mb-3">Create a secure password for your account:</p>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h5 className="font-medium text-yellow-800 mb-2">Password Requirements:</h5>
                        <ul className="space-y-1 text-sm text-yellow-700">
                          <li>✓ At least 8 characters long</li>
                          <li>✓ Contains uppercase letter (A-Z)</li>
                          <li>✓ Contains lowercase letter (a-z)</li>
                          <li>✓ Contains at least one number (0-9)</li>
                          <li>✓ Confirm password must match</li>
                        </ul>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-medium text-gray-900 mb-2">Step 4: Spiritual Profile</h4>
                      <p className="text-gray-600 mb-3">Complete your spiritual and community preferences:</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Spiritual Information:</strong>
                          <ul className="mt-1 space-y-1 text-gray-600">
                            <li>• Rashi (Zodiac Sign)</li>
                            <li>• Gotra (Family Lineage)</li>
                            <li>• Nakshatra (Birth Star)</li>
                            <li>• Spiritual Practices</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Community Preferences:</strong>
                          <ul className="mt-1 space-y-1 text-gray-600">
                            <li>• Interests and Activities</li>
                            <li>• Newsletter Subscription</li>
                            <li>• Community Contact Permissions</li>
                            <li>• Terms and Privacy Agreement</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      After successful registration, you'll be redirected to a welcome page with next steps to explore
                      the platform.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Login Guide
                  </CardTitle>
                  <CardDescription>How to access your devotee account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Login Methods</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">From Homepage</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Click "Sign In" in the navigation menu</li>
                          <li>• Use the quick login card in hero section</li>
                          <li>• Access login modal from any page</li>
                        </ul>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Direct Login Page</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Visit /login directly</li>
                          <li>• Bookmark for quick access</li>
                          <li>• Full-featured login experience</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Login Process</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-900 mb-2">Step 1: Enter Credentials</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Email address (used during registration)</li>
                          <li>• Password (created during registration)</li>
                          <li>• Optional: Check "Remember me" for 30 days</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-900 mb-2">Step 2: Social Login (Alternative)</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Click Google, Facebook, or GitHub button</li>
                          <li>• Authorize access to your social account</li>
                          <li>• Automatic login and redirect</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-900 mb-2">Step 3: Dashboard Access</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Automatic redirect to personalized dashboard</li>
                          <li>• Access to all platform features</li>
                          <li>• Session valid for 7 days</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      If you forget your password, use the "Forgot Password" link on the login page to reset it via
                      email.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Password Management Tab */}
            <TabsContent value="password" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Password Management
                  </CardTitle>
                  <CardDescription>Creating, updating, and securing your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Password Creation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Password Creation (During Registration)</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Security Requirements</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Minimum Requirements:</strong>
                          <ul className="mt-1 space-y-1 text-blue-700">
                            <li>✓ 8+ characters length</li>
                            <li>✓ Uppercase letter (A-Z)</li>
                            <li>✓ Lowercase letter (a-z)</li>
                            <li>✓ Number (0-9)</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Best Practices:</strong>
                          <ul className="mt-1 space-y-1 text-blue-700">
                            <li>• Use unique password</li>
                            <li>• Include special characters</li>
                            <li>• Avoid personal information</li>
                            <li>• Use password manager</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Password Update */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Password Update (Self-Service)</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium text-gray-900 mb-2">Via Profile Page</h4>
                        <ol className="space-y-2 text-gray-600">
                          <li>1. Login to your account</li>
                          <li>2. Go to Profile → Settings tab</li>
                          <li>3. Click "Change Password" button</li>
                          <li>4. Enter current password</li>
                          <li>5. Enter new password (twice)</li>
                          <li>6. Click "Update Password"</li>
                        </ol>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium text-gray-900 mb-2">Forgot Password Reset</h4>
                        <ol className="space-y-2 text-gray-600">
                          <li>1. Go to login page</li>
                          <li>2. Click "Forgot Password?" link</li>
                          <li>3. Enter your email address</li>
                          <li>4. Check email for reset link</li>
                          <li>5. Click link and create new password</li>
                          <li>6. Login with new password</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Security Tips */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Security Tips</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">✓ Do This</h4>
                        <ul className="space-y-1 text-sm text-green-700">
                          <li>• Use unique passwords for each account</li>
                          <li>• Enable two-factor authentication</li>
                          <li>• Update password regularly</li>
                          <li>• Use password manager</li>
                          <li>• Log out from shared devices</li>
                        </ul>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">✗ Avoid This</h4>
                        <ul className="space-y-1 text-sm text-red-700">
                          <li>• Don't share passwords</li>
                          <li>• Don't use personal information</li>
                          <li>• Don't save on public computers</li>
                          <li>• Don't use simple patterns</li>
                          <li>• Don't ignore security warnings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Troubleshooting Tab */}
            <TabsContent value="troubleshooting" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Troubleshooting & FAQ
                  </CardTitle>
                  <CardDescription>Common issues and solutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">❓ Can't receive registration email?</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Check spam/junk folder</li>
                        <li>• Verify email address spelling</li>
                        <li>• Wait 5-10 minutes for delivery</li>
                        <li>• Try different email provider</li>
                        <li>• Contact support if issue persists</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">❓ Forgot password?</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Use "Forgot Password" on login page</li>
                        <li>• Check email for reset link</li>
                        <li>• Link expires in 1 hour</li>
                        <li>• Create strong new password</li>
                        <li>• Contact support if no email received</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">❓ Account locked or suspended?</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Multiple failed login attempts</li>
                        <li>• Wait 15 minutes before retry</li>
                        <li>• Use password reset if needed</li>
                        <li>• Contact support for account issues</li>
                        <li>• Verify email address is confirmed</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">❓ Social login not working?</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Clear browser cache and cookies</li>
                        <li>• Disable ad blockers temporarily</li>
                        <li>• Try different browser</li>
                        <li>• Check social account permissions</li>
                        <li>• Use email login as alternative</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">❓ Profile information not saving?</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Check internet connection</li>
                        <li>• Fill all required fields</li>
                        <li>• Refresh page and try again</li>
                        <li>• Clear browser cache</li>
                        <li>• Contact support if issue continues</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-orange-800 mb-3">Need More Help?</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2">Contact Support</h4>
                        <ul className="space-y-1 text-sm text-orange-600">
                          <li>📧 Email: support@sanatannz.com</li>
                          <li>📞 Phone: +64 9 123 4567</li>
                          <li>💬 Live Chat: Available 9 AM - 6 PM</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2">Community Help</h4>
                        <ul className="space-y-1 text-sm text-orange-600">
                          <li>🗣️ Community Forum</li>
                          <li>📚 Knowledge Base</li>
                          <li>🎥 Video Tutorials</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Action Buttons */}
          <div className="mt-12 text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Ready to Get Started?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/register">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/help">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
