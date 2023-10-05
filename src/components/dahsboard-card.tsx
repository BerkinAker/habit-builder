import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Flame } from "lucide-react"

export default function DashboardCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-3">
          <CardTitle className="text-sm font-medium mt-[8px]">Streak</CardTitle>
          <Flame size={20} color="#ff5c00" strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            0
          </div>
          <p className="text-xs text-muted-foreground">Card Content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-3">
          <CardTitle className="text-sm font-medium mt-[8px]">Streak</CardTitle>
          <Flame size={20} color="#ff5c00" strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            0
          </div>
          <p className="text-xs text-muted-foreground">Card Content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-3">
          <CardTitle className="text-sm font-medium mt-[8px]">Streak</CardTitle>
          <Flame size={20} color="#ff5c00" strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            0
          </div>
          <p className="text-xs text-muted-foreground">Card Content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-3">
          <CardTitle className="text-sm font-medium mt-[8px]">Most recorded activity</CardTitle>
          <Calendar size={18} color="#ff5c00" strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Activity 1
          </div>
          <p className="text-xs text-muted-foreground">Card Content</p>
        </CardContent>
      </Card>
    </div>
  )
}
