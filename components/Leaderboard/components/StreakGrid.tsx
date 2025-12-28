"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface StreakGridProps {
    streakDays: number;
}

// Generate mock contribution data for the past year
const generateContributionData = (streakDays: number) => {
    const data: { date: Date; count: number; level: number }[] = [];
    const today = new Date();
    
    // Go back 365 days
    for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Active streak: last X days have contributions
        const isInStreak = i < streakDays;
        const count = isInStreak ? Math.floor(Math.random() * 10) + 1 : Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
        
        // Calculate level (0-4) based on count
        const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4;
        
        data.push({ date, count, level });
    }
    
    return data;
};

const getLevelColor = (level: number) => {
    switch (level) {
        case 0: return "bg-muted";
        case 1: return "bg-emerald-200 dark:bg-emerald-900/40";
        case 2: return "bg-emerald-400 dark:bg-emerald-700/60";
        case 3: return "bg-emerald-500 dark:bg-emerald-600/80";
        case 4: return "bg-emerald-600 dark:bg-emerald-500";
        default: return "bg-muted";
    }
};

const getMonthLabel = (weekIndex: number, data: { date: Date }[]) => {
    const dateIndex = weekIndex * 7;
    if (dateIndex >= data.length) return null;
    
    const date = data[dateIndex].date;
    const month = date.toLocaleString('default', { month: 'short' });
    
    // Only show if it's the first week of the month
    if (date.getDate() <= 7) {
        return month;
    }
    
    return null;
};

export default function StreakGrid({ streakDays }: StreakGridProps) {
    const contributionData = useMemo(() => generateContributionData(streakDays), [streakDays]);
    
    // Group by weeks
    const weeks: { date: Date; count: number; level: number }[][] = [];
    for (let i = 0; i < contributionData.length; i += 7) {
        weeks.push(contributionData.slice(i, i + 7));
    }

    return (
        <div className="space-y-4">
            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                    <div>
                        <span className="text-muted-foreground">Current Streak: </span>
                        <span className="font-bold text-emerald-500">{streakDays} days</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Total: </span>
                        <span className="font-semibold">
                            {contributionData.reduce((sum, day) => sum + day.count, 0)} activities
                        </span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="overflow-x-auto">
                <div className="inline-flex flex-col gap-1 min-w-full">
                    {/* Month labels */}
                    <div className="flex gap-1 mb-1 ml-8">
                        {weeks.map((_, weekIndex) => {
                            const label = getMonthLabel(weekIndex, contributionData);
                            return (
                                <div key={weekIndex} className="w-3 text-[10px] text-muted-foreground">
                                    {label}
                                </div>
                            );
                        })}
                    </div>

                    {/* Day labels + Grid */}
                    <div className="flex gap-1">
                        {/* Day of week labels */}
                        <div className="flex flex-col gap-1 justify-between text-[10px] text-muted-foreground pr-2">
                            <span>Mon</span>
                            <span className="invisible">Wed</span>
                            <span>Wed</span>
                            <span className="invisible">Fri</span>
                            <span>Fri</span>
                            <span className="invisible">Sun</span>
                            <span>Sun</span>
                        </div>

                        {/* Contribution squares */}
                        <div className="flex gap-1">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1">
                                    {week.map((day, dayIndex) => {
                                        const isToday = day.date.toDateString() === new Date().toDateString();
                                        
                                        return (
                                            <motion.div
                                                key={`${weekIndex}-${dayIndex}`}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    delay: (weekIndex * 7 + dayIndex) * 0.001,
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30
                                                }}
                                                whileHover={{ scale: 1.5, zIndex: 10 }}
                                                className={cn(
                                                    "w-3 h-3 rounded-sm cursor-pointer relative group",
                                                    getLevelColor(day.level),
                                                    isToday && "ring-2 ring-emerald-500 ring-offset-1 ring-offset-background"
                                                )}
                                                title={`${day.date.toLocaleDateString()}: ${day.count} activities`}
                                            >
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                                                    <div className="bg-popover text-popover-foreground text-xs rounded-md px-2 py-1 shadow-lg whitespace-nowrap border">
                                                        <div className="font-semibold">{day.count} activities</div>
                                                        <div className="text-muted-foreground">
                                                            {day.date.toLocaleDateString('default', { 
                                                                weekday: 'short', 
                                                                month: 'short', 
                                                                day: 'numeric' 
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={cn("w-3 h-3 rounded-sm", getLevelColor(level))}
                    />
                ))}
                <span>More</span>
            </div>
        </div>
    );
}

