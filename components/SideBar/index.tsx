"use client"
import { DashboardIcon, DashboardIconHandle } from "../DashboardIcon";
import { ShoppingCartIcon, ShoppingCartIconHandle } from "../ShoppingCartIcon";
import { UserStarIcon } from "../UserStarIcon";
import { SendIcon, SendIconHandle } from "../SendIcon";
import { useRef } from "react";
import { UserStarHandle } from "../UserStarIcon";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HandCoinsIcon } from "../HandCoinsIcon";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import useShortcuts, { KeyboardKey } from '@useverse/useshortcuts';
import { Kbd, KbdGroup } from "../ui/kbd";
import { useKeyBoardShortCut } from "../Providers/KeyBoardShortCutProvider";
import { useAuth } from "../Providers/AuthProvider";
import { motion } from "framer-motion";


export default function SideBar() {
    const { allowedShortcuts } = useKeyBoardShortCut();
    const { isMacOS } = useAuth();
    const pathname = usePathname();
    const isFullscreen = useSearchParams().get("fullscreen");

    const feedPath = "/";
    const leaderboardPath = "/leaderboard";
    const marketplacePath = "/marketplace";
    const suggestionsPath = "/suggestions";
    const chatPath = isFullscreen ? "/chat?fullscreen=true" : "/chat";

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

    const feedLinkRef = useRef<HTMLAnchorElement>(null);
    const leaderboardLinkRef = useRef<HTMLAnchorElement>(null);
    const marketplaceLinkRef = useRef<HTMLAnchorElement>(null);
    const suggestionsLinkRef = useRef<HTMLAnchorElement>(null);
    const chatLinkRef = useRef<HTMLAnchorElement>(null);

    const handleMouseEnter = (ref: React.RefObject<DashboardIconHandle | SendIconHandle | ShoppingCartIconHandle | UserStarHandle | null>) => {
        if (!ref.current) return;
        ref.current.startAnimation();
    };

    const handleMouseLeave = (ref: React.RefObject<DashboardIconHandle | SendIconHandle | ShoppingCartIconHandle | UserStarHandle | null>) => {
        if (!ref.current) return;
        ref.current.stopAnimation();
    };

    useShortcuts({
        shortcuts: [
            { key: KeyboardKey.Digit1, metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true, enabled: allowedShortcuts.has("command1") },
            { key: KeyboardKey.Digit2, metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true, enabled: allowedShortcuts.has("command2") },
            { key: KeyboardKey.Digit3, metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true, enabled: allowedShortcuts.has("command3") },
            { key: KeyboardKey.Digit4, metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true, enabled: allowedShortcuts.has("command4") },
            { key: KeyboardKey.Digit5, metaKey: isMacOS, ctrlKey: !isMacOS, isSpecialKey: true, enabled: allowedShortcuts.has("command5") },
        ],
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case "Digit1":
                    if (isFeed) return;
                    feedLinkRef.current?.click();
                    break;
                case "Digit2":
                    if (isChat) return;
                    chatLinkRef.current?.click();
                    break;
                case "Digit3":
                    if (isMarketplace) return;
                    marketplaceLinkRef.current?.click();
                    break;
                case "Digit4":
                    if (isLeaderboard) return;
                    leaderboardLinkRef.current?.click();
                    break;
                case "Digit5":
                    if (isSuggestions) return;
                    suggestionsLinkRef.current?.click();
                    break;
            }
        }
    }, [allowedShortcuts, feedLinkRef, leaderboardLinkRef, marketplaceLinkRef, suggestionsLinkRef, chatLinkRef]);

    const isHidden = (pathname === "/chat" || pathname.includes("/chat/"));


    return (
        <motion.div 
            className={cn(
                "w-24 sticky top-32 overflow-hidden h-[80dvh] hidden md:flex flex-col items-center",
            )}
            initial={{ 
                opacity: 0, 
                x: (isHidden && isFullscreen) ? -24 : 0,
                width: (isHidden && isFullscreen) ? 0 : "8rem"
            }}
            animate={{ 
                opacity: (isHidden && isFullscreen) ? 0 : 1, 
                x: (isHidden && isFullscreen) ? -24 : 0,
                width: (isHidden && isFullscreen) ? 0 : "8rem"
            }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex-1 " onKeyDown={(e)=> console.table(e)}>
                <div className={cn(
                    "w-fit shadow-lg shadow-foreground/5 p-2 border border-input/50 bg-foreground/5 rounded-full origin-top hover:rotate-0 hover:delay-0 delay-1000 transition-transform duration-300 ease-in-out",
                    isHidden ? "" : "-rotate-3"
                )}>
                    <div className="flex flex-col gap-3">
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger>
                                <Link href={feedPath}
                                    ref={!isFeed ? feedLinkRef : undefined}
                                    className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                                        "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isFeed,
                                    })}
                                    onMouseEnter={isFeed ? undefined : () => handleMouseEnter(feedRef)}
                                    onMouseLeave={isFeed ? undefined : () => handleMouseLeave(feedRef)}
                                >
                                    <DashboardIcon isAnimated={!isFeed} ref={feedRef} size={isFeed ? 24 : 16} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={5} dir="right">
                                <p>Global Feed {pathname} <KbdGroup><Kbd className="border border-background/20">⌘</Kbd><Kbd className="border border-background/20">1</Kbd></KbdGroup></p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger>
                                <Link href={chatPath}
                                    ref={!isChat ? chatLinkRef : undefined}
                                    className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                                        "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isChat,
                                    })}
                                    onMouseEnter={isChat ? undefined : () => handleMouseEnter(chatRef)}
                                    onMouseLeave={isChat ? undefined : () => handleMouseLeave(chatRef)}
                                >
                                    <SendIcon isAnimated={!isChat} ref={chatRef} size={isChat ? 24 : 16} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={5} dir="right">
                                <p>Chat <KbdGroup><Kbd className="border border-background/20">⌘</Kbd><Kbd className="border border-background/20">2</Kbd></KbdGroup></p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger>
                                <Link href={marketplacePath}
                                    ref={!isMarketplace ? marketplaceLinkRef : undefined}
                                    className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                                        "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isMarketplace,
                                    })}
                                    onMouseEnter={isMarketplace ? undefined : () => handleMouseEnter(marketplaceRef)}
                                    onMouseLeave={isMarketplace ? undefined : () => handleMouseLeave(marketplaceRef)}
                                >
                                    <ShoppingCartIcon isAnimated={!isMarketplace} ref={marketplaceRef} size={isMarketplace ? 24 : 16} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={5} dir="right">
                                <p>Marketplace <KbdGroup><Kbd className="border border-background/20">⌘</Kbd><Kbd className="border border-background/20">3</Kbd></KbdGroup></p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger>
                                <Link href={leaderboardPath}
                                    ref={!isLeaderboard ? leaderboardLinkRef : undefined}
                                    className={cn("flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                                        "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isLeaderboard,
                                    })}
                                    onMouseEnter={isLeaderboard ? undefined : () => handleMouseEnter(leaderboardRef)}
                                    onMouseLeave={isLeaderboard ? undefined : () => handleMouseLeave(leaderboardRef)}
                                >
                                    <UserStarIcon isActive={isLeaderboard} isAnimated={!isLeaderboard} ref={leaderboardRef} size={isLeaderboard ? 24 : 16} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={5} dir="right">
                                <p>Leaderboard <KbdGroup><Kbd className="border border-background/20">⌘</Kbd><Kbd className="border border-background/20">4</Kbd></KbdGroup></p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <Tooltip delayDuration={500}>
                <TooltipTrigger>
                    <Link href={suggestionsPath}
                        ref={!isSuggestions ? suggestionsLinkRef : undefined}
                        className={cn("flex shadow-lg shadow-transparent hover:shadow-foreground/5 items-center opacity-75 hover:opacity-85 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75", {
                            "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isSuggestions,
                        })}
                        onMouseEnter={isSuggestions ? undefined : () => handleMouseEnter(suggestionsRef)}
                        onMouseLeave={isSuggestions ? undefined : () => handleMouseLeave(suggestionsRef)}
                    >
                        <HandCoinsIcon isAnimated={!isSuggestions} ref={suggestionsRef} size={isSuggestions ? 24 : 20} />
                    </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={5} dir="right">
                    <p>Suggestions <KbdGroup><Kbd className="border border-background/20">⌘</Kbd><Kbd className="border border-background/20">5</Kbd></KbdGroup></p>
                </TooltipContent>
            </Tooltip>
            <div className="h-10" />
        </motion.div>
    )
}