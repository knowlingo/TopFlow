import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { CookieNotice } from "@/components/cookie-notice"
import { SchemaOrg } from "@/components/schema-org"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://topflow.dev"),
  title: {
    default: "TopFlow - Secure AI Agent Orchestration",
    template: "%s | TopFlow",
  },
  description:
    "Privacy-first visual workflow builder for AI applications. GDPR compliant by design, zero data storage, BYOK model. Build secure AI agents with 12 security validations.",
  keywords: ["secure ai workflows", "ai agent orchestration", "privacy-first ai", "gdpr compliant ai"],
  authors: [{ name: "Charlie Su" }],
  creator: "TopFlow",
  publisher: "TopFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://topflow.dev",
    siteName: "TopFlow",
    title: "TopFlow - Secure AI Agent Orchestration",
    description:
      "Privacy-first visual workflow builder for AI applications. GDPR compliant by design.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TopFlow - Secure AI Agent Orchestration Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TopFlow - Secure AI Agent Orchestration",
    description: "Privacy-first visual workflow builder for AI applications.",
    images: ["/og-image.png"],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <SchemaOrg />
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ErrorBoundary>
        <CookieNotice />
        <Analytics />
      </body>
    </html>
  )
}
