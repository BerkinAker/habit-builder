'use client'
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

const UserAuthForm = () => {
  return (
    <div>
      <Button onClick={() => signIn("github")}>Continue with Github</Button>
    </div>
  )
}

export default UserAuthForm