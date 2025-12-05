"use client"

import { ChevronRight, Hash, Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn, removeSearchParam, updateSearchParam } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { channels } from "@/constants/User.const";
import { useEffect, useRef } from "react";

export default function ChannelsList() {
    const activeChannel = useSearchParams().get("channel");
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const channelRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    // Scroll to selected channel
    useEffect(() => {
        if (activeChannel && scrollAreaRef.current) {
            const channelElement = channelRefs.current.get(activeChannel);
            if (channelElement) {
                const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
                const scrollElement = viewport || scrollAreaRef.current;
                
                const channelTop = channelElement.offsetTop;
                const containerHeight = scrollElement.clientHeight;
                const channelHeight = channelElement.clientHeight;
                
                // Center the selected channel in the viewport
                const scrollPosition = channelTop - (containerHeight / 2) + (channelHeight / 2);
                
                scrollElement.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeChannel]);
    
    return (
        <div ref={scrollAreaRef} className="flex-1 relative overflow-y-auto w-xs">
            {/* Main Room - Stationary */}
            <div className="p-2 top-0 sticky dark:bg-[#282828] bg-[#f3f3f3]">
                <Button
                        variant="ghost"
                        onClick={()=> removeSearchParam("channel")}
                        className={cn(
                            "w-full p-2 rounded-md justify-start hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10 text-muted-foreground font-medium transition-all",
                            activeChannel === null && "text-foreground bg-foreground/10 hover:bg-foreground/10 border-foreground/10 focus:border-foreground/20"
                        )}
                    >
                        <Hash strokeWidth={2} size={18} />
                        <span className="flex-1 text-left font-semibold">General</span>
                    </Button>
                <Separator className="my-3" />
            </div>

            {/* Channels */}
            <div className="space-y-1 p-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
                    Channels
                </p>
                <div className="space-y-0.5">
                    <AnimatePresence mode="popLayout">
                        {channels.map((channel) => (
                            <motion.div
                                key={channel.id}
                                ref={(el) => {
                                    if (el) channelRefs.current.set(channel.name, el);
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
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full p-2 rounded-md justify-start hover:bg-foreground/5 dark:hover:bg-foreground/5 focus:bg-foreground/10 dark:focus:bg-foreground/10 text-muted-foreground hover:text-foreground transition-all group border border-transparent hover:border-foreground/10 focus:border-foreground/10",
                                        activeChannel === channel.name && "text-foreground bg-foreground/10 hover:bg-foreground/10 border-foreground/10 focus:border-foreground/20"
                                    )}
                                    onClick={()=> updateSearchParam("channel", channel.name)}
                                >
                                    {channel.type === "text" ? (
                                        <Hash strokeWidth={2} size={18} />
                                    ) : (
                                        <Volume2 strokeWidth={2} size={18} />
                                    )}
                                    <span className="flex-1 text-left">
                                        {channel.name}
                                        {channel.unread && activeChannel !== channel.name && (
                                            <span className="ml-2 bg-destructive text-white text-[11px] font-semibold dark:shadow-[inset_0.5px_0.5px_0.5px_0.15px_#fff,0.5px_0.5px_0.5px_0.15px_#fff]/25 shadow-[inset_0.5px_0.5px_0.5px_0.15px_#000,0.5px_0.5px_0.5px_0.15px_#000]/25 rounded min-w-[18px] h-[18px] inline px-1.5">
                                                {channel.unread > 99 ? '99+' : channel.unread}
                                            </span>
                                        )}
                                    </span>
                                    
                                    <ChevronRight strokeWidth={2} size={18} className="-mr-2" />
                                </Button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
