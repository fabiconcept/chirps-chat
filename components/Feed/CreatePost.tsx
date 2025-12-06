"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import UserClump from "../modular/UserClump";
import { useKeyBoardShortCut } from "../Providers/KeyBoardShortCutProvider";
import { DialogTitle } from "@radix-ui/react-dialog";
import useShortcuts from "@useverse/useshortcuts";
import { useAuth } from "../Providers/AuthProvider";
import { useRef } from "react";
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

    const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        const maxImages = 4;
        const validImages: { file: File; previewUrl: string }[] = [];
        const errors: string[] = [];

        // Get current number of images
        const currentImageCount = postData.images?.length || 0;
        const remainingSlots = maxImages - currentImageCount;

        // Process each selected file
        Array.from(files).forEach((file) => {
            // Check if we've reached the max number of images
            if (validImages.length >= remainingSlots) {
                errors.push(`Maximum ${maxImages} images allowed. You can add ${remainingSlots} more.`);
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                errors.push(`${file.name} is not an image file`);
                return;
            }

            // Validate file size
            if (file.size > maxSize) {
                errors.push(`${file.name} exceeds 5MB limit`);
                return;
            }

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            validImages.push({ file, previewUrl });
        });

        // Add valid images to existing images
        if (validImages.length > 0) {
            setPostData(prev => ({
                ...prev,
                images: [...(prev.images || []), ...validImages]
            }));
        }

        // Show errors if any
        if (errors.length > 0) {
            console.error('Image upload errors:', errors);
            // You can also show these errors to the user via a toast/alert
        }

        // Reset the input so the same file can be selected again if needed
        event.target.value = '';
    };

    const handleRemoveImage = (index: number) => {
        setPostData(prev => {
            const currentImages = prev.images || [];

            // Revoke the object URL to free up memory
            if (currentImages[index]?.previewUrl) {
                URL.revokeObjectURL(currentImages[index].previewUrl);
            }

            // Remove the image at the specified index
            const updatedImages = currentImages.filter((_, i) => i !== index);

            return {
                ...prev,
                images: updatedImages
            };
        });
    };

    const handlePollChange = (newPoll: { question: string; options: Option[] }) => {
        setPostData(prev => ({ ...prev, poll: newPoll, text: undefined, images: undefined }));
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

