"use client"
import { cn, getRelativeTime, updateSearchParam } from "@/lib/utils";
import ProfileAvatar from "../ProfileCard/ProfileAvatar";
import { Check, CheckCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface UserCardProps {
    url: string,
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl",
    name: string,
    message?: string,
    hasUnread?: boolean,
    unreadCount?: number,
    timestamp?: Date | string,
    isYou?: boolean,
    messageStatus?: "sent" | "delivered" | "seen",
    isTyping?: boolean,
    variant?: "default" | "compact" | "detailed",
    isLast?: boolean,
    selected?: boolean,
}

const variantStyles = {
    default: "p-2 py-3",
    compact: "p-1.5 py-2",
    detailed: "p-3 py-4",
};

export default function UserCard({ 
    url,
    size,
    name,
    message,
    hasUnread,
    unreadCount = 0,
    timestamp,
    isYou = false,
    messageStatus,
    isTyping = false,
    variant = "default",
    isLast = false,
    selected = false,
}: UserCardProps) {
    return (
        <div 
            className={cn(
                "flex items-center gap-2 max-w-xs cursor-pointer transition-[transform,translate,scale,rotate,color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,padding] duration-300 ease-in-out hover:bg-foreground/3 perspective-distant group relative after:absolute after:inset-0 after:w-1.5 after:rounded-r-3xl after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-[80%] after:bg-[#7600c9] after:-translate-x-full after:transition-transform after:duration-300 after:ease-in-out",
                variantStyles[variant],
                { "dark:bg-foreground/5 dark:hover:bg-foreground/3 bg-white hover:bg-white/50": hasUnread },
                { "after:translate-x-0 after:z-[-1] pl-4 dark:bg-background dark:hover:bg-background bg-foreground/10 hover:bg-foreground/3": selected },
                { "rounded-b-2xl": isLast }
            )}
            onClick={() => updateSearchParam("user", name.toLowerCase())}
        >
            <ProfileAvatar
                avatarUrl={url}
                fallback="HM"
                status="online"
                className="origin-bottom"
                size={size}
            />
            <div className="flex-1 flex gap-2 items-center pr-2 min-w-0">
                <div className="flex-1 flex flex-col w-full select-none transition-transform duration-300 origin-bottom min-w-0">
                    <span className="font-medium text-sm truncate">{name}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-0">
                        <AnimatePresence mode="wait">
                            {isTyping ? (
                                <motion.div 
                                    key="typing"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-1 font-medium"
                                >
                                    <div className="flex gap-0.5 border border-foreground/10 items-center px-1 py-1 rounded-2xl bg-foreground/10">
                                        <span className="w-1 h-1 dark:bg-blue-500 bg-foreground rounded-full animate-[bounce_1.4s_ease-in-out_0s_infinite]"></span>
                                        <span className="w-1 h-1 dark:bg-blue-500 bg-foreground rounded-full animate-[bounce_1.4s_ease-in-out_0.2s_infinite]"></span>
                                        <span className="w-1 h-1 dark:bg-blue-500 bg-foreground rounded-full animate-[bounce_1.4s_ease-in-out_0.4s_infinite]"></span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="message"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-1 min-w-0 flex-1"
                                >
                                    {isYou && (
                                        <>
                                            <span className="text-foreground/70 shrink-0">You:</span>
                                            {messageStatus && (
                                                <span className="shrink-0">
                                                    {messageStatus === "sent" && <Check size={14} className="text-muted-foreground" />}
                                                    {messageStatus === "delivered" && <CheckCheck size={14} className="text-muted-foreground" />}
                                                    {messageStatus === "seen" && <CheckCheck size={14} className="text-blue-500" />}
                                                </span>
                                            )}
                                        </>
                                    )}
                                    <span className="truncate min-w-0">{message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                    {timestamp && (
                        <span className="text-xs text-muted-foreground">
                            {getRelativeTime(timestamp)}
                        </span>
                    )}
                    {hasUnread && unreadCount > 0 ? (
                        <div className="bg-foreground/10 not-dark:text-[#7600C9] text-foreground text-[12px] font-semibold border border-foreground/20 rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </div>
                    ) : <div className="w-4 h-4" />}
                </div>
            </div>
        </div>
    )
}
