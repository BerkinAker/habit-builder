import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import Shell from "@/components/layout/shell";
import DashboardHeader from "@/components/dashboard-header";

export const metadata = {
  title: "Edit Habit",
  description: "Edit a habit.",
}

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
interface EditHabitProps {
  params: { habitId: string }
}

export default async function EditHabit({ params }: EditHabitProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/signin')
  }

  const habit = await db.activity.findFirst({
    where: {
      id: params.habitId,
      userId: user.id
    },
  })

  if (!habit) {
    notFound()
  }

  return (
    <Shell>
      
    </Shell>     
  )
}
