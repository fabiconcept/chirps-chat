"use client"

import { Hash, Settings, UserPlus, Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn, updateSearchParam } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { channels } from "@/constants/User.const";
import { useEffect, useRef, RefObject } from "react";
import { useAuth } from "../Providers/AuthProvider";

export default function ChannelsList({
    owner,
    inviteDialogRef
}: {
    owner?: boolean;
    inviteDialogRef?: RefObject<HTMLButtonElement | null>;
}) {
    const { isMobile, isTablet } = useAuth();
    const activeChannel = useSearchParams().get("channel");
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const channelRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        if (isMobile || isTablet) return;

        if (!activeChannel) {
            updateSearchParam("channel", "general");
        }
    }, [activeChannel, isMobile, isTablet])

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
        <div ref={scrollAreaRef} className="flex-1 relative overflow-y-auto min-[900px]:w-xs w-full">
            {/* Main Room - Stationary */}
            <div className="p-2 top-0 sticky dark:bg-[#282828] bg-[#f3f3f3]">
                <div
                    className={cn(
                        "w-full p-2 flex items-center rounded-md group justify-start hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10 text-muted-foreground font-medium transition-all border border-transparent",
                        activeChannel === ((isMobile || isTablet) ? "general" : null) && "text-foreground bg-foreground/10 hover:bg-foreground/10 border-foreground/10 focus:border-foreground/20 ",
                        activeChannel === "general" && "text-foreground bg-foreground/10 hover:bg-foreground/10 border-foreground/25 focus:border-foreground/20"
                    )}
                >
                    <Button
                        variant="ghost"
                        onClick={() => updateSearchParam("channel", "general")}
                        className="flex items-center gap-1 flex-1 p-0 px-0 py-0 h-fit justify-start hover:bg-transparent dark:hover:bg-transparent focus:bg-transparent dark:focus:bg-transparent active:scale-100 active:rotate-0"
                    >
                        <Hash strokeWidth={2} size={14} className="-ml-2" />
                        <span className="flex-1 text-left font-semibold">General</span>
                    </Button>

                    {owner && <div className={cn(
                        "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        activeChannel === null && "opacity-100"
                    )}>
                        <Button 
                            variant={"ghost"} 
                            size={"icon"} 
                            className="size-6"
                            onClick={() => inviteDialogRef?.current?.click()}
                        >
                            <UserPlus strokeWidth={2} size={14} />
                        </Button>
                        <Button variant={"ghost"} size={"icon"} className="size-6">
                            <Settings strokeWidth={2} size={14} />
                        </Button>
                    </div>}
                </div>
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
                                <div
                                    className={cn(
                                        "w-full p-2 flex items-center rounded-md group justify-start hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10 text-muted-foreground font-medium transition-all border border-transparent",
                                        activeChannel === channel.name && "text-foreground bg-foreground/10 hover:bg-foreground/10 border-foreground/25 focus:border-foreground/20"
                                    )}
                                >
                                    <Button
                                        variant="ghost"
                                        onClick={() => updateSearchParam("channel", channel.name)}
                                        className="flex items-center gap-1 flex-1 p-0 px-0 py-0 h-fit justify-start hover:bg-transparent dark:hover:bg-transparent focus:bg-transparent dark:focus:bg-transparent active:scale-100 active:rotate-0"
                                    >
                                        {channel.type === "text" ? (
                                            <Hash strokeWidth={2} size={14} className="-ml-2" />
                                        ) : (
                                            <Volume2 strokeWidth={2} size={14} className="-ml-2" />
                                        )}
                                        <span className="flex-1 text-left font-semibold">
                                            {channel.name}
                                            {channel.unread && activeChannel !== channel.name && (
                                                <span className="ml-2 bg-destructive text-white text-[11px] font-semibold dark:shadow-[inset_0.5px_0.5px_0.5px_0.15px_#fff,0.5px_0.5px_0.5px_0.15px_#fff]/25 shadow-[inset_0.5px_0.5px_0.5px_0.15px_#000,0.5px_0.5px_0.5px_0.15px_#000]/25 rounded min-w-[18px] h-[18px] inline px-1.5">
                                                    {channel.unread > 99 ? '99+' : channel.unread}
                                                </span>
                                            )}
                                        </span>
                                    </Button>

                                    {owner && <div className={cn(
                                        "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                                        activeChannel === channel.name && "opacity-100"
                                    )}>
                                        <Button 
                                            variant={"ghost"} 
                                            size={"icon"} 
                                            className="size-6"
                                            onClick={() => inviteDialogRef?.current?.click()}
                                        >
                                            <UserPlus strokeWidth={2} size={14} />
                                        </Button>
                                        <Button variant={"ghost"} size={"icon"} className="size-6">
                                            <Settings strokeWidth={2} size={14} />
                                        </Button>
                                    </div>}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
