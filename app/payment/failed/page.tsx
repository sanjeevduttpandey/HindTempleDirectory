"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, CreditCard, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const paymentType = searchParams.get("type") || "donation"
  const amount = searchParams.get("amount") || "0"
  const error = searchParams.get("error") || "Payment was declined"

  const handleRetryPayment = () => {
    // Go back to payment page with same details
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Payment Failed</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Error Message */}
          <Card className="text-center mb-8">
            <CardContent className="pt-8 pb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h2>
              <p className="text-lg text-gray-600 mb-6">
                We were unable to process your payment of ${amount}. Please check your payment details and try again.
              </p>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-700">
                  <strong>Error:</strong> {error}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Button onClick={handleRetryPayment} className="bg-orange-600 hover:bg-orange-700">
              <CreditCard className="mr-2 h-5 w-5" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/help/payment">
                <HelpCircle className="mr-2 h-5 w-5" />
                Get Help
              </Link>
            </Button>
          </div>

          {/* Common Issues */}
          <Card>
            <CardHeader>
              <CardTitle>Common Payment Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Card Declined</h4>
                  <p className="text-sm text-gray-600">
                    Check that your card details are correct and that you have sufficient funds. Contact your bank if
                    the issue persists.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Expired Card</h4>
                  <p className="text-sm text-gray-600">
                    Make sure your card hasn't expired and the expiry date is entered correctly.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Incorrect CVV</h4>
                  <p className="text-sm text-gray-600">
                    Double-check the 3 or 4-digit security code on the back of your card.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Billing Address Mismatch</h4>
                  <p className="text-sm text-gray-600">
                    Ensure your billing address matches the address on file with your bank.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="flex-1" variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
            <Button className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
              <Link href={paymentType === "donation" ? "/donate" : "/events"}>
                {paymentType === "donation" ? "Back to Donations" : "Back to Events"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
