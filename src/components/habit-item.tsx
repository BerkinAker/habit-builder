import { cn, formatDate } from "@/lib/utils"
import { Activity } from "@prisma/client"
import Link from "next/link"
import HabitFunctions from "./habit-functions"
import { Button, buttonVariants } from "./ui/button"
import { Check } from "lucide-react"

interface HabitItemProps {
  habit: Pick<Activity, "id" | "name" | "category" | "description" | "habitCurrentValue" | "habitGoalValue" | "habitGoalUnit" | "createdAt" | "updatedAt">
}

export default function HabitItem({ habit }: HabitItemProps) {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-16">
        <div className="flex flex-col gap-1">
          <Link href={`/edit/${habit.id}`} className="font-semibold hover:underline underline-offset-4 decoration-[#FF5C00]">
            {habit.name}
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">
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
        <Button className={cn(buttonVariants({ variant: "outline" }), "flex items-center border-solid border-[1px] text-black")}>
          <Check className="mr-2" size={16} />
          Done
        </Button>
        <HabitFunctions habit={{ id: habit.id, name: habit.name, description: habit.description, category: habit.category, habitCurrentValue: habit.habitCurrentValue, habitGoalValue: habit.habitGoalValue, habitGoalUnit: habit.habitGoalUnit }} />
      </div>
    </div>
  )
}
