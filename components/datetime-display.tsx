"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

interface TimeData {
  nzTime: Date
  ujjainTime: Date
  ghati: number
  vighati: number
  muhurta: number
  dayPart: string
}

export default function DateTimeDisplay() {
  const [timeData, setTimeData] = useState<TimeData | null>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      // New Zealand time
      const nzTime = new Date(now.toLocaleString("en-US", { timeZone: "Pacific/Auckland" }))

      // Ujjain time (IST)
      const ujjainTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))

      // Calculate Hindu Vaidik time for Ujjain
      const hours = ujjainTime.getHours()
      const minutes = ujjainTime.getMinutes()
      const seconds = ujjainTime.getSeconds()

      // Convert to total minutes from midnight
      const totalMinutes = hours * 60 + minutes + seconds / 60

      // Calculate Ghati and Vighati
      // 1 day = 60 Ghati, so 1 Ghati = 24 minutes
      const ghati = Math.floor(totalMinutes / 24)
      const vighati = Math.floor((totalMinutes % 24) * 2.5) // 1 Vighati = 24 seconds, but we show as fraction of Ghati

      // Calculate Muhurta (1 Muhurta = 48 minutes = 2 Ghati)
      const muhurta = Math.floor(ghati / 2) + 1

      // Determine day part
      let dayPart = ""
      if (hours >= 4 && hours < 6) dayPart = "Brahma Muhurta"
      else if (hours >= 6 && hours < 12) dayPart = "Purvahna (Morning)"
      else if (hours >= 12 && hours < 16) dayPart = "Madhyahna (Afternoon)"
      else if (hours >= 16 && hours < 18) dayPart = "Aparahna (Evening)"
      else if (hours >= 18 && hours < 20) dayPart = "Sayahna (Dusk)"
      else dayPart = "Ratri (Night)"

      setTimeData({
        nzTime,
        ujjainTime,
        ghati,
        vighati,
        muhurta,
        dayPart,
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!timeData) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* New Zealand Time */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <MapPin className="h-5 w-5" />
            New Zealand Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-800 mb-1">
              {timeData.nzTime.toLocaleTimeString("en-NZ", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
            <div className="text-lg text-gray-600">
              {timeData.nzTime.toLocaleDateString("en-NZ", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-blue-700 border-blue-300">
              {timeData.nzTime.toLocaleDateString("en-NZ", { timeZoneName: "short" }).split(", ")[1]}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Mahakal (Ujjain) Time */}
      <Card className="border-2 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Clock className="h-5 w-5" />
            Mahakal Time (Ujjain)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-800 mb-1">
              {timeData.ujjainTime.toLocaleTimeString("en-IN", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
            <div className="text-lg text-gray-600">
              {timeData.ujjainTime.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-orange-700 border-orange-300">
              IST (UTC+5:30)
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Hindu Vaidik Time Display */}
      <Card className="md:col-span-2 border-2 border-amber-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <Clock className="h-5 w-5" />
            Hindu Vaidik Time (Mahakal)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-amber-800">{timeData.ghati}</div>
              <div className="text-sm text-amber-600">Ghati</div>
              <div className="text-xs text-gray-500">of 60</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-amber-800">{timeData.vighati}</div>
              <div className="text-sm text-amber-600">Vighati</div>
              <div className="text-xs text-gray-500">of 60</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-amber-800">{timeData.muhurta}</div>
              <div className="text-sm text-amber-600">Muhurta</div>
              <div className="text-xs text-gray-500">of 30</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-sm font-semibold text-amber-800">{timeData.dayPart}</div>
              <div className="text-xs text-amber-600">Current Period</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
