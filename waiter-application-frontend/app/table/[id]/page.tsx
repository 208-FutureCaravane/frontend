import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { TableDetails } from "@/components/table-details"

interface TablePageProps {
  params: {
    id: string
  }
}

export default function TablePage({ params }: TablePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pb-16 pt-12">
        <TableDetails tableId={params.id} />
      </main>
      <BottomNavigation />
    </div>
  )
}
