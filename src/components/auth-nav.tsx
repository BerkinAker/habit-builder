"use client"
import * as React from "react"
import { useSelectedLayoutSegment } from 'next/navigation'
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MainNavItem } from "@/types"
import { Webhook, X } from "lucide-react"
import MobileNav from "./mobile-nav"


interface AuthNavProps {
  children?: React.ReactNode
  items?: MainNavItem[]
}

function AuthNav({ children, items }: AuthNavProps) {
  const segment = useSelectedLayoutSegment()
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden md:flex items-center space-x-2">
        <Webhook size={26} color="#ff5c00" strokeWidth={2.5} />
        <span className="hidden font-bold md:inline-block">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <div className="hidden md:flex gap-5">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center font-medium transition-colors duration-200 hover:text-foreground/90 sm:text-sm",
                item.href.startsWith(`/${segment}`) ? "text-foreground" : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-90"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}
      {/* mobile menu button */}
      <button className="flex items-center md:hidden space-x-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (<X size={26} color="#ff5c00" strokeWidth={2.5} />) : (<Webhook size={26} color="#ff5c00" strokeWidth={2.5} />)}
        <span className="font-bold">Menu</span>
      </button>
      {isMenuOpen && items && (
        <MobileNav items={items} >
          {children}
        </MobileNav>
      )}
    </div>
  )
}

export default AuthNav