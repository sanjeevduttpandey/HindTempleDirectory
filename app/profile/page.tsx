"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StaticHeader } from "@/components/static-header"

// Static user data
const staticUser = {
  id: 1,
  firstName: "Priya",
  lastName: "Sharma",
  spiritualName: "Bhakti Priya",
  email: "priya.sharma@email.com",
  phone: "+64 21 123 4567",
  dateOfBirth: "1990-05-15",
  gender: "female",
  city: "Auckland",
  address: "123 Spiritual Lane, Mt Eden",
  gotra: "Kashyapa",
  rashi: "Mesha (Aries)",
  nakshatra: "Rohini",
  avatar: "/placeholder.svg?height=100&width=100&text=PS",
  spiritualPractices: ["Daily Puja", "Meditation", "Bhajan Singing", "Mantra Chanting"],
  interests: ["Temple Activities", "Yoga & Meditation", "Sanskrit Learning", "Spiritual Discussions"],
  bio: "Dedicated spiritual seeker on the path of Bhakti Yoga. Passionate about Vedic philosophy and sharing spiritual knowledge with the community.",
  joinedDate: "2023-06-15",
  isVerified: true,
  subscribeNewsletter: true,
  allowCommunityContact: true,
}

export default function ProfilePage() {
  const [user, setUser] = useState(staticUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(staticUser)
  const [activeTab, setActiveTab] = useState("personal")

  const handleInputChange = (field: string, value: any) => {
    setEditedUser({ ...editedUser, [field]: value })
  }

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedUser(user)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-orange-600 hover:bg-orange-700">
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="text-2xl">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h2>
                    {user.spiritualName && <span className="text-lg text-amber-700">({user.spiritualName})</span>}
                    {user.isVerified && (
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{user.email}</p>
                  <p className="text-gray-600 mb-4">{user.city}, New Zealand</p>
                  <div className="flex flex-wrap gap-2">
                    {user.spiritualPractices.slice(0, 3).map((practice, index) => (
                      <Badge key={index} variant="secondary">
                        {practice}
                      </Badge>
                    ))}
                    {user.spiritualPractices.length > 3 && (
                      <Badge variant="secondary">+{user.spiritualPractices.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="spiritual">Spiritual Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity & Preferences</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic information and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={editedUser.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.firstName}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={editedUser.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="spiritualName">Spiritual Name (Optional)</Label>
                      {isEditing ? (
                        <Input
                          id="spiritualName"
                          value={editedUser.spiritualName}
                          onChange={(e) => handleInputChange("spiritualName", e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.spiritualName || "Not provided"}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="p-2 bg-gray-50 rounded-md">{user.email}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedUser.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.phone || "Not provided"}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      {isEditing ? (
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={editedUser.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          {user.dateOfBirth
                            ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Not provided"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      {isEditing ? (
                        <Select value={editedUser.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md capitalize">{user.gender || "Not provided"}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      {isEditing ? (
                        <Select value={editedUser.city} onValueChange={(value) => handleInputChange("city", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Auckland">Auckland</SelectItem>
                            <SelectItem value="Wellington">Wellington</SelectItem>
                            <SelectItem value="Christchurch">Christchurch</SelectItem>
                            <SelectItem value="Hamilton">Hamilton</SelectItem>
                            <SelectItem value="Tauranga">Tauranga</SelectItem>
                            <SelectItem value="Dunedin">Dunedin</SelectItem>
                            <SelectItem value="Palmerston North">Palmerston North</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.city || "Not provided"}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Textarea
                        id="address"
                        value={editedUser.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        rows={2}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-md">{user.address || "Not provided"}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={editedUser.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        rows={3}
                        placeholder="Tell us about yourself and your spiritual journey..."
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-md">{user.bio || "Not provided"}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Spiritual Profile Tab */}
            <TabsContent value="spiritual">
              <Card>
                <CardHeader>
                  <CardTitle>Spiritual Profile</CardTitle>
                  <CardDescription>Your spiritual practices and astrological details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="gotra">Gotra</Label>
                      {isEditing ? (
                        <Input
                          id="gotra"
                          value={editedUser.gotra}
                          onChange={(e) => handleInputChange("gotra", e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.gotra || "Not provided"}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rashi">Rashi (Zodiac Sign)</Label>
                      {isEditing ? (
                        <Input
                          id="rashi"
                          value={editedUser.rashi}
                          onChange={(e) => handleInputChange("rashi", e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.rashi || "Not provided"}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nakshatra">Nakshatra</Label>
                      {isEditing ? (
                        <Input
                          id="nakshatra"
                          value={editedUser.nakshatra}
                          onChange={(e) => handleInputChange("nakshatra", e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.nakshatra || "Not provided"}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Spiritual Practices</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex flex-wrap gap-2">
                        {user.spiritualPractices.map((practice, index) => (
                          <Badge key={index} variant="secondary">
                            {practice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => (
                          <Badge key={index} variant="outline">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity & Preferences Tab */}
            <TabsContent value="activity">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your account status and membership details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Member Since</Label>
                        <div className="p-2 bg-gray-50 rounded-md">
                          {new Date(user.joinedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Account Status</Label>
                        <div className="p-2 bg-gray-50 rounded-md flex items-center gap-2">
                          <Badge variant={user.isVerified ? "default" : "secondary"}>
                            {user.isVerified ? "Verified" : "Unverified"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Communication Preferences</CardTitle>
                    <CardDescription>Manage how you receive updates and notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Newsletter Subscription</Label>
                        <p className="text-sm text-gray-600">Receive weekly updates about events and community news</p>
                      </div>
                      <div className="text-sm">
                        {user.subscribeNewsletter ? (
                          <Badge variant="default">Subscribed</Badge>
                        ) : (
                          <Badge variant="secondary">Not Subscribed</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Community Contact</Label>
                        <p className="text-sm text-gray-600">Allow other community members to contact you</p>
                      </div>
                      <div className="text-sm">
                        {user.allowCommunityContact ? (
                          <Badge variant="default">Enabled</Badge>
                        ) : (
                          <Badge variant="secondary">Disabled</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
