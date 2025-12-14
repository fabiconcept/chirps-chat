import { ComponentPropsWithoutRef, ElementRef, forwardRef, useContext } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TabsContext } from "../CustomTabs"

type TabProps = ComponentPropsWithoutRef<"button"> & {
  value: string
  icon?: React.ReactNode
}

export const Tab = forwardRef<ElementRef<"button">, TabProps>(
  ({ className, children, value, icon, ...props }, ref) => {
    const { activeTab, setActiveTab } = useContext(TabsContext)
    const isActive = activeTab === value

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          "relative w-full bg-foreground/0 hover:bg-foreground/5 flex items-center justify-start whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all cursor-pointer rounded-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50 disabled:bg-foreground/0",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
          value.includes("delete") ? "text-destructive hover:text-destructive": "",
          className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
        {children}
        {isActive && (
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 z-0 right-0 h-full w-full border-foreground/50 border-2 rounded-md bg-foreground/5",
              value.includes("delete") ? "bg-destructive/5 border-destructive" : "",
            )}
            layoutId="activeTabIndicator"
            style={{ originX: 0 }}
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6
            }}
          />
        )}
      </button>
    )
  }
)
Tab.displayName = "Tab"