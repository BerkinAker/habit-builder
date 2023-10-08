"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button, ButtonProps } from "@/components/ui/button"
import { Loader2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface HabitCreateButtonProps extends ButtonProps { }

export default function HabitAddButton({ className, variant, ...props }: HabitCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New Habit",
        category: "uncategorized",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      // payment required
      if (response.status === 402) {
        // return toast.error("You've reached your habit limit. Please upgrade your account to add more habits.")
      }
      // return toast.error("Something went wrong. Please try again.")
    }

    const habit = await response.json()

    router.push(`/edit/${habit.id}`)
    router.refresh()
  }

  return (
    <Button
      onClick={() => onClick()}
      className={cn(
        { "cursor-not-allowed opacity-70": isLoading }
      )}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin mr-2" />
      ) : <Plus size={18} className="mr-2" />
      }
      New habit
    </Button>
  )
}
