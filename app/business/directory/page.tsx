import BusinessDirectory from "@/components/business-directory"
import { getApprovedBusinessesFromDb } from "@/lib/business-storage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Directory | Sanatan New Zealand",
  description: "Discover Hindu and Indian businesses that serve New Zealand.",
}

export default async function BusinessDirectoryPage() {
  // SERVER → read directly from the DB. No HTTP, no JSON parsing.
  const businesses = await getApprovedBusinessesFromDb()

  return (
    <main className="container py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Business Directory</h1>
        <p className="text-muted-foreground text-lg">Discover Hindu and Indian businesses across New Zealand.</p>
      </header>

      {businesses.length ? (
        /* BusinessDirectory is a client component */
        /* @ts-expect-error Async Server Component passing to Client Component */
        <BusinessDirectory businesses={businesses} />
      ) : (
        <section className="py-24 text-center">
          <p className="text-muted-foreground">No approved businesses are currently listed.</p>
        </section>
      )}
    </main>
  )
}
