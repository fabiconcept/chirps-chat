"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import UserClump from "@/components/modular/UserClump";
import User from "@/components/ChatHanger/User";
import { QuickTransferUser } from "../types";


interface QuickTransferHorizontalProps {
    users: QuickTransferUser[];
    onSelectUser: (user: QuickTransferUser) => void;
    onViewAll: () => void;
}

export default function QuickTransferHorizontal({ users, onSelectUser, onViewAll }: QuickTransferHorizontalProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className="px-4 py-4 bg-background">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                    Quick Transfer
                </h3>
                <button
                    onClick={onViewAll}
                    className="text-xs text-muted-foreground hover:text-[#D4AF37] flex items-center gap-1 font-medium transition-colors"
                >
                    View All
                    <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="relative">
                {/* Scroll buttons */}
                {users.length > 5 && (
                    <>
                        <button
                            onClick={handleScrollLeft}
                            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/95 border-2 border-border hover:border-[#D4AF37]/50 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronLeft className="h-4 w-4 text-foreground" />
                        </button>
                        <button
                            onClick={handleScrollRight}
                            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/95 border-2 border-border hover:border-[#D4AF37]/50 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronRight className="h-4 w-4 text-foreground" />
                        </button>
                    </>
                )}

                {/* Gradient overlays */}
                {users.length > 5 && (
                    <>
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent z-5 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent z-5 pointer-events-none" />
                    </>
                )}

                {/* Horizontal scrollable container */}
                <div
                    ref={containerRef}
                    className="flex gap-0 overflow-x-auto no-scrollbar scroll-smooth py-2 px-5"
                >
                    <AnimatePresence mode="popLayout">
                        {users.map((user, index) => (
                            <motion.div
                                key={user.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                                transition={{
                                    layout: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 },
                                    delay: index * 0.05
                                }}
                                className="shrink-0"
                            >
                                <HoverCard openDelay={300}>
                                    <HoverCardTrigger asChild>
                                        <div className="cursor-pointer relative">
                                            <Avatar className={cn(
                                                "w-14 h-14 p-2 bg-background transition-colors",
                                                "border border-input hover:border-ring",
                                            )}>
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            
                                            {user.status && user.status === "online" && <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full" />}
                                            {user.status && user.status === "away" && <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-500 rounded-full" />}
                                            {user.status && user.status === "offline" && <div className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent
                                        side="bottom"
                                        align="center"
                                        sideOffset={10}
                                        className="w-56 p-3 relative bg-background/95 rounded-xl border border-border backdrop-blur-sm"
                                    >
                                        {/* Arrow pointer */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-border" />
                                        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-background" />

                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12 border-2 border-[#D4AF37]/30">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback className="font-semibold">
                                                    {user.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm text-foreground truncate">{user.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{user.username}</p>
                                                {user.balance && (
                                                    <Badge
                                                        variant="outline"
                                                        className="mt-1 text-[10px] h-5 px-1.5 bg-green-500/10 text-green-600 border-green-500/20"
                                                    >
                                                        <Wallet className="h-2.5 w-2.5 mr-1" />
                                                        {user.balance.toLocaleString()} CHT
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            size="sm"
                                            onClick={() => onSelectUser(user)}
                                            className="w-full mt-3 h-8 bg-linear-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69117] text-black font-semibold text-xs"
                                        >
                                            <ArrowUpRight className="w-3 h-3 mr-1" />
                                            Send Tokens
                                        </Button>
                                    </HoverCardContent>
                                </HoverCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

