import DashboardCard from "@/components/dahsboard-card"
import DashboardHeader from "@/components/dashboard-header"
import { DateRangePicker } from "@/components/date-range-picker"
import Shell from "@/components/layout/shell"
import { LogsChart } from "@/components/recharts/logs-chart"
import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Metadata } from "next"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your progress.",
}
const Dashboard = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/signin')
  }

  return (
    <Shell>
      <DashboardHeader heading="Dashboard" text="Track your progress.">
        <DateRangePicker />
      </DashboardHeader>
      <DashboardCard />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <LogsChart />
      </div>  
    </Shell>
  )
}

export default Dashboard
