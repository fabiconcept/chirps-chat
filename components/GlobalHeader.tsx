"use client"
import { useAuth } from './Providers/AuthProvider';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ThemeSwitch from './ui/theme-switch';
import { useTheme } from "next-themes";
import { motion } from 'framer-motion';
import KeyboardShortcutsModal from './modals/KeyboardShortcutsModal';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Search from './header components/Search';
import StreakTracker from './header components/StreakTracker';
import UserClump from './modular/UserClump';
import { BellDot, Fullscreen, Wallet, User, Settings, Zap, HelpCircle, LogOut } from 'lucide-react';
import { cn, removeSearchParam, updateSearchParam } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { MaximizeScreenIcon, MinimizeScreenIcon } from '@hugeicons/core-free-icons';
import { useKeyBoardShortCut } from './Providers/KeyBoardShortCutProvider';
import useShortcuts, { KeyboardKey } from '@useverse/useshortcuts';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner';
import { useWindowSize } from 'react-use';
import ProtectedImage from './Feed/TextPost/ProtectedImage';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LocalStorageKeys, SearchParamKeys } from '@/lib/enums';

const noHeaderPages = [
    "/activities",
]

export default function GlobalHeader() {
    const { isAuthenticated, logout, isMobile } = useAuth();
    const headerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isFullscreen = useMemo(()=> searchParams.get(SearchParamKeys.FULLSCREEN), [searchParams]);
    const { allowedShortcuts, allowShortcuts, disallowShortcuts } = useKeyBoardShortCut();
    const isHidden = (pathname === "/chat" || pathname.includes("/chat/"));
    const [fullscreen, setFullscreen] = useLocalStorage(LocalStorageKeys.FULLSCREEN, "null");
    const [showShortcutsModal, setShowShortcutsModal] = useState(false);

    const { width: windowWidth } = useWindowSize();

    useEffect(()=>{
        if (fullscreen === "null") return;
        if (fullscreen === "false") return;

        updateSearchParam(SearchParamKeys.FULLSCREEN, "true");
    }, [fullscreen]);
 
    useEffect(()=>{
        allowShortcuts(["alt+F", "alt+W", "commandESC", "commandK"]);

        if (isFullscreen && isHidden) {
            setFullscreen("true");
            toast.custom(()=>(
                <div className='px-6 py-6 text-lg font-medium bg-background/25 backdrop-blur-sm rounded-md flex items-center gap-2 border border-input shadow-lg shadow-black/5'>
                    <Fullscreen className='h-5 w-5' />
                    <p>In Fullscreen Mode, ESC to exit</p>
                </div>
            ), { duration: 2000 })
        }
    
        return ()=> {
            disallowShortcuts(["alt+F", "alt+W", "commandK"]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFullscreen]);

    const handleFullScreenToggle = useCallback(() => {
        if (!isHidden) return;
        if (!isFullscreen) {
            updateSearchParam(SearchParamKeys.FULLSCREEN, "true");
            return;
        }
        removeSearchParam(SearchParamKeys.FULLSCREEN);
        setFullscreen("false");
    }, [isFullscreen, isHidden, setFullscreen]);

    useShortcuts({
        shortcuts: [
            { key: KeyboardKey.KeyF, altKey: true, enabled: allowedShortcuts.has("alt+F") },
            { key: KeyboardKey.KeyW, altKey: true, enabled: allowedShortcuts.has("alt+W") },
            { key: KeyboardKey.KeyK, metaKey: true, ctrlKey: true, enabled: allowedShortcuts.has("commandK") },
            { key: KeyboardKey.Escape, isSpecialKey: true,  enabled: allowedShortcuts.has("commandESC") },
        ],
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case KeyboardKey.KeyF:
                    if (!isHidden) return;
                    handleFullScreenToggle()
                    allowShortcuts(["commandESC"])
                    break;
                case KeyboardKey.KeyW:
                    const walletOpen = searchParams.get("wallet");
                    if (walletOpen) {
                        removeSearchParam("wallet");
                    } else {
                        updateSearchParam("wallet", "open");
                    }
                    break;
                case KeyboardKey.KeyK:
                    setShowShortcutsModal(true);
                    break;
                case KeyboardKey.Escape:
                    if (!isHidden) return;
                    removeSearchParam(SearchParamKeys.FULLSCREEN);
                    setFullscreen("false");
                    disallowShortcuts(["commandESC"]);
                    break;
            }
        }
    }, [allowedShortcuts, searchParams, isHidden, showShortcutsModal]);

    useEffect(()=>{
        if (!isHidden) return;
        if (!isMobile && isFullscreen === "auto") {
            removeSearchParam(SearchParamKeys.FULLSCREEN);
            return;
        };
        if (!isMobile) return;
        if (isFullscreen) return;

        updateSearchParam(SearchParamKeys.FULLSCREEN, "auto");
    }, [isMobile, isHidden, isFullscreen])

    const shouldShowHeader = !noHeaderPages.includes(pathname);

    if (!shouldShowHeader) return null;

    return (
        <motion.header 
            ref={headerRef}
            initial={false}
            animate={{
                y: (isHidden && isFullscreen) ? (isMobile ? (windowWidth <= 638 ? -73 : -110) : -99) : 0,
                marginTop: (isHidden && isFullscreen) ? (isMobile ? (windowWidth <= 638 ? -73 : -110) : -99) : 0,
                opacity: (isHidden && isFullscreen) ? 0 : 1,
            }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
            className={cn(
                'border-b border-input/50 shadow-xl shadow-black/3 z-50',
                isHidden ? "" : "top-0 sticky",
                (isHidden && isFullscreen) && "pointer-events-none"
            )}
        >
            <div  
                className='sm:p-4 px-4 md:px-10 flex items-center justify-between overflow-hidden relative gap-2 md:gap-10'
            >
                <div className='absolute inset-0 scale-105 -mt-5 filter-ios'></div>
                <div className='flex items-center z-10 sm:gap-5 gap-3 flex-1'>
                    <div className="flex items-center gap-2 max-md:py-5">
                        <ProtectedImage
                            src={theme === 'dark' ? "/chirps-chat-logo-white.svg" : "/chirps-chat-logo.svg"}
                            alt="Chirps Logo"
                            className='h-9 w-9 z-20 -mt-1 object-contain'
                            width={36}
                            height={36}
                            priority
                        />
                        <h1 className='text-3xl ave text-foreground max-sm:hidden -translate-x-2.5 z-10'>hirps</h1>
                    </div>
                    {isAuthenticated && <Search />}
                </div>
                <div className='flex items-center z-10 gap-1.5 md:gap-2 justify-end overflow-hidden'>
                    {isAuthenticated && (
                        <>
                            {/* Streak Tracker */}
                            <StreakTracker currentStreak={42} isMobile={isMobile} />
                            
                            {/* Wallet Button */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size={isMobile ? "sm" : "default"}
                                        className="gap-1.5 md:gap-2 bg-linear-to-r from-[#D4AF37]/10 to-transparent border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden relative"
                                    >
                                        {isMobile ? (
                                            <Link href="/wallet" className="absolute inset-0 flex items-center justify-center gap-1.5 px-2">
                                                <Wallet className="h-4 w-4 text-[#D4AF37]" />
                                                <span className="font-semibold text-[#D4AF37] ave text-sm">Wallet</span>
                                            </Link>
                                        ) : (
                                            <div onClick={() => updateSearchParam("wallet", "open")} className="flex items-center gap-2">
                                                <Wallet className="h-4 w-4 text-[#D4AF37]" />
                                                <span className="font-semibold text-[#D4AF37] ave">12,847.50</span>
                                                <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 px-1.5 text-[10px]">
                                                    CHT
                                                </Badge>
                                            </div>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="flex items-center gap-2">
                                        <span>Open Wallet</span>
                                        {!isMobile && <kbd className="px-1.5 py-0.5 text-xs font-semibold border rounded">Alt+W</kbd>}
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </>
                    )}
                    {isHidden && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button 
                                    onClick={handleFullScreenToggle} 
                                    size={"icon-sm"} 
                                    variant={"ghost"}
                                >
                                    <HugeiconsIcon
                                        icon={isFullscreen ? MaximizeScreenIcon : MinimizeScreenIcon}
                                    />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                            </TooltipContent>
                        </Tooltip>
                    )}
                    <div
                        className="lg:flex hidden items-center gap-2"
                    >
                        <ThemeSwitch className='border' />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="relative">
                                <Button
                                    size={"icon-sm"}
                                    variant={"outline"}
                                    className={cn(
                                        'overflow-hidden relative',
                                        (pathname === "/chat" || pathname.includes("/chat/")) ? "" : "lg:hidden"
                                    )}
                                >
                                    <div onClick={() => updateSearchParam(SearchParamKeys.ACTIVITYBAR, "open")} className='max-md:hidden block absolute inset-0 h-full w-full' />
                                    <Link href={"/activities"} className='max-md:block hidden absolute inset-0 h-full w-full' />
                                    <BellDot className="h-4 w-4" />
                                </Button>
                                {/* Notification count indicator */}
                                {20 > 0 && (
                                    <span className='absolute -top-1 -right-1 bg-destructive text-white dark:text-gray-100 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg'>
                                        {20 > 10 ? '10+' : 20}
                                    </span>
                                )}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Notifications{20 > 0 ? ` (${20})` : ''}</p>
                        </TooltipContent>
                    </Tooltip>
                    <React.Fragment>
                        {!isAuthenticated && (
                            <Link href={'/login'}>
                                <Button>Login</Button>
                            </Link>
                        )}
                        {isAuthenticated && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
                                        <UserClump 
                                            name="Hello Kitty"
                                            username="@hello-kitty"
                                            size={isMobile ? "xs" : undefined}
                                            avatar="https://chirps-chat.sirv.com/premium/rasta.png"
                                        />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 rounded-t-3xl bg-background/75 backdrop-blur-sm px-0" align="end" sideOffset={8}>
                                    {/* User Info Header */}
                                    <div className="px-2 py-3 border-b border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-border">
                                                <img 
                                                    src="https://chirps-chat.sirv.com/premium/rasta.png" 
                                                    alt="Hello Kitty"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm truncate">Hello Kitty</p>
                                                <p className="text-xs text-muted-foreground truncate">@hello-kitty</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="px-2 py-2 border-b border-border bg-muted/30">
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <Link href="/leaderboard" className="hover:bg-background rounded p-1.5 transition-colors">
                                                <p className="text-lg font-bold">42</p>
                                                <p className="text-[10px] text-muted-foreground">Streak</p>
                                            </Link>
                                            <Link href="/wallet" className="hover:bg-background rounded p-1.5 transition-colors">
                                                <p className="text-lg font-bold text-[#D4AF37]">12.8K</p>
                                                <p className="text-[10px] text-muted-foreground">Tokens</p>
                                            </Link>
                                            <div className="hover:bg-background rounded p-1.5 transition-colors cursor-pointer">
                                                <p className="text-lg font-bold">1.2K</p>
                                                <p className="text-[10px] text-muted-foreground">Followers</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className='lg:hidden'>
                                            <div className="mr-2 h-4 w-4" />
                                            <span>Appearance</span>
                                            <ThemeSwitch className='ml-auto' />
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => setShowShortcutsModal(true)}>
                                            <Zap className="mr-2 h-4 w-4" />
                                            <span>Keyboard Shortcuts</span>
                                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <HelpCircle className="mr-2 h-4 w-4" />
                                            <span>Help & Support</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </React.Fragment>
                </div>
            </div>

            {/* Keyboard Shortcuts Modal */}
            <KeyboardShortcutsModal 
                open={showShortcutsModal} 
                onOpenChange={setShowShortcutsModal}
            />
        </motion.header>
    )
}
