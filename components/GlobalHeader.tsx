"use client"
import { useAuth } from './Providers/AuthProvider';
import { Button } from './ui/button';
import React, { useRef } from 'react';
import ThemeSwitch from './ui/theme-switch';
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
import UserClump from './modular/UserClump';
import UserClumpSkeleton from './modular/UserClumpSkeleton';

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
                                <DropdownMenuTrigger>
                                    <UserClumpSkeleton 
                                        // name="Hello Kitty"
                                        // username="@hello-kitty"
                                        // avatar="https://chirps-chat.sirv.com/leopard.png"
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
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
