"use client"

import ProtectedImage from "../Feed/TextPost/ProtectedImage";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Input } from "../ui/input";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import SearchResult from "./SearchResult";
import SectionList from "./SectionList";
import { useState, useMemo, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import useShortcuts from "@useverse/useshortcuts";
import { useKeyBoardShortCut } from "../Providers/KeyBoardShortCutProvider";
import { allResults } from "../../constants/User.const";

const FindConversation = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [arrowPosition, setArrowPosition] = useState<number | null>(null);
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isLoading] = useState(false);
    const [error] = useState<string | null>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { disallowShortcuts, allowShortcuts, notoriousShortcuts } = useKeyBoardShortCut();

    // Detect search type from query
    const searchType = useMemo(() => {
        if (searchQuery.startsWith("@")) return "user";
        if (searchQuery.startsWith("#")) return "channel";
        if (searchQuery.startsWith("*")) return "room";
        return null;
    }, [searchQuery]);

    // Filter and organize results into sections
    const filteredSections = useMemo(() => {
        const query = searchQuery.replace(/^[@#*]/, "").toLowerCase().trim();
        
        // Filter results based on search type and query
        const filtered = allResults.filter(item => {
            if (searchType && item.type !== searchType) return false;
            if (query && !item.name.toLowerCase().includes(query)) return false;
            return true;
        });

        // Group by type
        const users = filtered.filter(item => item.type === "user");
        const rooms = filtered.filter(item => item.type === "room");
        const channels = filtered.filter(item => item.type === "channel");

        // Build sections with dynamic titles
        const sections: Array<{ title: string; items: typeof allResults }> = [];
        
        if (users.length > 0) {
            sections.push({
                title: searchType === "user" ? "Searching Users" : "@Users",
                items: users
            });
        }
        
        if (rooms.length > 0) {
            sections.push({
                title: searchType === "room" ? "Searching Rooms" : "*Rooms",
                items: rooms
            });
        }
        
        if (channels.length > 0) {
            sections.push({
                title: searchType === "channel" ? "Searching Channels" : "#Channels",
                items: channels
            });
        }

        return sections;
    }, [searchQuery, searchType]);

    // Flatten all items for keyboard navigation
    const allItems = useMemo(() => {
        return filteredSections.flatMap(section => section.items);
    }, [filteredSections]);

    // Handle search input change and reset focus
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (focusedItemId) {
            setFocusedItemId(null);
        }
    }, [focusedItemId]);

    // Navigate to next item
    const navigateDown = useCallback(() => {
        if (allItems.length === 0) return;
        
        const currentIndex = focusedItemId 
            ? allItems.findIndex(item => item.id === focusedItemId)
            : -1;
        
        const nextIndex = currentIndex < allItems.length - 1 ? currentIndex + 1 : currentIndex;
        if (nextIndex >= 0 && nextIndex < allItems.length) {
            const nextItem = allItems[nextIndex];
            const element = itemRefs.current.get(nextItem.id);
            if (element) {
                element.focus();
                setFocusedItemId(nextItem.id);
            }
        }
    }, [allItems, focusedItemId]);

    // Navigate to previous item
    const navigateUp = useCallback(() => {
        if (allItems.length === 0) return;
        
        const currentIndex = focusedItemId 
            ? allItems.findIndex(item => item.id === focusedItemId)
            : -1;
        
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        if (prevIndex >= 0 && prevIndex < allItems.length) {
            const prevItem = allItems[prevIndex];
            const element = itemRefs.current.get(prevItem.id);
            if (element) {
                element.focus();
                setFocusedItemId(prevItem.id);
            }
        }
    }, [allItems, focusedItemId]);

    // Handle Enter key to select
    const handleSelect = useCallback(() => {
        if (!focusedItemId) return;
        const selectedItem = allItems.find(item => item.id === focusedItemId);
        if (selectedItem) {
            console.log("Selected:", selectedItem);
            // Handle selection - would navigate to conversation
        }
    }, [allItems, focusedItemId]);

    // Use shortcuts for keyboard navigation
    useShortcuts({
        shortcuts: [
            { key: "ArrowDown", isSpecialKey: true, enabled: true },
            { key: "ArrowUp", isSpecialKey: true, enabled: true },
            { key: "Enter", isSpecialKey: true, enabled: true },
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
                    handleSelect();
                    break;
            }
        }
    }, [navigateDown, navigateUp, handleSelect]);

    /* eslint-disable */
    useLayoutEffect(() => {
        // If search input is focused, reset arrow to initial position
        if (isSearchFocused) {
            setArrowPosition(null);
            return;
        }
        
        if (!focusedItemId || allItems.length === 0) {
            setArrowPosition(null);
            return;
        }
        
        const element = itemRefs.current.get(focusedItemId);
        if (!element || !scrollAreaRef.current) {
            setArrowPosition(null);
            return;
        }
        
        const scrollContainer = scrollAreaRef.current;
        const itemRect = element.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        
        // Calculate position relative to scroll container
        const relativeTop = itemRect.top - containerRect.top;
        
        // Ensure arrow stays within bounds
        const containerHeight = containerRect.height;
        const itemHeight = itemRect.height;
        
        // Only show arrow if item is visible in viewport
        if (relativeTop < -itemHeight || relativeTop > containerHeight) {
            setArrowPosition(null);
            return;
        }
        
        const top = relativeTop + (itemHeight / 2);
        setArrowPosition(top);
    }, [focusedItemId, allItems, isSearchFocused]);

    // Track focus changes
    const handleItemFocus = useCallback((itemId: string) => {
        setFocusedItemId(itemId);
    }, []);

    return (
        <div className="p-3 w-full">
            <Dialog onOpenChange={(open: boolean) => {
                if (open) {
                    disallowShortcuts([...Array.from(notoriousShortcuts)]);
                } else {
                    allowShortcuts([...Array.from(notoriousShortcuts)]);
                    setFocusedItemId(null);
                }
            }}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full p-2"
                    >
                        Find or start a conversation
                    </Button>
                </DialogTrigger>
                <DialogContent 
                    showCloseButton={false} 
                    className="p-3"
                >
                    <div 
                        className="absolute -left-10 animate-[bounce-left_1.5s_ease-in-out_infinite] transition-all duration-300 ease-out"
                        style={{
                            top: arrowPosition !== null ? `${arrowPosition + 60}px` : '24px'
                        }}
                    >
                        <ProtectedImage
                            src="/arrow.png"
                            alt="arrow"
                            width={30}
                            height={30}
                        />
                    </div>
                    <div 
                        className="absolute -right-10 animate-[bounce-right_1.5s_ease-in-out_infinite] transition-all duration-300 ease-out"
                        style={{
                            top: arrowPosition !== null ? `${arrowPosition + 60}px` : '24px'
                        }}
                    >
                        <ProtectedImage
                            src="/arrow.png"
                            alt="arrow"
                            className="scale-x-[-1]"
                            width={30}
                            height={30}
                        />
                    </div>
                    
                    <DialogHeader className="space-y-3">
                        <DialogTitle className="font-normal text-sm absolute left-1/2 -top-7 -translate-x-1/2 whitespace-nowrap">
                            Search for Rooms or DMs
                        </DialogTitle>
                        <Input
                            ref={searchInputRef}
                            placeholder="Enter your destination:"
                            className="w-full text-lg"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            autoFocus
                        />
                    </DialogHeader>
                    
                    <ScrollArea className="flex-1 overflow-y-auto w-full my-2 h-72 px-0 scroll-smooth" ref={scrollAreaRef}>
                        <SectionList 
                            sections={filteredSections}
                            renderItem={(item) => {
                                return (
                                    <SearchResult 
                                        ref={(el) => {
                                            if (el) itemRefs.current.set(item.id, el);
                                        }}
                                        type={item.type} 
                                        selected={focusedItemId === item.id}
                                        onFocus={() => handleItemFocus(item.id)}
                                    />
                                );
                            }}
                            emptyMessage="No results found. Try searching for users, groups, or channels."
                            isLoading={isLoading}
                            error={error}
                        />
                        <ScrollBar asChild />
                    </ScrollArea>
                    
                    <div className="text-foreground pt-2 border-t">
                        <span className="font-semibold text-green-500 text-sm">Tip:</span> <span className="text-xs">Start searching with <span className="pr-1"/> <MiniToolTip child={<span className="px-1 rounded cursor-help font-semibold dark:bg-black/50 bg-black/10">@</span>} tip="Users" /> <MiniToolTip child={<span className="px-1 rounded cursor-help font-semibold dark:bg-black/50 bg-black/10">#</span>} tip="Channel" /> <MiniToolTip child={<span className="px-1 rounded cursor-help font-semibold dark:bg-black/50 bg-black/10">*</span>} tip="Groups" /><span className="pl-1"/> for faster results</span>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default FindConversation;

const MiniToolTip = ({
    child,
    tip,
}: {
    child: React.ReactNode   
    tip: string
}) =>{
    return (
        <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
                {child}
            </TooltipTrigger>
            <TooltipContent>
                <p>{tip}</p>
            </TooltipContent>
        </Tooltip>
    )
}