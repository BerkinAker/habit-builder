import { getHabitLogs, getHabitLogsCountByDate, getHabitLogsCountByHabitId, getHabitLogsCountByName, getHabitStreak } from "./habitlog";

export async function getHabitData(userId: string) {

  const [habitLogsCountByDate, habitLogsCountByName, habitStreak] = await Promise.all([
    getHabitLogsCountByDate(userId),
    getHabitLogsCountByName(userId),
    getHabitStreak(userId, "userId"),
  ])

  return { habitLogsCountByDate, habitLogsCountByName, habitStreak }
}

export async function getSpecificHabitData(habitId: string, userId: string) {

  const [habitStreak, weeklyHabitLogs, habitLogs] = await Promise.all([
    getHabitStreak(habitId, "habitId", userId),
    getHabitLogsCountByHabitId(habitId, userId),
    getHabitLogs(habitId, userId)
  ])

  return { habitStreak, weeklyHabitLogs, habitLogs }
}