"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

// --- Add Spiritual Practice Dialog ---
interface AddSpiritualPracticeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (practice: string) => Promise<void>
  isLoading: boolean
}

export function AddSpiritualPracticeDialog({ open, onOpenChange, onAdd, isLoading }: AddSpiritualPracticeDialogProps) {
  const [practiceName, setPracticeName] = useState("")

  const handleSubmit = async () => {
    if (practiceName.trim()) {
      await onAdd(practiceName.trim())
      setPracticeName("") // Clear input after submission
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Spiritual Practice</DialogTitle>
          <DialogDescription>
            Add a new spiritual practice to your profile. This helps others understand your interests.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="practiceName" className="text-right">
              Practice Name
            </Label>
            <Input
              id="practiceName"
              value={practiceName}
              onChange={(e) => setPracticeName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Yoga, Meditation, Bhajan"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !practiceName.trim()}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Add Practice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Add Interest Dialog ---
interface AddInterestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (interest: string) => Promise<void>
  isLoading: boolean
}

export function AddInterestDialog({ open, onOpenChange, onAdd, isLoading }: AddInterestDialogProps) {
  const [interestName, setInterestName] = useState("")

  const handleSubmit = async () => {
    if (interestName.trim()) {
      await onAdd(interestName.trim())
      setInterestName("") // Clear input after submission
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Interest</DialogTitle>
          <DialogDescription>Add a new interest to your profile. This helps you connect with others.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interestName" className="text-right">
              Interest Name
            </Label>
            <Input
              id="interestName"
              value={interestName}
              onChange={(e) => setInterestName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Classical Music, Indian History"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !interestName.trim()}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Add Interest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Add Temple Service Dialog ---
interface AddTempleServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (service: { name: string; description: string }) => Promise<void>
  isLoading: boolean
}

export function AddTempleServiceDialog({ open, onOpenChange, onAdd, isLoading }: AddTempleServiceDialogProps) {
  const [serviceName, setServiceName] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")

  const handleSubmit = async () => {
    if (serviceName.trim()) {
      await onAdd({ name: serviceName.trim(), description: serviceDescription.trim() })
      setServiceName("")
      setServiceDescription("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Temple Service</DialogTitle>
          <DialogDescription>Add a new service offered by the temple.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceName" className="text-right">
              Service Name
            </Label>
            <Input
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Daily Aarti, Sanskrit Classes"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceDescription" className="text-right">
              Description
            </Label>
            <Textarea
              id="serviceDescription"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              className="col-span-3"
              placeholder="Briefly describe the service..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !serviceName.trim()}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Add Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Add Temple Facility Dialog ---
interface AddTempleFacilityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (facility: { name: string; description: string }) => Promise<void>
  isLoading: boolean
}

export function AddTempleFacilityDialog({ open, onOpenChange, onAdd, isLoading }: AddTempleFacilityDialogProps) {
  const [facilityName, setFacilityName] = useState("")
  const [facilityDescription, setFacilityDescription] = useState("")

  const handleSubmit = async () => {
    if (facilityName.trim()) {
      await onAdd({ name: facilityName.trim(), description: facilityDescription.trim() })
      setFacilityName("")
      setFacilityDescription("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Temple Facility</DialogTitle>
          <DialogDescription>Add a new facility available at the temple.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="facilityName" className="text-right">
              Facility Name
            </Label>
            <Input
              id="facilityName"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Community Hall, Library, Gaushala"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="facilityDescription" className="text-right">
              Description
            </Label>
            <Textarea
              id="facilityDescription"
              value={facilityDescription}
              onChange={(e) => setFacilityDescription(e.target.value)}
              className="col-span-3"
              placeholder="Briefly describe the facility..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !facilityName.trim()}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Add Facility
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Add Business Service Dialog ---
interface AddBusinessServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (service: string) => Promise<void>
  isLoading: boolean
}

export function AddBusinessServiceDialog({ open, onOpenChange, onAdd, isLoading }: AddBusinessServiceDialogProps) {
  const [serviceName, setServiceName] = useState("")

  const handleSubmit = async () => {
    if (serviceName.trim()) {
      await onAdd(serviceName.trim())
      setServiceName("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Business Service</DialogTitle>
          <DialogDescription>Add a new service offered by your business.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceName" className="text-right">
              Service Name
            </Label>
            <Input
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Catering, Puja Items, Astrological Consultations"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !serviceName.trim()}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Add Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Add Operating Hour Dialog ---
interface AddOperatingHourDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (hour: { day: string; open: string; close: string }) => Promise<void>
  isLoading: boolean
}

export function AddOperatingHourDialog({ open, onOpenChange, onAdd, isLoading }: AddOperatingHourDialogProps) {
  const [day, setDay] = useState("")
  const [openTime, setOpenTime] = useState("")
  const [closeTime, setCloseTime] = useState("")

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleSubmit = async () => {
    if (day && openTime && closeTime) {
      await onAdd({ day, open: openTime, close: closeTime })
      setDay("")
      setOpenTime("")
      setCloseTime("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Operating Hour</DialogTitle>
          <DialogDescription>Specify the operating hours for a day.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="day" className="text-right">
              Day
            </Label>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="openTime" className="text-right">
              Open Time
            </Label>
            <Input
              id="openTime"
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="closeTime" className="text-right">
              Close Time
            </Label>
            <Input
              id="closeTime"
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !day || !openTime || !closeTime}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Add Hour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
