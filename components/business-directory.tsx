"use client"

import { useMemo, useState } from "react"
import type { Business } from "@/lib/business-storage"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface Props {
  businesses: Business[]
}

export default function BusinessDirectory({ businesses }: Props) {
  // Guard – if for some reason a non-array sneaks through, coerce it
  const safeBusinesses = Array.isArray(businesses) ? businesses : []

  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return safeBusinesses
    return safeBusinesses.filter((b) => `${b.name} ${b.city} ${b.category}`.toLowerCase().includes(q))
  }, [query, safeBusinesses])

  return (
    <section className="space-y-6">
      <Input placeholder="Search by name, city, or category" value={query} onChange={(e) => setQuery(e.target.value)} />

      {filtered.length === 0 && <p className="text-muted-foreground">No businesses match that search.</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((biz) => (
          <Card key={biz.id} className="flex flex-col">
            <CardContent className="flex flex-col grow p-4">
              {/* Logo */}
              {biz.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={biz.logo_url || "/placeholder.svg"}
                  alt={`${biz.name} logo`}
                  className="mb-3 h-24 w-full object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/abstract-logo.png" alt="" className="mb-3 h-24 w-full object-contain" />
              )}

              {/* Name / rating */}
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{biz.name}</h3>
                {biz.rating && (
                  <span className="flex items-center text-yellow-600">
                    <Star className="mr-1 h-4 w-4 fill-yellow-600" />
                    {biz.rating.toFixed(1)}
                  </span>
                )}
              </div>

              {/* City & category */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Badge variant="outline">{biz.city}</Badge>
                <Badge variant="secondary">{biz.category}</Badge>
              </div>

              {/* Description */}
              <p className="mb-4 grow text-sm text-muted-foreground line-clamp-4">{biz.description}</p>

              {/* Contact */}
              <div className="space-y-1 text-sm">
                {biz.phone && (
                  <p>
                    <span className="sr-only">Phone:</span>
                    <a href={`tel:${biz.phone}`} className="hover:underline">
                      {biz.phone}
                    </a>
                  </p>
                )}
                {biz.email && (
                  <p>
                    <span className="sr-only">Email:</span>
                    <a href={`mailto:${biz.email}`} className="hover:underline">
                      {biz.email}
                    </a>
                  </p>
                )}
                {biz.website && (
                  <p>
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit website
                    </a>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
