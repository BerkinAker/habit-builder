import DashboardHeader from "@/components/dashboard-header"
import Shell from "@/components/layout/shell"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  return (
    <Shell>
      <DashboardHeader text="Handle account and application preferences." heading="Settings">

      </DashboardHeader>
    </Shell>
  )
}
