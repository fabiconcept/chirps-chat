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
import { motion, AnimatePresence } from "framer-motion";
import { SmilePlus } from "lucide-react";

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

    if (reactions.length === 0 && !isMobile) return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="p-0 py-0 h-0 text-lg aspect-square w-7 select-none"
                    onMouseEnter={() => setIsHovered(true)}
                >
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
        </DropdownMenu>
    );

    return (
        <motion.div
            className="flex items-center gap-2 max-sm:gap-y-1 px-2 pb-1 flex-wrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {reactions.sort((a, b) => b.count - a.count).map((reaction, idx) => (
                    <motion.button
                        key={`${reaction.emoji}-${idx}`}
                        layout
                        initial={"normal"}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -10 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                            layout: {
                                type: "spring",
                                stiffness: 400,
                                damping: 30
                            }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onReactionToggle(reaction.emoji)}
                        className={cn(
                            "flex items-center cursor-pointer sm:gap-2 gap-1 group sm:px-2 px-1 rounded-lg text-sm sm:border-2 border transition-all duration-150",
                            reaction.reacted
                                ? "bg-[#7600C9]/5 border-[#7600C9]"
                                : "sm:bg-input/50 bg-input/25 dark:hover:bg-white/25 hover:bg-white dark:hover:border-white/25 hover:border-foreground/25 border-input"
                        )}
                    >
                        <motion.span
                            className="text-xl sm:text-2xl dark:max-sm:drop-shadow-[0_0_5px_rgba(0,0,0,1)] max-sm:drop-shadow-[0_0_5px_rgba(0,0,0,0.2)]"
                            animate={reaction.reacted ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            {reaction.emoji}
                        </motion.span>
                        <motion.span
                            className="text-xs font-semibold"
                            layout
                            key={reaction.count}
                            initial={{ scale: 1.3, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {reaction.count > 999 ? formatNumber(reaction.count, 1) : reaction.count}
                        </motion.span>
                    </motion.button>
                ))}
            </AnimatePresence>

            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                >
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
                                key={theme}
                                onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)}
                                suggestedEmojisMode={SuggestionMode.RECENT}
                                theme={theme === "dark" ? Theme.DARK : theme === "light" ? Theme.LIGHT : Theme.AUTO}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </motion.div>
            )}

            {isMobile && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                >
                    <Drawer open={isOpen} onOpenChange={setIsOpen}>
                        <DrawerTrigger asChild>
                            <Button
                                variant="ghost"
                                size={"icon-lg"}
                                className="relative -ml-2 rounded-full h-10 w-10 grid place-items-center overflow-hidden cursor-pointer active:-rotate-3 active:scale-95 transition-all duration-300 dark:drop-shadow-[0_0_5px_rgba(0,0,0,1)] max-sm:drop-shadow-[0_0_5px_rgba(0,0,0,0.2)]"
                                onMouseEnter={() => setIsHovered(true)}
                            >
                                <SmilePlus size={32} />
                                <span className="sr-only">Insert an Emoji</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className={cn("rounded-t-3xl")}>
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
                                height={400}
                                previewConfig={{
                                    showPreview: false,
                                }}
                                theme={theme === "dark" ? Theme.DARK : theme === "light" ? Theme.LIGHT : Theme.AUTO}
                            />
                        </DrawerContent>
                    </Drawer>
                </motion.div>
            )}
        </motion.div>
    );
});

ChatReactions.displayName = "ChatReactions";

export default ChatReactions;