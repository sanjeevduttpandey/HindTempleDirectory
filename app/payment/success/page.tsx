"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Mail, Calendar, Share2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState({
    type: "",
    amount: "",
    transactionId: "",
    eventTitle: "",
    cause: "",
  })

  useEffect(() => {
    // Extract payment details from URL params or session storage
    const type = searchParams.get("type") || "donation"
    const amount = searchParams.get("amount") || "0"
    const eventTitle = searchParams.get("eventTitle") || ""
    const cause = searchParams.get("cause") || ""

    // Generate a mock transaction ID
    const transactionId = `TXN${Date.now()}`

    setPaymentDetails({
      type,
      amount,
      transactionId,
      eventTitle,
      cause,
    })
  }, [searchParams])

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert("Receipt download would start here")
  }

  const handleEmailReceipt = () => {
    // In a real app, this would send an email receipt
    alert("Receipt email would be sent here")
  }

  const handleAddToCalendar = () => {
    // In a real app, this would create a calendar event
    alert("Calendar event would be created here")
  }

  const handleShare = () => {
    // In a real app, this would open share options
    alert("Share options would open here")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Payment Successful</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="text-center mb-8">
            <CardContent className="pt-8 pb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
              <p className="text-lg text-gray-600 mb-6">
                {paymentDetails.type === "donation"
                  ? `Thank you for your generous donation of $${paymentDetails.amount}. Your contribution will make a real difference in our community.`
                  : `Your payment of $${paymentDetails.amount} has been processed successfully. You're all set for the event!`}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Transaction ID:</strong> {paymentDetails.transactionId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Amount:</strong> ${paymentDetails.amount} NZD
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {new Date().toLocaleDateString("en-NZ")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Button onClick={handleDownloadReceipt} className="bg-green-600 hover:bg-green-700">
              <Download className="mr-2 h-5 w-5" />
              Download Receipt
            </Button>
            <Button onClick={handleEmailReceipt} variant="outline">
              <Mail className="mr-2 h-5 w-5" />
              Email Receipt
            </Button>

            {paymentDetails.type === "event" && (
              <>
                <Button onClick={handleAddToCalendar} variant="outline">
                  <Calendar className="mr-2 h-5 w-5" />
                  Add to Calendar
                </Button>
                <Button onClick={handleShare} variant="outline">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Event
                </Button>
              </>
            )}
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentDetails.type === "donation" ? (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-orange-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Tax Receipt</h4>
                      <p className="text-sm text-gray-600">
                        You'll receive a tax-deductible receipt via email within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-orange-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Impact Updates</h4>
                      <p className="text-sm text-gray-600">
                        We'll keep you updated on how your donation is making a difference.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-orange-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Stay Connected</h4>
                      <p className="text-sm text-gray-600">
                        Join our community events and stay connected with fellow devotees.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-orange-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Confirmation Email</h4>
                      <p className="text-sm text-gray-600">
                        You'll receive event details and instructions via email shortly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-orange-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Event Reminders</h4>
                      <p className="text-sm text-gray-600">We'll send you reminders as the event date approaches.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-orange-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Enjoy the Event</h4>
                      <p className="text-sm text-gray-600">Come prepared and enjoy connecting with the community!</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href={paymentDetails.type === "donation" ? "/donate" : "/events"}>
                {paymentDetails.type === "donation" ? "Make Another Donation" : "Browse More Events"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
