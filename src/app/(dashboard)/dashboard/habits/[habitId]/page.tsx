import { authOptions } from "@/lib/auth"
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

  return (
    <div>habit id: {params.habitId}</div>
  )
}
