"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import Link from "next/link"

export default function CompleteProfilePage() {
  const searchParams = useSearchParams()
  const method = searchParams.get("method")
  const provider = searchParams.get("provider")

  const [profileData, setProfileData] = useState({
    city: "",
    phone: "",
  })

  const cities = [
    "Auckland",
    "Wellington",
    "Christchurch",
    "Hamilton",
    "Tauranga",
    "Dunedin",
    "Palmerston North",
    "Napier",
    "Rotorua",
    "New Plymouth",
    "Other",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">🕉️ Complete Your Profile</CardTitle>
          <CardDescription>
            {method === "social"
              ? `Welcome! Let's complete your profile after signing up with ${provider}.`
              : "Just a few more details to personalize your experience."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Select onValueChange={(value) => setProfileData({ ...profileData, city: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+64 21 123 4567"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />
          </div>

          <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
            <Link href="/register/welcome">Complete Registration</Link>
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard">Skip for Now</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
