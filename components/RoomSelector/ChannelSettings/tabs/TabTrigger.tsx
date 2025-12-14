import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import { cn } from "@/lib/utils"

type TabTriggerProps = ComponentPropsWithoutRef<"button"> & {
  value: string
  icon?: React.ReactNode
}

export const TabTrigger = forwardRef<ElementRef<"button">, TabTriggerProps>(
  ({ className, children, value, icon, ...props }, ref) => (
    <button
      ref={ref}
      role="tab"
      data-value={value}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      {children}
    </button>
  )
)
TabTrigger.displayName = "TabTrigger"
