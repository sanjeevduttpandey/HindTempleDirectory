import { Card, CardContent } from "@/components/ui/card"
import { Frown } from "lucide-react"

interface EmptyStateProps {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <Card className="w-full text-center py-12">
      <CardContent className="flex flex-col items-center justify-center">
        <Frown className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-semibold text-gray-700">{message}</p>
        <p className="text-sm text-gray-500 mt-2">Come back later or check other sections.</p>
      </CardContent>
    </Card>
  )
}
