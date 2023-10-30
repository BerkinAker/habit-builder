import DashboardCard from "@/components/dahsboard-card"
import DashboardHeader from "@/components/dashboard-header"
import Shell from "@/components/layout/shell"
import LogsBarChart from "@/components/recharts/logs-bar-chart"
import { authOptions } from "@/lib/auth"
import { getSpecificHabitData } from "@/lib/dashboard"
import { db } from "@/lib/db"
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
    
  return (
    <Shell>
      <DashboardHeader
        heading={`${habit.name}`}
        text={`${habit.description}`}
      >
      </DashboardHeader>
      <DashboardCard data={specificHabitData} />
      <LogsBarChart data={specificHabitData.weeklyHabitLogs} />
    </Shell>
  )
}
