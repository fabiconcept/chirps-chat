"use client";

import User, { UserProps } from "./User";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { initialUsers } from "@/constants/User.const";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ChatHanger({ type = "feed", usersList = [...initialUsers.slice(0, 16)] }: { type: "in-chat" | "feed", usersList?: Omit<UserProps, "type">[] }) {
    const [users] = useState<Omit<UserProps, "type">[]>(usersList);
    const pathname = usePathname();
    const router = useRouter();
    
    // Extract room ID from pathname (e.g., /chat/room-983786)
    const roomIdMatch = pathname.match(/\/chat\/(room-[^/]+)/);
    const roomId = roomIdMatch ? roomIdMatch[1] : null;
    
    // Validate if roomId matches pattern and exists in users
    const isValidRoom = roomId && /^room-\w+$/.test(roomId);
    const selectedUser = isValidRoom ? users.find(user => user.name === roomId.replace("room-", ""))?.name || null : null;

    const containerRef = useRef<HTMLDivElement>(null);
    const userRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    // Scroll to selected user on mount or when selection changes
    useEffect(() => {
        if (type === "in-chat" && selectedUser && containerRef.current) {
            const userElement = userRefs.current.get(selectedUser);
            if (userElement) {
                const container = containerRef.current;
                const userTop = userElement.offsetTop;
                const containerHeight = container.clientHeight;
                const userHeight = userElement.clientHeight;
                
                // Center the selected user in the viewport
                const scrollPosition = userTop - (containerHeight / 2) + (userHeight / 2);
                
                container.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }
    }, [selectedUser, type]);

    const handleScrollUp = () => {
        if (containerRef.current) {
            // Try to find ScrollArea viewport first, fallback to container itself
            const viewport = containerRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
            const scrollElement = viewport || containerRef.current;
            scrollElement.scrollBy({ top: -60, behavior: 'smooth' });
        }
    };

    const handleScrollDown = () => {
        if (containerRef.current) {
            // Try to find ScrollArea viewport first, fallback to container itself
            const viewport = containerRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
            const scrollElement = viewport || containerRef.current;
            scrollElement.scrollBy({ top: 60, behavior: 'smooth' });
        }
    };

    return (
        <div className={cn(
            "relative",
            type === "in-chat" && "relative flex-1",
            type === "feed" && "sticky top-32"
        )}>
            {((type === "in-chat" && users.length > 8) || (type === "feed" && users.length > 6)) &&  <>
                <div
                    onClick={handleScrollUp}
                    className="h-6 w-6 hover:text-blue-500 rounded-full bg-background/50 absolute border backdrop-blur-sm border-input -top-1.5 cursor-pointer transition-transform duration-300 active:scale-70 left-1/2 -translate-x-1/2 z-50 grid place-items-center"
                >
                    <ChevronUp size={16} />
                </div>
                <div
                    onClick={handleScrollDown}
                    className="h-6 w-6 hover:text-blue-500 rounded-full bg-background/50 absolute border backdrop-blur-sm border-input -bottom-1.5 cursor-pointer transition-transform duration-300 active:scale-70 left-1/2 -translate-x-1/2 z-50 grid place-items-center"
                >
                    <ChevronDown size={16} />
                </div>
            </>}
            <div className={cn(
                "max-sm:hidden shadow-lg relative shadow-foreground/5 rounded-full border border-input flex items-center gap-2 flex-col overflow-hidden",
                type === "in-chat" && "bg-background h-full",
                type === "feed" && "bg-foreground/5",
                ((type === "in-chat" && users.length > 8) || (type === "feed" && users.length > 6)) ? "": "pb-2"
            )}>
                {((type === "in-chat" && users.length > 8) || (type === "feed" && users.length > 6)) && <>
                    <div className="w-full pointer-events-none bg-linear-to-b from-background via-background/75 to-transparent absolute top-0 left-0 h-10 z-20" />
                    <div className="w-full pointer-events-none bg-linear-to-t from-background via-background/90 to-transparent absolute bottom-0 left-0 h-10 z-20" />
                </>}

                <div
                    className={cn(
                        "max-h-[calc(100vh*0.5)] overflow-y-auto no-scrollbar scroll-smooth",
                        type === "in-chat" && "max-h-full",
                        type === "feed" && "max-h-[calc(100vh*0.5)]"
                    )}
                    ref={containerRef}
                >
                    {((type === "in-chat" && users.length > 8) || (type === "feed" && users.length > 6)) && <div className="h-2" />}
                    <AnimatePresence mode="popLayout">
                        {users.map((user, index) => {
                            // Generate random message count for demo (you'd get this from your data)
                            const messageCount = index === 0 ? 4200 : index === 1 ? 150 : index === 2 ? 12 : 0;
                            
                            return (
                                <div
                                    key={user.name}
                                    ref={(el) => {
                                        if (el) userRefs.current.set(user.name, el);
                                    }}
                                    data-user-name={user.name}
                                >
                                    <motion.div
                                        layout 
                                        initial={false}
                                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                                        transition={{
                                            layout: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 },
                                            scale: { duration: 0.2 }
                                        }}
                                        className="snap-proximity"
                                        onClick={() => type === "in-chat" && router.push(`/chat/room-${user.name}`)}
                                    >
                                        <User
                                            src={user.src}
                                            name={user.name}
                                            type={type}
                                            userType={user.userType}
                                            status={user.status}
                                            hasNewMessage={user.hasNewMessage}
                                            messagePreview={user.messagePreview}
                                            selected={type === "in-chat" && selectedUser === user.name}
                                            messageCount={messageCount}
                                        />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </AnimatePresence>
                    {((type === "in-chat" && users.length > 8) || (type === "feed" && users.length > 6)) && <div className="h-6" />}
                </div>
            </div>
        </div>
    )
}