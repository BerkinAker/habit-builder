import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

const postCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  habitGoalValue: z.number().default(1),
  habitCurrentValue: z.number().default(0),
  habitGoalUnit: z.enum(["times", "minutes"]).default("times"),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    const json = await req.json()
    const body = postCreateSchema.parse(json)

    const habit = await db.activity.create({
      data: {
        name: body.name,
        description: body.description,
        userId: session.user.id,
        category: body.category,
        habitGoalValue: body.habitGoalValue,
        habitCurrentValue: body.habitCurrentValue,
        habitGoalUnit: body.habitGoalUnit,
      },
      select: {
        id: true
      },
    })  
    return new Response(JSON.stringify(habit))
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}