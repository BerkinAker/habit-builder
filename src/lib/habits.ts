import { getServerSession } from "next-auth"
import { db } from "./db"
import { authOptions } from "./auth"

// check if the current user has access to the habit
export async function checkCurrentUserHasAccessToHabit(habitId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.activity.count({
    where: {
      id: habitId,
      userId: session?.user.id,
    },
  })

  return count > 0
}