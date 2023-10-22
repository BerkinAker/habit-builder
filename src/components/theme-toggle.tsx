'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Laptop2, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <Sun size={18} className="relative transition-all duration-150 scale-100 dark:scale-0 dark:absolute" />
          <Moon size={18} className="transition-all duration-150 scale-0 dark:dark:scale-100 absolute dark:relative"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => (setTheme("light"))}>
          <Sun size={18} className="mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (setTheme("dark"))}>
          <Moon size={18} className="mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (setTheme("system"))}>
          <Laptop2 size={18} className="mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
