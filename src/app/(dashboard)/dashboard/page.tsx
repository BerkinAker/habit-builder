'use client'
import DashboardHeader from "@/components/dashboard-header"
import Shell from "@/components/layout/shell"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const Dashboard = () => {
  return (
    <Shell>
      <DashboardHeader heading="Resumes" text="Create your dream Resume">

      </DashboardHeader>
    </Shell>
  )
}

export default Dashboard


{/* <h1>Welcome to Dashboard</h1>
      <div>
        <Button onClick={() => signOut({
          callbackUrl: `${window.location.origin}/signin`
        })}>
          Sign out
        </Button>
      </div> */}