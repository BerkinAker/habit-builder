import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Flame } from "lucide-react"

export default function DashboardCard() {
  return (
    <div className="grid gap-4 md:grid-cols-1">
      <Card className="flex items-center">
        <CardContent className="p-4 lg:px-4 ml-2">
          <div className="flex gap-8">
            <Flame size={38} color="#ff5c00" strokeWidth={2.5} />
            <div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
              <span className="text-2xl font-bold"> 0 days</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="flex items-center">
        <CardContent className="p-4 lg:px-4 ml-2">
          <div className="flex gap-8">
            <Flame size={38} color="#ff5c00" strokeWidth={2.5} />
            <div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
              <span className="text-2xl font-bold"> 0 days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div >
  )
}
