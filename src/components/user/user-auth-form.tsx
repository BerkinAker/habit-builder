'use client'
import { signIn } from "next-auth/react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Github } from "lucide-react"
import { cn } from "@/lib/utils"

const UserAuthForm = () => {
  return (
    <div className="grid gap-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button onClick={() => signIn("github")} className={cn(buttonVariants({ variant: "outline" }), " border-solid border-[1px] border-[#FF5C00] text-black")}><Github size={20} strokeWidth={2} /> &nbsp; Continue with Github</Button>
    </div>
  )
}

export default UserAuthForm