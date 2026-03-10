import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/structured-data"
import { Navigation } from "@/components/navigation"
import { SocialLinks } from "@/components/social-links"

const ICON_VERSION = "20260310-2"

export const metadata: Metadata = {
  metadataBase: new URL("https://lambivgills.com"),
  title: {
    default: "Lambiv Gills Dzenyuy | Software Engineer",
    template: "%s | Lambiv Gills Dzenyuy"
  },
  description:
    "Software engineer focused on custom DRM, real-time video, analytics systems, and practical product work across distributed teams.",
  keywords: [
    "Lambiv Gills Dzenyuy",
    "Software Engineer",
    "Apache Kafka",
    "Apache Druid",
    "Digital Rights Management",
    "DRM",
    "Real-time Video",
    "Machine Learning",
    "Telegram API",
    "Payments",
    "LLM Deployment",
    "Neo4j",
    "Meilisearch",
    "Redis",
    "Laravel",
    "Svelte",
    "Soketi",
    "Bilin GmbH",
    "React",
    "Node.js",
    "Backend Systems",
    "Product Engineering",
    "Portfolio"
  ],
  authors: [{ name: "Lambiv Gills Dzenyuy" }],
  creator: "Lambiv Gills Dzenyuy",
  publisher: "Lambiv Gills Dzenyuy",
  applicationName: "Lambiv Gills Dzenyuy Portfolio",
  referrer: "origin-when-cross-origin",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lambivgills.com",
    siteName: "Lambiv Gills Dzenyuy Portfolio",
    title: "Lambiv Gills Dzenyuy | Software Engineer",
    description: "Custom DRM, real-time video, analytics systems, and practical product work.",
    images: [
      {
        url: "/face.JPG",
        alt: "Lambiv Gills Dzenyuy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lambiv Gills Dzenyuy | Software Engineer",
    description: "Custom DRM, real-time video, analytics systems, and practical product work.",
    images: ["/face.JPG"],
    creator: "@lambiv_dzenyuy",
  },
  alternates: {
    canonical: "https://lambivgills.com",
  },
  category: "technology",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#64ffda" }
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={`/icon.svg?v=${ICON_VERSION}`} type="image/svg+xml" sizes="any" />
        <link rel="icon" href={`/favicon.ico?v=${ICON_VERSION}`} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-32x32.png?v=${ICON_VERSION}`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/favicon-16x16.png?v=${ICON_VERSION}`} />
        <link rel="shortcut icon" href={`/favicon.ico?v=${ICON_VERSION}`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`/apple-touch-icon.png?v=${ICON_VERSION}`} />
      </head>
      <body
        suppressHydrationWarning
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <StructuredData />
            <Navigation />
            <SocialLinks />
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
