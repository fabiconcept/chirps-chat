"use client"

import emoji from "@/components/lottie/emoji.json";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn, formatNumber } from "@/lib/utils";
import EmojiPicker, { EmojiStyle, SuggestionMode, Theme } from "emoji-picker-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, forwardRef, useImperativeHandle } from "react";
import Lottie from "lottie-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useResized } from "@/hooks/use-resized";

interface Reaction {
    emoji: string;
    count: number;
    reacted: boolean;
}

interface ChatReactionsProps {
    reactions: Reaction[];
    onReactionToggle: (emoji: string) => void;
}

export interface ChatReactionsRef {
    openEmojiPicker: () => void;
}

const ChatReactions = forwardRef<ChatReactionsRef, ChatReactionsProps>(({ reactions, onReactionToggle }, ref) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();
    const resized = useResized();

    useImperativeHandle(ref, () => ({
        openEmojiPicker: () => setIsOpen(true)
    }));

    const handleEmojiClick = (selectedEmoji: string) => {
        onReactionToggle(selectedEmoji);
        setIsOpen(false);
    };

    if (reactions.length === 0) return null;

    const dropdownMenuContentProps = isMobile ? {
        sideOffset: 10,
        align: "end",
        className: "w-fit overflow-visible p-0 h-fit",
        style: {
            width: 300,
            height: 300,
        },
    } : {};

    return (
        <div className="flex items-center gap-2 max-sm:gap-y-1 px-2 pb-1 flex-wrap">
            {reactions.map((reaction, idx) => (
                <button
                    key={idx}
                    onClick={() => onReactionToggle(reaction.emoji)}
                    className={cn(
                        "flex items-center cursor-pointer sm:gap-2 gap-1 group sm:px-2 px-1 rounded-lg text-sm sm:border-2 border transition-all duration-150 hover:scale-105 active:scale-95",
                        reaction.reacted
                            ? "bg-[#7600C9]/5 border-[#7600C9]"
                            : "sm:bg-input/50 bg-input/25 dark:hover:bg-white/25 hover:bg-white dark:hover:border-white/25 hover:border-foreground/25 border-input"
                    )}
                >
                    <span className="text-xl sm:text-2xl max-sm:drop-shadow-[0_0_5px_rgba(0,0,0,1)]">{reaction.emoji}</span>
                    <span className="text-xs font-semibold">{reaction.count > 999 ? formatNumber(reaction.count, 1) : reaction.count}</span>
                </button>
            ))}
            {!isMobile && <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative p-2 rounded-full h-10 w-10 grid place-items-center overflow-hidden cursor-pointer active:-rotate-3 active:scale-95 transition-all duration-300"
                        onMouseEnter={() => setIsHovered(true)}
                    >
                        <Image
                            src="/emoji-cut.png"
                            alt="emoji"
                            width={55}
                            height={55}
                            className="object-contain"
                        />
                        {isHovered && <Lottie
                            animationData={emoji}
                            onComplete={() => setIsHovered(false)}
                            className="absolute bottom-0 left-0 w-full h-full"
                            autoPlay
                            loop={false}
                            style={{
                                animationDuration: "0.5s",
                            }}
                        />}
                        <span className="sr-only">Insert an Emoji</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit overflow-visible p-0 h-fit">
                    <EmojiPicker
                        key={theme}
                        onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)}
                        suggestedEmojisMode={SuggestionMode.RECENT}
                        theme={theme === "dark" ? Theme.DARK : theme === "light" ? Theme.LIGHT : Theme.AUTO}
                    />
                </DropdownMenuContent>
            </DropdownMenu>}
            {isMobile && <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative p-2 -ml-2 rounded-full h-10 w-10 grid place-items-center overflow-hidden cursor-pointer active:-rotate-3 active:scale-95 transition-all duration-300 drop-shadow-[0_0_5px_rgba(0,0,0,1)]"
                        onMouseEnter={() => setIsHovered(true)}
                    >
                        <Image
                            src="/emoji-cut.png"
                            alt="emoji"
                            width={55}
                            height={55}
                            className="object-contain"
                        />
                        {isHovered && <Lottie
                            animationData={emoji}
                            onComplete={() => setIsHovered(false)}
                            className="absolute bottom-0 left-0 w-full h-full"
                            autoPlay
                            loop={false}
                            style={{
                                animationDuration: "0.5s",
                            }}
                        />}
                        <span className="sr-only">Insert an Emoji</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent className={cn(
                    "rounded-t-3xl"
                )}>
                    <DrawerHeader className="text-left sr-only">
                        <DrawerTitle>Insert an Emoji</DrawerTitle>
                    </DrawerHeader>
                    <DrawerDescription className="sr-only">
                        Select an emoji to insert it into the chat.
                    </DrawerDescription>
                    <EmojiPicker
                        key={theme}
                        onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)}
                        suggestedEmojisMode={SuggestionMode.RECENT}
                        width={resized.width}
                        lazyLoadEmojis
                        searchDisabled
                        searchPlaceholder="Search for an emoji"
                        // skinTonesDisabled
                        height={300}
                        previewConfig={{
                            showPreview: false,
                        }}
                        theme={theme === "dark" ? Theme.DARK : theme === "light" ? Theme.LIGHT : Theme.AUTO}
                    />
                </DrawerContent>
            </Drawer>}
        </div>
    );
});

ChatReactions.displayName = "ChatReactions";

export default ChatReactions;
