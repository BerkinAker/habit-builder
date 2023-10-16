'use client'
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils"
import { Activity } from "@prisma/client"
import HabitFunctions from "./habit-functions"
import { Button, buttonVariants } from "./ui/button"
import { Check } from "lucide-react"
import { toast } from "sonner"

interface HabitItemProps {
  habit: Pick<Activity, "id" | "name" | "category" | "description" | "habitCurrentValue" | "habitGoalValue" | "habitGoalUnit" | "createdAt" | "updatedAt">
}

export default function HabitItem({ habit }: HabitItemProps) {
  const router = useRouter()
  const [isSave, setIsSave] = React.useState<boolean>(false)

  async function logClick(habitId: string) {
    setIsSave(true)
    const response = await fetch(`/api/habits/${habitId}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })

    setIsSave(false)
    if (!response?.ok) {
      if (response.status === 400) {
        toast("You have already logged this habit today.")
      } else {
        toast("Something went wrong. Please try again.")
      }
    } else {
      if (response.status === 202) {
        toast('You completed your habit for today! Great job!')
      } else {
        toast('Your progress is saved. Keep it up!')
      }
    }

    router.refresh()
  }

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-16">
        <div className="flex flex-col gap-1">
          <Link href={`/edit/${habit.id}`} className="font-semibold hover:underline underline-offset-4 decoration-[#FF5C00]">
            {habit.name}
          </Link>
          <div>
            <span className="text-sm text-muted-foreground">{habit.habitCurrentValue} / {habit.habitGoalValue} {habit.habitGoalUnit}</span>
            <p className="text-[12px] font-semibold text-muted-foreground">
              {formatDate(habit.createdAt.toDateString())}
            </p>
          </div>
        </div>
        {habit.description ? (
          <div>
            <p className="text-sm text-muted-foreground">{habit.description}</p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <Button onClick={() => logClick(habit.id)} className={cn(buttonVariants({ variant: "outline" }), "flex items-center border-solid border-[1px] text-black")} disabled={isSave}>
          <Check className="mr-2" size={16} />
          Done
        </Button>
        <HabitFunctions habit={{ id: habit.id, name: habit.name, description: habit.description, category: habit.category, habitCurrentValue: habit.habitCurrentValue, habitGoalValue: habit.habitGoalValue, habitGoalUnit: habit.habitGoalUnit }} />
      </div>
    </div>
  )
}
