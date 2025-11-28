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

export default function CreatePost() {
    const { disallowShortcuts, allowShortcuts, notoriousShortcuts, allowedShortcuts } = useKeyBoardShortCut();
    const { isMacOS } = useAuth();

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
                        <DialogTrigger  asChild>
                            <Button 
                                variant="outline"
                                ref={createNewPostRef}
                                className="flex-1 h-12 justify-start active:rotate-0 active:scale-[.99] rounded-full"
                            >
                                <span className="text-muted-foreground">What&rsquo;s on your mind?</span>
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
                    <Textarea 
                        className="max-h-40"
                    />
                </DialogContent>
            </form>
        </Dialog>
    )
}
