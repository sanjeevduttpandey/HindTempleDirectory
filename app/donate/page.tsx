"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, CreditCard, Shield, Users, Building, Lightbulb } from "lucide-react"
import Link from "next/link"

const donationCauses = [
  {
    id: "temple-maintenance",
    title: "Temple Maintenance & Operations",
    description: "Support daily operations, utilities, and maintenance of Hindu temples across New Zealand",
    icon: Building,
    raised: 45000,
    goal: 80000,
  },
  {
    id: "community-events",
    title: "Community Events & Festivals",
    description: "Fund cultural celebrations, festivals, and community gatherings throughout the year",
    icon: Users,
    raised: 28000,
    goal: 50000,
  },
  {
    id: "education-programs",
    title: "Educational Programs",
    description: "Support Sanskrit classes, cultural education, and youth development programs",
    icon: Lightbulb,
    raised: 15000,
    goal: 30000,
  },
]

const suggestedAmounts = [25, 50, 100, 250, 500, 1000]

export default function DonatePage() {
  const [selectedCause, setSelectedCause] = useState("")
  const [donationType, setDonationType] = useState("one-time")
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    message: "",
    anonymous: false,
    newsletter: true,
    taxReceipt: true,
  })

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString())
    setCustomAmount("")
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    setAmount("")
  }

  const handleDonate = () => {
    const donationAmount = amount || customAmount
    if (!donationAmount || !selectedCause) {
      alert("Please select a cause and amount")
      return
    }

    // Redirect to payment processing page
    const params = new URLSearchParams({
      type: "donation",
      cause: selectedCause,
      amount: donationAmount,
      frequency: donationType,
      ...donorInfo,
    })

    window.location.href = `/payment/process?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Make a Donation</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Support Our Community</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Your generous donations help preserve Hindu culture, maintain sacred spaces, and strengthen our community
            across New Zealand
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Select Cause */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose a Cause</CardTitle>
                  <CardDescription>Select what you'd like to support with your donation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {donationCauses.map((cause) => {
                    const Icon = cause.icon
                    const progress = (cause.raised / cause.goal) * 100

                    return (
                      <div
                        key={cause.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedCause === cause.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedCause(cause.id)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-6 w-6 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{cause.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{cause.description}</p>
                            <div className="mt-3">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Raised: ${cause.raised.toLocaleString()}</span>
                                <span>Goal: ${cause.goal.toLocaleString()}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-orange-600 h-2 rounded-full"
                                  style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Donation Amount */}
              <Card>
                <CardHeader>
                  <CardTitle>Donation Amount</CardTitle>
                  <CardDescription>Choose how much you'd like to donate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Donation Type */}
                  <div className="space-y-3">
                    <Label>Donation Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setDonationType("one-time")}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          donationType === "one-time"
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        One-time Donation
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType("monthly")}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          donationType === "monthly"
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        Monthly Donation
                      </button>
                    </div>
                  </div>

                  {/* Suggested Amounts */}
                  <div className="space-y-3">
                    <Label>Suggested Amounts (NZD)</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {suggestedAmounts.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleAmountSelect(value)}
                          className={`p-3 border rounded-lg text-center transition-colors ${
                            amount === value.toString()
                              ? "border-orange-500 bg-orange-50 text-orange-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          ${value}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="customAmount">Custom Amount (NZD)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="customAmount"
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => handleCustomAmount(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donor Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Donor Information</CardTitle>
                  <CardDescription>Your details for the donation receipt</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={donorInfo.firstName}
                        onChange={(e) => setDonorInfo({ ...donorInfo, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={donorInfo.lastName}
                        onChange={(e) => setDonorInfo({ ...donorInfo, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={donorInfo.address}
                      onChange={(e) => setDonorInfo({ ...donorInfo, address: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={donorInfo.city}
                        onChange={(e) => setDonorInfo({ ...donorInfo, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        value={donorInfo.postcode}
                        onChange={(e) => setDonorInfo({ ...donorInfo, postcode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Leave a message with your donation..."
                      value={donorInfo.message}
                      onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={donorInfo.anonymous}
                        onCheckedChange={(checked) => setDonorInfo({ ...donorInfo, anonymous: checked as boolean })}
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        Make this donation anonymous
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={donorInfo.newsletter}
                        onCheckedChange={(checked) => setDonorInfo({ ...donorInfo, newsletter: checked as boolean })}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to community updates
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="taxReceipt"
                        checked={donorInfo.taxReceipt}
                        onCheckedChange={(checked) => setDonorInfo({ ...donorInfo, taxReceipt: checked as boolean })}
                      />
                      <Label htmlFor="taxReceipt" className="text-sm">
                        Send me a tax-deductible receipt
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Donation Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cause:</span>
                      <span className="text-sm font-medium">
                        {selectedCause ? donationCauses.find((c) => c.id === selectedCause)?.title : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium">
                        {donationType === "one-time" ? "One-time" : "Monthly"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-lg font-semibold text-orange-600">${amount || customAmount || "0"}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Button
                      onClick={handleDonate}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      size="lg"
                      disabled={!selectedCause || (!amount && !customAmount)}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Payment
                    </Button>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Information */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Tax Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>Sanatan New Zealand is a registered charity. Your donation may be tax-deductible.</p>
                  <p>You will receive a receipt for your donation that can be used for tax purposes.</p>
                  <p>
                    <strong>Charity Registration:</strong> CC12345
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
