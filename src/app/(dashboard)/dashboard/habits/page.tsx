import DashboardHeader from "@/components/dashboard-header"
import HabitAddButton from "@/components/habit-add-button"
import HabitItem from "@/components/habit-item"
import HabitSuccess from "@/components/habit-success"
import Shell from "@/components/layout/shell"
import { Placeholder } from "@/components/placeholder"
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Calendar } from "lucide-react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Habits",
  description: "Activities page",
}

export default async function Habits() {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/signin')
  }

  const habits = await db.activity.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      name: true,
      category: true,
      description: true,
      habitCurrentValue: true,
      habitGoalValue: true,
      habitGoalUnit: true,
      createdAt: true,
      updatedAt: true,
    }
  })

  return (
    <Shell>
      <DashboardHeader heading="Habits" text="Manage your habits">
        <HabitAddButton />
      </DashboardHeader>
      <div>
        {habits?.length ? (
          <div>
            <div className="divide-y divide-border border rounded-md">
              {habits.map((habit) => (
                <HabitItem key={habit.id} habitSuccess={habit.habitCurrentValue === habit.habitGoalValue} habit={habit} />
              ))}
            </div>
            <Separator className="mt-8" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Success</AccordionTrigger>
                <div className="divide-y divide-border border rounded-md">
                  {habits.map((habit) => (
                    // @ts-expect-error Server Component
                    <HabitSuccess key={habit.id} habitSuccess={habit.habitCurrentValue === habit.habitGoalValue} isSuccessField={true} habit={habit} />
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        ) : (
          <Placeholder>
            <div className="flex justify-center items-center h-20 w-20 rounded-full bg-muted">
              <Calendar size={40} color="#ff5c00" strokeWidth={2.5} />
            </div>
            <Placeholder.Title>No habits yet</Placeholder.Title>
            <Placeholder.Description>
              Get started by adding a new habit.
            </Placeholder.Description>
            <HabitAddButton variant="outline" className="border-solid border-[1px] border-[#FF5C00] text-black" />
          </Placeholder>
        )}
      </div>
    </Shell>
  )
}
