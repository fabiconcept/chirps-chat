"use client"

import emoji from "@/components/lottie/emoji.json";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import EmojiPicker, { Theme } from "emoji-picker-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, forwardRef, useImperativeHandle } from "react";
import Lottie from "lottie-react";

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

    useImperativeHandle(ref, () => ({
        openEmojiPicker: () => setIsOpen(true)
    }));

    const handleEmojiClick = (selectedEmoji: string) => {
        onReactionToggle(selectedEmoji);
        setIsOpen(false);
    };

    if (reactions.length === 0) return null;

    return (
        <div className="flex items-center gap-2 px-2 pb-1 flex-wrap">
            {reactions.map((reaction, idx) => (
                <button
                    key={idx}
                    onClick={() => onReactionToggle(reaction.emoji)}
                    className={cn(
                        "flex items-center cursor-pointer gap-2 group px-2 rounded-lg text-sm border-2 transition-all duration-150 hover:scale-105 active:scale-95",
                        reaction.reacted
                            ? "bg-[#7600C9]/5 border-[#7600C9]"
                            : "bg-input/50 dark:hover:bg-white/25 hover:bg-white dark:hover:border-white/25 hover:border-foreground/25 border-input"
                    )}
                >
                    <span className="text-2xl">{reaction.emoji}</span>
                    <span className="text-xs font-semibold">{reaction.count}</span>
                </button>
            ))}
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
                        onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)}
                        theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
});

ChatReactions.displayName = "ChatReactions";

export default ChatReactions;
