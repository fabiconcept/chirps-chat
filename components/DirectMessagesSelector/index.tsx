"use client"
import { Separator } from "../ui/separator";
import UserCard from "./UserCard";
import { ScrollArea } from "../ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { InitialConversations } from "@/constants/User.const";
import FindConversation from "./FindConversation";

export default function DirectMessagesSelector() {

    return (
        <div className="border border-input rounded-2xl bg-foreground/5 overflow-hidden">
            <FindConversation />
            <Separator />
            <ScrollArea className="grid h-fit gap-0.5 max-h-[calc(100dvh-16.25vmax)] overflow-y-auto relative">
                <div className="flex items-center justify-between px-3 dark:bg-[#282828] bg-[#f3f3f3] sticky top-0 z-10 pt-3 pb-1">
                    <span className="text-sm font-medium">Direct Messages</span>
                </div>
                <AnimatePresence mode="popLayout">
                    {InitialConversations.map((conversation, index) => (
                        <motion.div
                            key={conversation.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, x: -10 }}
                            transition={{
                                layout: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 }
                            }}
                        >
                            <UserCard
                                url={conversation.url}
                                size={conversation.size}
                                name={conversation.name}
                                message={conversation.message}
                                hasUnread={conversation.hasUnread}
                                unreadCount={conversation.unreadCount}
                                timestamp={conversation.timestamp}
                                isYou={conversation.isYou}
                                isLast={index === InitialConversations.length - 1}
                                messageStatus={conversation.messageStatus}
                                isTyping={conversation.isTyping}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </ScrollArea>
        </div>
    )
}
