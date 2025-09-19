import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { QRScanner } from "@/components/qr-scanner"

export default function ScannerPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pb-16 pt-12">
        <QRScanner />
      </main>
      <BottomNavigation />
    </div>
  )
}
