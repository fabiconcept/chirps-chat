"use client"
import { useTheme } from "next-themes";
import Image from "next/image";
import { DashboardIcon, DashboardIconHandle } from "../DashboardIcon";
import { ShoppingCartIcon, ShoppingCartIconHandle } from "../ShoppingCartIcon";
import { UserStarIcon } from "../UserStarIcon";
import { SendIcon, SendIconHandle } from "../SendIcon";
import { useMemo, useRef } from "react";
import { UserStarHandle } from "../UserStarIcon";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HandCoinsIcon } from "../HandCoinsIcon";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import useShortcuts from '@useverse/useshortcuts';
import { detectOS } from '@/lib/utils';
import { Kbd, KbdGroup } from "../ui/kbd";


export default function SideBar() {
    const { theme } = useTheme();
    const pathname = usePathname();
    const isMacOS = useMemo(() => detectOS() === 'macos', []);

    const feedPath = "/";
    const leaderboardPath = "/leaderboard";
    const marketplacePath = "/marketplace";
    const suggestionsPath = "/suggestions";
    const chatPath = "/chat";

    const isFeed = pathname === feedPath;
    const isLeaderboard = pathname === leaderboardPath;
    const isMarketplace = pathname === marketplacePath;
    const isSuggestions = pathname === suggestionsPath;
    const isChat = pathname === chatPath;

    const feedRef = useRef<DashboardIconHandle>(null);
    const leaderboardRef = useRef<SendIconHandle>(null);
    const marketplaceRef = useRef<ShoppingCartIconHandle>(null);
    const suggestionsRef = useRef<UserStarHandle>(null);
    const chatRef = useRef<SendIconHandle>(null);

    const handleMouseEnter = (ref: React.RefObject<DashboardIconHandle | SendIconHandle | ShoppingCartIconHandle | UserStarHandle | null>) => {
        if (!ref.current) return;
        ref.current.startAnimation();
    };

    const handleMouseLeave = (ref: React.RefObject<DashboardIconHandle | SendIconHandle | ShoppingCartIconHandle | UserStarHandle | null>) => {
        if (!ref.current) return;
        ref.current.stopAnimation();
    };

    const navigateToPath = (path: string) => {
        const createLink = document.createElement("a");
        createLink.href = path;
        createLink.click();
    };

    useShortcuts({
        shortcuts: [
            { key: 'Digit1', metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true },
            { key: 'Digit2', metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true },
            { key: 'Digit3', metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true },
            { key: 'Digit4', metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true },
            { key: 'Digit5', metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true },
        ],
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case "Digit1":
                    console.log("1");
                    navigateToPath(feedPath);
                    break;
                case "Digit2":
                    navigateToPath(chatPath);
                    break;
                case "Digit3":
                    navigateToPath(marketplacePath);
                    break;
                case "Digit4":
                    navigateToPath(leaderboardPath);
                    break;
                case "Digit5":
                    navigateToPath(suggestionsPath);
                    break;
            }
        }
    });

    return (
        <div className="w-40 sticky top-0 overflow-hidden h-screen flex flex-col items-center">
            {/* Logo */}
            <div className="relative p-[1.565rem] pl-10 overflow-hidden border-b border-input/50">
                <div className='absolute inset-0 filter-ios'></div>
                <div className="flex items-center gap-2">
                    <Image
                        src={theme === 'dark' ? "/chirps-chat-logo-white.svg" : "/chirps-chat-logo.svg"}
                        alt="Chirps Logo"
                        className='h-10 w-10 z-20 -mt-2'
                        width={40}
                        objectFit='contain'
                        priority
                        height={40}
                    />
                    <h1 className='text-4xl ave text-foreground -ml-2 z-10'>hirps</h1>
                </div>
            </div>

            {/* Sidebar */}
            <div className="flex-1" onKeyDown={(e)=> console.table(e)}>
                <div className="w-fit mt-6 p-2 border border-input/50 bg-foreground/5 rounded-full origin-top -rotate-3 hover:rotate-0 hover:delay-0 delay-1000 transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col gap-3">
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger>
                                <Link href={feedPath}
                                    className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                                        "active:scale-100 opacity-100 not-dark:text-[#7600C9] border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isFeed,
                                    })}
                                    onMouseEnter={isFeed ? undefined : () => handleMouseEnter(feedRef)}
                                    onMouseLeave={isFeed ? undefined : () => handleMouseLeave(feedRef)}
                                >
                                    <DashboardIcon isAnimated={!isFeed} ref={feedRef} size={isFeed ? 24 : 16} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={5} dir="right">
                                <p>Global Feed <KbdGroup><Kbd>⌘</Kbd>+<Kbd>1</Kbd></KbdGroup></p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger>
                                <Link href={chatPath}
                                    className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                                        "active:scale-100 opacity-100 not-dark:text-[#7600C9] border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isChat,
                                    })}
                                    onMouseEnter={isChat ? undefined : () => handleMouseEnter(chatRef)}
                                    onMouseLeave={isChat ? undefined : () => handleMouseLeave(chatRef)}
                                >
                                    <SendIcon isAnimated={!isChat} ref={chatRef} size={isChat ? 24 : 16} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={5} dir="right">
                                <p>Chat <KbdGroup><Kbd>⌘</Kbd>+<Kbd>2</Kbd></KbdGroup></p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger>
                                <Link href={marketplacePath}
                                    className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                                        "active:scale-100 opacity-100 not-dark:text-[#7600C9] border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isMarketplace,
                                    })}
                                    onMouseEnter={isMarketplace ? undefined : () => handleMouseEnter(marketplaceRef)}
                                    onMouseLeave={isMarketplace ? undefined : () => handleMouseLeave(marketplaceRef)}
                                >
                                    <ShoppingCartIcon isAnimated={!isMarketplace} ref={marketplaceRef} size={isMarketplace ? 24 : 16} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={5} dir="right">
                                <p>Marketplace <KbdGroup><Kbd>⌘</Kbd>+<Kbd>3</Kbd></KbdGroup></p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger>
                                <Link href={leaderboardPath}
                                    className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                                        "active:scale-100 opacity-100 not-dark:text-[#7600C9] border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isLeaderboard,
                                    })}
                                    onMouseEnter={isLeaderboard ? undefined : () => handleMouseEnter(leaderboardRef)}
                                    onMouseLeave={isLeaderboard ? undefined : () => handleMouseLeave(leaderboardRef)}
                                >
                                    <UserStarIcon isActive={isLeaderboard} isAnimated={!isLeaderboard} ref={leaderboardRef} size={isLeaderboard ? 24 : 16} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={5} dir="right">
                                <p>Leaderboard <KbdGroup><Kbd>⌘</Kbd>+<Kbd>4</Kbd></KbdGroup></p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <Tooltip delayDuration={500}>
                <TooltipTrigger>
                    <Link href={suggestionsPath}
                        className={cn("flex items-center opacity-75 hover:opacity-85 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                            "active:scale-100 opacity-100 not-dark:text-[#7600C9] border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isSuggestions,
                        })}
                        onMouseEnter={isSuggestions ? undefined : () => handleMouseEnter(suggestionsRef)}
                        onMouseLeave={isSuggestions ? undefined : () => handleMouseLeave(suggestionsRef)}
                    >
                        <HandCoinsIcon isAnimated={!isSuggestions} ref={suggestionsRef} size={isSuggestions ? 24 : 20} />
                    </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={5} dir="right">
                    <p>Suggestions <KbdGroup><Kbd>⌘</Kbd>+<Kbd>5</Kbd></KbdGroup></p>
                </TooltipContent>
            </Tooltip>
            <div className="h-10" />
        </div>
    )
}