"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface AddInterestDialogProps {
  onInterestAdded: () => void
}

export function AddInterestDialog({ onInterestAdded }: AddInterestDialogProps) {
  const [open, setOpen] = useState(false)
  const [interest, setInterest] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async () => {
    if (!interest.trim()) {
      setError("Please enter an interest")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/profile/interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interest: interest.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Interest added successfully!")
        setInterest("")
        onInterestAdded()
        setTimeout(() => {
          setOpen(false)
          setSuccess("")
        }, 1500)
      } else {
        setError(data.error || "Failed to add interest")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Interest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Interest</DialogTitle>
          <DialogDescription>Add a new interest to your spiritual profile</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="interest">Interest</Label>
            <Input
              id="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="e.g., Sanskrit Learning, Classical Music"
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading || !interest.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Interest"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface AddPracticeDialogProps {
  onPracticeAdded: () => void
}

export function AddPracticeDialog({ onPracticeAdded }: AddPracticeDialogProps) {
  const [open, setOpen] = useState(false)
  const [practice, setPractice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async () => {
    if (!practice.trim()) {
      setError("Please enter a spiritual practice")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/profile/practices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ practice: practice.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Practice added successfully!")
        setPractice("")
        onPracticeAdded()
        setTimeout(() => {
          setOpen(false)
          setSuccess("")
        }, 1500)
      } else {
        setError(data.error || "Failed to add practice")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Practice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Spiritual Practice</DialogTitle>
          <DialogDescription>Add a new spiritual practice to your profile</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="practice">Spiritual Practice</Label>
            <Input
              id="practice"
              value={practice}
              onChange={(e) => setPractice(e.target.value)}
              placeholder="e.g., Hanuman Chalisa, Gayatri Mantra"
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading || !practice.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Practice"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface AddActivityDialogProps {
  onActivityAdded: () => void
}

export function AddActivityDialog({ onActivityAdded }: AddActivityDialogProps) {
  const [open, setOpen] = useState(false)
  const [activityData, setActivityData] = useState({
    type: "",
    description: "",
    temple_id: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const activityTypes = [
    { value: "event", label: "Event Participation" },
    { value: "donation", label: "Donation" },
    { value: "puja", label: "Puja/Ritual" },
    { value: "visit", label: "Temple Visit" },
    { value: "seva", label: "Seva/Service" },
    { value: "satsang", label: "Satsang" },
    { value: "learning", label: "Learning/Study" },
  ]

  const handleSubmit = async () => {
    if (!activityData.type || !activityData.description) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/profile/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: activityData.type,
          description: activityData.description,
          temple_id: activityData.temple_id || null,
          amount: activityData.amount || null,
          metadata: { date: activityData.date },
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Activity added successfully!")
        setActivityData({
          type: "",
          description: "",
          temple_id: "",
          amount: "",
          date: new Date().toISOString().split("T")[0],
        })
        onActivityAdded()
        setTimeout(() => {
          setOpen(false)
          setSuccess("")
        }, 1500)
      } else {
        setError(data.error || "Failed to add activity")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Spiritual Activity</DialogTitle>
          <DialogDescription>Record your spiritual activities and temple participation</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Activity Type *</Label>
              <Select
                value={activityData.type}
                onValueChange={(value) => setActivityData({ ...activityData, type: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={activityData.date}
                onChange={(e) => setActivityData({ ...activityData, date: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={activityData.description}
              onChange={(e) => setActivityData({ ...activityData, description: e.target.value })}
              placeholder="Describe your spiritual activity..."
              disabled={loading}
              rows={3}
            />
          </div>

          {activityData.type === "donation" && (
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (NZD)</Label>
              <Input
                id="amount"
                type="number"
                value={activityData.amount}
                onChange={(e) => setActivityData({ ...activityData, amount: e.target.value })}
                placeholder="0.00"
                disabled={loading}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || !activityData.type || !activityData.description}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Activity"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
