"use client"
import { useAuth } from './Providers/AuthProvider';
import { Button } from './ui/button';
import React, { useCallback, useEffect, useRef } from 'react';
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
import { BellDot, Fullscreen } from 'lucide-react';
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

const noHeaderPages = [
    "/activities",
]

export default function GlobalHeader() {
    const { isAuthenticated, logout, isMobile } = useAuth();
    const headerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const pathname = usePathname();
    const isFullscreen = useSearchParams().get("fullscreen");
    const { allowedShortcuts, allowShortcuts, disallowShortcuts } = useKeyBoardShortCut();
    const isHidden = (pathname === "/chat" || pathname.includes("/chat/"));

    const { width: windowWidth } = useWindowSize()


    useEffect(()=>{
        allowShortcuts(["alt+F", "commandESC"])

        if (isFullscreen) {
            toast.custom(()=>(
                <div className='px-6 py-6 text-lg font-medium bg-background/25 backdrop-blur-sm rounded-md flex items-center gap-2 border border-input shadow-lg shadow-black/5'>
                    <Fullscreen className='h-5 w-5' />
                    <p>In Fullscreen Mode, ESC to exit</p>
                </div>
            ), { duration: 2000 })
        }
    
        return ()=> {
            disallowShortcuts(["alt+F"]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFullscreen]);

    const handleFullScreenToggle = useCallback(() => {
        if (!isHidden) return;
        if (!isFullscreen) {
            updateSearchParam("fullscreen", "true");
            return;
        }
        removeSearchParam("fullscreen");
    }, [isFullscreen, isHidden]);

    useShortcuts({
        shortcuts: [
            { key: KeyboardKey.KeyF, altKey: true, enabled: allowedShortcuts.has("alt+F") },
            { key: KeyboardKey.Escape, isSpecialKey: true,  enabled: allowedShortcuts.has("commandESC") },
        ],
        onTrigger: (shortcut) => {
            if (!isHidden) return;
            switch (shortcut.key) {
                case KeyboardKey.KeyF:
                    handleFullScreenToggle()
                    allowShortcuts(["commandESC"])
                    break;
                case KeyboardKey.Escape:
                    removeSearchParam("fullscreen");
                    disallowShortcuts(["commandESC"]);
                    break;
            }
        }
    }, [allowedShortcuts]);

    useEffect(()=>{
        if (!isHidden) return;
        if (!isMobile && isFullscreen === "auto") {
            removeSearchParam("fullscreen");
            return;
        };
        if (!isMobile) return;
        if (isFullscreen) return;

        updateSearchParam("fullscreen", "auto");
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
                            <div onClick={() => updateSearchParam("activitybar", "open")} className='max-md:hidden block absolute inset-0 h-full w-full' />
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
