import { useRouter } from "next/navigation"
import HabitItem from "./habit-item"
import { Activity } from "@prisma/client"
import { getTodaysActivityLog } from "@/lib/habits"
import { db } from "@/lib/db"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface HabitSuccessProps {
  habit: Pick<Activity, "id" | "name" | "category" | "description" | "habitCurrentValue" | "habitGoalValue" | "habitGoalUnit" | "createdAt" | "updatedAt">
  habitSuccess: boolean
  isSuccessField: boolean
}

export default async function HabitSuccess({ habitSuccess, habit, isSuccessField }: HabitSuccessProps) {
  const logs = await getTodaysActivityLog(habit.id)

  return (
    <AccordionContent>
      {logs.length > 0 ? (<HabitItem habit={habit} isSuccessField={isSuccessField} />) : null}
    </AccordionContent>
  )
}
