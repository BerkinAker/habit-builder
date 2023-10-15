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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { Loader2 } from "lucide-react";
import { AlertDialogCancel } from "./ui/alert-dialog";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface HabitAddFormProps extends React.HTMLAttributes<HTMLFormElement> {
  setShowAddModal: (active: boolean) => void
}

type Inputs = z.infer<typeof habitPatchSchema>

const defaultValues: Partial<Inputs> = {
  name: "",
  description: "",
  category: "",
  habitGoalValue: 1,
  habitGoalUnit: "times",
  habitCurrentValue: 0,
}

export default function HabitAddForm({ setShowAddModal, className, ...props }: HabitAddFormProps) {
  const form = useForm<Inputs>({
    resolver: zodResolver(habitPatchSchema),
    defaultValues,
    mode: "onChange"
  })

  const router = useRouter()
  const [isSave, setIsSave] = React.useState<boolean>(false)

  async function onSubmit(data: Inputs) {
    setIsSave(true)

    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        category: data.category,
        habitGoalValue: data.habitGoalValue,
        habitGoalUnit: data.habitGoalUnit,
        habitCurrentValue: data.habitCurrentValue,
      }),
    })

    setIsSave(false)
    setShowAddModal(false)

    if (!response?.ok) {
      // payment required
      if (response.status === 402) {
        // return toast.error("You've reached your habit limit. Please upgrade your account to add more habits.")
      }
      toast("Something went wrong. Please try again.")
    }

    toast("Your habit was created.")

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
                <Input {...field} />
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
                  <Input type="number" {...field} />
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
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-[200px] appearance-none bg-transparent font-normal"
                    )}
                    {...field}
                  >
                    <option value="times">Times</option>
                    <option value="minutes">Mins</option>
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
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                This is the description of your habit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
