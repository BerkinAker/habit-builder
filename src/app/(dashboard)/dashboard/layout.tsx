import AuthNav from "@/components/auth-nav"
import DashboardNav from "@/components/dashboard-nav"
import Footer from "@/components/footer"
import UserNav from "@/components/user-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser()
  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      {/* header */}
      <div className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex items-center justify-between h-16 py-4">
          <AuthNav items={dashboardConfig.mainNav} />
          <UserNav user={{
            name: user.name as string,
            email: user.email as string,
            image: user.image as string,
          }} />
        </div>
      </div>
      {/* dashboard */}
      <div className="container grid gap-12 flex-1 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] md:flex flex-col">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex flex-col w-full flex-1">
          {children}
        </main>
      </div>
      <Footer className="border-t" />
    </div>
  )
}
