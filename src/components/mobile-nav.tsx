import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MainNavItem } from "@/types"
import { Webhook } from "lucide-react"
import Link from "next/link"

interface MobileNavProps {
  children?: React.ReactNode
  items?: MainNavItem[]
}

export default function MobileNav({ children, items }: MobileNavProps) {
  return (
    <div className={cn("fixed top-18 right-0 left-0 bottom-0 h-[calc(100vh-4rem)] shadow-md p-6 pb-32 z-50 animate-in slide-in-from-left-80 md:hidden")}>
      <div className="relative flex flex-col bg-popover text-popover-foreground shadow-md rounded-md p-4 gap-5 z-20">
        <Link href="/" className="flex items-center space-x-2">
          <Webhook size={26} color="#ff5c00" strokeWidth={2.5} />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <div className="text-sm">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn("flex items-center font-medium p-2 hover:underline underline-offset-4 decoration-[#FF5C00]",
                item.disabled && "cursor-not-allowed opacity-70")}
            >
              {item.title}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  )
}
