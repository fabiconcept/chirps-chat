"use client"
import { useAuth } from './Providers/AuthProvider';
import { Button } from './ui/button';
import React, { useRef, useState } from 'react';
import ThemeSwitch from './ui/theme-switch';
import { useTheme } from "next-themes";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
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
import { BellDot } from 'lucide-react';
import { updateSearchParam } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const noHeaderPages = [
    "/activities"
]

export default function GlobalHeader() {
    const { isAuthenticated, logout, login, isMobile } = useAuth();
    const headerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const pathname = usePathname();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    const shouldShowHeader = !noHeaderPages.includes(pathname);

    if (!shouldShowHeader) return null;

    return (
        <header ref={headerRef} className='top-0 sticky border-b border-input/50 shadow-xl shadow-black/3 z-50'>
            <div className='sm:p-4 px-4 md:px-10 flex items-center justify-between overflow-hidden relative gap-2 md:gap-10'>
                <div className='absolute inset-0 scale-105 -mt-5 filter-ios'></div>
                <div className='flex items-center z-10 sm:gap-5 gap-3 flex-1'>
                    <div className="flex items-center gap-2 py-5">
                        <Image
                            src={theme === 'dark' ? "/chirps-chat-logo-white.svg" : "/chirps-chat-logo.svg"}
                            alt="Chirps Logo"
                            className='h-9 w-9 z-20 -mt-1 object-contain'
                            width={36}
                            height={36}
                            priority
                        />
                        <h1 className='text-3xl ave text-foreground -translate-x-2.5 z-10'>hirps</h1>
                    </div>
                    {isAuthenticated && <Search expanded={isSearchExpanded} onMobileExpand={setIsSearchExpanded} />}
                </div>
                <motion.div 
                    animate={{ 
                        width: (isMobile && isSearchExpanded) ? 0 : 'auto',
                        flex: (isMobile && isSearchExpanded) ? 0 : 1, 
                        opacity: (isMobile && isSearchExpanded) ? 0 : 1
                    }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className='flex items-center z-10 gap-2 justify-end overflow-hidden'
                >

                    <div
                        className="lg:flex hidden items-center gap-2"
                    >
                        <ThemeSwitch className='border' />
                    </div>
                    <Button
                        size={"icon-sm"}
                        variant={"outline"}
                        className='lg:hidden overflow-hidden relative'
                    >
                        <div onClick={() => updateSearchParam("activitybar", "open")} className='max-md:hidden block absolute inset-0 h-full w-full' />
                        <Link href={"/activities"} className='max-md:block hidden absolute inset-0 h-full w-full' />
                        <BellDot />
                    </Button>
                    <React.Fragment>
                        {!isAuthenticated && (
                            <AnimatePresence>
                                {(!isMobile || !isSearchExpanded) && (
                                    <motion.div
                                        initial={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Button className='my-[0.315rem]' onClick={login}>Sign In</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                        {isAuthenticated && (
                            <AnimatePresence>
                                {(!isMobile || !isSearchExpanded) && (
                                    <motion.div
                                        initial={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.2 }}
                                    >
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
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </React.Fragment>
                </motion.div>
            </div>
        </header>
    )
}
