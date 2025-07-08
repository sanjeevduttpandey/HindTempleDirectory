"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Sun, Moon, MapPin, Calendar, Info } from "lucide-react"

interface SanatanTimeData {
  standardTime: Date
  ghati: number
  pal: number
  vipal: number
  location: string
  sunrise: string
  sunset: string
  dayDuration: string
  nightDuration: string
  tithi: string
  paksha: string
  month: string
  shakaYear: number
  moonPosition: string
  currentPeriod: string
}

interface TimeSlot {
  name: string
  startTime: string
  endTime: string
  type: "शुभ" | "अशुभ"
  isActive: boolean
  description?: string
}

export default function SanatanTimeWidget() {
  const [timeData, setTimeData] = useState<SanatanTimeData | null>(null)
  const [activeView, setActiveView] = useState("overview")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Enhanced sample data with descriptions
  const muhurtData: TimeSlot[] = [
    {
      name: "राहु काल",
      startTime: "07:23",
      endTime: "09:04",
      type: "अशुभ",
      isActive: false,
      description: "Avoid new beginnings",
    },
    {
      name: "यम घंटा",
      startTime: "10:44",
      endTime: "12:25",
      type: "अशुभ",
      isActive: false,
      description: "Inauspicious period",
    },
    {
      name: "अभिजित",
      startTime: "11:58",
      endTime: "12:52",
      type: "शुभ",
      isActive: true,
      description: "Most auspicious time",
    },
    {
      name: "गुली काल",
      startTime: "14:06",
      endTime: "15:47",
      type: "अशुभ",
      isActive: false,
      description: "Avoid important work",
    },
    {
      name: "दूर मुहूर्त",
      startTime: "12:52",
      endTime: "13:46",
      type: "अशुभ",
      isActive: false,
      description: "Distant muhurt",
    },
  ]

  const choghadiyaData: TimeSlot[] = [
    {
      name: "अमृत",
      startTime: "05:42",
      endTime: "07:23",
      type: "शुभ",
      isActive: false,
      description: "Nectar time - very auspicious",
    },
    {
      name: "काल",
      startTime: "07:23",
      endTime: "09:04",
      type: "अशुभ",
      isActive: false,
      description: "Death time - avoid new work",
    },
    { name: "शुभ", startTime: "09:04", endTime: "10:44", type: "शुभ", isActive: true, description: "Auspicious time" },
    { name: "रोग", startTime: "10:44", endTime: "12:25", type: "अशुभ", isActive: false, description: "Disease time" },
    { name: "उद्वेग", startTime: "12:25", endTime: "14:06", type: "अशुभ", isActive: false, description: "Anxiety time" },
    {
      name: "चर",
      startTime: "14:06",
      endTime: "15:47",
      type: "शुभ",
      isActive: false,
      description: "Moving time - good for travel",
    },
    { name: "लाभ", startTime: "15:47", endTime: "17:27", type: "शुभ", isActive: false, description: "Profit time" },
    { name: "अमृत", startTime: "17:27", endTime: "19:08", type: "शुभ", isActive: false, description: "Nectar time" },
  ]

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const ujjainTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))

      const hours = ujjainTime.getHours()
      const minutes = ujjainTime.getMinutes()
      const seconds = ujjainTime.getSeconds()

      const totalMinutes = hours * 60 + minutes + seconds / 60
      const ghati = Math.floor(totalMinutes / 24)
      const remainingSeconds = (totalMinutes % 24) * 60
      const pal = Math.floor(remainingSeconds / 24)
      const vipal = Math.floor(((remainingSeconds % 24) * 60) / 24)

      // Determine current period
      const currentTimeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
      let currentPeriod = "शुभ काल"

      for (const period of choghadiyaData) {
        if (currentTimeStr >= period.startTime && currentTimeStr <= period.endTime) {
          currentPeriod = period.name
          break
        }
      }

      setTimeData({
        standardTime: ujjainTime,
        ghati,
        pal,
        vipal,
        location: "Ujjain, India",
        sunrise: "05:42:04",
        sunset: "19:08:04",
        dayDuration: "13:26:00",
        nightDuration: "10:33:54",
        tithi: "सप्तमी",
        paksha: "शुक्ल पक्ष",
        month: "ज्येष्ठ",
        shakaYear: 1947,
        moonPosition: "वृषभ 17°32'",
        currentPeriod,
      })
      setCurrentTime(ujjainTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!timeData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-orange-200 rounded-lg"></div>
            <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-amber-100 rounded-lg"></div>
              <div className="h-20 bg-orange-100 rounded-lg"></div>
              <div className="h-20 bg-amber-100 rounded-lg"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Main Time Display */}
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {`${timeData.ghati}:${timeData.pal.toString().padStart(2, "0")}:${timeData.vipal.toString().padStart(2, "0")}`}
          </div>
          <div className="text-sm text-amber-700 font-medium mt-1">घटी : पल : विपल</div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="text-2xl font-mono text-gray-700">
            {timeData.standardTime.toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
          <Badge variant="outline" className="text-xs">
            {timeData.standardTime.toLocaleDateString("hi-IN", { weekday: "long" })}
          </Badge>
        </div>
      </div>

      {/* Current Period Highlight */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-amber-800">वर्तमान काल</h3>
            <p className="text-2xl font-bold text-amber-900">{timeData.currentPeriod}</p>
          </div>
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-gray-600">सूर्योदय</span>
          </div>
          <div className="font-semibold text-orange-600">{timeData.sunrise.slice(0, 5)}</div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Moon className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">सूर्यास्त</span>
          </div>
          <div className="font-semibold text-blue-600">{timeData.sunset.slice(0, 5)}</div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-gray-600">तिथि</span>
          </div>
          <div className="font-semibold text-purple-600">{timeData.tithi}</div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">नक्षत्र</span>
          </div>
          <div className="font-semibold text-green-600">{timeData.moonPosition}</div>
        </div>
      </div>
    </div>
  )

  const renderTimeSlots = (data: TimeSlot[], title: string) => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((slot, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
              slot.isActive
                ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 shadow-sm"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge
                  variant={slot.type === "शुभ" ? "default" : "destructive"}
                  className={`${
                    slot.type === "शुभ"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  {slot.name}
                </Badge>
                {slot.isActive && (
                  <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800">
                    सक्रिय
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-medium">
                  {slot.startTime} - {slot.endTime}
                </div>
                <div className={`text-xs ${slot.type === "शुभ" ? "text-green-600" : "text-red-600"}`}>{slot.type}</div>
              </div>
            </div>
            {slot.description && (
              <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                <Info className="h-3 w-3" />
                {slot.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderVisualClock = () => (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-80 h-80">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="2" />

          {/* Day periods */}
          {choghadiyaData.map((period, index) => {
            const startAngle = index * 45 - 90
            const endAngle = (index + 1) * 45 - 90
            const isAuspicious = period.type === "शुभ"
            const isActive = period.isActive

            return (
              <g key={index}>
                <path
                  d={`M 100 100 L ${100 + 80 * Math.cos((startAngle * Math.PI) / 180)} ${100 + 80 * Math.sin((startAngle * Math.PI) / 180)} A 80 80 0 0 1 ${100 + 80 * Math.cos((endAngle * Math.PI) / 180)} ${100 + 80 * Math.sin((endAngle * Math.PI) / 180)} Z`}
                  fill={isActive ? "#f59e0b" : isAuspicious ? "#10b981" : "#ef4444"}
                  opacity={isActive ? 0.9 : 0.6}
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
            )
          })}

          {/* Clock hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.cos(((timeData.ghati * 6 - 90) * Math.PI) / 180)}
            y2={100 + 70 * Math.sin(((timeData.ghati * 6 - 90) * Math.PI) / 180)}
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle cx="100" cy="100" r="4" fill="#f59e0b" />
        </svg>

        {/* Time labels */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">
              {timeData.standardTime.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-xs text-gray-600">वर्तमान समय</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded opacity-60"></div>
          <span>शुभ काल</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded opacity-60"></div>
          <span>अशुभ काल</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded"></div>
          <span>वर्तमान</span>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-amber-50">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="h-6 w-6" />
                सनातन पंचांग
              </h2>
              <p className="text-amber-100 mt-1">02 जून 2025, सोमवार</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-100">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{timeData.location}</span>
              </div>
              <div className="text-sm text-amber-100 mt-1">
                {timeData.paksha}, {timeData.month} {timeData.shakaYear} शक
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 pb-0">
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={activeView === "overview" ? "default" : "outline"}
              onClick={() => setActiveView("overview")}
              className={activeView === "overview" ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              सामान्य जानकारी
            </Button>
            <Button
              variant={activeView === "muhurt" ? "default" : "outline"}
              onClick={() => setActiveView("muhurt")}
              className={activeView === "muhurt" ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              मुहूर्त
            </Button>
            <Button
              variant={activeView === "choghadiya" ? "default" : "outline"}
              onClick={() => setActiveView("choghadiya")}
              className={activeView === "choghadiya" ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              चौघड़िया
            </Button>
            <Button
              variant={activeView === "visual" ? "default" : "outline"}
              onClick={() => setActiveView("visual")}
              className={activeView === "visual" ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              दृश्य घड़ी
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-0">
          {activeView === "overview" && renderOverview()}
          {activeView === "muhurt" && renderTimeSlots(muhurtData, "आज के मुहूर्त")}
          {activeView === "choghadiya" && renderTimeSlots(choghadiyaData, "आज के चौघड़िया")}
          {activeView === "visual" && renderVisualClock()}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-b-lg border-t">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>दिन की अवधि: {timeData.dayDuration}</span>
              <span>रात्रि की अवधि: {timeData.nightDuration}</span>
            </div>
            <Button size="sm" variant="outline" className="text-amber-700 border-amber-300 hover:bg-amber-50">
              घटी पल Converter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
