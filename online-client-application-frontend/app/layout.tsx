import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Protest_Strike } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LiveOrderUpdates } from "@/components/live-order-updates"
import { Toaster } from "@/components/ui/toaster"
import { PWAHeader } from "@/components/pwa-header"
import { PWABottomNav } from "@/components/pwa-bottom-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/components/translation-provider"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const protestStrike = Protest_Strike({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-protest-strike",
})

export const metadata: Metadata = {
  title: "Smart Restaurant - Order Food Online",
  description: "Fast, modern food delivery app with AI-powered search and real-time tracking",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
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
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
              <PWAHeader />
              <main className="pt-16 sm:pt-20 pb-20 sm:pb-24 px-0 min-h-screen overflow-x-hidden max-w-md mx-auto md:max-w-none md:mx-0">
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
              <PWABottomNav />
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
