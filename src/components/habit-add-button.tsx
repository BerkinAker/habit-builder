"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { Loader2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import HabitAddForm from "./habit-add-form"
import { useHabitProgress } from "@/hooks/use-habit-progress"

interface HabitCreateButtonProps extends ButtonProps { }

export default function HabitAddButton({ className, variant, ...props }: HabitCreateButtonProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false)
  const isOpen = useHabitProgress((store) => store.isOpen);

  return (
    <>
      <Button
        onClick={() => setShowAddModal(true)}
        className={cn(
          buttonVariants({ variant }),
          { "cursor-not-allowed opacity-70": isLoading },
          className
        )}
        disabled={isOpen}
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin mr-2" />
        ) : <Plus size={18} className="mr-2" />
        }
        New habit
      </Button>

      <AlertDialog open={showAddModal} onOpenChange={setShowAddModal}>
        <AlertDialogContent>
          <HabitAddForm setShowAddModal={setShowAddModal} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
