import DashboardCard from "@/components/dahsboard-card"
import DashboardHeader from "@/components/dashboard-header"
import Shell from "@/components/layout/shell"
import LogsBarChart from "@/components/recharts/logs-bar-chart"
import { LogsChart } from "@/components/recharts/logs-chart"
import { authOptions } from "@/lib/auth"
import { getHabitData } from "@/lib/dashboard"
import { getCurrentUser } from "@/lib/session"
import { Metadata } from "next"
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

  const habitLogsData = await getHabitData(user.id)

  return (
    <Shell>
      <DashboardHeader heading="Dashboard" text="Track your progress.">
        {/* <DateRangePicker /> */}
      </DashboardHeader>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <DashboardCard data={habitLogsData} />
        <LogsBarChart data={habitLogsData.habitLogsCountByName} />
      </div>
      <div className="grid grid-cols-1 ">
        <LogsChart data={habitLogsData.habitLogsCountByDate} />
      </div>
    </Shell>
  )
}

export default Dashboard
