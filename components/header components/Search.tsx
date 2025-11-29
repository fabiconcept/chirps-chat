"use client";
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import useShortcuts from '@useverse/useshortcuts';
import { useRef } from 'react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useKeyBoardShortCut } from '../Providers/KeyBoardShortCutProvider';
import { useAuth } from '../Providers/AuthProvider';

export default function Search() {
    const { allowedShortcuts } = useKeyBoardShortCut();
    const { isMacOS } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    }
    useShortcuts({
        shortcuts: [
            { key: "Slash", isSpecialKey: true, enabled: allowedShortcuts.has("search") },
            { key: 'K', metaKey: isMacOS, ctrlKey: !isMacOS, enabled: allowedShortcuts.has("commandK") },
            { key: 'F', metaKey: isMacOS, ctrlKey: !isMacOS, enabled: allowedShortcuts.has("commandF") },
        ],
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case "Slash":
                    focusInput();
                    break;
                case "K":
                    focusInput();
                    break;
                case "F":
                    focusInput();
                    break;
            }
        }
    }, [focusInput, allowedShortcuts]);

    return (
        <ContextMenu>
            <ContextMenuTrigger className={cn(
                "flex-1 flex items-center gap-2 relative rounded-3xl pr-1 bg-background/20",
                "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                "shadow-xs transition-[color,box-shadow] border border-input dark:bg-input/30"
            )}>
                <Input
                    type="search"
                    ref={inputRef}
                    placeholder="Search..."
                    className='px-5 py-6 min-w-64 w-full rounded-full bg-transparent border-none dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                />
                <Select>
                    <SelectTrigger className="w-[180px] rounded-3xl px-5 py-5">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent className="rounded-3xl">
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
                <ContextMenuItem inset disabled>
                    Search
                    <ContextMenuShortcut>/</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset>
                    Copy
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset>
                    Paste
                    <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger inset>Search Type</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-44">
                        <ContextMenuItem>Find all</ContextMenuItem>
                        <ContextMenuItem>Find a User</ContextMenuItem>
                        <ContextMenuItem>Find a Post</ContextMenuItem>
                        <ContextMenuItem>Browse Hashtag (#)</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
            </ContextMenuContent>
        </ContextMenu>
    )
}

