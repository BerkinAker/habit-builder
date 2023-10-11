import * as z from "zod"
import { checkCurrentUserHasAccessToHabit } from "@/lib/habits"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    habitId: z.string(),
  }),
})

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await checkCurrentUserHasAccessToHabit(params.habitId))) {
      return new Response(null, { status: 403 })
    }

    await db.activity.delete({
      where: {
        id: params.habitId as string,
      },
    })

    return new Response(null, { status: 204 })
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
  }

  return new Response(null, { status: 500 })
}
