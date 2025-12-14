import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import { cn } from "@/lib/utils"

type TabListProps = ComponentPropsWithoutRef<"div"> & {
  orientation?: "horizontal" | "vertical"
}

export const TabList = forwardRef<ElementRef<"div">, TabListProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    const baseClasses = "inline-flex w-full"
    const orientationClasses = orientation === "vertical"
      ? "flex-col h-auto space-x-0 space-y-2"
      : "flex-row h-10 space-x-1 items-center justify-center"

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          orientationClasses,
          className
        )}
        {...props}
      />
    )
  }
)
TabList.displayName = "TabList"