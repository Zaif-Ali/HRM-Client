import * as React from "react"
import { cn } from "cn"

function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-2xl font-semibold tracking-tight text-balance",
        className
      )}
      {...props}
    />
  )
}

function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-base font-medium", className)}
      {...props}
    />
  )
}

function H4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4 className={cn("text-sm font-medium", className)} {...props} />
  )
}

function P({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm leading-6", className)} {...props} />
}

function Muted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function Small({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      className={cn("text-xs leading-none text-muted-foreground", className)}
      {...props}
    />
  )
}

function Text({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("text-sm", className)} {...props} />
}

function PageHeader({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("flex max-w-[70ch] flex-col gap-1", className)}>
      <H1>{title}</H1>
      {description ? <Muted>{description}</Muted> : null}
    </div>
  )
}

export { H1, H2, H3, H4, P, Muted, Small, Text, PageHeader }
