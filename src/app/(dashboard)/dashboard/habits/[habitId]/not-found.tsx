import { Placeholder } from "@/components/placeholder";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Placeholder>
      <div className="flex justify-center items-center h-20 w-20 rounded-full bg-muted">
        <Calendar size={40} strokeWidth={2.5} />
      </div>
      <Placeholder.Title>Not Found</Placeholder.Title>
      <Placeholder.Description>
        Habit cannot be found.
      </Placeholder.Description>
      <Link className={buttonVariants({ variant: "outline" })} href="/dashboard/habits">
        Back
      </Link>
      {/* <HabitAddButton variant="outline" className="text-black" /> */}
    </Placeholder>
  )
}
