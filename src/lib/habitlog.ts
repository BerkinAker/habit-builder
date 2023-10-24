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
          localField: "activityId",  // ActivityLog koleksiyonundaki alan
          foreignField: "_id",       // Activity koleksiyonundaki alan
          as: "activity"
        }
      },
      {
        $match: { "activity.userId": { '$oid': userId } } //fix match later
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
    // Dönen JSON veriyi LogsByDate[] tipine dönüştürme işlemi
    const logsByDate: LogsByDate[] = habitLogs.map((item: any) => ({
      date: item._id, // JSON'da _id alanı
      count: item.quantity // JSON'da quantity alanı
    }));
    return logsByDate;
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
          localField: "activityId",  // ActivityLog koleksiyonundaki alan
          foreignField: "_id",       // Activity koleksiyonundaki alan
          as: "activity"
        }
      },
      {
        $match: { "activity.userId": { '$oid': userId } } //fix match later
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
    // Dönen JSON veriyi LogsByDate[] tipine dönüştürme işlemi
    const logsByName: LogsByName[] = habitLogs.map((item: any) => ({
      name: item._id.name, // JSON'da _id.name alanı
      count: item.quantity // JSON'da quantity alanı
    }));
    return logsByName;
  } else {
    return [];
  }

}

export async function getHabitStreak(userId: string): Promise<{
  longestHabitStreak: number
  currentHabitStreak: number
}> {
  const habitLogs = await db.activityLog.aggregateRaw({
    pipeline: [
      {
        $lookup: {
          from: "Activity",
          localField: "activityId",  // ActivityLog koleksiyonundaki alan
          foreignField: "_id",       // Activity koleksiyonundaki alan
          as: "activity"
        }
      },
      {
        $match: { "activity.userId": { '$oid': userId } } //fix match later
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date"
            }
          },
          quantity: { $sum: 1 } // fix
        }
      },
      {
        $sort: { date: 1, _id: 1 }
      }
    ]
  });

  let longestHabitStreak = 1
  let currentHabitStreak = 1

  if (Array.isArray(habitLogs) && habitLogs.length > 0) {
    for (let i = 0; i < habitLogs.length - 1; i++) {

      const prevDate = new Date(habitLogs[i]._id).getTime()
      const nextDate = new Date(habitLogs[i + 1]._id).getTime()
      const diffTime = Math.abs(nextDate - prevDate);

      const dayTime = 1000 * 60 * 60 * 24;

      if (Math.abs(diffTime) <= dayTime) {
        currentHabitStreak += 1
      } else {
        if (currentHabitStreak > longestHabitStreak) {
          longestHabitStreak = currentHabitStreak
        }
        currentHabitStreak = 1
      }
    }

    return { longestHabitStreak, currentHabitStreak }
  }

  return { longestHabitStreak, currentHabitStreak }
}