"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import UserClump from "../modular/UserClump";
import { useKeyBoardShortCut } from "../Providers/KeyBoardShortCutProvider";
// import { useEffect } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import useShortcuts from "@useverse/useshortcuts";
import { useAuth } from "../Providers/AuthProvider";
import { useEffect, useRef } from "react";
import { Kbd, KbdGroup } from "../ui/kbd";
import { useState } from "react";
import { useTheme } from "next-themes";
import { BarChart2Icon, Image as ImageIcon, Text } from "lucide-react";
import TextPost from "./TextPost";
import PollPost from "./PollPost";
import { Separator } from "../ui/separator";

export enum PostType {
    TEXT = "text",
    POLL = "poll"
}

export interface Option {
    id: string;
    option: string;
}

interface PostData {
    type: PostType;
    text?: string;
    images?: string[];
    poll?: {
        question: string;
        options: Option[];
    };
}

export default function CreatePost() {
    const { disallowShortcuts, allowShortcuts, notoriousShortcuts, allowedShortcuts } = useKeyBoardShortCut();
    const { isMacOS } = useAuth();
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [postData, setPostData] = useState<PostData>({ type: PostType.TEXT, text: "", images: [] });

    const handleEmojiClick = (emoji: string) => {
        setPostData(prev => ({ ...prev, text: (prev.text || "") + emoji }));
    }

    const handleTextChange = (newText: string) => {
        setPostData(prev => ({ ...prev, text: newText }));
    }

    const handleImagesChange = (newImages: string[]) => {
        setPostData(prev => ({ ...prev, images: newImages.slice(0, 4) }));
    }

    const handlePollChange = (newPoll: { question: string; options: Option[] }) => {
        setPostData(prev => ({ ...prev, poll: newPoll }));
    }

    const createNewPostRef = useRef<HTMLButtonElement>(null);

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

    useEffect(() => {
        console.log("Post data updated:", postData);
    }, [postData]);

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
                        <DialogTrigger asChild>
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
                <DialogContent className="sm:max-w-2xl  max-h-[90dvh] overflow-y-auto rounded-3xl bg-background/90 backdrop-blur-sm p-2">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Create Post</DialogTitle>
                        <UserClump
                            name="Hello Kitty"
                            username="Post to Everyone"
                            className="p-2 pr-4 hover:bg-transparent dark:hover:bg-transparent"
                            variant="ghost"
                            size="lg"
                            avatar="https://chirps-chat.sirv.com/leopard.png"
                        />
                    </DialogHeader>
                    {postData.type === PostType.TEXT && <TextPost
                        text={postData.text || ""}
                        images={postData.images || []}
                        onTextChange={handleTextChange}
                        onImagesChange={handleImagesChange}
                        setIsHovered={setIsHovered}
                        isHovered={isHovered}
                        theme={theme as string}
                        handleEmojiClick={handleEmojiClick}
                    />}
                    {postData.type === PostType.POLL && <PollPost
                        pollData={postData.poll!}
                        onPollChange={handlePollChange}
                    />}
                    <div className="grid gap-y-3 px-3 ">
                        <div className="flex items-center gap-2 mb-1">
                            {postData.type === PostType.TEXT && <Button
                                variant="outline"
                                size={"icon-lg"}
                                className="border-none"
                            >
                                <ImageIcon />
                                <span className="sr-only">Insert an Image</span>
                            </Button>}
                            {postData.type === PostType.TEXT && <Button
                                variant="outline"
                                size={"icon-lg"}
                                className="border-none"
                                onClick={() => {
                                    setPostData(prev => {
                                        if (prev.type === PostType.POLL) return prev;
                                        return {
                                            ...prev,
                                            type: PostType.POLL,
                                            poll: {
                                                question: "",
                                                options: [
                                                    { id: "1", option: "" },
                                                    { id: "2", option: "" }
                                                ]
                                            }
                                        };
                                    });
                                }}
                            >
                                <BarChart2Icon strokeWidth={5} />
                                <span className="sr-only">Create a Poll</span>
                            </Button>}
                            {postData.type === PostType.POLL && <Button
                                variant="outline"
                                size={"icon-lg"}
                                className="border-none"
                                onClick={() => setPostData(prev => ({ ...prev, type: PostType.TEXT }))}
                            >
                                <Text strokeWidth={5} />
                                <span className="sr-only">Create a Poll</span>
                            </Button>}
                        </div>
                        <Separator />
                        <div className="flex items-center justify-end gap-2 px-3 mb-3">
                            {postData.type === PostType.POLL && <Button
                                variant="outline"
                                className="px-3 py-2"
                                onClick={() => setPostData(prev => ({ ...prev, type: PostType.TEXT }))}
                            >
                                <span className="">Back</span>
                            </Button>}
                            {postData.type === PostType.TEXT && <Button
                                variant="outline"
                                className="px-3 py-2"
                            >
                                <span className="">Cancel</span>
                            </Button>}
                            <Button
                                variant="default"
                                className="px-3 py-2"
                            >
                                <span className="">Send Post</span>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}

