"use client"
import { Separator } from "../ui/separator";
import UserCard from "./UserCard";
import { AnimatePresence, motion } from "framer-motion";
import { InitialConversations } from "@/constants/User.const";
import FindConversation from "./FindConversation";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function DirectMessagesSelector() {
    const selectedUser = useSearchParams().get("user");
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const userRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    // Scroll to selected user
    useEffect(() => {
        if (selectedUser && scrollAreaRef.current) {
            const userElement = userRefs.current.get(selectedUser);
            if (userElement) {
                const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
                const scrollElement = viewport || scrollAreaRef.current;
                
                const userTop = userElement.offsetTop;
                const containerHeight = scrollElement.clientHeight;
                const userHeight = userElement.clientHeight;
                
                // Center the selected user in the viewport
                const scrollPosition = userTop - (containerHeight / 2) + (userHeight / 2);
                
                scrollElement.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }
    }, [selectedUser]);

    return (
        <div className="border border-input rounded-2xl bg-foreground/5 overflow-hidden">
            <FindConversation />
            <Separator />
            <div ref={scrollAreaRef} className="grid h-fit gap-0.5 max-h-[calc(100dvh-14vmax)] overflow-y-auto relative">
                <div className="flex items-center justify-between px-3 dark:bg-[#282828] bg-[#f3f3f3] sticky top-0 z-10 pt-3 pb-1">
                    <span className="text-sm font-medium">Direct Messages</span>
                </div>
                <AnimatePresence mode="popLayout">
                    {InitialConversations.map((conversation, index) => (
                        <motion.div
                            key={conversation.id}
                            ref={(el) => {
                                if (el) userRefs.current.set(conversation.name.toLowerCase(), el);
                            }}
                            layout
                            initial={"normal"}
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
                                selected={selectedUser === conversation.name.toLowerCase()}
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
            </div>
        </div>
    )
}
