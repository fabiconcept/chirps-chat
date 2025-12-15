"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tab } from "./tabs/Tab"
import { TabList } from "./tabs/TabList"
import RoomProfileSettings from "./sections/RoomProfileSettings"
import PerRoomProfileSettings from "./sections/PerRoomProfileSettings"
import EngagementSettings from "./sections/EngagementSettings"
import MembersSettings from "./sections/MembersSettings"
import InvitesSettings from "./sections/InvitesSettings"
import SafetySecuritySettings from "./sections/SafetySecuritySettings"
import BansSettings from "./sections/BansSettings"
import DeleteRoomSettings from "./sections/DeleteRoomSettings"

export const TabsContext = createContext<{
  activeTab: string
  setActiveTab: (value: string) => void
}>({
  activeTab: "",
  setActiveTab: () => { }
})

type TabsProps = {
  children: ReactNode
  defaultValue: string
  className?: string
}

export function Tabs({ children, defaultValue, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

type TabsContentProps = {
  children: ReactNode
  value: string
  className?: string
}

export function TabsContent({ children, value, className = "" }: TabsContentProps) {
  const { activeTab } = useContext(TabsContext)

  if (activeTab !== value) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

type CustomTabsProps = {
  tabs: {
    key: string
    title: string
    description: string
    icon?: ReactNode
  }[]
  defaultTab: string
  className?: string
}

const getTabContent = (tabKey: string, { title, description }: { title: string, description: string }) => {
  switch (tabKey) {
    case 'room-profile':
      return <RoomProfileSettings title={title} description={description} />
    case 'per-room-profile':
      return <PerRoomProfileSettings title={title} description={description} />
    case 'engagement':
      return <EngagementSettings title={title} description={description} />
    case 'members':
      return <MembersSettings title={title} description={description} />
    case 'invites':
      return <InvitesSettings title={title} description={description} />
    case 'safety-security':
      return <SafetySecuritySettings title={title} description={description} />
    case 'bans':
      return <BansSettings />
    case 'delete-room':
      return <DeleteRoomSettings title={title} description={description} />
    default:
      return null
  }
}

export function CustomTabs({ tabs, defaultTab, className = "" }: CustomTabsProps) {
  return (
    <Tabs defaultValue={defaultTab} className={`flex h-full bg-background text-foreground ${className}`}>
      {/* Left Sidebar */}
      <div className="w-64 border-r border-border shrink-0 py-10">
        <TabList className="pl-5 pr-2 h-full" orientation="vertical">
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              value={tab.key}
              title={tab.description}
              className={cn(
                "w-full text-left px-4 py-3",
                tab.key === 'delete-room' && "text-destructive hover:text-destructive/80"
              )}
            >
              <div className="relative z-20">
                {tab.key === 'delete-room' ? (
                  <span className="text-current">{tab.title}</span>
                ) : (
                  tab.title
                )}
              </div>
            </Tab>
          ))}
        </TabList>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 h-full">
        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="h-full">
            {getTabContent(tab.key, { description: tab.description, title: tab.title })}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}