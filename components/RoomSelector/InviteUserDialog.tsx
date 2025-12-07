"use client"

import { useState, useRef, useCallback, useMemo, forwardRef } from "react";
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
import useShortcuts from "@useverse/useshortcuts";

// Mock users data
const mockUsers = [
    { id: "1", name: "John Doe", avatar: "https://chirps-chat.sirv.com/turkey.png", fallback: "JD" },
    { id: "2", name: "Jane Smith", avatar: "https://chirps-chat.sirv.com/parrot.png", fallback: "JS" },
    { id: "3", name: "Bob Wilson", avatar: "", fallback: "BW" },
    { id: "4", name: "Alice Johnson", avatar: "", fallback: "AJ" },
    { id: "5", name: "Charlie Brown", avatar: "", fallback: "CB" },
    { id: "6", name: "Diana Prince", avatar: "", fallback: "DP" },
    { id: "7", name: "Eve Adams", avatar: "", fallback: "EA" },
];

const InviteUserDialog = forwardRef<HTMLButtonElement>((props, ref) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [focusedUserId, setFocusedUserId] = useState<string | null>(null);
    const userRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { disallowShortcuts, allowShortcuts, notoriousShortcuts, allowedShortcuts } = useKeyBoardShortCut();

    // Filter users based on search query
    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) return mockUsers;
        return mockUsers.filter(user => 
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Navigate to next user
    const navigateDown = useCallback(() => {
        if (filteredUsers.length === 0) return;
        
        const currentIndex = focusedUserId 
            ? filteredUsers.findIndex(user => user.id === focusedUserId)
            : -1;
        
        const nextIndex = currentIndex < filteredUsers.length - 1 ? currentIndex + 1 : currentIndex;
        if (nextIndex >= 0 && nextIndex < filteredUsers.length) {
            const nextUser = filteredUsers[nextIndex];
            setFocusedUserId(nextUser.id);
            
            // Scroll into view
            const element = userRefs.current.get(nextUser.id);
            if (element && scrollAreaRef.current) {
                element.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    }, [filteredUsers, focusedUserId]);

    // Navigate to previous user
    const navigateUp = useCallback(() => {
        if (filteredUsers.length === 0) return;
        
        const currentIndex = focusedUserId 
            ? filteredUsers.findIndex(user => user.id === focusedUserId)
            : -1;
        
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        if (prevIndex >= 0 && prevIndex < filteredUsers.length) {
            const prevUser = filteredUsers[prevIndex];
            setFocusedUserId(prevUser.id);
            
            // Scroll into view
            const element = userRefs.current.get(prevUser.id);
            if (element && scrollAreaRef.current) {
                element.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    }, [filteredUsers, focusedUserId]);

    // Handle Enter key to invite
    const handleInvite = useCallback(() => {
        if (!focusedUserId) return;
        const selectedUser = filteredUsers.find(user => user.id === focusedUserId);
        if (selectedUser) {
            console.log("Inviting:", selectedUser);
            // Handle invite logic here
        }
    }, [filteredUsers, focusedUserId]);

    // Keyboard shortcuts
    useShortcuts({
        shortcuts: [
            { key: "ArrowDown", isSpecialKey: true, enabled: allowedShortcuts.has("arrowDown") },
            { key: "ArrowUp", isSpecialKey: true, enabled: allowedShortcuts.has("arrowUp") },
            { key: "Enter", isSpecialKey: true, enabled: allowedShortcuts.has("enter") },
        ],
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case "ArrowDown":
                    navigateDown();
                    break;
                case "ArrowUp":
                    navigateUp();
                    break;
                case "Enter":
                    handleInvite();
                    break;
            }
        }
    }, [navigateDown, navigateUp, handleInvite, allowedShortcuts]);

    return (
        <Dialog
            onOpenChange={(open: boolean) => {
                if (open) {
                    disallowShortcuts([...Array.from(notoriousShortcuts), "alt+F", "commandESC"]);
                    allowShortcuts([
                        "arrowDown",
                        "arrowUp",
                        "enter",
                    ]);
                    setFocusedUserId(null);
                } else {
                    allowShortcuts([...Array.from(notoriousShortcuts), "alt+F"]);
                    setTimeout(() => {
                        allowShortcuts(["commandESC"]);
                    }, 100);
                    disallowShortcuts([
                        "arrowDown",
                        "arrowUp",
                        "enter",
                    ]);
                    setFocusedUserId(null);
                    setSearchQuery("");
                }
            }}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger
                        ref={ref}
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
                    <ScrollArea ref={scrollAreaRef} className="space-y-2 h-72 overflow-y-auto scroll-smooth">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <UserCard 
                                    key={user.id}
                                    user={user}
                                    isFocused={focusedUserId === user.id}
                                    onInvite={() => console.log("Invite", user.name)}
                                    ref={(el) => {
                                        if (el) userRefs.current.set(user.id, el);
                                    }}
                                />
                            ))
                        ) : (
                            <div className="text-center text-muted-foreground py-8">
                                No users found
                            </div>
                        )}
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
});

InviteUserDialog.displayName = "InviteUserDialog";

interface UserCardProps {
    user: { id: string; name: string; avatar: string; fallback: string };
    isFocused: boolean;
    onInvite: () => void;
}

const UserCard = forwardRef<HTMLDivElement, UserCardProps>(({ user, isFocused, onInvite }, ref) => {
    return (
        <div
            ref={ref}
            className={`flex items-center gap-4 p-1 rounded-md hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10 transition-colors ${
                isFocused ? "bg-foreground/10 ring-2 ring-primary/50" : ""
            }`}
        >
            <div className="flex items-center gap-2 flex-1 pr-3">
                <Avatar className="h-8 w-8 bg-foreground/5">
                    <AvatarFallback>{user.fallback}</AvatarFallback>
                    {user.avatar && <AvatarImage src={user.avatar} />}
                </Avatar>
                <span className="text-muted-foreground">{user.name}</span>
            </div>
            <Button
                variant="outline"
                className="px-4 py-1 text-sm rounded-md"
                onClick={onInvite}
            >
                Invite
            </Button>
        </div>
    );
});

UserCard.displayName = "UserCard";

export default InviteUserDialog;