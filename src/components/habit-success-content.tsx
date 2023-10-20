'use client'

import { Activity, ActivityLog } from "@prisma/client";
import HabitItem from "./habit-item";
import { useRouter } from "next/navigation";

interface HabitSuccessContentProps {
  habit: Pick<Activity, "id" | "name" | "category" | "description" | "habitCurrentValue" | "habitGoalValue" | "habitGoalUnit" | "createdAt" | "updatedAt">
  logs: ActivityLog[]
}

export default function HabitSuccessContent({ habit, logs }: HabitSuccessContentProps) {
  const router = useRouter()

  if (habit.updatedAt.getUTCFullYear() !== new Date().getUTCFullYear() || habit.updatedAt.getUTCMonth() !== new Date().getUTCMonth() || habit.updatedAt.getUTCDate() !== new Date().getUTCDate()) {
    router.refresh()
  }
  
  return (
    logs.length > 0 ? (<HabitItem habit={habit} isSuccessField={true} />) : null
  )
}
