"use client";
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import useShortcuts from '@useverse/useshortcuts';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { SearchIcon, XIcon } from 'lucide-react';

interface SearchProps {
    onMobileExpand?: (expanded: boolean) => void;
    expanded: boolean
}

export default function Search({ expanded, onMobileExpand }: SearchProps) {
    const { allowedShortcuts } = useKeyBoardShortCut();
    const { isMacOS, isMobile } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isExpanded, setIsExpanded] = useState(expanded);

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

    const handleExpand = () => {
        setIsExpanded(true);
        onMobileExpand?.(true);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleCollapse = () => {
        setIsExpanded(false);
        onMobileExpand?.(false);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    if (isMobile) return (
        <AnimatePresence mode="wait">
            {isExpanded ? (
                <motion.div
                    key="expanded"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className={cn(
                        "flex items-center relative rounded-3xl bg-background/20",
                        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                        "shadow-xs transition-[color,box-shadow] border border-input dark:bg-input/30",
                        "flex-1 w-full"
                    )}
                >
                    <button 
                        onClick={handleCollapse}
                        className="aspect-square grid place-items-center h-10 w-10 rounded-full shrink-0"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                    <Input
                        type="search"
                        ref={inputRef}
                        placeholder="Search..."
                        className="w-full px-3 py-2 rounded-full bg-transparent border-none dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </motion.div>
            ) : (
                <motion.div
                    key="collapsed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className={cn(
                        "flex items-center relative rounded-3xl bg-background/20",
                        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                        "shadow-xs transition-[color,box-shadow] border border-input dark:bg-input/30",
                        "w-fit max-w-xs overflow-hidden"
                    )}
                >
                    <button 
                        onClick={handleExpand}
                        className="aspect-square grid place-items-center h-10 w-10 rounded-full"
                    >
                        <SearchIcon className="w-5 h-5" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )

    return (
        <ContextMenu>
            <ContextMenuTrigger className={cn(
                "flex items-center relative rounded-3xl bg-background/20",
                "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                "shadow-xs transition-[color,box-shadow] border border-input dark:bg-input/30",
                "w-full max-w-xs"
            )}>
                <Input
                    type="search"
                    ref={inputRef}
                    placeholder="Search..."
                    className='px-5 py-6 w-full rounded-full bg-transparent border-none dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                />
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

