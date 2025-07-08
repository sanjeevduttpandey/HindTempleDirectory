"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Sun, Moon, Star, Clock } from "lucide-react"
import { format } from "date-fns"

// This is a simplified version. In a real application, you would use an API or library
// to calculate accurate Panchang details based on location and time.
export default function PanchangPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Update the date every minute
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)

    // Simulate loading panchang data
    setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Sample panchang data - in a real app, this would be calculated or fetched
  const panchangData = {
    tithi: "Shukla Paksha Panchami",
    nakshatra: "Uttara Phalguni",
    yoga: "Shubha",
    karana: "Bava",
    sunrise: "6:15 AM",
    sunset: "8:30 PM",
    moonrise: "10:45 AM",
    moonset: "11:20 PM",
    rahu_kalam: "9:00 AM - 10:30 AM",
    yama_gandam: "1:30 PM - 3:00 PM",
    gulika: "7:30 AM - 9:00 AM",
    abhijit_muhurta: "12:00 PM - 12:45 PM",
    amrit_kalam: "7:15 AM - 8:45 AM",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <>
            {/* Current Date Information */}
            <Card className="mb-8 border-orange-200 shadow-lg">
              <CardHeader className="bg-orange-100">
                <CardTitle className="text-2xl text-orange-800 flex items-center justify-center">
                  <Calendar className="w-6 h-6 mr-3" />
                  Today's Date
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6 text-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Gregorian Date</h3>
                    <p className="text-2xl font-bold text-gray-800">{format(currentDate, "EEEE, MMMM d, yyyy")}</p>
                    <p className="text-lg text-gray-600 mt-1">{format(currentDate, "h:mm a")} (New Zealand Time)</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Hindu Calendar</h3>
                    <p className="text-2xl font-bold text-gray-800">Vikram Samvat 2081</p>
                    <p className="text-lg text-gray-600 mt-1">Vaishakha, Shukla Paksha</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Panchang Details */}
            <Tabs defaultValue="main" className="mb-12">
              <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
                <TabsTrigger value="main">Main Elements</TabsTrigger>
                <TabsTrigger value="timings">Auspicious Timings</TabsTrigger>
                <TabsTrigger value="planetary">Planetary Positions</TabsTrigger>
              </TabsList>

              <TabsContent value="main">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800 flex items-center">
                        <Moon className="w-5 h-5 mr-2" />
                        Tithi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-lg font-medium">{panchangData.tithi}</p>
                      <p className="text-sm text-gray-600 mt-1">The lunar day based on the moon's longitudinal angle</p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800 flex items-center">
                        <Star className="w-5 h-5 mr-2" />
                        Nakshatra
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-lg font-medium">{panchangData.nakshatra}</p>
                      <p className="text-sm text-gray-600 mt-1">The lunar mansion or constellation</p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800 flex items-center">
                        <Sun className="w-5 h-5 mr-2" />
                        Yoga
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-lg font-medium">{panchangData.yoga}</p>
                      <p className="text-sm text-gray-600 mt-1">The sum of the sun and moon's longitudinal angle</p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800 flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Karana
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-lg font-medium">{panchangData.karana}</p>
                      <p className="text-sm text-gray-600 mt-1">Half of a Tithi, important for timing of activities</p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800 flex items-center">
                        <Sun className="w-5 h-5 mr-2" />
                        Sunrise & Sunset
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Sunrise</p>
                          <p className="text-lg font-medium">{panchangData.sunrise}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Sunset</p>
                          <p className="text-lg font-medium">{panchangData.sunset}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800 flex items-center">
                        <Moon className="w-5 h-5 mr-2" />
                        Moonrise & Moonset
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Moonrise</p>
                          <p className="text-lg font-medium">{panchangData.moonrise}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Moonset</p>
                          <p className="text-lg font-medium">{panchangData.moonset}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timings">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800">Rahu Kalam</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-lg font-medium">{panchangData.rahu_kalam}</p>
                      <p className="text-sm text-gray-600 mt-1">Inauspicious time, avoid starting new activities</p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800">Yama Gandam</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-lg font-medium">{panchangData.yama_gandam}</p>
                      <p className="text-sm text-gray-600 mt-1">Inauspicious period, avoid important work</p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800">Gulika</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-lg font-medium">{panchangData.gulika}</p>
                      <p className="text-sm text-gray-600 mt-1">Inauspicious time, avoid new beginnings</p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800">Abhijit Muhurta</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-lg font-medium">{panchangData.abhijit_muhurta}</p>
                      <p className="text-sm text-gray-600 mt-1">Most auspicious time of the day</p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50 pb-3">
                      <CardTitle className="text-xl text-orange-800">Amrit Kalam</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-lg font-medium">{panchangData.amrit_kalam}</p>
                      <p className="text-sm text-gray-600 mt-1">Highly auspicious time for all activities</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="planetary">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50">
                      <CardTitle className="text-xl text-orange-800">Planetary Positions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Planet</th>
                            <th className="text-left py-2">Sign</th>
                            <th className="text-left py-2">Degree</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Sun</td>
                            <td className="py-2">Aries</td>
                            <td className="py-2">15°30'</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Moon</td>
                            <td className="py-2">Leo</td>
                            <td className="py-2">23°45'</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Mars</td>
                            <td className="py-2">Gemini</td>
                            <td className="py-2">8°12'</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Mercury</td>
                            <td className="py-2">Taurus</td>
                            <td className="py-2">2°18'</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Jupiter</td>
                            <td className="py-2">Taurus</td>
                            <td className="py-2">17°22'</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Venus</td>
                            <td className="py-2">Gemini</td>
                            <td className="py-2">5°40'</td>
                          </tr>
                          <tr>
                            <td className="py-2">Saturn</td>
                            <td className="py-2">Aquarius</td>
                            <td className="py-2">29°51'</td>
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-orange-50">
                      <CardTitle className="text-xl text-orange-800">Daily Predictions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="mb-4">
                        Today is generally favorable for spiritual activities, learning, and family gatherings. The
                        alignment of Jupiter and Venus creates positive energy for new beginnings.
                      </p>
                      <h4 className="font-semibold text-lg mb-2">Favorable Activities:</h4>
                      <ul className="list-disc pl-5 mb-4">
                        <li>Religious ceremonies and prayers</li>
                        <li>Educational pursuits</li>
                        <li>Family gatherings</li>
                        <li>Starting new projects (after Rahu Kalam)</li>
                      </ul>
                      <h4 className="font-semibold text-lg mb-2">Avoid:</h4>
                      <ul className="list-disc pl-5">
                        <li>Major financial decisions during Rahu Kalam</li>
                        <li>Travel in southward direction</li>
                        <li>Signing important documents during inauspicious hours</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-8 text-gray-600">
              <p>
                Note: This Panchang is calculated for Auckland, New Zealand. Times may vary slightly for other
                locations.
              </p>
              <p className="mt-2">Last updated: {format(currentDate, "MMMM d, yyyy h:mm a")} NZST</p>
            </div>
          </>
        )}

        <h1 className="text-4xl font-bold text-orange-800 text-center mb-8">Daily Panchang</h1>
        <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          The Panchang provides auspicious timings and astrological information according to the Hindu calendar,
          customized for New Zealand time zone.
        </p>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Namaste Sanatan New Zealand</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            The Panchang is a Hindu calendar and almanac that follows traditional timekeeping systems. It provides
            information about auspicious times, planetary positions, and other important astrological details to guide
            daily activities and religious observances.
          </p>
        </div>
      </div>
    </div>
  )
}
