import { LogsByDate } from "@/types";
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