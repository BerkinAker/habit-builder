import { cn } from "@/lib/utils";
import { Webhook } from "lucide-react";
import ThemeToggle from "./theme-toggle";

export default function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col justify-center items-center gap-4 py-8 md:h-24 md:flex-row md:gap-20 md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Webhook size={26} color="#ff5c00" strokeWidth={2.5} />
          <p className="text-sm leading-relaxed text-center md:text-left">
            <span className="font-medium underline underline-offset-4">HabitBuilder {" "} </span>
            {" "} © 2023  All rights reserved.
            The source code is available on{" "}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  )
}
