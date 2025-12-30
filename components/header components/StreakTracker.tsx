"use client";

import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, formatNumber } from "@/lib/utils";
import Link from "next/link";

interface StreakTrackerProps {
    currentStreak: number;
    isMobile?: boolean;
}

export default function StreakTracker({ currentStreak, isMobile }: StreakTrackerProps) {
    const getStreakColor = (streak: number) => {
        if (streak >= 365) return "text-violet-300 fill-violet-500";
        if (streak >= 180) return "text-fuchsia-300 fill-fuchsia-500";
        if (streak >= 90) return "text-rose-300 fill-rose-500";
        if (streak >= 30) return "text-orange-300 fill-orange-500";
        if (streak >= 7) return "text-amber-300 fill-amber-500";
        return "text-slate-400 fill-slate-200";
    };

    const getStreakBgColor = (streak: number) => {
        if (streak >= 365) return "bg-linear-to-b from-violet-500/10 to-transparent";
        if (streak >= 180) return "bg-linear-to-b from-fuchsia-500/10 to-transparent";
        if (streak >= 90) return "bg-linear-to-b from-rose-500/10 to-transparent";
        if (streak >= 30) return "bg-linear-to-b from-orange-500/10 to-transparent";
        if (streak >= 7) return "bg-linear-to-b from-amber-500/10 to-transparent";
        return "bg-linear-to-b from-slate-200/10 to-transparent";
    };

    const getStreakLabel = (streak: number) => {
        if (streak >= 365) return "You are a Legend";
        if (streak >= 180) return "You are a Champion";
        if (streak >= 90) return "You are a Master";
        if (streak >= 30) return "You are a Pro";
        if (streak >= 7) return "You are Active";
        return "You are a Newbie";
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                    className={cn(
                        "gap-1.5 rounded-3xl relative overflow-hidden",
                        "hover:border-emerald-500/50 transition-all duration-300",
                        getStreakBgColor(currentStreak),
                        isMobile ? "px-2" : "px-3"
                    )}
                    asChild
                >
                    <Link href="/leaderboard">
                        <Flame 
                            className={cn(
                                "h-4 w-4 shrink-0",
                                getStreakColor(currentStreak),
                                currentStreak >= 7 && "animate-fire"
                            )} 
                        />
                        <span className="font-semibold text-sm">{formatNumber(currentStreak)}</span>
                    </Link>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <div className="space-y-1">
                    <p className="font-semibold text-center">Your current streak is {formatNumber(currentStreak, 0, true)} Days 🔥</p>
                    <p className="text-xs text-muted-foreground">{getStreakLabel(currentStreak)} • Click to view leaderboard</p>
                </div>
            </TooltipContent>
        </Tooltip>
    );
}

