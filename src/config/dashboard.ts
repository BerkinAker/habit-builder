import { DashboardConfig } from "../types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Resources",
      href: "/docs",
      disabled: true,
    },
    {
      title: "Pricing",
      href: "/pricing",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Pricing",
      href: "/dashboard/pricing",
      icon: "pricing",
      disabled: true,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
