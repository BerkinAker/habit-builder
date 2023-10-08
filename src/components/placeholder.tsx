import { cn } from '@/lib/utils'
import React from 'react'

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Placeholder({ children, className, ...props }: PlaceholderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center min-h-[400px] animate-in fade-in-50",
      className
    )}
      {...props}
    >
      <div className="mx-auto flex max-w-[400px] flex-col justify-center items-center text-center">{children}</div>
    </div>
  )
}

interface PlaceholderTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

Placeholder.Title = function PlaceholderTitle({ children, className, ...props }: PlaceholderTitleProps) {
  return (
    <h2 className={cn("text-xl font-semibold mt-6", className)} {...props} >{children}</h2>
  )
} 

interface PlaceholderDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

Placeholder.Description = function PlacheholderDescription({ children, className, ...props }: PlaceholderDescriptionProps) {
  return (
    <p className={cn("text-sm font-normal leading-5 text-muted-foreground mb-6 mt-2", className)} {...props}>{children}</p>
  )


}