import { Activity } from "@prisma/client"

interface HabitItemProps {
  habit: Pick<Activity, "id" | "name" | "category" | "createdAt" | "updatedAt">
}

export default function HabitItem({ habit }: HabitItemProps) {
  return (
    <div>habit-item</div>
  )
}
