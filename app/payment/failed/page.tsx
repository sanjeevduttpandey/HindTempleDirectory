"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">
            Unfortunately, your payment could not be processed. Please check your details or try again.
          </p>
          <div className="space-y-3">
            <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
              <Link href="/donate">Try Again</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/help">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
