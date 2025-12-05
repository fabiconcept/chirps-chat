"use client"

import ProfileAvatar from "@/components/ProfileCard/ProfileAvatar";
import MarkDownRender from "./MarkDownRender";
import { cn, getRelativeTime } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import ProfileCard from "@/components/ProfileCard";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Reply, Copy, Volume2, Pencil, Pin, Frown, Trash, Languages, SmilePlus } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import ChatReactions, { ChatReactionsRef } from "./ChatReactions";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import ProtectedImage from "@/components/Feed/TextPost/ProtectedImage";

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
    userReaction?: string;
    onSeen?: () => void;
}

export default function ChatBubble({ avatarUrl, name, content, timestamp, isUnread = false, replyingTo, reactions = [], userReaction = "", onSeen }: ChatBubbleProps) {
    const bubbleRef = useRef<HTMLDivElement>(null);
    const hasBeenSeenRef = useRef(false);
    const reactionsRef = useRef<ChatReactionsRef>(null);
    const [internalReactions, setInternalReactions] = useState(reactions);
    const [currentUserReaction, setCurrentUserReaction] = useState(userReaction);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [isHoverCardOpen, setIsHoverCardOpen] = useState(false);
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [allImages, setAllImages] = useState<string[]>([]);
    const { theme } = useTheme();

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

    const addReaction = useCallback((reaction: string) => {
        setInternalReactions((prev) => {
            let updated = [...prev];

            // Case 1: User clicking the same reaction they already have - remove it
            if (currentUserReaction === reaction) {
                setCurrentUserReaction("");
                
                // Decrement count or remove reaction entirely
                const existingReaction = updated.find((r) => r.emoji === reaction);
                if (existingReaction) {
                    if (existingReaction.count === 1) {
                        // Remove reaction entirely
                        updated = updated.filter((r) => r.emoji !== reaction);
                    } else {
                        // Decrement count and mark as not reacted
                        updated = updated.map((r) =>
                            r.emoji === reaction
                                ? { ...r, count: r.count - 1, reacted: false }
                                : r
                        );
                    }
                }
                return updated;
            }

            // Case 2: User has a previous reaction - remove it first
            if (currentUserReaction !== "") {
                const oldReaction = updated.find((r) => r.emoji === currentUserReaction);
                if (oldReaction) {
                    if (oldReaction.count === 1) {
                        // Remove old reaction entirely
                        updated = updated.filter((r) => r.emoji !== currentUserReaction);
                    } else {
                        // Decrement old reaction count
                        updated = updated.map((r) =>
                            r.emoji === currentUserReaction
                                ? { ...r, count: r.count - 1, reacted: false }
                                : r
                        );
                    }
                }
            }

            // Case 3: Add the new reaction
            setCurrentUserReaction(reaction);
            const newReaction = updated.find((r) => r.emoji === reaction);
            if (newReaction) {
                // Increment existing reaction
                updated = updated.map((r) =>
                    r.emoji === reaction
                        ? { ...r, count: r.count + 1, reacted: true }
                        : r
                );
            } else {
                // Add new reaction
                updated.push({ emoji: reaction, count: 1, reacted: true });
            }

            return updated;
        });
    }, [currentUserReaction]);

    // Handle image click to open viewer
    const handleImageClick = useCallback((imageUrl: string, images: string[]) => {
        setAllImages(images);
        const index = images.indexOf(imageUrl);
        setSelectedImageIndex(index >= 0 ? index : 0);
        setImageViewerOpen(true);
    }, []);

    // Navigate to previous image
    const prevImage = useCallback(() => {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
    }, [allImages.length]);

    // Navigate to next image
    const nextImage = useCallback(() => {
        setSelectedImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
    }, [allImages.length]);

    return (
        <ContextMenu>
            <HoverCard 
                closeDelay={100} 
                openDelay={100}
                open={isHoverCardOpen}
                onOpenChange={(open) => {
                    // Prevent closing if emoji picker is open
                    if (!open && isEmojiPickerOpen) {
                        return;
                    }
                    setIsHoverCardOpen(open);
                }}
            >
                <HoverCardTrigger>
                    <ContextMenuTrigger asChild>
                        <div
                            ref={bubbleRef}
                            className={cn(
                                "flex items-start relative gap-2 w-full transition-colors duration-200 px-3 py-2",
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
                                <div className="text-sm flex flex-col p-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-base">{name}</span>
                                        <span className="text-xs text-muted-foreground">{getRelativeTime(timestamp, true)}</span>
                                    </div>
                                    <MarkDownRender content={content} onImageClick={handleImageClick} />
                                </div>
                    
                                <ChatReactions
                                    ref={reactionsRef}
                                    reactions={internalReactions}
                                    onReactionToggle={addReaction}
                                />
                            </div>
                        </div>
                    </ContextMenuTrigger>
                </HoverCardTrigger>

                <HoverCardContent 
                    side="top" 
                    align="end" 
                    alignOffset={10} 
                    sideOffset={-30} 
                    className="bg-background shadow-black/5 border-input/50 p-1 px-2 flex items-center gap-2 w-fit"
                >
                    <Button 
                        variant="ghost" 
                        className={cn(
                            "p-0 py-0 h-7 text-lg aspect-square w-7 select-none transition-all duration-150",
                            currentUserReaction === "👍🏾" && "bg-[#7600C9]/10 border-2 border-[#7600C9] scale-110"
                        )}
                        onClick={() => addReaction("👍🏾")}
                    >
                        👍🏾
                    </Button>
                    <Button 
                        variant="ghost" 
                        className={cn(
                            "p-0 py-0 h-7 text-lg aspect-square w-7 select-none transition-all duration-150",
                            currentUserReaction === "😂" && "bg-[#7600C9]/10 border-2 border-[#7600C9] scale-110"
                        )}
                        onClick={() => addReaction("😂")}
                    >
                        😂
                    </Button>
                    <Button 
                        variant="ghost" 
                        className={cn(
                            "p-0 py-0 h-7 text-lg aspect-square w-7 select-none transition-all duration-150",
                            currentUserReaction === "❤️" && "bg-[#7600C9]/10 border-2 border-[#7600C9] scale-110"
                        )}
                        onClick={() => addReaction("❤️")}
                    >
                        ❤️
                    </Button>
                    <Button 
                        variant="ghost" 
                        className={cn(
                            "p-0 py-0 h-7 text-lg aspect-square w-7 select-none transition-all duration-150",
                            currentUserReaction === "🔥" && "bg-[#7600C9]/10 border-2 border-[#7600C9] scale-110"
                        )}
                        onClick={() => addReaction("🔥")}
                    >
                        🔥
                    </Button>
                    <Button 
                        variant="ghost" 
                        className={cn(
                            "p-0 py-0 h-7 text-lg aspect-square w-7 select-none transition-all duration-150",
                            currentUserReaction === "👎🏾" && "bg-[#7600C9]/10 border-2 border-[#7600C9] scale-110"
                        )}
                        onClick={() => addReaction("👎🏾")}
                    >
                        👎🏾
                    </Button>
                    <div className="w-px h-5 bg-input/50" />
                    <DropdownMenu open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="p-0 py-0 h-7 text-lg aspect-square w-7 select-none"
                            >
                                <SmilePlus size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent sideOffset={10} align="end" className="w-fit overflow-visible p-0 h-7">
                            <EmojiPicker
                                onEmojiClick={(emoji) => {
                                    addReaction(emoji.emoji);
                                    setIsEmojiPickerOpen(false);
                                }}
                                theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                        variant="ghost" 
                        className="p-0 py-0 h-7 text-lg aspect-square w-7 select-none"
                    >
                        <Reply size={16} />
                    </Button>
                </HoverCardContent>
            </HoverCard>
            
            <ContextMenuContent className="w-56">
                <ContextMenuItem onClick={() => reactionsRef.current?.openEmojiPicker()}>
                    <SmilePlus size={16} />
                    Add Reactions
                </ContextMenuItem>
                {internalReactions.length > 0 && <ContextMenuItem>
                    <Frown size={16} />
                    View Reactions
                </ContextMenuItem>}
                
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
                    <Copy size={16} />
                    Copy Text
                </ContextMenuItem>
                
                <ContextMenuSeparator />
                
                <ContextMenuItem>
                    <Pin size={16} />
                    Pin Message
                </ContextMenuItem>
                
                <ContextMenuSub>
                    <ContextMenuSubTrigger className="flex items-center gap-2">
                        <Languages size={16} />
                        Translate
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48 max-h-40 overflow-y-auto">
                        <ContextMenuItem>Espanol</ContextMenuItem>
                        <ContextMenuItem>Pigine</ContextMenuItem>
                        <ContextMenuItem>French</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                
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

            {/* Image Viewer Dialog */}
            <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
                <DialogContent
                    className="max-w-[98vw] w-full h-[95vh] p-0 bg-transparent border-none"
                    showCloseButton={false}
                >
                    <DialogHeader hidden>
                        <DialogTitle>Image Viewer</DialogTitle>
                    </DialogHeader>
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Close Button */}
                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                            >
                                <XIcon className="size-6" />
                                <span className="sr-only">Close Image viewer</span>
                            </Button>
                        </DialogClose>

                        {/* Navigation Buttons */}
                        {allImages.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 z-50 text-white hover:bg-white/20 rounded-full"
                                    onClick={prevImage}
                                >
                                    <ChevronLeftIcon className="size-8" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 z-50 text-white hover:bg-white/20 rounded-full"
                                    onClick={nextImage}
                                >
                                    <ChevronRightIcon className="size-8" />
                                </Button>
                            </>
                        )}

                        {/* Main Image */}
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                            {allImages[selectedImageIndex] && (
                                <ProtectedImage
                                    src={allImages[selectedImageIndex]}
                                    alt={`Image ${selectedImageIndex + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                    fill
                                />
                            )}
                        </div>

                        {/* Image Counter */}
                        {allImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                                {selectedImageIndex + 1} / {allImages.length}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </ContextMenu>
    )
}
