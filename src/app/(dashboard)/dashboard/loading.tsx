import DashboardHeader from "@/components/dashboard-header";
import Shell from "@/components/layout/shell";
import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <Shell>
      <div className="flex justify-center p-12">
        <Loader2 size={36} className="animate-spin" />
      </div>
    </Shell>
  )
}
