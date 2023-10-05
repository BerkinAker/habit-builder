import DashboardHeader from "@/components/dashboard-header"
import HabitAddButton from "@/components/habit-add-button"
import Shell from "@/components/layout/shell"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Habits",
  description: "Activities page",
}

export default function Habits() {
  return (
    <Shell>
      <DashboardHeader heading="Habits" text="Manage your habits">
        <HabitAddButton />
      </DashboardHeader>
    </Shell>
  )
}
