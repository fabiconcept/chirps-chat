"use client"
import { useTheme } from "next-themes";
import Image from "next/image";
import { DashboardIcon, DashboardIconHandle } from "../DashboardIcon";
import { ShoppingCartIcon, ShoppingCartIconHandle } from "../ShoppingCartIcon";
import { UserStarIcon } from "../UserStarIcon";
import { SendIcon, SendIconHandle } from "../SendIcon";
import { useRef } from "react";
import { UserStarHandle } from "../UserStarIcon";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HandCoinsIcon } from "../HandCoinsIcon";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function SideBar() {
    const { theme } = useTheme();
    const pathname = usePathname();

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

    return (
        <div className="min-w-40 sticky top-0 overflow-hidden h-screen">
            {/* Logo */}
            <div className="relative p-[1.565rem] px-10 overflow-hidden border-b border-input/50">
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
            <div className="mx-auto w-fit mt-6 p-2 border border-input/50 bg-foreground/5 rounded-full origin-top -rotate-3 hover:rotate-0 transition-transform duration-300 ease-in-out">
                <div className="flex flex-col gap-3">
                    <Tooltip delayDuration={500}>
                        <TooltipTrigger>
                            <Link href={feedPath}
                                className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out", {
                                    "opacity-100 border-white/50 hover:opacity-100 bg-[#7600C9]/20 hover:bg-[#7600C9]/20": isFeed,
                                })}
                                onMouseEnter={isFeed ? undefined : () => handleMouseEnter(feedRef)}
                                onMouseLeave={isFeed ? undefined : () => handleMouseLeave(feedRef)}
                            >
                                <DashboardIcon isAnimated={!isFeed} ref={feedRef} size={isFeed ? 24 : 16} />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={5} dir="right">
                            <p>Global Feed</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={500}>
                        <TooltipTrigger>
                            <Link href={chatPath}
                                className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out", {
                                    "opacity-100 border-white/50 hover:opacity-100 bg-[#7600C9]/20 hover:bg-[#7600C9]/20": isChat,
                                })}
                                onMouseEnter={isChat ? undefined : () => handleMouseEnter(chatRef)}
                                onMouseLeave={isChat ? undefined : () => handleMouseLeave(chatRef)}
                            >
                                <SendIcon isAnimated={!isChat} ref={chatRef} size={isChat ? 24 : 16} />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={5} dir="right">
                            <p>Chat</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={500}>
                        <TooltipTrigger>
                            <Link href={marketplacePath}
                                className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out", {
                                    "opacity-100 border-white/50 hover:opacity-100 bg-[#7600C9]/20 hover:bg-[#7600C9]/20": isMarketplace,
                                })}
                                onMouseEnter={isMarketplace ? undefined : () => handleMouseEnter(marketplaceRef)}
                                onMouseLeave={isMarketplace ? undefined : () => handleMouseLeave(marketplaceRef)}
                            >
                                <ShoppingCartIcon isAnimated={!isMarketplace} ref={marketplaceRef} size={isMarketplace ? 24 : 16} />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={5} dir="right">
                            <p>Marketplace</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={500}>
                        <TooltipTrigger>
                            <Link href={leaderboardPath}
                                className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out", {
                                    "opacity-100 border-white/50 hover:opacity-100 bg-[#7600C9]/20 hover:bg-[#7600C9]/20": isLeaderboard,
                                })}
                                onMouseEnter={isLeaderboard ? undefined : () => handleMouseEnter(leaderboardRef)}
                                onMouseLeave={isLeaderboard ? undefined : () => handleMouseLeave(leaderboardRef)}
                            >
                                <UserStarIcon isActive={isLeaderboard} isAnimated={!isLeaderboard} ref={leaderboardRef} size={isLeaderboard ? 24 : 16} />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={5} dir="right">
                            <p>Leaderboard</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={500}>
                        <TooltipTrigger>
                            <Link href={suggestionsPath}
                                className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out", {
                                    "opacity-100 border-white/50 hover:opacity-100 bg-[#7600C9]/20 hover:bg-[#7600C9]/20": isSuggestions,
                                })}
                                onMouseEnter={isSuggestions ? undefined : () => handleMouseEnter(suggestionsRef)}
                                onMouseLeave={isSuggestions ? undefined : () => handleMouseLeave(suggestionsRef)}
                            >
                                <HandCoinsIcon isAnimated={!isSuggestions} ref={suggestionsRef} size={isSuggestions ? 24 : 16} />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={5} dir="right">
                            <p>Suggestions</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}