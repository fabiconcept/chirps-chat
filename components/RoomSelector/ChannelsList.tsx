"use client"

import { Hash, Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface Channel {
    id: string;
    name: string;
    type: "text" | "voice";
    unread?: number;
}

const channels: Channel[] = [
    { id: "2", name: "announcements", type: "text" },
    { id: "3", name: "random", type: "text", unread: 12 },
    { id: "4", name: "voice-chat", type: "voice" },
    { id: "5", name: "gaming", type: "voice" },
    { id: "6", name: "movies", type: "text" },
    { id: "7", name: "books", type: "text" },
    { id: "8", name: "music", type: "text" },
    { id: "9", name: "food", type: "text" },
    { id: "10", name: "travel", type: "text" },
    { id: "11", name: "sports", type: "text" },
    { id: "12", name: "coding", type: "text" },
    { id: "13", name: "bitcoin", type: "text" },
    { id: "14", name: "ethereum", type: "text" },
    { id: "15", name: "gaming-2", type: "voice" },
    { id: "16", name: "gaming-3", type: "voice" },
    { id: "17", name: "gaming-4", type: "voice" },
    { id: "18", name: "gaming-5", type: "voice" },
    { id: "19", name: "gaming-6", type: "voice" },
    { id: "20", name: "gaming-7", type: "voice" },
    { id: "21", name: "gaming-8", type: "voice" },
    { id: "22", name: "gaming-9", type: "voice" },
    { id: "23", name: "gaming-10", type: "voice" },
    { id: "24", name: "gaming-11", type: "voice" },
    { id: "25", name: "gaming-12", type: "voice" },
    { id: "26", name: "gaming-13", type: "voice" },
    { id: "27", name: "gaming-14", type: "voice" },
    { id: "28", name: "gaming-15", type: "voice" },
    { id: "29", name: "gaming-16", type: "voice" },
    { id: "30", name: "gaming-17", type: "voice" },
    { id: "31", name: "gaming-18", type: "voice" },
    { id: "32", name: "gaming-19", type: "voice" },
    { id: "33", name: "gaming-20", type: "voice" },
];

export default function ChannelsList() {
    return (
        <ScrollArea className="p-2 max-h-[calc(100dvh-20rem)] overflow-y-auto max-w-xs">
            <ScrollBar />
            {/* Main Room - Stationary */}
            <Button
                    variant="ghost"
                    className="w-full p-2 rounded-md justify-start hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10 text-foreground font-medium transition-all"
                >
                    <Hash strokeWidth={2} size={18} />
                    <span className="flex-1 text-left font-semibold">General</span>
                </Button>

            <Separator className="my-3" />

            {/* Channels */}
            <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
                    Channels
                </p>
                <div className="space-y-0.5">
                    {channels.map((channel) => (
                        <Button
                            key={channel.id}
                            variant="ghost"
                            className={cn(
                                "w-full p-2 rounded-md justify-start hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10 text-muted-foreground hover:text-foreground transition-all group",
                                channel.unread && "text-foreground"
                            )}
                        >
                            {channel.type === "text" ? (
                                <Hash strokeWidth={2} size={18} />
                            ) : (
                                <Volume2 strokeWidth={2} size={18} />
                            )}
                            <span className="flex-1 text-left">{channel.name}</span>
                            {channel.unread && (
                                <span className="bg-foreground/10 text-foreground text-[11px] font-semibold border border-foreground/20 rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                    {channel.unread > 99 ? '99+' : channel.unread}
                                </span>
                            )}
                        </Button>
                    ))}
                </div>
            </div>
        </ScrollArea>
    );
}
