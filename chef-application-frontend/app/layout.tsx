import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { NotificationProvider } from "@/components/notification-system"
import { I18nProvider } from "@/components/i18n-provider"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Chef Dashboard - Smart Restaurant",
  description: "Efficient kitchen management system for smart restaurants",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${poppins.variable} antialiased`}>
        <I18nProvider>
          <NotificationProvider>
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </NotificationProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
