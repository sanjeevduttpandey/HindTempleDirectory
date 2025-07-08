"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

/**
 * A lightweight Hindu time widget that shows the current
 * NZ time and updates every second.  This satisfies imports
 * that expected `HinduTimeWidget` to exist.
 */
export default function HinduTimeWidget() {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      {now.toLocaleTimeString("en-NZ", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </div>
  )
}
