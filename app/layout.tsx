import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sanatan New Zealand - Hindu Community & Temples",
  description:
    "Connect with the Hindu community in New Zealand. Find temples, events, festivals, and spiritual gatherings across Auckland, Wellington, Christchurch and more.",
  keywords:
    "Hindu temples New Zealand, Sanatan Dharma, Indian community NZ, Hindu festivals, temples Auckland, temples Wellington, temples Christchurch, Hindu events",
  authors: [{ name: "Sanatan New Zealand" }],
  creator: "Sanatan New Zealand",
  publisher: "Sanatan New Zealand",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sanatannewzealand.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sanatan New Zealand - Hindu Community & Temples",
    description:
      "Connect with the Hindu community in New Zealand. Find temples, events, festivals, and spiritual gatherings.",
    url: "https://sanatannewzealand.org",
    siteName: "Sanatan New Zealand",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sanatan New Zealand - Hindu Community",
      },
    ],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanatan New Zealand - Hindu Community & Temples",
    description:
      "Connect with the Hindu community in New Zealand. Find temples, events, festivals, and spiritual gatherings.",
    images: ["/images/og-image.jpg"],
    creator: "@SanatanNZ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "religion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/om.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff6b35" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sanatan NZ" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ff6b35" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
