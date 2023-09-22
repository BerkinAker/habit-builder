import { cn } from "@/lib/utils"

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> { }

function Shell({ children, className, ...props }: ShellProps) {
  return (
    <div className={cn("grid items-end gap-8", className)} {...props}>
      {children}
    </div>
  )
}

export default Shell