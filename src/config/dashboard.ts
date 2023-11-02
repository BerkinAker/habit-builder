import { DashboardConfig } from "../types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Resources",
      href: "/habits",
      disabled: false,
    },
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
      title: "Dashboard",
      href: "/dashboard",
      icon: "book",
    },
    {
      title: "Habits",
      href: "/dashboard/habits",
      icon: "calendar",
    },
    {
      title: "Pricing",
      href: "/dashboard/pricing",
      icon: "credit-card",
      disabled: true,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      disabled: true,
    },
  ],
}
