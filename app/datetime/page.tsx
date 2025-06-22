import type { Metadata } from "next"
import { MapPin, Calendar, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DateTimeDisplay from "@/components/datetime-display"

export const metadata: Metadata = {
  title: "Date & Time - Sanatan New Zealand",
  description: "Current date and time in New Zealand and Mahakal (Ujjain) in Hindu Vaidik format",
}

export default function DateTimePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Date & Time</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Current date and time in New Zealand and sacred Mahakal (Ujjain) in traditional Hindu Vaidik format
          </p>
        </div>

        {/* Time Display Component */}
        <DateTimeDisplay />

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                About New Zealand Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Time Zone:</span>
                <Badge variant="outline">NZST/NZDT</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">UTC Offset:</span>
                <span>+12:00 (NZST) / +13:00 (NZDT)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Daylight Saving:</span>
                <span>Last Sunday in September to First Sunday in April</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-orange-600" />
                About Mahakal Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Location:</span>
                <span>Ujjain, Madhya Pradesh, India</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time Zone:</span>
                <Badge variant="outline">IST</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">UTC Offset:</span>
                <span>+05:30</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Significance:</span>
                <span>Sacred Jyotirlinga of Lord Shiva</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hindu Time System Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Hindu Vaidik Time System
            </CardTitle>
            <CardDescription>Understanding the traditional Hindu time measurement system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Time Units</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>1 Day (Divas)</span>
                    <span>60 Ghati</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Ghati</span>
                    <span>60 Vighati (24 minutes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Vighati</span>
                    <span>60 Prativighati (24 seconds)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Muhurta</span>
                    <span>2.5 Ghati (48 minutes)</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Day Divisions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sunrise to Sunset</span>
                    <span>Day (Din)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunset to Sunrise</span>
                    <span>Night (Ratri)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Muhurtas</span>
                    <span>30 per day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auspicious Time</span>
                    <span>Brahma Muhurta (4-6 AM)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
