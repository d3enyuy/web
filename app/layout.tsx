import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: {
    default: "Lambiv Gills Dzenyuy | Software Engineer & Researcher",
    template: "%s | Lambiv Gills Dzenyuy"
  },
  description:
    "Lambiv Gills Dzenyuy is a Software Engineer at Bilin GmbH specializing in Neo4j graph databases, Apache Kafka, PostgreSQL, and Spring Boot. Based in Germany with experience in full-stack development, data science, and software engineering.",
  keywords: [
    "Lambiv Gills Dzenyuy",
    "Software Engineer",
    "Neo4j",
    "Apache Kafka", 
    "PostgreSQL",
    "Spring Boot",
    "Java",
    "Data Science",
    "Graph Databases",
    "Germany",
    "Bilin GmbH",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Python",
    "Software Development",
    "Portfolio"
  ],
  authors: [{ name: "Lambiv Gills Dzenyuy" }],
  creator: "Lambiv Gills Dzenyuy",
  publisher: "Lambiv Gills Dzenyuy",
  generator: "Next.js",
  applicationName: "Lambiv Gills Dzenyuy Portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#64ffda" }
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lambiv-dzenyuy.vercel.app",
    siteName: "Lambiv Gills Dzenyuy Portfolio",
    title: "Lambiv Gills Dzenyuy | Software Engineer & Researcher",
    description: "Software Engineer at Bilin GmbH specializing in Neo4j graph databases, Apache Kafka, PostgreSQL, and Spring Boot. Based in Germany with expertise in full-stack development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lambiv Gills Dzenyuy - Software Engineer & Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lambiv Gills Dzenyuy | Software Engineer & Researcher",
    description: "Software Engineer at Bilin GmbH specializing in Neo4j, Apache Kafka, PostgreSQL, and Spring Boot.",
    images: ["/og-image.png"],
    creator: "@lambiv_dzenyuy",
  },
  alternates: {
    canonical: "https://lambiv-dzenyuy.vercel.app",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
