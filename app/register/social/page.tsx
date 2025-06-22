"use client"

import type React from "react"

import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { fetchGoogleUserData, fetchFacebookUserData, fetchGitHubUserData, type SocialUserData } from "@/lib/social-auth"

export default function SocialRegistrationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const provider = searchParams.get("provider") as "google" | "facebook" | "github"
  const accessToken = searchParams.get("token")

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [socialData, setSocialData] = useState<SocialUserData | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    // Pre-filled from social media
    email: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    phone: "",
    city: "",
    dateOfBirth: "",
    gender: "",

    // Additional required fields
    spiritualName: "",
    address: "",
    password: "",
    confirmPassword: "",

    // Spiritual Information
    gotra: "",
    rashi: "",
    nakshatra: "",
    spiritualPractices: [] as string[],
    interests: [] as string[],
    bio: "",

    // Preferences
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
  ]

  // Fetch social media data on component mount
  useEffect(() => {
    const fetchSocialData = async () => {
      if (!provider || !accessToken) {
        setError("Invalid social media authentication")
        setIsLoading(false)
        return
      }

      try {
        let userData: SocialUserData

        switch (provider) {
          case "google":
            userData = await fetchGoogleUserData(accessToken)
            break
          case "facebook":
            userData = await fetchFacebookUserData(accessToken)
            break
          case "github":
            userData = await fetchGitHubUserData(accessToken)
            break
          default:
            throw new Error("Unsupported provider")
        }

        setSocialData(userData)
        setFormData((prev) => ({
          ...prev,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profilePicture: userData.profilePicture || "",
          phone: userData.phone || "",
          city: userData.city || "",
          dateOfBirth: userData.dateOfBirth || "",
          gender: userData.gender || "",
        }))
      } catch (error) {
        setError("Failed to fetch user data from " + provider)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSocialData()
  }, [provider, accessToken])

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
      case 1:
        return formData.email && formData.firstName && formData.lastName && formData.city
      case 2:
        return (
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword &&
          formData.password.length >= 8
        )
      case 3:
        return formData.agreeToTerms
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          socialProvider: provider,
          socialId: socialData?.id,
          profilePicture: formData.profilePicture,
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Fetching Your Information</h3>
            <p className="text-gray-600 text-center">We're retrieving your details from {provider}...</p>
          </CardContent>
        </Card>
      </div>
    )
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
              <p className="text-sm text-gray-600">Complete Your Registration</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Registration Progress</span>
              <span className="text-sm text-gray-600">{step}/3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Social Media Info Display */}
          {socialData && (
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Information Retrieved from {provider.charAt(0).toUpperCase() + provider.slice(1)}
                </CardTitle>
                <CardDescription className="text-green-700">
                  We've automatically filled in your details from your {provider} account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Email:</span>
                    <Badge variant="secondary">{socialData.email}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Name:</span>
                    <Badge variant="secondary">
                      {socialData.firstName} {socialData.lastName}
                    </Badge>
                  </div>
                  {socialData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Phone:</span>
                      <Badge variant="secondary">{socialData.phone}</Badge>
                    </div>
                  )}
                  {socialData.city && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="font-medium">City:</span>
                      <Badge variant="secondary">{socialData.city}</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 1: Verify and Complete Personal Information */}
          {step === 1 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Verify Your Information
                </CardTitle>
                <CardDescription>Please verify and complete your personal information</CardDescription>
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
                      className="bg-green-50 border-green-200"
                    />
                    <p className="text-xs text-green-600">✓ Retrieved from {provider}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-green-50 border-green-200"
                    />
                    <p className="text-xs text-green-600">✓ Retrieved from {provider}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-green-50 border-green-200"
                    disabled
                  />
                  <p className="text-xs text-green-600">✓ Retrieved from {provider} (cannot be changed)</p>
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={formData.phone ? "bg-green-50 border-green-200" : ""}
                      placeholder="+64 21 123 4567"
                    />
                    {formData.phone && <p className="text-xs text-green-600">✓ Retrieved from {provider}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                      <SelectTrigger className={formData.city ? "bg-green-50 border-green-200" : ""}>
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
                    {formData.city && <p className="text-xs text-green-600">✓ Retrieved from {provider}</p>}
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
                      className={formData.dateOfBirth ? "bg-green-50 border-green-200" : ""}
                    />
                    {formData.dateOfBirth && <p className="text-xs text-green-600">✓ Retrieved from {provider}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className={formData.gender ? "bg-green-50 border-green-200" : ""}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.gender && <p className="text-xs text-green-600">✓ Retrieved from {provider}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address (Optional)</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Your address"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/register">Back to Registration Options</Link>
                  </Button>
                  <Button onClick={handleNextStep} className="bg-orange-600 hover:bg-orange-700">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Account Security */}
          {step === 2 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Create Account Password
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

                {formData.password && formData.confirmPassword && (
                  <div
                    className={`p-3 rounded-lg ${
                      formData.password === formData.confirmPassword
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {formData.password === formData.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </div>
                )}

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

          {/* Step 3: Spiritual Profile & Preferences */}
          {step === 3 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🕉️ Complete Your Spiritual Profile</CardTitle>
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
                  <Button variant="outline" onClick={() => setStep(2)}>
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
    </div>
  )
}
