"use client";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Button } from "../ui/button";
import { CheckCheck, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UserClump from "../modular/UserClump";
import { cn, formatNumber } from "@/lib/utils";

export interface UserProps {
    src: string;
    name: string;
    status: "online" | "away" | "offline";
    hasNewMessage?: boolean;
    messagePreview?: string;
    type: "in-chat" | "feed";
    userType?: "user" | "bot" | "room";
    selected?: boolean;
    messageCount?: number;
}

export default function User({
    src,
    name,
    status,
    hasNewMessage = false,
    messagePreview = "Hey! How are you doing?",
    type = "feed",
    userType = "user",
    selected = false,
    messageCount = 0,
}: UserProps) {
    const [isAutoOpen, setIsAutoOpen] = useState(hasNewMessage);
    const [showNotification, setShowNotification] = useState(hasNewMessage);

    // Auto-close HoverCard after 5 seconds
    useEffect(() => {
        if (isAutoOpen) {
            const timer = setTimeout(() => {
                setIsAutoOpen(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isAutoOpen]);

    const handleDismissNotification = () => {
        setShowNotification(false);
        setIsAutoOpen(false);
    };

    return (
        <HoverCard open={isAutoOpen ? true : undefined} openDelay={300}>
            <HoverCardTrigger asChild>
                <Button 
                    variant="ghost"
                    className="relative p-0 h-fit w-fit mx-2 rounded-full mt-2 cursor-pointer group"
                    onClick={handleDismissNotification}
                >
                    {/* Selected indicator */}
                    {selected && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#7600C9] rounded-full"
                        />
                    )}
                    
                    {/* Message count badge */}
                    <AnimatePresence>
                        {!selected && messageCount > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-10 bg-[#7600C9] text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center border-2 border-background"
                            >
                                {formatNumber(messageCount, 1)}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Notification badge */}
                    {showNotification && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-1 right-1 z-10"
                        >
                            <div className="relative">
                                <div className="w-4 h-4 bg-[#7600C9] rounded-full border-2 border-background" />
                                <motion.div
                                    className="absolute inset-0 w-4 h-4 bg-[#7600C9] rounded-full"
                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>
                    )}
                    
                    <Avatar className={cn(
                        "w-14 h-14 p-2 bg-background transition-colors",
                        selected ? "border-2 border-[#7600C9]" : "border border-input hover:border-ring",
                    )}>
                        <AvatarImage src={src} />
                        <AvatarFallback>{name[0] + name[1]}</AvatarFallback>
                    </Avatar>
                    {!selected && userType === "user" && (
                        <>
                            {status === "online" && <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full" />}
                            {status === "away" && <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-500 rounded-full" />}
                            {status === "offline" && <div className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
                        </>
                    )}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent 
                side="right" 
                align="start"
                sideOffset={15}
                className="w-64 p-4 pt-2 relative bg-background/90 rounded-2xl border border-input backdrop-blur-sm overflow-visible"
            >
                {type === "feed" && <>
                    {/* Arrow pointer - outer border */}
                    <div className={"absolute -right-3 top-4 w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-l-12 border-l-border"} />
                    {/* Arrow pointer - inner fill */}
                    <div className="absolute -right-[10px] top-4 w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-l-12 border-l-background" />
                </>}
                
                {type === "in-chat" && <>
                    <div className={"absolute -left-3 top-4 w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-r-12 border-r-border"} />
                    {/* Arrow pointer - inner fill */}
                    <div className="absolute -left-[10px] top-4 w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-r-12 border-r-background" />
                </>}
                
                <UserClump
                    avatar={src}
                    username={`@${name}`}
                    name={name}
                    variant="ghost"
                    clickable={false}
                    isVerified
                />
                
                {/* Message preview - only show if there's a new message */}
                {hasNewMessage && messagePreview && (
                    <div className="mt-3 p-2 rounded-lg bg-muted/50 border border-input">
                        <p className="text-xs text-muted-foreground mb-1">New message:</p>
                        <p className="text-sm line-clamp-2">{messagePreview}</p>
                    </div>
                )}
                
                <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Open chat
                    </Button>
                    {hasNewMessage && <Button size="sm" variant="outline" className="flex-1">
                        <CheckCheck className="w-4 h-4 mr-1" />
                        Read
                    </Button>}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
