"use client"
import { useSelectedLayoutSegment } from 'next/navigation'
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MainNavItem } from "@/types"
import { Webhook } from "lucide-react"


interface AuthNavProps {
  children?: React.ReactNode
  items?: MainNavItem[]
}
function AuthNav({ children, items }: AuthNavProps) {
  const segment = useSelectedLayoutSegment()
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden md:flex items-center space-x-2">
        <Webhook size={26} color="#ff5c00" strokeWidth={2.5} />
        <span className="hidden font-bold md:inline-block">{siteConfig.name}</span>
      </Link>
      {items?.length && (
        <div className="hidden md:flex gap-5">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center font-medium transition-colors duration-200 hover:text-foreground/90 sm:text-sm",
                item.href.startsWith("")
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default AuthNav