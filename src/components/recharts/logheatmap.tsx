"use client"

import * as React from "react"
import { Card } from "../ui/card";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { formatDate } from "@/lib/utils";

interface LogHeatmapProps {
  data: {
    activity: {
      id: string
      name: string
      habitGoalValue: number
    }
    id: string
    date: string
    count: number
  }[]
  params: { habitId: string }
}

interface Value {
  id: string
  date: string
  count: number
}

export default function LogHeatmap({ data, params }: LogHeatmapProps) {
  const setColor = (count: number) => {
    return count < 1
      ? "fill-slate-200 dark:fill-slate-800"
      : count < 2
        ? "fill-orange-300 dark:fill-orange-900"
        : count < 3
          ? "fill-orange-400 dark:fill-orange-800"
          : count < 4
            ? "fill-orange-500 dark:fill-orange-700"
            : count < 5
              ? "fill-orange-600 dark:fill-orange-600"
              : count < 9
                ? "fill-orange-700 dark:fill-orange-500"
                : "fill-orange-900 dark:fill-orange-400";
  }

  const logToolTip = (value: Value) => {
    if (value && value.count) {
      return `${value.count} ${value.count === 1 ? "time" : "times"
        } on ${formatDate(value.date)}`
    }
    return "No logs"
  }

  return (
    <Card className="w-full overflow-x-auto">
      <div className="p-4 min-w-[725px] lg:p-8">
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
          endDate={new Date(new Date())}
          values={data}
          classForValue={(value) => setColor(value ? value.count : 0)}
          titleForValue={logToolTip}
        />
      </div>
    </Card>
  )
}
