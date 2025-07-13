"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { DollarSign, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("")
  const [donationType, setDonationType] = useState("")
  const [purpose, setPurpose] = useState("")
  const [temple, setTemple] = useState("")
  const [event, setEvent] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock data for demonstration
  const donationTypes = [
    "General Fund",
    "Annadaan (Food Charity)",
    "Temple Maintenance",
    "Festival Celebration",
    "Education & Dharma",
    "Community Service",
    "Specific Project",
  ]

  const temples = [
    { id: "1", name: "Auckland Sanatan Mandir" },
    { id: "2", name: "Wellington Hindu Temple" },
    { id: "3", name: "Christchurch Shiva Temple" },
  ]

  const events = [
    { id: "e1", name: "Diwali Celebration 2024" },
    { id: "e2", name: "Hanuman Jayanti Puja" },
    { id: "e3", name: "Bhagavad Gita Discourse Series" },
  ]

  const paymentMethods = ["Credit Card", "Bank Transfer", "Online Payment Gateway"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!donationAmount || Number.parseFloat(donationAmount) <= 0) {
      setError("Please enter a valid donation amount.")
      return
    }
    if (!donationType) {
      setError("Please select a donation type.")
      return
    }
    if (!paymentMethod) {
      setError("Please select a payment method.")
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call for donation
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Donation submitted:", {
        donationAmount,
        donationType,
        purpose,
        temple,
        event,
        isAnonymous,
        paymentMethod,
      })
      setIsSubmitted(true)
    } catch (err) {
      setError("Failed to process donation. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Donation Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your generous contribution of NZD ${Number.parseFloat(donationAmount).toFixed(2)}. Your
              support helps us continue our mission.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/donate">Make Another Donation</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Support the Sanatan Community</CardTitle>
              <CardDescription>
                Your generous contributions help sustain our temples, events, and services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount">Donation Amount (NZD) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="e.g., 51.00"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donationType">Donation Type *</Label>
                  <Select value={donationType} onValueChange={setDonationType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose of donation" />
                    </SelectTrigger>
                    <SelectContent>
                      {donationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Specific Purpose (Optional)</Label>
                  <Textarea
                    id="purpose"
                    placeholder="e.g., For the new temple kitchen, or support for a specific family..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temple">Donate to a Specific Mandir (Optional)</Label>
                    <Select value={temple} onValueChange={setTemple}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Mandir" />
                      </SelectTrigger>
                      <SelectContent>
                        {temples.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event">Donate to a Specific Event (Optional)</Label>
                    <Select value={event} onValueChange={setEvent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Event" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.map((e) => (
                          <SelectItem key={e.id} value={e.id}>
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAnonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                  />
                  <Label htmlFor="isAnonymous">Donate Anonymously</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="mr-2 h-5 w-5" />
                      Donate Now
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-gray-600">
            <p>Your donations are tax-deductible. Thank you for your support!</p>
            <p className="mt-2">
              <Link href="/help/donations" className="text-orange-600 hover:underline">
                Learn more about donations
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
