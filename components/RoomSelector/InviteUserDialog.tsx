"use client"

import { useState } from "react";
import { HugeiconsIcon } from '@hugeicons/react';
import { UserAdd01Icon } from '@hugeicons/core-free-icons';
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Hashtag from "../ui/hashtag";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { InputGroup, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { useKeyBoardShortCut } from "../Providers/KeyBoardShortCutProvider";

export default function InviteUserDialog() {
    const [searchQuery, setSearchQuery] = useState("");
    const { disallowShortcuts, allowShortcuts, notoriousShortcuts, allowedShortcuts } = useKeyBoardShortCut();

    return (
        <Dialog
            onOpenChange={(open: boolean) => {
                if (open) {
                    disallowShortcuts([...Array.from(notoriousShortcuts), "alt+F", "commandESC"]);
                    // allowShortcuts([
                    //     "arrowDown",
                    //     "arrowUp",
                    //     "enter",
                    // ]);
                } else {
                    allowShortcuts([...Array.from(notoriousShortcuts), "alt+F"]);
                    setTimeout(() => {
                        allowShortcuts(["commandESC"]);
                    }, 100);
                    // disallowShortcuts([
                    //     "arrowDown",
                    //     "arrowUp",
                    //     "enter",
                    // ]);
                }
            }}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger
                        className="size-8 grid place-items-center border hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10 border-transparent hover:border-input py-2 active:rotate-0 px-2 cursor-pointer transition-all active:scale-95 rounded-full"
                    >
                        <HugeiconsIcon
                            icon={UserAdd01Icon}
                            size={16}
                            color="currentColor"
                            strokeWidth={2}
                        />
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    className="text-center backdrop-blur-sm"
                >
                    <p className="font-semibold text-xs">Invite Friends to Room</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Invite Friends to Room</DialogTitle>
                    <DialogDescription>
                        Invited users will be added to the <span className="font-medium px-1 bg-foreground/5 rounded border border-input/20"><Hashtag>#general</Hashtag></span> channel
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <ScrollArea className="space-y-2 h-72 overflow-y-auto scroll-smooth">
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                    </ScrollArea>
                    <div className="grid gap-2 p-2 px-0">
                        <span className="text-sm">Or, send a room invite link to your friends</span>
                        <InputGroup className="h-fit p-1 rounded-3xl">
                            <InputGroupInput
                                placeholder="Copy invite link"
                                value={"https://example.com/"}
                                className="py-0"
                                onChange={() => { }}
                            />
                            <InputGroupButton
                                variant="default"
                                className="px-4 py-[1.2rem] bg-[#7600C9] dark:hover:bg-[#7600C9] hover:bg-[#7600C9] text-white rounded-3xl"
                            >Copy</InputGroupButton>
                        </InputGroup>
                        <span className="text-xs text-muted-foreground">Invite link expires in 24 hours</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

const UserCard = () => {
    return (
        <div
            className="flex items-center gap-4 p-1 rounded-md hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10"
        >
            <div className="flex items-center gap-2 flex-1 pr-3">
                <Avatar className="h-8 w-8 bg-foreground/5">
                    <AvatarFallback>JD</AvatarFallback>
                    <AvatarImage src="https://chirps-chat.sirv.com/turkey.png" />
                </Avatar>
                <span className="text-muted-foreground">John Doe</span>
            </div>
            <Button
                variant="outline"
                className="px-4 py-1 text-sm rounded-md"
            >
                Invite
            </Button>
        </div>
    );
}