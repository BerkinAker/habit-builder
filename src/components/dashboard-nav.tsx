"use client"

import { cn } from "@/lib/utils"
import { DashboardSidebarNavItem } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Icon from "./icon"

interface DashboardNavProps {
  items: DashboardSidebarNavItem[]
}

export default function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item, index) => {
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span className={cn(
                "flex items-center text-sm font-medium px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground",
                item.disabled && "cursor-not-allowed opacity-80",
                item.href === path ? "bg-accent text-accent-foreground" : "transparent",
              )}>
                <Icon name={item.icon} size={18} color="#ff5c00" strokeWidth={2.5} className="mr-2"/>
                {item.title}
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
