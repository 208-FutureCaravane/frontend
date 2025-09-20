import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Protest_Strike } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LiveOrderUpdates } from "@/components/live-order-updates"
import { Toaster } from "@/components/ui/toaster"
import { AppHeader } from "@/components/app-header"
import { BottomNavigation } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/components/translation-provider"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist-sans",
})

const protestStrike = Protest_Strike({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Smart Restaurant - Order Food Online",
  description: "Fast, modern food delivery app with AI-powered search and real-time tracking",
  generator: "v0.app",
  manifest: "/manifest.json",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${poppins.variable} ${protestStrike.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <TranslationProvider>
            <div className="min-h-screen bg-background transition-colors duration-300">
              <AppHeader />
              <main className="pb-12 min-h-screen">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    </div>
                  }
                >
                  {children}
                </Suspense>
              </main>
              <BottomNavigation />
            </div>
            <LiveOrderUpdates />
            <Toaster />
          </TranslationProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
