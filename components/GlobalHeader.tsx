"use client"
import { useAuth } from './Providers/AuthProvider';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ThemeSwitch from './ui/theme-switch';
import { useTheme } from "next-themes";
import { motion } from 'framer-motion';
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
import UserClump from './modular/UserClump';
import { BellDot, Fullscreen, Wallet } from 'lucide-react';
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

    const { width: windowWidth } = useWindowSize();

    useEffect(()=>{
        if (fullscreen === "null") return;
        if (fullscreen === "false") return;

        updateSearchParam(SearchParamKeys.FULLSCREEN, "true");
    }, [fullscreen]);
 
    useEffect(()=>{
        allowShortcuts(["alt+F", "alt+W", "commandESC"]);

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
            disallowShortcuts(["alt+F", "alt+W"]);
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
                case KeyboardKey.Escape:
                    if (!isHidden) return;
                    removeSearchParam(SearchParamKeys.FULLSCREEN);
                    setFullscreen("false");
                    disallowShortcuts(["commandESC"]);
                    break;
            }
        }
    }, [allowedShortcuts, searchParams, isHidden]);

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
                <div className='flex items-center z-10 gap-2 justify-end overflow-hidden'>
                    {isAuthenticated && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size={isMobile ? "sm" : "default"}
                                    className="gap-2 bg-linear-to-r from-[#D4AF37]/10 to-transparent border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden relative"
                                >
                                    {isMobile ? (
                                        <Link href="/wallet" className="absolute inset-0 flex items-center justify-center gap-2 px-3">
                                            <Wallet className="h-4 w-4 text-[#D4AF37]" />
                                            <span className="font-semibold text-[#D4AF37] ave">Wallet</span>
                                            <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 px-1.5">
                                                CHT
                                            </Badge>
                                        </Link>
                                    ) : (
                                        <div onClick={() => updateSearchParam("wallet", "open")} className="flex items-center gap-2">
                                            <Wallet className="h-4 w-4 text-[#D4AF37]" />
                                            <span className="font-semibold text-[#D4AF37] ave">12,847.50</span>
                                            <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 px-1.5">
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
                            <BellDot />
                        </Button>
                        {/* Notification count indicator for small screens */}
                        <span className='md:hidden absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] text-white dark:text-gray-100 font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1'>
                            {20 > 10 ? '10+' : 20}
                        </span>
                    </div>
                    <React.Fragment>
                        {!isAuthenticated && (
                            <Link href={'/login'}>
                                <Button>Login</Button>
                            </Link>
                        )}
                        {isAuthenticated && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <UserClump 
                                        name="Hello Kitty"
                                        username="@hello-kitty"
                                        size={isMobile ? "xs" : undefined}
                                        avatar="https://chirps-chat.sirv.com/premium/rasta.png"
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            Profile
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className='lg:hidden'>
                                            Appearance
                                            <DropdownMenuCheckboxItem>
                                                <ThemeSwitch className='translate-x-5' />
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Settings
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Keyboard shortcuts
                                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem>Email</DropdownMenuItem>
                                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>More...</DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                        <DropdownMenuItem>
                                            New Team
                                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                                    <DropdownMenuItem>Support</DropdownMenuItem>
                                    <DropdownMenuItem disabled>API</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} variant='destructive'>
                                        Log out
                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </React.Fragment>
                </div>
            </div>
        </motion.header>
    )
}
