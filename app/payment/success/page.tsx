"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your contribution. Your transaction has been completed successfully.
          </p>
          <div className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
