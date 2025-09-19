import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { ProfileSettings } from "@/components/profile-settings"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pb-16 pt-12">
        <ProfileSettings />
      </main>
      <BottomNavigation />
    </div>
  )
}
