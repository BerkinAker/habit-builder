import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import HabitItem from "./habit-item"
import { Activity } from "@prisma/client"

interface HabitSuccessProps {
  habit: Pick<Activity, "id" | "name" | "category" | "description" | "habitCurrentValue" | "habitGoalValue" | "habitGoalUnit" | "createdAt" | "updatedAt">
  habitSuccess: boolean
  isSuccessField: boolean
}

export default function HabitSuccess({ habitSuccess, habit, isSuccessField }: HabitSuccessProps) {
  return (
    <AccordionContent>
      {habitSuccess ? (<HabitItem habit={habit} isSuccessField={isSuccessField} />) : null}
    </AccordionContent>
  )
}
