"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardIcon } from "./DashboardIcon";
import { SendIcon } from "./SendIcon";
import { ShoppingCartIcon } from "./ShoppingCartIcon";
import { UserStarIcon } from "./UserStarIcon";
import { HandCoinsIcon } from "./HandCoinsIcon";

export default function MobileBottomNav() {
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

    return (
        <nav className="fixed bottom-4 left-0 right-0 z-40 flex md:hidden justify-center pointer-events-none">
            <div className="pointer-events-auto shadow-lg shadow-foreground/5 p-2 border border-foreground/20 bg-background/75 rounded-full transition-transform duration-300 ease-in-out relative overflow-hidden">
                <div className='absolute inset-0 scale-105 -mt-5 filter-ios'></div>
                <div className="flex flex-row gap-3 relative z-20">
                    <Link
                        href={feedPath}
                        className={cn(
                            "flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75",
                            {
                                "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isFeed,
                            }
                        )}
                    >
                        <DashboardIcon isAnimated={!isFeed} size={isFeed ? 24 : 16} />
                    </Link>
                    <Link
                        href={chatPath}
                        className={cn(
                            "flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75",
                            {
                                "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isChat,
                            }
                        )}
                    >
                        <SendIcon isAnimated={!isChat} size={isChat ? 24 : 16} />
                    </Link>
                    <Link
                        href={marketplacePath}
                        className={cn(
                            "flex items-center opacity-50 max-sm:opacity-75 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75",
                            {
                                "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isMarketplace,
                            }
                        )}
                    >
                        <ShoppingCartIcon isAnimated={!isMarketplace} size={isMarketplace ? 24 : 16} />
                    </Link>
                    <Link
                        href={leaderboardPath}
                        className={cn(
                            "flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75",
                            {
                                "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isLeaderboard,
                            }
                        )}
                    >
                        <UserStarIcon isActive={isLeaderboard} isAnimated={!isLeaderboard} size={isLeaderboard ? 24 : 16} />
                    </Link>
                    <Link
                        href={suggestionsPath}
                        className={cn(
                            "flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75",
                            {
                                "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isSuggestions,
                            }
                        )}
                    >
                        <HandCoinsIcon isAnimated={!isSuggestions} size={isSuggestions ? 24 : 20} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
