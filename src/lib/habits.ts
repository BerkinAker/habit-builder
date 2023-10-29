import { getServerSession } from "next-auth"
import { db } from "./db"
import { authOptions } from "./auth"
import { Activity, ActivityLog } from "@prisma/client"

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

export async function getHabitById(id: Activity["id"], userId: Activity["userId"]) {
  return db.activity.findFirst({
    where: {
      id: id,
      userId: userId,
    },
  })
}

// get todays activitylog's for a habit
export async function getTodaysActivityLog(activityId: string) {
  return db.activityLog.findMany({
    where: {
      activityId: activityId,
      date: {
        gte: new Date(new Date().setUTCHours(0, 0, 0, 0)), // start of day
        lt: new Date(new Date().setUTCHours(23, 59, 59, 999)) // end of day
      }
    },
  })
}