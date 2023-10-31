import { LogsByDate, LogsByName } from "@/types";
import { db } from "./db";

export async function getHabitLogsCountByDate(userId: string): Promise<LogsByDate[]> {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const habitLogs = await db.activityLog.aggregateRaw({
    pipeline: [
      {
        $lookup: {
          from: "Activity",
          localField: "activityId",
          foreignField: "_id",
          as: "activity"
        }
      },
      {
        $match: { "activity.userId": { '$oid': userId } }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date"
            }
          },
          quantity: { $sum: 1 }
        }
      },
      {
        $sort: { date: 1, _id: 1 }
      }
    ]
  });

  if (Array.isArray(habitLogs) && habitLogs.length > 0) {

    let nonZeroDate = null
    // get first nonZeroDate
    for (let i = 0; i < habitLogs.length; i++) {
      if (habitLogs[i].quantity > 0) {
        nonZeroDate = habitLogs[i]._id
        break
      }
    }

    const logsByDate2: LogsByDate[] = []

    if (nonZeroDate) {
      let currentDate = new Date(nonZeroDate)
      const today = new Date()
      while (currentDate <= today) {
        const date = currentDate.toISOString().slice(0, 10)
        const log = habitLogs.find((log) => log._id === date)
        if (log) {
          logsByDate2.push({ date: log._id, count: log.quantity })
        } else {
          logsByDate2.push({ date: date, count: 0 })
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }
    }
    return logsByDate2
  } else {
    return [];
  }
}

export async function getHabitLogsCountByName(userId: string): Promise<LogsByName[]> {

  const habitLogs = await db.activityLog.aggregateRaw({
    pipeline: [
      {
        $lookup: {
          from: "Activity",
          localField: "activityId",
          foreignField: "_id",
          as: "activity"
        }
      },
      {
        $match: { "activity.userId": { '$oid': userId } }
      },
      {
        $unwind: "$activity"
      },
      {
        $group: {
          _id: {
            name: "$activity.name"
          },
          quantity: { $sum: 1 }
        }
      }
    ]
  });

  if (Array.isArray(habitLogs) && habitLogs.length > 0) {
    const logsByName: LogsByName[] = habitLogs.map((item: any) => ({
      name: item._id.name,
      count: item.quantity
    }));

    return logsByName;
  } else {
    return [];
  }
}

export async function getHabitStreak(userId: string, type: "userId" | "habitId", id?: string): Promise<{
  longestHabitStreak: number
  currentHabitStreak: number
}> {
  const typeMatch = type === "userId" ? { "activity.userId": { '$oid': userId } } : { activityId: { '$oid': userId }, "activity.userId": { '$oid': id } }

  const habitLogs = await db.activityLog.aggregateRaw({
    pipeline: [
      {
        $lookup: {
          from: "Activity",
          localField: "activityId",
          foreignField: "_id",
          as: "activity"
        }
      },
      {
        $match: typeMatch
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date"
            }
          },
          quantity: { $sum: 1 }
        }
      },
      {
        $sort: { date: 1, _id: 1 }
      }
    ]
  });

  if (habitLogs.length === 0) return { longestHabitStreak: 0, currentHabitStreak: 0 }

  let longestHabitStreak = 1
  let currentHabitStreak = 1

  if (Array.isArray(habitLogs) && habitLogs.length > 0) {
    const dayTime = 1000 * 60 * 60 * 24;

    for (let i = 0; i < habitLogs.length - 1; i++) {

      const prevDate = new Date(habitLogs[i]._id).getTime()
      const nextDate = new Date(habitLogs[i + 1]._id).getTime()
      const diffTime = Math.abs(nextDate - prevDate);

      if (Math.abs(diffTime) <= dayTime) {
        currentHabitStreak += 1
      } else {
        if (currentHabitStreak > longestHabitStreak) {
          longestHabitStreak = currentHabitStreak
        }
        currentHabitStreak = 1
      }
    }

    const lastHabitLog = new Date(habitLogs[habitLogs.length - 1]._id).getTime()
    const diffTime = new Date().getTime() - lastHabitLog

    if (Math.abs(diffTime) > dayTime * 2) {
      currentHabitStreak = 0
    }

    return { longestHabitStreak, currentHabitStreak }
  }

  return { longestHabitStreak, currentHabitStreak }
}

// get the last week's log count using habit id.
export async function getHabitLogsCountByHabitId(habitId: string, userId: string): Promise<LogsByDate[]> {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const habitLogs = await db.activityLog.aggregateRaw({
    pipeline: [
      {
        $lookup: {
          from: "Activity",
          localField: "activityId",
          foreignField: "_id",
          as: "activity"
        }
      },
      {
        $match: {
          activityId: { '$oid': habitId },
          "activity.userId": { '$oid': userId },
          date: { $gte: { '$date': sevenDaysAgo } },
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date"
            }
          },
          quantity: { $sum: 4 }
        }
      },
      {
        $sort: { date: 1, _id: 1 }
      }
    ]
  });

  if (Array.isArray(habitLogs) && habitLogs.length >= 0) {

    const logsByDate2: LogsByDate[] = []

    const today = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1)

    while (sevenDaysAgo <= today) {
      const date = sevenDaysAgo.toISOString().slice(0, 10)
      const log = habitLogs.find((log) => log._id === date)

      if (log) {
        logsByDate2.push({ date: log._id, count: log.quantity })
      } else {
        logsByDate2.push({ date: date, count: 0 })
      }
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1)
    }
    return logsByDate2
  } else {
    return [];
  }
}

export async function getHabitLogs(habitId: string, userId: string) {
  return await db.activityLog.findMany({
    select: {
      id: true,
      date: true,
      activity: {
        select: {
          id: true,
          name: true,
          habitGoalValue: true,
        },
      }
    },
    where: {
      activityId: habitId,
      activity: {
        userId: userId
      }
    }
  })
}

