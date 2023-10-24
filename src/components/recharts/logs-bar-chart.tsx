'use client'

import { LogsByName } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';
import { useTheme } from 'next-themes';

interface LogsChartProps {
  data: LogsByName[]
}

export default function LogsBarChart({ data }: LogsChartProps) {
  const { theme } = useTheme()

  return (
    <Card className='p-3'>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            dataKey="count"
            allowDecimals={false}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          {(theme === 'dark') ? <Bar dataKey="count" fill="#b91c1c" background={{ fill: "#374151" }} /> : <Bar dataKey="count" fill="#ff5c00" background={{ fill: "#eee" }} />}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
