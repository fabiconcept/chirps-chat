"use client"
import { useAuth } from './Providers/AuthProvider';
import { Button } from './ui/button';
import React, { useRef } from 'react';
import ThemeSwitch from './ui/theme-switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
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

export default function GlobalHeader() {
    const { isAuthenticated, logout, login } = useAuth();
    const headerRef = useRef<HTMLDivElement>(null);

    return (
        <header ref={headerRef} className='top-0 sticky border-b border-input/50 shadow-xl shadow-black/[0.03] z-50'>
            <div className='p-4 px-10 flex items-center justify-between overflow-hidden relative gap-10'>
                <div className='absolute inset-0 scale-105 -mt-5 filter-ios'></div>
                <div className='flex items-center z-10 gap-5 flex-1'>
                    {isAuthenticated && <Search />}
                </div>
                <div className='flex items-center z-10 gap-2 flex-1 justify-end'>
                    <ThemeSwitch className='border' />
                    <React.Fragment>
                        {!isAuthenticated && <Button className='my-[0.315rem]' onClick={login}>Sign In</Button>}
                        {isAuthenticated &&
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className='p-1 min-w-44 max-w-64 pr-5 border rounded-full flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 active:opacity-90 active:scale-95'
                                >
                                    <Avatar className='h-12 w-12 p-1 bg-background border transition-colors duration-300'>
                                        <AvatarImage src="https://chirps-chat.sirv.com/leopard.png" />
                                        <AvatarFallback>HK</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col overflow-hidden'>
                                        <span className='text-sm font-semibold truncate'>Hello Kitty!!</span>
                                        <span className='text-xs opacity-75 truncate -ml-2'>@hello-kitty</span>
                                    </div>
                                </DropdownMenuTrigger><DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            Profile
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Billing
                                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
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
                        }
                    </React.Fragment>
                </div>
            </div>
        </header>
    )
}
