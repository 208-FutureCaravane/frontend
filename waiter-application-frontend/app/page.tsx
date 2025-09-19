import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { TableOverview } from "@/components/table-overview"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pb-16 pt-12">
        <TableOverview />
      </main>
      <BottomNavigation />
    </div>
  )
}
