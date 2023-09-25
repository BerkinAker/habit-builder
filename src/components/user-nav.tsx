'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatarNav from "./user-avatar-nav"
import { User } from "@prisma/client"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface UserNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "email" | "image">
}
export default function UserNav({ user }: UserNavProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatarNav />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="flex justify-center items-center gap-2 p-2">
            <div className="flex-col space-y-2">
              {user.name && <p className="font-medium">{user.name}</p>}
              {user.email && <p className="text-sm text-muted-foreground w-[210px]">{user.email}</p>}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event: any) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/signin`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
// Sign out button version
{/* <DropdownMenuItem> <Button onClick={() => signOut({
                callbackUrl: `${window.location.origin}/signin`
              })}>
                Sign out
              </Button></DropdownMenuItem> */}