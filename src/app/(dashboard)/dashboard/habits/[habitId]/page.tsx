import DashboardCard from "@/components/dahsboard-card"
import DashboardHeader from "@/components/dashboard-header"
import Shell from "@/components/layout/shell"
import LogHeatmap from "@/components/recharts/logheatmap"
import LogsBarChart from "@/components/recharts/logs-bar-chart"
import { authOptions } from "@/lib/auth"
import { getSpecificHabitData } from "@/lib/dashboard"
import { getHabitById } from "@/lib/habits"
import { getCurrentUser } from "@/lib/session"
import { notFound, redirect } from "next/navigation"

interface HabitPageProps {
  params: { habitId: string }
}

export default async function HabitPage({ params }: HabitPageProps) {

  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/signin')
  }

  const habit = await getHabitById(params.habitId, user.id)

  if (!habit) {
    notFound()
  }

  const specificHabitData = await getSpecificHabitData(habit.id, user.id)

  const updatedHabitData = specificHabitData.habitLogs.map((log) => {
    return {
      ...log,
      count: specificHabitData.habitLogs[0].activity.habitGoalValue,
      date: log.date.toISOString().split('T')[0]
    }
  })

  return (
    <Shell>
      <DashboardHeader
        heading={`${habit.name}`}
        text={`${habit.description}`}
      >
      </DashboardHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard data={specificHabitData} />
        <div className="md:col-span-2">
          <LogsBarChart data={specificHabitData.weeklyHabitLogs} />
        </div>
      </div>
      <LogHeatmap data={updatedHabitData} params={params} />
    </Shell>
  )
}
