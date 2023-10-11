"use client"

import * as React from "react"
import Link from "next/link"
import { Activity } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { set } from "date-fns"

async function deleteHabit(habitId: string) {
  const response = await fetch(`/api/habits/${habitId}`, {
    method: "DELETE"
  })

  if (!response?.ok) {
    // toast
  } else {
    // toast
  }

  return true
}

interface HabitFunctionsProps {
  habit: Pick<Activity, "id">
}

export default function HabitFunctions({ habit }: HabitFunctionsProps) {
  const router = useRouter()
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center h-8 w-8 border rounded-md hover:bg-muted">
            <MoreHorizontal size={20} color="#001524" strokeWidth={1} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/edit/${habit.id}`} className="flex items-center w-full">
              <Pencil size={18} className="mr-3" />
              Edit
            </Link>
          </DropdownMenuItem>
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
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure you want to delete this habit?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the habit and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
