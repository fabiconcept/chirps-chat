"use client";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Button } from "../ui/button";
import { Check, CheckCheck, MessageCircle, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserClump from "../modular/UserClump";

export interface UserProps {
    src: string;
    name: string;
    status: "online" | "away" | "offline";
    hasNewMessage?: boolean;
    messagePreview?: string;
}

export default function User({
    src,
    name,
    status,
    hasNewMessage = false,
    messagePreview = "Hey! How are you doing?",
}: UserProps) {
    const [isAutoOpen, setIsAutoOpen] = useState(hasNewMessage);
    const [showNotification, setShowNotification] = useState(hasNewMessage);

    const statusText = {
        online: "Online",
        away: "Away",
        offline: "Offline"
    };

    const statusColor = {
        online: "text-green-500",
        away: "text-yellow-500",
        offline: "text-red-500"
    };

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
                <div 
                    className="relative mt-2 cursor-pointer"
                    onClick={handleDismissNotification}
                >
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
                    
                    <Avatar className="w-14 h-14 border border-input p-2 bg-background hover:border-ring transition-colors">
                        <AvatarImage src={src} />
                        <AvatarFallback>{name[0] + name[1]}</AvatarFallback>
                    </Avatar>
                    {status === "online" && <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full" />}
                    {status === "away" && <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-500 rounded-full" />}
                    {status === "offline" && <div className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
                </div>
            </HoverCardTrigger>
            <HoverCardContent 
                side="right" 
                align="start"
                sideOffset={15}
                className="w-64 p-4 relative bg-background/90 rounded-2xl border border-input backdrop-blur-sm overflow-visible"
            >
                {/* Arrow pointer - outer border */}
                <div className="absolute -right-3 top-4 w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-l-12 border-l-border" />
                {/* Arrow pointer - inner fill */}
                <div className="absolute -right-[10px] top-4 w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-l-12 border-l-background" />
                
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
