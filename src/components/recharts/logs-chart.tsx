"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';
import { formatDate } from '@/lib/utils';
import { LogsByDate } from '@/types';
import { useTheme } from 'next-themes';

interface LogsChartProps {
  data: LogsByDate[]
}

export function LogsChart({ data }: LogsChartProps) {
  const { theme } = useTheme()

  return (
    <Card>
      <ResponsiveContainer width="100%" height={275}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatDate}
          />
          <YAxis
            dataKey="count"
            stroke="#888888"
            allowDecimals={false}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(count, name, props) => [`Logs: ${props.payload.count}`]}
            labelStyle={{ color: "#000" }}
          />
          {(theme === 'dark') ? (
            <Line
              type="monotone"
              dataKey="count"
              stroke="#b91c1c"
              activeDot={{ r: 8 }}
            />) : (
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ff5c00"
              activeDot={{ r: 8 }}
            />
          )}

        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}