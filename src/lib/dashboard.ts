import { getHabitLogsCountByDate, getHabitLogsCountByName } from "./habitlog";

export async function getHabitData(userId: string) {

  const [habitLogsCountByDate, habitLogsCountByName] = await Promise.all([
    getHabitLogsCountByDate(userId),
    getHabitLogsCountByName(userId)
  ])

  return {habitLogsCountByDate, habitLogsCountByName}
}