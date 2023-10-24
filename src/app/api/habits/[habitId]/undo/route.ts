import { db } from "@/lib/db";
import { checkCurrentUserHasAccessToHabit } from "@/lib/habits";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    habitId: z.string(),
  }),
})

export async function POST(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await checkCurrentUserHasAccessToHabit(params.habitId))) {
      return new Response(null, { status: 403 })
    }

    await db.activity.update({
      where: {
        id: params.habitId as string,
      },
      data: {
        habitCurrentValue: 0,
      }
    })

    const habitLogsToDelete = await db.activityLog.findMany({
      where: {
        activityId: params.habitId,
        date: {
          gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
          lt: new Date(new Date().setUTCHours(23, 59, 59, 999))
        },
      },
      select: {
        id: true,
      }
    })

    for (const log of habitLogsToDelete) {
      await db.activityLog.delete({
        where: {
          id: log.id
        },
      });
    }

    return new Response(null, { status: 204 })
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
  }

  return new Response(null, { status: 500 })
}

