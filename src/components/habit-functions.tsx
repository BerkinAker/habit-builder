"use client"

import * as React from "react"
import { Activity } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Loader2, MoreHorizontal, Pencil, Trash2, Undo } from "lucide-react"
import { toast } from 'sonner';
import HabitEditForm from "./habit-edit-form"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useHabitProgress } from "@/hooks/use-habit-progress"

async function deleteHabit(habitId: string) {
  const response = await fetch(`/api/habits/${habitId}`, {
    method: "DELETE"
  })

  if (!response?.ok) {
    toast('Something went wrong. Please try again.')
  } else {
    toast('Your habit has been deleted successfully.')
  }

  return true
}

async function undoHabit(habitId: string) {
  const response = await fetch(`/api/habits/${habitId}/undo`, {
    method: "POST"
  })

  if (!response?.ok) {
    toast('Something went wrong. Please try again.')
  } else {
    toast('Your habit has been reset successfully.')
  }

  return true
}

interface HabitFunctionsProps {
  habit: Pick<Activity, "id" | "name" | "description" | "category" | "habitCurrentValue" | "habitGoalValue" | "habitGoalUnit">
  successField?: boolean
}

export default function HabitFunctions({ habit, successField }: HabitFunctionsProps) {
  const router = useRouter()

  const isOpen = useHabitProgress((store) => store.isOpen);

  const [showEditModal, setShowEditModal] = React.useState<boolean>(false)
  const [showUndoModal, setShowUndoModal] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu modal={isOpen}>
        <DropdownMenuTrigger disabled={isOpen}>
          <div className="flex items-center justify-center h-8 w-8 border rounded-md hover:bg-muted">
            <MoreHorizontal size={20} color="#78716c" strokeWidth={1} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {successField ? (
            <DropdownMenuItem onSelect={() => {
              document.body.style.pointerEvents = ""
              setShowUndoModal(true)
            }}
              className="cursor-pointer"
            >
              <Undo size={18} className="mr-3" />
              Undo
            </DropdownMenuItem>
          ) :
            (
              <DropdownMenuItem onSelect={() => {
                document.body.style.pointerEvents = ""
                setShowEditModal(true)
              }}
                className="cursor-pointer"
              >
                <Pencil size={18} className="mr-3" />
                Edit
              </DropdownMenuItem>
            )}
          <DropdownMenuSeparator />
          {/* onSelect: Event handler called when the user selects an item (via mouse or keyboard). Source: https://www.radix-ui.com/primitives/docs/components/dropdown-menu#api-reference */}
          <DropdownMenuItem onSelect={() => {
            document.body.style.pointerEvents = ""
            setShowDeleteModal(true)
          }}
            className="flex items-center text-red-500 focus:text-red-500 cursor-pointer">
            <Trash2 size={18} className="mr-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Alert Dialog  */}
      <AlertDialog open={showEditModal} onOpenChange={setShowEditModal}>
        <AlertDialogContent>
          <HabitEditForm
            habit={{ id: habit.id, name: habit.name, description: habit.description, category: habit.category, habitCurrentValue: habit.habitCurrentValue, habitGoalValue: habit.habitGoalValue, habitGoalUnit: habit.habitGoalUnit }}
            setShowEditModal={setShowEditModal}
          />
        </AlertDialogContent>
      </AlertDialog>

      {/* Undo Alert Dialog */}
      <AlertDialog open={showUndoModal} onOpenChange={setShowUndoModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to undo this habit?</AlertDialogTitle>
            <AlertDialogDescription>
              Log value will be removed for Today, do you want to undo this habit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleteLoading}
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const resetHabit = await undoHabit(habit.id)

                if (resetHabit) {
                  setShowDeleteModal(false)
                  setIsDeleteLoading(false)
                  router.refresh()
                }

              }}
            >
              {isDeleteLoading ? (
                <Loader2 size={18} className="animate-spin mr-2" />
              ) : <Undo size={18} className="mr-2" />}

              Undo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure you want to delete this habit?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the habit and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleteLoading}
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deletedHabit = await deleteHabit(habit.id)

                if (deletedHabit) {
                  setShowDeleteModal(false)
                  setIsDeleteLoading(false)
                  router.refresh()
                }
              }}
            >
              {isDeleteLoading ? (
                <Loader2 size={18} className="animate-spin mr-2" />
              ) : <Trash2 size={18} className="mr-2" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
