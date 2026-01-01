"use client";
import React, { useRef, useState, useMemo, useCallback, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import useShortcuts, { KeyboardKey } from '@useverse/useshortcuts';
import { useKeyBoardShortCut } from '../Providers/KeyBoardShortCutProvider';
import { useAuth } from '../Providers/AuthProvider';
import { SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import ProtectedImage from '../Feed/TextPost/ProtectedImage';
import { Kbd, KbdGroup } from '../ui/kbd';
import { motion } from 'framer-motion';

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
                // Scroll into view smoothly
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
                // Scroll into view smoothly
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
            { key: KeyboardKey.ArrowDown, isSpecialKey: true, enabled: allowedShortcuts.has('arrowDown') },
            { key: KeyboardKey.ArrowUp, isSpecialKey: true, enabled: allowedShortcuts.has('arrowUp') },
            { key: KeyboardKey.Enter, isSpecialKey: true, enabled: allowedShortcuts.has('enter') },
            { key: KeyboardKey.Slash, isSpecialKey: true, enabled: allowedShortcuts.has("search") },
            { key: KeyboardKey.KeyF, metaKey: isMacOS, ctrlKey: !isMacOS, enabled: allowedShortcuts.has("commandF") },
        ],
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case KeyboardKey.ArrowDown:
                    navigateDown();
                    break;
                case KeyboardKey.ArrowUp:
                    navigateUp();
                    break;
                case KeyboardKey.Enter:
                    handleSelect();
                    break;
                case KeyboardKey.Slash:
                    triggerRef.current?.click();
                    break;
                case KeyboardKey.KeyF:
                    triggerRef.current?.click();
                    break;
            }
        }
    }, [navigateDown, navigateUp, handleSelect, allowedShortcuts, isMacOS]);

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
        const scrollContainer = scrollAreaRef.current;
        
        if (!element || !scrollContainer) {
            setArrowPosition(null);
            return;
        }
        
        // Get bounding rectangles
        const itemRect = element.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        
        // Calculate relative position within the scroll container
        const relativeTop = itemRect.top - containerRect.top;
        const containerHeight = containerRect.height;
        const itemHeight = itemRect.height;
        
        // Hide arrows if item is out of visible area
        if (relativeTop < -itemHeight || relativeTop > containerHeight) {
            setArrowPosition(null);
            return;
        }
        
        // Calculate arrow position
        // Header height (~110px) + relativeTop + half of item height for centering
        const headerHeight = 110;
        const top = headerHeight + relativeTop + (itemHeight / 2);
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
                        "flex items-center gap-2 relative md:rounded-2xl rounded-full",
                        "bg-linear-to-r from-background/40 via-background/60 to-background/40",
                        "hover:from-background/60 hover:via-background/80 hover:to-background/60",
                        "hover:border-primary/30 hover:ring-primary/10 hover:ring-2",
                        "shadow-sm hover:shadow-md transition-all duration-300",
                        "border border-input/60 dark:bg-input/20 backdrop-blur-sm",
                        "md:w-full w-10 max-w-xs md:h-11 h-10 max-md:py-2 px-4"
                    )}
                >
                    <SearchIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground md:block hidden font-normal">Search...</span>
                    <span className="ml-auto text-xs text-muted-foreground md:flex hidden items-center gap-0.5">
                        {isMacOS ? <KbdGroup>
                            <Kbd className="border border-input/50 bg-background/50">⌘</Kbd>
                            <Kbd className="border border-input/50 bg-background/50">F</Kbd>
                        </KbdGroup> : <KbdGroup>
                            <Kbd className="border border-input/50 bg-background/50 text-[10px]">Ctrl</Kbd>
                            <Kbd className="border border-input/50 bg-background/50">F</Kbd>
                        </KbdGroup>}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="p-0 gap-0 max-w-2xl rounded-3xl">
                {/* Keep original CSS-animated arrows */}
                <div 
                    className="absolute -left-10 animate-[bounce-left_1.5s_ease-in-out_infinite] transition-all duration-300 ease-out z-50"
                    style={{
                        top: arrowPosition !== null ? `${arrowPosition}px` : '120px',
                        opacity: arrowPosition !== null ? 1 : 0
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
                    className="absolute -right-10 animate-[bounce-right_1.5s_ease-in-out_infinite] transition-all duration-300 ease-out z-50"
                    style={{
                        top: arrowPosition !== null ? `${arrowPosition}px` : '120px',
                        opacity: arrowPosition !== null ? 1 : 0
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
                
                {/* Enhanced header */}
                <div className="relative px-4 pt-4 pb-3 bg-linear-to-b from-primary/5 via-background/50 to-background border-b border-border/50">
                    <DialogHeader className="space-y-3">
                        <DialogTitle className="font-medium text-sm text-center text-muted-foreground">
                            Search Posts, Hashtags, Rooms & People
                        </DialogTitle>
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                            <Input
                                ref={inputRef}
                                placeholder="What are you looking for?"
                                className="w-full md:text-base text-sm pl-10 h-11 bg-background/50 border-input/60 focus-visible:ring-primary/20"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => {
                                    setIsSearchFocused(true);
                                    setFocusedItemId(null);
                                }}
                                onBlur={() => setIsSearchFocused(false)}
                                autoFocus
                            />
                        </div>
                    </DialogHeader>
                </div>
                
                <ScrollArea className="flex-1 overflow-y-auto w-full h-80 px-4 py-3 scroll-smooth" ref={scrollAreaRef}>
                    {filteredSections.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {filteredSections.map((section, sectionIndex) => (
                                <motion.div
                                    key={sectionIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: sectionIndex * 0.05 }}
                                    className="mb-5"
                                >
                                    <h3 className="text-xs font-semibold text-muted-foreground px-2 mb-2.5 uppercase tracking-wider">
                                        {section.title}
                                    </h3>
                                    <div className="space-y-0.5 text-sm">
                                        {section.items.map((item, itemIndex) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: (sectionIndex * 0.05) + (itemIndex * 0.02) }}
                                            >
                                                <SearchResultItem
                                                    item={item}
                                                    selected={focusedItemId === item.id}
                                                    onFocus={() => handleItemFocus(item.id)}
                                                    ref={(el) => {
                                                        if (el) itemRefs.current.set(item.id, el);
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center text-muted-foreground py-12"
                        >
                            <SearchIcon className="w-12 h-12 mb-3 opacity-20" />
                            <p className="font-medium mb-1">No results found</p>
                            <p className="text-xs">Try searching for posts, hashtags, rooms, or people</p>
                        </motion.div>
                    )}
                    <ScrollBar asChild />
                </ScrollArea>
                
                {/* Enhanced footer with tips */}
                <div className="px-4 py-3 border-t border-border/50 bg-linear-to-b from-background to-primary/5">
                    <div className="flex items-start gap-2">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm shrink-0">💡 Tip:</span>
                        <span className="text-xs text-muted-foreground leading-relaxed">
                            Start searching with{' '}
                            <MiniToolTip child={<span className="px-1.5 py-0.5 rounded-md cursor-help font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">~</span>} tip="Posts" />{' '}
                            <MiniToolTip child={<span className="px-1.5 py-0.5 rounded-md cursor-help font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">#</span>} tip="Hashtags" />{' '}
                            <MiniToolTip child={<span className="px-1.5 py-0.5 rounded-md cursor-help font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">*</span>} tip="Rooms" />{' '}
                            <MiniToolTip child={<span className="px-1.5 py-0.5 rounded-md cursor-help font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">@</span>} tip="People" />{' '}
                            for faster results
                        </span>
                    </div>
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
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                "hover:bg-primary/5 hover:border-primary/20 border border-transparent",
                "focus:bg-primary/10 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10",
                "group",
                selected && "bg-primary/10 border-primary/30 ring-2 ring-primary/10"
            )}
        >
            <div className="shrink-0">{getIcon()}</div>
            <div className="flex-1 text-left min-w-0">{getContent()}</div>
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                    opacity: selected ? 1 : 0,
                    x: selected ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </motion.div>
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

