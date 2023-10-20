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

    // if new day start then reset habitCurrentValue
    const habit = await db.activity.findFirst({
      where: {
        id: params.habitId,
      },
    })

    if (!habit) {
      return new Response(null, { status: 404 })
    }

    if (habit.updatedAt.getUTCFullYear() !== new Date().getUTCFullYear() || habit.updatedAt.getUTCMonth() !== new Date().getUTCMonth() || habit.updatedAt.getUTCDate() !== new Date().getUTCDate()) {
      const habit = await db.activity.update({
        where: {
          id: params.habitId,
        },
        data: {
          habitCurrentValue: 0,
        },
      })
      return new Response(JSON.stringify(habit), { status: 200 })
    }

    return new Response(JSON.stringify(habit), { status: 200 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}