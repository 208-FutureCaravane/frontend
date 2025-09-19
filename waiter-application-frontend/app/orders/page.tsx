import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { OrdersManagement } from "@/components/orders-management"

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pb-16 pt-12">
        <OrdersManagement />
      </main>
      <BottomNavigation />
    </div>
  )
}
