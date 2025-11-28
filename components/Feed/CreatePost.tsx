"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import UserClump from "../modular/UserClump";
import { Textarea } from "../ui/textarea";
import { useKeyBoardShortCut } from "../Providers/KeyBoardShortCutProvider";
// import { useEffect } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import useShortcuts from "@useverse/useshortcuts";
import { useAuth } from "../Providers/AuthProvider";
import { useRef } from "react";
import { Kbd, KbdGroup } from "../ui/kbd";
import Image from "next/image";
import Lottie from "lottie-react";
import emoji from "@/components/lottie/emoji.json";
import { useState } from "react";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function CreatePost() {
    const { disallowShortcuts, allowShortcuts, notoriousShortcuts, allowedShortcuts } = useKeyBoardShortCut();
    const { isMacOS } = useAuth();
    const {theme} = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [text, setText] = useState("");

    const handleEmojiClick = (emoji: string) => {
        setText((prev) => prev + emoji);
    }

    const createNewPostRef = useRef<HTMLButtonElement>(null);
    const createNewPostTextRef = useRef<HTMLTextAreaElement>(null);

    useShortcuts({
        shortcuts: [{
            key: "N",
            metaKey: isMacOS,
            ctrlKey: !isMacOS,
            enabled: allowedShortcuts.has("commandN")
        }],
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case "N":
                    createNewPostRef.current?.click();
                    break;
            }
        }
    }, [allowedShortcuts, createNewPostRef]);

    return (
        <Dialog onOpenChange={(open) => {
            if (open) {
                disallowShortcuts([...notoriousShortcuts, 'commandN'])
            } else {
                allowShortcuts([...notoriousShortcuts, 'commandN'])
            }
        }}>
            <form action="">
                <div className="w-full rounded-full border border-input bg-foreground/5 p-2">
                    <div className="flex items-center gap-2">
                        <Avatar className='h-12 w-12 p-2 bg-background border transition-colors duration-300'>
                            <AvatarImage src="https://chirps-chat.sirv.com/leopard.png" />
                            <AvatarFallback>HK</AvatarFallback>
                        </Avatar>
                        <DialogTrigger  asChild>
                            <Button 
                                variant="outline"
                                ref={createNewPostRef}
                                className="flex-1 h-12 justify-between active:rotate-0 active:scale-[.99] rounded-full"
                            >
                                <span className="text-muted-foreground">What&rsquo;s on your mind?</span>
                                <KbdGroup><Kbd>⌘</Kbd><Kbd>N</Kbd></KbdGroup>
                            </Button>
                        </DialogTrigger>
                    </div>
                </div>
                <DialogContent className="sm:max-w-2xl rounded-3xl bg-background/90 backdrop-blur-sm p-2">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Create Post</DialogTitle>
                        <UserClump
                            name="Hello Kitty"
                            username="Post to Everyone"
                            className="p-2 pr-4"
                            variant="ghost"
                            size="lg"
                            avatar="https://chirps-chat.sirv.com/leopard.png"
                        />
                    </DialogHeader>
                    <div className="px-2 mb-3 relative">
                        <Textarea 
                            className="max-h-72 p-3 resize-none min-h-40"
                            placeholder="What's on your mind?"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            ref={createNewPostTextRef}
                        />

                        <div className="absolute bottom-2 right-4">
                            <DropdownMenu 
                                onOpenChange={(open) => {
                                    if (!open) {
                                        createNewPostTextRef.current?.focus();
                                    }
                                }}
                            >
                                <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative bg-foreground/75 p-2 rounded-full h-10 w-10 grid place-items-center overflow-hidden cursor-pointer active:-rotate-3 active:scale-95 transition-all duration-300"
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
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}
