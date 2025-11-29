"use client";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import Image from "next/image";
import Lottie from "lottie-react";
import emoji from "@/components/lottie/emoji.json";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { X } from "lucide-react";

const TextPost = ({
    text,
    images,
    onTextChange,
    setIsHovered,
    isHovered,
    theme,
    handleEmojiClick,
    handleRemoveImage
}: {
    text: string;
    images: string[];
    onTextChange: (text: string) => void;
    setIsHovered: (hovered: boolean) => void;
    isHovered: boolean;
    theme: string;
    handleEmojiClick: (emoji: string) => void;
    handleRemoveImage: (index: number) => void;
}) => {
    return (
        <div>
            <div className="px-2 relative">
                <Textarea
                    className="max-h-72 p-3 resize-none min-h-40 bg-foreground/5"
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => onTextChange(e.target.value)}
                />
                <div className="absolute bottom-2 right-4">
                    <DropdownMenu>
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
            </div>
            {images.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap px-3">
                    {images.map((img, i) => (
                        <div key={i} className="p-1 border rounded-md border-input border-offset-2 relative">
                            <Image src={img} width={60} height={60} alt="" className="object-cover aspect-square w-16 h-16 rounded" />
                            <button onClick={() => handleRemoveImage(i)} className="absolute -top-1 -right-1 p-1 rounded-full bg-background/50 border border-input cursor-pointer hover:bg-destructive hover:text-white transition-colors duration-300">
                                <X className="w-3 h-3" />
                                <span className="sr-only">Remove Image</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div> 
    )
}

export default TextPost;
