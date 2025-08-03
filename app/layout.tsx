import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/query-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sanatan New Zealand - Hindu Community Platform",
  description:
    "Connect with the Hindu community in New Zealand. Find temples, events, businesses, and spiritual resources.",
  keywords: "Hindu, New Zealand, temples, community, events, spirituality, Sanatan Dharma",
  authors: [{ name: "Sanatan New Zealand" }],
  creator: "Sanatan New Zealand",
  publisher: "Sanatan New Zealand",
  robots: "index, follow",
  openGraph: {
    title: "Sanatan New Zealand - Hindu Community Platform",
    description:
      "Connect with the Hindu community in New Zealand. Find temples, events, businesses, and spiritual resources.",
    type: "website",
    locale: "en_NZ",
    siteName: "Sanatan New Zealand",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanatan New Zealand - Hindu Community Platform",
    description:
      "Connect with the Hindu community in New Zealand. Find temples, events, businesses, and spiritual resources.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-auto">
                <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                  <p>&copy; 2024 Sanatan New Zealand. All rights reserved.</p>
                </div>
              </footer>
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
