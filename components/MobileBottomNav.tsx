"use client"

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardIcon } from "./animated icons/DashboardIcon";
import { SendIcon } from "./SendIcon";
import { ShoppingCartIcon } from "./animated icons/ShoppingCartIcon";
import { UserStarIcon } from "./animated icons/UserStarIcon";
import { UserRoundIcon } from "./animated icons/UserRoundIcon";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const navItems: {
    path: string;
    icon: React.ElementType;
    activeSize: number;
    inactiveSize: number;
    tooltipContent: string;
    extraInactiveClass?: string;
    hasIsActive?: boolean
}[] = [
        {
            path: "/",
            icon: DashboardIcon,
            activeSize: 24,
            inactiveSize: 16,
            tooltipContent: "Dashboard"
        },
        {
            path: "/chat",
            icon: SendIcon,
            activeSize: 24,
            inactiveSize: 16,
            tooltipContent: "Chat"
        },
        {
            path: "/marketplace",
            icon: ShoppingCartIcon,
            activeSize: 24,
            inactiveSize: 16,
            tooltipContent: "Marketplace",
            extraInactiveClass: "max-sm:opacity-75"
        },
        {
            path: "/leaderboard",
            icon: UserStarIcon,
            activeSize: 24,
            inactiveSize: 16,
            tooltipContent: "Leaderboard",
            hasIsActive: true
        },
        {
            path: "/profile",
            icon: UserRoundIcon,
            activeSize: 24,
            inactiveSize: 20,
            tooltipContent: "Profile"
        },
    ];

export default function MobileBottomNav() {
    const pathname = usePathname();
    const user = useSearchParams().get("user");
    const channel = useSearchParams().get("channel");

    return (
        <nav className={cn(
            "fixed bottom-4 left-0 right-0 z-40 flex md:hidden justify-center pointer-events-none",
            pathname.includes("/chat") && (user || channel) && "hidden"
        )}>
            <div className="pointer-events-auto shadow-lg shadow-foreground/5 p-2 border border-foreground/20 bg-background/75 rounded-full transition-transform duration-300 ease-in-out relative overflow-hidden">
                <div className='absolute inset-0 scale-105 -mt-5 filter-ios'></div>
                <div className="flex flex-row gap-3 relative z-20">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        const IconComponent = item.icon;

                        return (
                            <Tooltip
                                key={item.path}
                            >
                                <TooltipTrigger>
                                    <Link
                                        href={item.path}
                                        className={cn(
                                            "flex items-center opacity-50 hover:opacity-75 gap-2 cursor-pointer h-12 w-12 border border-input rounded-full justify-center bg-background/75 hover:bg-background transition-all duration-300 ease-in-out active:scale-75",
                                            item.extraInactiveClass,
                                            {
                                                "active:scale-100 opacity-100 not-dark:text-[#7600C9] not-dark:border-[#7600C9]/50 border-white/50 hover:opacity-100 bg-[#7600C9]/5 hover:bg-[#7600C9]/5": isActive,
                                            }
                                        )}
                                    >
                                        <IconComponent
                                            isAnimated={!isActive}
                                            size={isActive ? item.activeSize : item.inactiveSize}
                                            {...(item.hasIsActive ? { isActive } : {})}
                                        />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent sideOffset={6}>
                                    <p>{item.tooltipContent}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
