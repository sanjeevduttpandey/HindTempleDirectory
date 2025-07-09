"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  subtitle: string
  refreshAction?: () => void
}

export function EmptyState({ icon: Icon, title, subtitle, refreshAction }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="py-12 text-center flex flex-col items-center gap-4">
        <Icon className="h-12 w-12 text-gray-400" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        {refreshAction && (
          <Button variant="outline" onClick={refreshAction} className="bg-transparent">
            Refresh
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
