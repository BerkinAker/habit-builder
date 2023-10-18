'use client'
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils"
import { Activity } from "@prisma/client"
import HabitFunctions from "./habit-functions"
import { Button, buttonVariants } from "./ui/button"
import { Check, Divide, Plus } from "lucide-react"
import { toast } from "sonner"
import { useHabitProgress } from "@/hooks/use-habit-progress"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface HabitItemProps {
  habit: Pick<Activity, "id" | "name" | "category" | "description" | "habitCurrentValue" | "habitGoalValue" | "habitGoalUnit" | "createdAt" | "updatedAt">
  habitSuccess?: boolean
  isSuccessField?: boolean
}

export default function HabitItem({ habit, habitSuccess, isSuccessField }: HabitItemProps) {
  const router = useRouter()

  const isOpen = useHabitProgress((store) => store.isOpen);
  const onClose = useHabitProgress((store) => store.onClose);
  const onOpen = useHabitProgress((store) => store.onOpen);

  async function logClick(habitId: string) {
    onOpen()
    const response = await fetch(`/api/habits/${habitId}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })

    onClose()
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
    <>
      {(!habitSuccess || isSuccessField) ? (
        <div className="flex justify-between items-center p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-16">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-8 mb-2">
                <div style={{ width: 60, height: 60 }}>
                  <CircularProgressbar value={(habit.habitCurrentValue / habit.habitGoalValue) * 100} text={`${(habit.habitCurrentValue / habit.habitGoalValue) * 100}%`} styles={buildStyles({
                    pathColor: '#ff5c00',
                    textColor: '#78716c',
                  })} />
                </div>
                <Link href={`/edit/${habit.id}`} className={cn("font-semibold hover:underline underline-offset-4 decoration-[#FF5C00] mt-[4px]", isSuccessField && "line-through decoration-muted-foreground hover:line-through")}>
                  {habit.name}
                </Link>
              </div>
              <div>
                <span className={cn("text-sm text-muted-foreground", isSuccessField && "line-through")}>{habit.habitCurrentValue} / {habit.habitGoalValue} {habit.habitGoalUnit}</span>
                {/* <p className="text-[12px] font-semibold text-muted-foreground">
                  {formatDate(habit.createdAt.toDateString())}
                </p> */}
              </div>
            </div>
            {/* {habit.description ? (
              <div>
                <p className="text-sm text-muted-foreground">{habit.description}</p>
              </div>
            ) : null} */}
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <Button onClick={() => logClick(habit.id)} className={cn(buttonVariants({ variant: "outline" }), "flex items-center border-solid border-[1px] text-black", isSuccessField && "hidden")} disabled={isOpen}>
              {(habit.habitGoalValue === 1) ?
                (<>
                  <Check className="mr-2" size={16} color="#78716c" />
                  <span>Done</span>
                </>) :
                (<>
                  <Plus size={16} className="mr-2" color="#78716c" />
                  1
                </>)}
            </Button>
            <HabitFunctions habit={{ id: habit.id, name: habit.name, description: habit.description, category: habit.category, habitCurrentValue: habit.habitCurrentValue, habitGoalValue: habit.habitGoalValue, habitGoalUnit: habit.habitGoalUnit }} />
          </div>
        </div>
      ) :
        null
      }
    </>
  )
}
