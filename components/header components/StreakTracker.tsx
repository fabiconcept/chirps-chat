"use client";

import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StreakTrackerProps {
    currentStreak: number;
    isMobile?: boolean;
}

export default function StreakTracker({ currentStreak, isMobile }: StreakTrackerProps) {
    const getStreakColor = (streak: number) => {
        if (streak >= 365) return "text-purple-500";
        if (streak >= 180) return "text-orange-500";
        if (streak >= 90) return "text-amber-500";
        if (streak >= 30) return "text-yellow-500";
        if (streak >= 7) return "text-emerald-500";
        return "text-muted-foreground";
    };

    const getStreakLabel = (streak: number) => {
        if (streak >= 365) return "Legend";
        if (streak >= 180) return "Champion";
        if (streak >= 90) return "Master";
        if (streak >= 30) return "Pro";
        if (streak >= 7) return "Active";
        return "Beginner";
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                    className={cn(
                        "gap-1.5 relative overflow-hidden",
                        "hover:border-emerald-500/50 transition-all duration-300",
                        isMobile ? "px-2" : "px-3"
                    )}
                    asChild
                >
                    <Link href="/leaderboard">
                        <Flame 
                            className={cn(
                                "h-4 w-4 shrink-0",
                                getStreakColor(currentStreak),
                                currentStreak >= 7 && "animate-pulse"
                            )} 
                        />
                        {!isMobile && (
                            <>
                                <span className="font-semibold text-sm">{currentStreak}</span>
                                <span className="text-xs text-muted-foreground">day{currentStreak !== 1 ? 's' : ''}</span>
                            </>
                        )}
                        {isMobile && (
                            <span className="font-semibold text-sm">{currentStreak}</span>
                        )}
                    </Link>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <div className="space-y-1">
                    <p className="font-semibold">{currentStreak} Days 🔥</p>
                    <p className="text-xs text-muted-foreground">{getStreakLabel(currentStreak)} • Click to view leaderboard</p>
                </div>
            </TooltipContent>
        </Tooltip>
    );
}

