"use client";
import React, { useRef, useState, useMemo, useCallback, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import useShortcuts from '@useverse/useshortcuts';
import { useKeyBoardShortCut } from '../Providers/KeyBoardShortCutProvider';
import { useAuth } from '../Providers/AuthProvider';
import { SearchIcon, Hash, Users, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import ProtectedImage from '../Feed/TextPost/ProtectedImage';
import { Kbd, KbdGroup } from '../ui/kbd';

// Mock data - replace with actual data
const mockSearchResults = [
    { id: '1', type: 'post' as const, name: 'Amazing sunset photos', author: '@johndoe', content: 'Check out these beautiful sunset photos...' },
    { id: '2', type: 'hashtag' as const, name: 'photography', count: 1234 },
    { id: '3', type: 'room' as const, name: 'Photography Lovers', members: 567 },
    { id: '4', type: 'user' as const, name: 'John Doe', username: '@johndoe', avatar: 'https://chirps-chat.sirv.com/parrot.png' },
    { id: '5', type: 'post' as const, name: 'New camera gear review', author: '@techguru', content: 'Just got the new Sony A7...' },
    { id: '6', type: 'hashtag' as const, name: 'tech', count: 5678 },
    { id: '7', type: 'room' as const, name: 'Tech Enthusiasts', members: 890 },
    { id: '8', type: 'user' as const, name: 'Jane Smith', username: '@janesmith', avatar: 'https://chirps-chat.sirv.com/parrot.png' },
];

export default function Search() {
    const { allowedShortcuts, disallowShortcuts, allowShortcuts, notoriousShortcuts } = useKeyBoardShortCut();
    const { isMacOS } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [arrowPosition, setArrowPosition] = useState<number | null>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Detect search type from query
    const searchType = useMemo(() => {
        if (searchQuery.startsWith('@')) return 'user';
        if (searchQuery.startsWith('#')) return 'hashtag';
        if (searchQuery.startsWith('*')) return 'room';
        if (searchQuery.startsWith('~')) return 'post';
        return null;
    }, [searchQuery]);

    // Filter and organize results into sections
    const filteredSections = useMemo(() => {
        const query = searchQuery.replace(/^[@#*~]/, '').toLowerCase().trim();
        
        const filtered = mockSearchResults.filter(item => {
            if (searchType && item.type !== searchType) return false;
            if (query && !item.name.toLowerCase().includes(query)) return false;
            return true;
        });

        const posts = filtered.filter(item => item.type === 'post');
        const hashtags = filtered.filter(item => item.type === 'hashtag');
        const rooms = filtered.filter(item => item.type === 'room');
        const users = filtered.filter(item => item.type === 'user');

        const sections: Array<{ title: string; items: typeof mockSearchResults }> = [];
        
        if (posts.length > 0) {
            sections.push({ title: searchType === 'post' ? 'Searching Posts' : '~Posts', items: posts });
        }
        if (hashtags.length > 0) {
            sections.push({ title: searchType === 'hashtag' ? 'Searching Hashtags' : '#Hashtags', items: hashtags });
        }
        if (rooms.length > 0) {
            sections.push({ title: searchType === 'room' ? 'Searching Rooms' : '*Rooms', items: rooms });
        }
        if (users.length > 0) {
            sections.push({ title: searchType === 'user' ? 'Searching People' : '@People', items: users });
        }

        return sections;
    }, [searchQuery, searchType]);

    const allItems = useMemo(() => {
        return filteredSections.flatMap(section => section.items);
    }, [filteredSections]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (focusedItemId) {
            setFocusedItemId(null);
        }
    }, [focusedItemId]);

    const navigateDown = useCallback(() => {
        if (allItems.length === 0) return;
        const currentIndex = focusedItemId ? allItems.findIndex(item => item.id === focusedItemId) : -1;
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

    const navigateUp = useCallback(() => {
        if (allItems.length === 0) return;
        const currentIndex = focusedItemId ? allItems.findIndex(item => item.id === focusedItemId) : -1;
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

    const handleSelect = useCallback(() => {
        if (!focusedItemId) return;
        const selectedItem = allItems.find(item => item.id === focusedItemId);
        if (selectedItem) {
            console.log('Selected:', selectedItem);
        }
    }, [allItems, focusedItemId]);

    useShortcuts({
        shortcuts: [
            { key: 'ArrowDown', isSpecialKey: true, enabled: allowedShortcuts.has('arrowDown') },
            { key: 'ArrowUp', isSpecialKey: true, enabled: allowedShortcuts.has('arrowUp') },
            { key: 'Enter', isSpecialKey: true, enabled: allowedShortcuts.has('enter') },
            { key: "Slash", isSpecialKey: true, enabled: allowedShortcuts.has("search") },
            { key: 'K', metaKey: isMacOS, ctrlKey: !isMacOS, enabled: allowedShortcuts.has("commandK") },
            { key: 'F', metaKey: isMacOS, ctrlKey: !isMacOS, enabled: allowedShortcuts.has("commandF") },
        ],
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case 'ArrowDown':
                    navigateDown();
                    break;
                case 'ArrowUp':
                    navigateUp();
                    break;
                case 'Enter':
                    handleSelect();
                    break;
                case "Slash":
                    triggerRef.current?.click();
                    break;
                case 'K':
                    triggerRef.current?.click();
                    break;
                case 'F':
                    triggerRef.current?.click();
                    break;
            }
        }
    }, [navigateDown, navigateUp, handleSelect, allowedShortcuts]);

    useLayoutEffect(() => {
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
        const relativeTop = itemRect.top - containerRect.top;
        const containerHeight = containerRect.height;
        const itemHeight = itemRect.height;
        
        if (relativeTop < -itemHeight || relativeTop > containerHeight) {
            setArrowPosition(null);
            return;
        }
        
        const top = relativeTop + (itemHeight / 2);
        setArrowPosition(top);
    }, [focusedItemId, allItems, isSearchFocused]);

    const handleItemFocus = useCallback((itemId: string) => {
        setFocusedItemId(itemId);
    }, []);

    return (
        <Dialog onOpenChange={(open: boolean) => {
            if (open) {
                disallowShortcuts([...Array.from(notoriousShortcuts), 'alt+F', 'commandESC']);
                allowShortcuts(['arrowDown', 'arrowUp', 'enter']);
            } else {
                allowShortcuts([...Array.from(notoriousShortcuts), 'alt+F']);
                disallowShortcuts(['arrowDown', 'arrowUp', 'enter']);
                setTimeout(() => {
                    allowShortcuts(['commandESC']);
                }, 100);
                setFocusedItemId(null);
                setSearchQuery('');
            }
        }}>
            <DialogTrigger ref={triggerRef} asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "flex items-center gap-2 relative rounded-3xl bg-background/20",
                        "hover:border-ring hover:ring-ring/50 hover:ring-[3px]",
                        "shadow-xs transition-[color,box-shadow] border border-input dark:bg-input/30",
                        "md:w-full w-12 max-w-xs h-12 px-5"
                    )}
                >
                    <SearchIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground md:block hidden">Search...</span>
                    <span className="ml-auto text-xs text-muted-foreground md:block hidden">
                        {isMacOS ? <KbdGroup>
                            <Kbd className="border border-input/50">⌘</Kbd>
                            <Kbd className="border border-input/50">K</Kbd>
                        </KbdGroup> : <KbdGroup>
                            <Kbd className="border border-input/50">Ctrl</Kbd>
                            <Kbd className="border border-input/50">K</Kbd>
                        </KbdGroup>}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="p-3">
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
                        Search Posts, Hashtags, Rooms & People
                    </DialogTitle>
                    <Input
                        ref={inputRef}
                        placeholder="What are you looking for?"
                        className="w-full md:text-lg"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => {
                            setIsSearchFocused(true);
                            setFocusedItemId(null);
                        }}
                        onBlur={() => setIsSearchFocused(false)}
                        autoFocus
                    />
                </DialogHeader>
                
                <ScrollArea className="flex-1 overflow-y-auto w-full my-2 h-72 px-0 scroll-smooth" ref={scrollAreaRef}>
                    {filteredSections.length > 0 ? (
                        filteredSections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-4">
                                <h3 className="text-xs font-semibold text-muted-foreground px-2 mb-2">
                                    {section.title}
                                </h3>
                                <div className="space-y-1">
                                    {section.items.map((item) => (
                                        <SearchResultItem
                                            key={item.id}
                                            item={item}
                                            selected={focusedItemId === item.id}
                                            onFocus={() => handleItemFocus(item.id)}
                                            ref={(el) => {
                                                if (el) itemRefs.current.set(item.id, el);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            No results found. Try searching for posts, hashtags, rooms, or people.
                        </div>
                    )}
                    <ScrollBar asChild />
                </ScrollArea>
                
                <div className="text-foreground pt-2 border-t">
                    <span className="font-semibold text-green-500 text-sm">Tip:</span>{' '}
                    <span className="text-xs">
                        Start searching with{' '}
                        <MiniToolTip child={<span className="px-1 rounded cursor-help font-semibold dark:bg-black/50 bg-black/10">~</span>} tip="Posts" />{' '}
                        <MiniToolTip child={<span className="px-1 rounded cursor-help font-semibold dark:bg-black/50 bg-black/10">#</span>} tip="Hashtags" />{' '}
                        <MiniToolTip child={<span className="px-1 rounded cursor-help font-semibold dark:bg-black/50 bg-black/10">*</span>} tip="Rooms" />{' '}
                        <MiniToolTip child={<span className="px-1 rounded cursor-help font-semibold dark:bg-black/50 bg-black/10">@</span>} tip="People" />{' '}
                        for faster results
                    </span>
                </div>
            </DialogContent>
        </Dialog>
    );
}

const SearchResultItem = React.forwardRef<HTMLButtonElement, {
    item: typeof mockSearchResults[0];
    selected: boolean;
    onFocus: () => void;
}>(({ item, selected, onFocus }, ref) => {
    const getIcon = () => {
        switch (item.type) {
            case 'post': return null;
            case 'hashtag': return null;
            case 'room': return null;
            case 'user': return <ProtectedImage src={item.avatar || ''} alt={item.name} width={32} height={32} className="rounded-full" />;
        }
    };

    const getContent = () => {
        switch (item.type) {
            case 'post':
                return (
                    <>
                        <div className="font-medium truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{item.author}</div>
                    </>
                );
            case 'hashtag':
                return (
                    <>
                        <div className="font-medium">#{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.count} posts</div>
                    </>
                );
            case 'room':
                return (
                    <>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.members} members</div>
                    </>
                );
            case 'user':
                return (
                    <>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.username}</div>
                    </>
                );
        }
    };

    return (
        <button
            ref={ref}
            onFocus={onFocus}
            className={cn(
                "w-full flex items-center gap-3 px-2 py-2 rounded-md transition-colors",
                "hover:bg-foreground/5 focus:bg-foreground/10 focus:outline-none",
                selected && "bg-foreground/10"
            )}
        >
            <div className="shrink-0">{getIcon()}</div>
            <div className="flex-1 text-left min-w-0">{getContent()}</div>
        </button>
    );
});

SearchResultItem.displayName = 'SearchResultItem';

const MiniToolTip = ({ child, tip }: { child: React.ReactNode; tip: string }) => {
    return (
        <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
                {child}
            </TooltipTrigger>
            <TooltipContent>
                <p>{tip}</p>
            </TooltipContent>
        </Tooltip>
    );
};

