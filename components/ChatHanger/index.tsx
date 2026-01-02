"use client";

import User, { UserProps } from "./User";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ChatHanger({ type = "feed", usersList = [] }: { type?: "in-chat" | "feed" | "side", usersList?: Omit<UserProps, "type">[], }) {
    const [users] = useState<Omit<UserProps, "type">[]>(usersList);
    const pathname = usePathname();
    const isFullscreen = useSearchParams().get("fullscreen");
    const userParam = useSearchParams().get("user");
    const isMenuOpen = useSearchParams().get("hide-menu") !== "true";
    
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
            type === "in-chat" && "relative h-[calc(100vh*0.8625)] max-[900px]:h-[calc(100vh*0.88)] max-sm:flex-1",
            type === "feed" && "sticky top-32 max-sm:hidden",
            type === "side" && "h-full"
        )}>
            {((type === "in-chat" && users.length > 10) || (type === "feed" && users.length > 6)) &&  <>
                <div
                    onClick={handleScrollUp}
                    className="h-6 w-6 max-md:hidden hover:text-blue-500 rounded-full bg-background/50 absolute border backdrop-blur-sm border-input -top-1.5 cursor-pointer transition-transform duration-300 active:scale-70 left-1/2 -translate-x-1/2 z-50 grid place-items-center"
                >
                    <ChevronUp size={16} />
                </div>
                <div
                    onClick={handleScrollDown}
                    className="h-6 w-6 max-md:hidden hover:text-blue-500 rounded-full bg-background/50 absolute border backdrop-blur-sm border-input -bottom-1.5 cursor-pointer transition-transform duration-300 active:scale-70 left-1/2 -translate-x-1/2 z-50 grid place-items-center"
                >
                    <ChevronDown size={16} />
                </div>
            </>}
            <div className={cn(
                "shadow-lg relative shadow-foreground/5 rounded-full border border-input flex items-center gap-2 flex-col overflow-hidden",
                type === "in-chat" && "bg-background h-full max-md:pb-0 max-md:shadow-none",
                type === "feed" && "bg-foreground/5",
                type === "side" && "bg-transparent h-full rounded-none rounded-r-2xl",
                type === "side" && "pb-0 border-0 border-l"
            )}>
                {((type === "in-chat" && users.length > 10) || (type === "feed" && users.length > 6)) && <>
                    <div className="w-full max-md:hidden pointer-events-none bg-linear-to-b from-background via-background/75 to-transparent absolute top-0 left-0 h-10 z-20" />
                    <div className="w-full max-md:hidden pointer-events-none bg-linear-to-t from-background via-background/90 to-transparent absolute bottom-0 left-0 h-10 z-20" />
                </>}

                <div
                    className={cn(
                        "max-h-[calc(100vh*0.5)] overflow-y-auto no-scrollbar scroll-smooth",
                        type === "in-chat" && "max-h-full",
                        type === "feed" && "max-h-[calc(100vh*0.5)] pb-3",
                        type === "side" && "max-h-full",
                        ((type === "in-chat" && users.length > 10) || (type === "feed" && users.length > 6)) && "py-3 max-md:py-0"
                    )}
                    ref={containerRef}
                >
                    {((type === "in-chat" && users.length > 10) || (type === "feed" && users.length > 6)) && <div className="h-2" />}
                    <AnimatePresence initial={false}>
                        {users.map((user, index) => {
                            // Generate random message count for demo (you'd get this from your data)
                            const messageCount = index === 0 ? 4200 : index === 1 ? 150 : index === 2 ? 12 : 0;
                            
                            return (
                                <motion.div
                                    key={user.name}
                                    layout="position"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                                    transition={{
                                        layout: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 },
                                        scale: { duration: 0.2 }
                                    }}
                                    className="snap-proximity"
                                    data-user-name={user.name}
                                    ref={(el: HTMLDivElement | null) => {
                                        if (el) {
                                            userRefs.current.set(user.name, el);
                                        } else {
                                            userRefs.current.delete(user.name);
                                        }
                                    }}
                                >
                                    <User
                                        src={user.src}
                                        name={user.name}
                                        role={user.role || "member"}
                                        type={type === "side" ? "feed" : type}
                                        userType={type === "side" ? "user" : user.userType}
                                        status={user.status}
                                        isFullscreen={!!isFullscreen}
                                        hasNewMessage={(userParam || !isMenuOpen) ? false : type === "side" ? false : user.hasNewMessage}
                                        messagePreview={type === "side" ? undefined : user.messagePreview}
                                        selected={type === "in-chat" && selectedUser === user.name}
                                        messageCount={type === "side" ? undefined : messageCount}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                    {((type === "in-chat" && users.length > 8) || (type === "feed" && users.length > 6)) && <div className="h-6" />}
                </div>
            </div>
        </div>
    )
}