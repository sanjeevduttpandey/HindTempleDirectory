import { Loader2 } from "lucide-react"

export default function TemplesLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
      <p className="mt-4 text-lg text-gray-600">Loading mandir directory...</p>
    </div>
  )
}
