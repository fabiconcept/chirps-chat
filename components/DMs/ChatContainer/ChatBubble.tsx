"use client"

import ProfileAvatar from "@/components/ProfileCard/ProfileAvatar";
import MarkDownRender from "./MarkDownRender";
import { cn, getRelativeTime } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import ProfileCard from "@/components/ProfileCard";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Reply, Forward, Copy, Link, Volume2, Pencil, Pin, Smile, Frown, Trash } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

export interface ChatBubbleProps {
    avatarUrl: string;
    name: string;
    content: string;
    timestamp: string;
    isUnread?: boolean;
    replyingTo?: {
        name: string;
        content: string;
        id: string;
    };
    reactions?: {
        emoji: string;
        count: number;
        reacted: boolean;
    }[];
    onSeen?: () => void;
}

export default function ChatBubble({ avatarUrl, name, content, timestamp, isUnread = false, replyingTo, reactions = [], onSeen }: ChatBubbleProps) {
    const bubbleRef = useRef<HTMLDivElement>(null);
    const hasBeenSeenRef = useRef(false);
    const [internalReactions, setInternalReactions] = useState(reactions);

    // Memoize the onSeen callback to prevent it from changing on every render
    const onSeenCallback = useCallback(() => {
        if (onSeen && !hasBeenSeenRef.current) {
            hasBeenSeenRef.current = true;
            onSeen();
        }
    }, [onSeen]);

    // Intersection Observer for seen trigger
    useEffect(() => {
        if (!bubbleRef.current || hasBeenSeenRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        onSeenCallback();
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        observer.observe(bubbleRef.current);

        return () => {
            observer.disconnect();
        };
    }, [onSeenCallback]);

    // Handle adding/removing reactions
    const handleReactionToggle = useCallback((emoji: string) => {
        setInternalReactions((prev) => {
            const existingReaction = prev.find((r) => r.emoji === emoji);
            
            if (existingReaction) {
                // Toggle reacted state
                if (existingReaction.reacted) {
                    // Remove reaction
                    const newCount = existingReaction.count - 1;
                    if (newCount === 0) {
                        return prev.filter((r) => r.emoji !== emoji);
                    }
                    return prev.map((r) =>
                        r.emoji === emoji
                            ? { ...r, count: newCount, reacted: false }
                            : r
                    );
                } else {
                    // Add reaction
                    return prev.map((r) =>
                        r.emoji === emoji
                            ? { ...r, count: r.count + 1, reacted: true }
                            : r
                    );
                }
            } else {
                // Add new reaction
                return [...prev, { emoji, count: 1, reacted: true }];
            }
        });
    }, []);

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div 
                    ref={bubbleRef}
                    className={cn(
                        "flex items-start gap-2 w-full transition-colors duration-200 px-3 py-2",
                        isUnread ? "bg-yellow-600/5 relative after:absolute after:content-[''] after:w-1 after:h-full after:bg-yellow-600/20 after:left-0 after:z-10 after:top-0" : "dark:hover:bg-[#282828]/50 hover:bg-[#F3F3F3]/75"
                    )}
                >
                    {replyingTo && <div className="h-4 w-9 border-2 rounded-tl-3xl translate-x-14 translate-y-4 border-b-0 border-r-0"></div>}
                    <HoverCard openDelay={300}>
                        <HoverCardTrigger asChild>
                            <div>
                                <ProfileAvatar
                                    avatarUrl={avatarUrl}
                                    fallback={name[0]}
                                    size="sm"
                                    className={cn(
                                        "border border-foreground/25 rounded-full mt-3 cursor-pointer",
                                        replyingTo && "translate-y-6"
                                    )}
                                />
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="p-0 w-fit">
                            <ProfileCard size="sm" />
                        </HoverCardContent>
                    </HoverCard>
                    <div className="flex flex-col text-sm gap-1 w-full relative z-10">
                        {replyingTo && (
                            <div className="flex items-center gap-2 w-full pr-3">
                                <div className="flex items-center gap-1">
                                    <HoverCard openDelay={300}>
                                        <HoverCardTrigger asChild>
                                            <div>
                                                <ProfileAvatar
                                                    avatarUrl={avatarUrl}
                                                    fallback={name[0]}
                                                    size="xs"
                                                    className="border border-foreground/25 rounded-full ml-2 cursor-pointer"
                                                />
                                            </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent side="right" className="p-0 w-fit">
                                            <ProfileCard size="sm" />
                                        </HoverCardContent>
                                    </HoverCard>
                                    <span className="font-medium text-muted-foreground">{replyingTo.name}</span>
                                </div>
                                <span className="text-xs truncate max-w-sm cursor-pointer transition-all duration-150 active:scale-[0.98] hover:underline hover:underline-offset-2">{replyingTo.content}</span>
                            </div>
                        )}
                        <div className="text-base flex flex-col p-2">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{name}</span>
                                <span className="text-xs text-muted-foreground">{getRelativeTime(timestamp, true)}</span>
                            </div>
                            <MarkDownRender content={content} />
                        </div>
                        
                        {internalReactions.length > 0 && (
                            <div className="flex items-center gap-2 px-2 pb-1 flex-wrap">
                                {internalReactions.map((reaction, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleReactionToggle(reaction.emoji)}
                                        className={cn(
                                            "flex items-center gap-1 px-2 py-1 rounded-full text-sm border transition-all duration-150 hover:scale-105 active:scale-95",
                                            reaction.reacted
                                                ? "bg-[#7600C9]/10 border-[#7600C9]/30 text-[#7600C9]"
                                                : "bg-foreground/5 border-foreground/10 hover:bg-foreground/10"
                                        )}
                                    >
                                        <span className="text-base">{reaction.emoji}</span>
                                        <span className="text-xs font-medium">{reaction.count}</span>
                                    </button>
                                ))}
                                <button className="flex items-center justify-center w-7 h-7 rounded-full border border-foreground/10 hover:bg-foreground/10 transition-all duration-150 hover:scale-105 active:scale-95">
                                    <Smile size={16} className="text-muted-foreground" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </ContextMenuTrigger>
            
            <ContextMenuContent className="w-56">
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        <Smile size={16} />
                        Add Reaction
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                        <div className="grid grid-cols-5 gap-1 p-2">
                            {['😂', '❤️', '👍', '🎉', '😮', '😢', '🔥', '👏', '✨', '💯'].map((emoji) => (
                                <button
                                    key={emoji}
                                    onClick={() => handleReactionToggle(emoji)}
                                    className="text-2xl hover:bg-foreground/10 rounded p-1 transition-all duration-150 hover:scale-110 active:scale-95"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                
                <ContextMenuItem>
                    <Frown size={16} />
                    View Reactions
                </ContextMenuItem>
                
                <ContextMenuSeparator />
                
                <ContextMenuItem>
                    <Pencil size={16} />
                    Edit Message
                </ContextMenuItem>
                
                <ContextMenuItem>
                    <Reply size={16} />
                    Reply
                </ContextMenuItem>
                
                <ContextMenuItem>
                    <Forward size={16} />
                    Forward
                </ContextMenuItem>
                
                <ContextMenuSeparator />
                
                <ContextMenuItem>
                    <Copy size={16} />
                    Copy Text
                </ContextMenuItem>
                
                <ContextMenuItem>
                    <Pin size={16} />
                    Pin Message
                </ContextMenuItem>
                
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        Apps
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                        <ContextMenuItem>Translate</ContextMenuItem>
                        <ContextMenuItem>Save to Notes</ContextMenuItem>
                        <ContextMenuItem>Create Task</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                
                <ContextMenuItem>
                    Mark Unread
                </ContextMenuItem>
                
                <ContextMenuItem>
                    <Link size={16} />
                    Copy Message Link
                </ContextMenuItem>
                
                <ContextMenuItem>
                    <Volume2 size={16} />
                    Speak Message
                </ContextMenuItem>
                
                <ContextMenuSeparator />
                
                <ContextMenuItem variant="destructive">
                    <Trash size={16} />
                    Delete Message
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
