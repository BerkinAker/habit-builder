'use client'
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const Dashboard = () => {
  return (
    <div className="container h-screen w-screen flex flex-col justify-center items-center">
      <h1>Welcome to Dashboard</h1>
      <div>
        <Button onClick={() => signOut({
          callbackUrl: `${window.location.origin}/signin`
        })}>
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default Dashboard