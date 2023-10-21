import { getHabitLogsCountByDate } from "./habitlog";

export async function getHabitData(userId: string) {

  const habitLogsCountByDate = getHabitLogsCountByDate(userId)

  return habitLogsCountByDate
}