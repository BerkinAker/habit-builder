import * as React from "react"
import { Activity } from "@prisma/client"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { habitPatchSchema } from "@/lib/validations/habit";
import { Textarea } from "./ui/textarea";
import { Button, buttonVariants } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertDialogCancel } from "./ui/alert-dialog";
import { cn } from "@/lib/utils";

interface HabitEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
  habit: Pick<Activity, "id" | "name" | "description" | "category" | "habitCurrentValue" | "habitGoalValue" | "habitGoalUnit">
  setShowEditModal: (active: boolean) => void
}

type Inputs = z.infer<typeof habitPatchSchema>

export default function HabitEditForm({ habit, setShowEditModal, className, ...props }: HabitEditFormProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(habitPatchSchema),
    defaultValues: {
      name: habit.name,
      description: habit.description || "",
      category: habit.category || "",
      habitCurrentValue: habit.habitCurrentValue,
      habitGoalValue: habit.habitGoalValue,
      habitGoalUnit: habit.habitGoalUnit,
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
        habitGoalValue: data.habitGoalValue,
        habitGoalUnit: data.habitGoalUnit,
      }),
    })

    setIsSave(false)
    setShowEditModal(false)

    if (!response.ok) {
      toast("Your habit was not updated. Please try again.")
    }

    toast("Your habit was updated.")

    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSave} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="habitGoalValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal</FormLabel>
                <FormControl>
                  <Input disabled={isSave} type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="habitGoalUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal Unit</FormLabel>
                <FormControl>
                  <select
                    disabled={isSave}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-[200px] appearance-none bg-transparent font-normal"
                    )}
                    {...field}
                  >
                    <option value="times">Times</option>
                    <option value="minutes" disabled>Mins</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={isSave} />
              </FormControl>
              <FormDescription>
                This is the description of your habit.
              </FormDescription>
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSave} />
              </FormControl>
            </FormItem>
          )}
        /> */}
        <div className="flex flex-col w-full gap-2 md:w-auto md:flex md:flex-row md:justify-end md:gap-2">
          <AlertDialogCancel disabled={isSave}>Cancel</AlertDialogCancel>
          <Button type="submit" disabled={isSave}>
            {isSave && (
              <Loader2 size={18} className="animate-spin mr-2" />
            )}
            <span>Save</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
