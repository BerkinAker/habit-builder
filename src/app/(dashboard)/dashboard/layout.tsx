import AuthNav from "@/components/auth-nav"
import { dashboardConfig } from "@/config/dashboard"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex items-center justify-between h-16 py-4">
          <AuthNav items={dashboardConfig.mainNav}/>
          {children}
        </div>
      </div>
    </div>
  )
}
