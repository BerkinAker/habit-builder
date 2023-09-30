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
      icon: "book",
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
    },
  ],
}
