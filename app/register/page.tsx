"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, Phone, User, Facebook, Chrome, Github, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { initiateGoogleOAuth, initiateFacebookOAuth, initiateGitHubOAuth } from "@/lib/social-auth"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1) // Multi-step registration
  const [registrationMethod, setRegistrationMethod] = useState<"email" | "social" | null>(null)

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    spiritualName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Location
    city: "",
    address: "",

    // Spiritual Information
    gotra: "",
    rashi: "",
    nakshatra: "",
    spiritualPractices: [] as string[],

    // Account Security
    password: "",
    confirmPassword: "",

    // Preferences
    interests: [] as string[],
    bio: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
    allowCommunityContact: true,
  })

  const cities = [
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
    "Invercargill",
    "Nelson",
    "Other",
  ]

  const rashis = [
    "Mesha (Aries)",
    "Vrishabha (Taurus)",
    "Mithuna (Gemini)",
    "Karka (Cancer)",
    "Simha (Leo)",
    "Kanya (Virgo)",
    "Tula (Libra)",
    "Vrishchika (Scorpio)",
    "Dhanu (Sagittarius)",
    "Makara (Capricorn)",
    "Kumbha (Aquarius)",
    "Meena (Pisces)",
  ]

  const spiritualPractices = [
    "Daily Puja",
    "Meditation",
    "Yoga",
    "Bhajan Singing",
    "Scripture Reading",
    "Fasting (Vrat)",
    "Mantra Chanting",
    "Temple Visits",
    "Seva (Service)",
    "Satsang Participation",
    "Pilgrimage",
    "Ayurvedic Lifestyle",
  ]

  const interests = [
    "Temple Activities",
    "Cultural Events",
    "Festivals",
    "Yoga & Meditation",
    "Sanskrit Learning",
    "Classical Music",
    "Dance",
    "Cooking",
    "Philosophy",
    "Community Service",
    "Youth Programs",
    "Senior Activities",
    "Spiritual Discussions",
    "Religious Education",
  ]

  const handleSocialRegistration = async (provider: string) => {
    setIsLoading(true)
    setError("")

    try {
      let accessToken: string

      switch (provider.toLowerCase()) {
        case "google":
          accessToken = await initiateGoogleOAuth()
          break
        case "facebook":
          accessToken = await initiateFacebookOAuth()
          break
        case "github":
          accessToken = await initiateGitHubOAuth()
          break
        default:
          throw new Error("Unsupported provider")
      }

      // Redirect to social registration page with provider and token
      router.push(`/register/social?provider=${provider.toLowerCase()}&token=${accessToken}`)
    } catch (error) {
      setError(`Failed to connect with ${provider}. Please try again.`)
      setIsLoading(false)
    }
  }

  const handleEmailRegistration = () => {
    setRegistrationMethod("email")
    setStep(2)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleArrayChange = (field: string, item: string, checked: boolean) => {
    const currentArray = formData[field as keyof typeof formData] as string[]
    if (checked) {
      handleInputChange(field, [...currentArray, item])
    } else {
      handleInputChange(
        field,
        currentArray.filter((i) => i !== item),
      )
    }
  }

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 2:
        return formData.firstName && formData.lastName && formData.email
      case 3:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
      case 4:
        return formData.city && formData.agreeToTerms
      default:
        return true
    }
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      setError("")
    } else {
      setError("Please fill in all required fields correctly.")
    }
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          spiritualName: formData.spiritualName,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          city: formData.city,
          address: formData.address,
          gotra: formData.gotra,
          rashi: formData.rashi,
          nakshatra: formData.nakshatra,
          spiritualPractices: formData.spiritualPractices,
          interests: formData.interests,
          bio: formData.bio,
          subscribeNewsletter: formData.subscribeNewsletter,
          allowCommunityContact: formData.allowCommunityContact,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/register/welcome")
      } else {
        setError(data.error || "Registration failed. Please try again.")
      }
    } catch (error) {
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
              <p className="text-sm text-gray-600">Join Our Spiritual Community</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          {step > 1 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Registration Progress</span>
                <span className="text-sm text-gray-600">{step - 1}/4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((step - 1) / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Step 1: Choose Registration Method */}
          {step === 1 && (
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                  🕉️ Welcome to Our Sangam
                </CardTitle>
                <CardDescription className="text-lg">
                  Join thousands of devotees across New Zealand in our spiritual community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Social Media Registration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center text-gray-900">
                    Quick Registration with Social Media
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    We'll automatically fetch your email, name, phone, and city from your social media account
                  </p>
                  <div className="grid gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleSocialRegistration("Google")}
                      disabled={isLoading}
                      className="w-full h-12 text-base"
                    >
                      <Chrome className="mr-3 h-5 w-5" />
                      Continue with Google
                      <span className="ml-auto text-xs text-green-600">Auto-fills details</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSocialRegistration("Facebook")}
                      disabled={isLoading}
                      className="w-full h-12 text-base"
                    >
                      <Facebook className="mr-3 h-5 w-5" />
                      Continue with Facebook
                      <span className="ml-auto text-xs text-green-600">Auto-fills details</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSocialRegistration("GitHub")}
                      disabled={isLoading}
                      className="w-full h-12 text-base"
                    >
                      <Github className="mr-3 h-5 w-5" />
                      Continue with GitHub
                      <span className="ml-auto text-xs text-green-600">Auto-fills details</span>
                    </Button>
                  </div>

                  {/* What gets fetched */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Information we'll retrieve:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>✓ Email address (primary identifier)</li>
                      <li>✓ Full name (first and last name)</li>
                      <li>✓ Profile picture (if available)</li>
                      <li>✓ Phone number (if shared)</li>
                      <li>✓ Location/City (if available)</li>
                      <li>✓ Date of birth (if shared)</li>
                    </ul>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm uppercase">
                    <span className="bg-white px-4 text-gray-500">Or register manually</span>
                  </div>
                </div>

                {/* Email Registration */}
                <div className="space-y-4">
                  <Button
                    onClick={handleEmailRegistration}
                    className="w-full h-12 text-base bg-orange-600 hover:bg-orange-700"
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    Register with Email
                  </Button>
                  <p className="text-sm text-gray-600 text-center">
                    Complete spiritual profile with detailed preferences (manual entry required)
                  </p>
                </div>

                {/* Benefits */}
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-3">Join our community to:</h4>
                  <ul className="space-y-2 text-sm text-orange-700">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Connect with local devotees and mandirs
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Participate in satsangs and festivals
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Access daily panchang and spiritual content
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Join spiritual discussions and study groups
                    </li>
                  </ul>
                </div>

                {/* Already have account */}
                <div className="text-center pt-4 border-t">
                  <p className="text-gray-600">
                    Already part of our spiritual community?{" "}
                    <Link href="/login" className="text-orange-600 hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Tell us about yourself, dear devotee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spiritualName">Spiritual Name (Optional)</Label>
                  <Input
                    id="spiritualName"
                    value={formData.spiritualName}
                    onChange={(e) => handleInputChange("spiritualName", e.target.value)}
                    placeholder="e.g., Devotee name or initiation name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        required
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+64 21 123 4567"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Select required onValueChange={(value) => handleInputChange("city", value)}>
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

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="bg-orange-600 hover:bg-orange-700">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Account Security */}
          {step === 3 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Account Security
                </CardTitle>
                <CardDescription>Create a secure password for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create strong password"
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
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="pl-10 pr-10"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {formData.password && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className={formData.password.length >= 8 ? "text-green-600" : ""}>
                        ✓ At least 8 characters long
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? "text-green-600" : ""}>
                        ✓ Contains uppercase letter
                      </li>
                      <li className={/[a-z]/.test(formData.password) ? "text-green-600" : ""}>
                        ✓ Contains lowercase letter
                      </li>
                      <li className={/\d/.test(formData.password) ? "text-green-600" : ""}>✓ Contains number</li>
                    </ul>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="bg-orange-600 hover:bg-orange-700">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Spiritual Information */}
          {step === 4 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🕉️ Spiritual Profile</CardTitle>
                <CardDescription>Help us personalize your spiritual journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rashi">Rashi (Zodiac Sign)</Label>
                    <Select onValueChange={(value) => handleInputChange("rashi", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rashi" />
                      </SelectTrigger>
                      <SelectContent>
                        {rashis.map((rashi) => (
                          <SelectItem key={rashi} value={rashi}>
                            {rashi}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gotra">Gotra (Optional)</Label>
                    <Input
                      id="gotra"
                      value={formData.gotra}
                      onChange={(e) => handleInputChange("gotra", e.target.value)}
                      placeholder="Your gotra"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nakshatra">Nakshatra (Optional)</Label>
                  <Input
                    id="nakshatra"
                    value={formData.nakshatra}
                    onChange={(e) => handleInputChange("nakshatra", e.target.value)}
                    placeholder="Your birth nakshatra"
                  />
                </div>

                {/* Spiritual Practices */}
                <div className="space-y-4">
                  <Label>Spiritual Practices (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {spiritualPractices.map((practice) => (
                      <div key={practice} className="flex items-center space-x-2">
                        <Checkbox
                          id={practice}
                          checked={formData.spiritualPractices.includes(practice)}
                          onCheckedChange={(checked) =>
                            handleArrayChange("spiritualPractices", practice, checked as boolean)
                          }
                        />
                        <Label htmlFor={practice} className="text-sm">
                          {practice}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-4">
                  <Label>Community Interests</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => handleArrayChange("interests", interest, checked as boolean)}
                        />
                        <Label htmlFor={interest} className="text-sm">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">About Your Spiritual Journey (Optional)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Share about your spiritual path, interests, or what you hope to gain from our community..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Terms and Preferences */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      required
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-orange-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-orange-600 hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                    />
                    <Label htmlFor="newsletter" className="text-sm">
                      Subscribe to spiritual updates and community newsletters
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="communityContact"
                      checked={formData.allowCommunityContact}
                      onCheckedChange={(checked) => handleInputChange("allowCommunityContact", checked as boolean)}
                    />
                    <Label htmlFor="communityContact" className="text-sm">
                      Allow fellow devotees to contact me for spiritual discussions
                    </Label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading || !formData.agreeToTerms}
                  >
                    {isLoading ? "Creating Account..." : "Complete Registration"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
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
