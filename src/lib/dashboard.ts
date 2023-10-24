import { getHabitLogsCountByDate, getHabitLogsCountByName, getHabitStreak } from "./habitlog";

export async function getHabitData(userId: string) {

  const [habitLogsCountByDate, habitLogsCountByName, habitStreak] = await Promise.all([
    getHabitLogsCountByDate(userId),
    getHabitLogsCountByName(userId),
    getHabitStreak(userId),
  ])

  return { habitLogsCountByDate, habitLogsCountByName, habitStreak }
}