import { User } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User2 } from "lucide-react"

interface UserAvatarNavProps {
  user: Pick<User, "name" | "image">
}

export default function UserAvatarNav({ user }: UserAvatarNavProps) {
  return (
    <div className="mt-2">
      <Avatar>
        {user.image ? (
          <AvatarImage alt="user picture" src={user.image} />
        ) : (
          <AvatarFallback><User2 size={26} color="#ff5c00" strokeWidth={2.5} /></AvatarFallback>
        )}
      </Avatar>
    </div>
  )
}
