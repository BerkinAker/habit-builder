import * as React from "react"
import { Activity } from "@prisma/client"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { habitPatchSchema } from "@/lib/validations/habit";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertDialogCancel } from "./ui/alert-dialog";

interface HabitEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  habit: Pick<Activity, "id" | "name" | "description" | "category">
  setShowEditModal: (active: boolean) => void
}

type Inputs = z.infer<typeof habitPatchSchema>

export default function HabitEditForm({ habit, setShowEditModal, className, ...props }: HabitEditFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(habitPatchSchema),
    defaultValues: {
      name: habit.name,
      description: habit.description || "",
      category: habit.category,
    },
  })
  const router = useRouter()
  const [isSave, setIsSave] = React.useState<boolean>(false)

  async function onSubmit(data: Inputs) {
    setIsSave(true)

    const response = await fetch(`/api/habits/${habit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        category: data.category,
      }),
    })

    setIsSave(false)
    setShowEditModal(false)

    if (!response.ok) {
      // toast("Your habit was not updated. Please try again.")
    }

    // toast("Your habit was updated.")

    router.refresh()
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{habit.name}</CardTitle>
          {habit.description && (
            <CardDescription>{habit.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {/* name */}
          <div>
            <Label>Name</Label>
            <Input id="name" className="w-full" size={32} {...register("name")} />
            {errors.name && <span className="text-xs text-red-600 px-2">{errors.name.message}</span>}
          </div>
          {/* description */}
          <div>
            <Label>Description</Label>
            <Textarea id="description" className="w-full" {...register("description")} />
            {errors.description && <span className="text-xs text-red-600 px-2">{errors.description.message}</span>}
          </div>
          {/* category */}
          <div>
            <Label>Category</Label>
            <Input id="category" className="w-full" size={32} {...register("category")} />
            {errors.category && <span className="text-xs text-red-600 px-2">{errors.category.message}</span>}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full md:w-auto md:flex md:flex-row md:gap-2">
            <Button type="submit" disabled={isSave}>
              {isSave && (
                <Loader2 size={18} className="animate-spin mr-2" />
              )}
              <span>Save</span>
            </Button>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
