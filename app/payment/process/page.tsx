"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentProcessPage() {
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    billingCity: "",
    billingPostcode: "",
    saveCard: false,
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [paymentError, setPaymentError] = useState("")

  // Extract payment details from URL params
  const paymentType = searchParams.get("type") // "donation" or "event"
  const amount = searchParams.get("amount")
  const eventId = searchParams.get("eventId")
  const cause = searchParams.get("cause")
  const frequency = searchParams.get("frequency")

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setPaymentData({ ...paymentData, cardNumber: formatted })
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    setPaymentData({ ...paymentData, expiryDate: formatted })
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setPaymentError("")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate random success/failure for demo
      const success = Math.random() > 0.1 // 90% success rate

      if (success) {
        setPaymentComplete(true)
      } else {
        setPaymentError("Payment failed. Please check your card details and try again.")
      }
    } catch (error) {
      setPaymentError("An error occurred while processing your payment. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              {paymentType === "donation"
                ? `Thank you for your generous donation of $${amount}. Your contribution will make a real difference in our community.`
                : `Your payment of $${amount} has been processed successfully. You're all set for the event!`}
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700">Download Receipt</Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={paymentType === "donation" ? "/donate" : "/events"}>
                  {paymentType === "donation" ? "Make Another Donation" : "Browse More Events"}
                </Link>
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
          <Link href={paymentType === "donation" ? "/donate" : "/events"} className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Secure Payment</h1>
              <p className="text-sm text-gray-600">Complete your {paymentType}</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-green-600" />
                    Secure Payment
                  </CardTitle>
                  <CardDescription>Your payment information is encrypted and secure</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-6">
                    {/* Card Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Card Information</h3>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            required
                            placeholder="1234 5678 9012 3456"
                            value={paymentData.cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            className="pr-12"
                          />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            required
                            placeholder="MM/YY"
                            value={paymentData.expiryDate}
                            onChange={handleExpiryChange}
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            required
                            placeholder="123"
                            value={paymentData.cvv}
                            onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, "") })}
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder Name *</Label>
                        <Input
                          id="cardholderName"
                          required
                          placeholder="John Smith"
                          value={paymentData.cardholderName}
                          onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Billing Address</h3>

                      <div className="space-y-2">
                        <Label htmlFor="billingAddress">Address *</Label>
                        <Input
                          id="billingAddress"
                          required
                          placeholder="123 Main Street"
                          value={paymentData.billingAddress}
                          onChange={(e) => setPaymentData({ ...paymentData, billingAddress: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billingCity">City *</Label>
                          <Input
                            id="billingCity"
                            required
                            placeholder="Auckland"
                            value={paymentData.billingCity}
                            onChange={(e) => setPaymentData({ ...paymentData, billingCity: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingPostcode">Postcode *</Label>
                          <Input
                            id="billingPostcode"
                            required
                            placeholder="1010"
                            value={paymentData.billingPostcode}
                            onChange={(e) => setPaymentData({ ...paymentData, billingPostcode: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Card Option */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveCard"
                        checked={paymentData.saveCard}
                        onCheckedChange={(checked) => setPaymentData({ ...paymentData, saveCard: checked as boolean })}
                      />
                      <Label htmlFor="saveCard" className="text-sm">
                        Save this card for future payments
                      </Label>
                    </div>

                    {/* Error Message */}
                    {paymentError && (
                      <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="text-sm text-red-700">{paymentError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-5 w-5" />
                          Complete Payment - ${amount}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium capitalize">{paymentType}</span>
                    </div>

                    {paymentType === "donation" && cause && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Cause:</span>
                        <span className="text-sm font-medium">
                          {cause.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                    )}

                    {frequency && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Frequency:</span>
                        <span className="text-sm font-medium capitalize">{frequency}</span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-lg font-semibold text-orange-600">${amount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Lock className="h-4 w-4" />
                      <span>256-bit SSL encryption</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Your payment information is secure and encrypted</div>
                  </div>
                </CardContent>
              </Card>

              {/* Accepted Cards */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Accepted Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-gray-100 p-2 rounded text-center text-xs font-medium">VISA</div>
                    <div className="bg-gray-100 p-2 rounded text-center text-xs font-medium">MC</div>
                    <div className="bg-gray-100 p-2 rounded text-center text-xs font-medium">AMEX</div>
                    <div className="bg-gray-100 p-2 rounded text-center text-xs font-medium">DISC</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Powered by Stripe - PCI DSS compliant</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
