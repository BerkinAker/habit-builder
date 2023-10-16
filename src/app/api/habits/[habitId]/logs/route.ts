import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { checkCurrentUserHasAccessToHabit } from "@/lib/habits"
import { getServerSession } from "next-auth"
import { z } from "zod"

const routeContextSchema = z.object({
  params: z.object({
    habitId: z.string(),
  }),
})

export async function POST(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions)
    const { params } = routeContextSchema.parse(context)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (!(await checkCurrentUserHasAccessToHabit(params.habitId))) {
      return new Response(null, { status: 403 })
    }

    // get the habit
    const habit = await db.activity.findFirst({
      where: {
        id: params.habitId,
      },
    })

    // check habit is not null
    if (!habit) {
      return new Response(null, { status: 404 })
    }

    // if habit is exist on activityLog then return 400
    const habitLog = await db.activityLog.findFirst({
      where: {
        activityId: params.habitId,
        date: {
          gte: new Date(new Date().setUTCHours(0, 0, 0, 0)), // start of day
          lt: new Date(new Date().setUTCHours(23, 59, 59, 999)) // end of day
        }
      },
    })

    if (habitLog) {
      return new Response(null, { status: 400 })
    }

    await db.activity.update({
      where: {
        id: params.habitId,
      },
      data: {
        habitCurrentValue: habit.habitCurrentValue + 1,
      },
    })

    // get the newest habit data
    const habitNewest = await db.activity.findFirst({
      where: {
        id: params.habitId,
      },
    })

    if (!habitNewest) {
      return new Response(null, { status: 404 })
    }

    // if habitCurrentValue is equal to habitGoalValue then add this habit to ActivityLog
    if (habitNewest.habitCurrentValue === habitNewest.habitGoalValue) {
      await db.activityLog.create({
        data: {
          activityId: params.habitId,
          date: new Date(),
        },
      })

      return new Response(JSON.stringify(habit), { status: 202 })
    }

    return new Response(JSON.stringify(habit))

  } catch (error) {
    console.log("catch error aaa")
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}