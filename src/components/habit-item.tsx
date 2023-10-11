import { formatDate } from "@/lib/utils"
import { Activity } from "@prisma/client"
import Link from "next/link"
import HabitFunctions from "./habit-functions"

interface HabitItemProps {
  habit: Pick<Activity, "id" | "name" | "category" | "description" | "createdAt" | "updatedAt">
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
            <p className="text-sm text-muted-foreground">asdasd</p>
          </div>
        ) : null}
      </div>
      <HabitFunctions habit={{ id: habit.id }} />
    </div>
  )
}
