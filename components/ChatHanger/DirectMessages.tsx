"use client"
import { FolderOpenIcon, FolderOpenIconHandle } from "@/components/FolderOpenIcon";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";


export default function DirectMessages() {
    const pathname = usePathname();
    const isFullscreen = useSearchParams().get("fullscreen");
    const animRef = useRef<FolderOpenIconHandle>(null);

    const handleMouseEnter = () => {
        if (!animRef.current) return;
        animRef.current.startAnimation();
    };

    const handleMouseLeave = () => {
        if (!animRef.current) return;
        animRef.current.stopAnimation();
    };

    const selected = useMemo(() => pathname === "/chat", [pathname]);

    // Example message count - you'd get this from your data
    const messageCount = 3;

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link
                    href={"/chat" + (isFullscreen ? "?fullscreen=true" : "")} 
                    className="shadow-lg shrink-0 aspect-square shadow-foreground/5 rounded-full border border-input grid place-items-center overflow-hidden relative cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={cn("w-14 h-14 border border-input p-2 rounded-full hover:border-ring cursor-pointer transition-all duration-300 active:scale-95 grid place-items-center hover:bg-[#7600C9] bg-[#7600C9]/5  hover:text-white", {
                        "bg-[#7600C9] text-white": selected,
                    })}
                    >
                        <FolderOpenIcon ref={animRef} size={24} color="#fff" />
                    </div>
                    <AnimatePresence>
                        {!selected && messageCount > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                            >
                                {messageCount > 9 ? '9+' : messageCount}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent
                side="right"
                align="start"
                sideOffset={15}
                className="w-fit mt-2 p-4 relative bg-background/50 rounded-2xl border border-input backdrop-blur-sm overflow-visible"
            >
                <>
                    <div className={"absolute -left-3 top-[30%] w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-r-12 border-r-border"} />
                    {/* Arrow pointer - inner fill */}
                    <div className="absolute -left-[10px] top-[30%] w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-r-12 border-r-background" />
                </>

                <span>Direct Message</span>
            </HoverCardContent>
        </HoverCard>
    )
}