export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type DashboardSidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
    | {
      href: string
      items?: never
    }
    | {
      href?: string
      items: NavLink[]
    }
  )

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: DashboardSidebarNavItem[]
}