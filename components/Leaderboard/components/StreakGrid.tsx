"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo, useRef, useEffect, useState } from "react";

type GridSize = "sm" | "md" | "lg";

interface StreakGridProps {
    streakDays: number;
    size?: GridSize;
    maxWeeks?: number;
}

const sizeConfig = {
    sm: { square: 2, gap: 0.5, text: "text-[8px]", labelGap: 1 },
    md: { square: 3, gap: 1, text: "text-[10px]", labelGap: 2 },
    lg: { square: 4, gap: 1.5, text: "text-xs", labelGap: 2 }
};

// Generate mock contribution data
const generateContributionData = (streakDays: number, totalDays: number) => {
    const data: { date: Date; count: number; level: number }[] = [];
    const today = new Date();
    
    // Go back the specified number of days
    for (let i = totalDays - 1; i >= 0; i--) {
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

export default function StreakGrid({ streakDays, size = "md", maxWeeks }: StreakGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [availableWeeks, setAvailableWeeks] = useState<number>(maxWeeks || 52);
    const config = sizeConfig[size];

    // Calculate how many weeks can fit based on container width
    useEffect(() => {
        if (!containerRef.current || maxWeeks) return;

        const updateWeeks = () => {
            if (!containerRef.current) return;
            
            const containerWidth = containerRef.current.offsetWidth;
            // Account for: day labels (30px) + gaps + some padding
            const dayLabelsWidth = 30;
            const paddingBuffer = 20;
            const availableWidth = containerWidth - dayLabelsWidth - paddingBuffer;
            
            // Calculate based on square size + gap
            const squareWithGap = config.square * 4 + config.gap * 4; // in rem (converted to px approximation)
            const calculatedWeeks = Math.floor(availableWidth / squareWithGap);
            
            // Clamp between 8 weeks (2 months) and 52 weeks (1 year)
            const weeks = Math.max(8, Math.min(52, calculatedWeeks));
            setAvailableWeeks(weeks);
        };

        updateWeeks();
        window.addEventListener('resize', updateWeeks);
        return () => window.removeEventListener('resize', updateWeeks);
    }, [config.square, config.gap, maxWeeks]);

    const totalDays = (maxWeeks || availableWeeks) * 7;
    const contributionData = useMemo(
        () => generateContributionData(streakDays, totalDays), 
        [streakDays, totalDays]
    );
    
    // Group by weeks
    const weeks: { date: Date; count: number; level: number }[][] = [];
    for (let i = 0; i < contributionData.length; i += 7) {
        weeks.push(contributionData.slice(i, i + 7));
    }
    
    // Calculate time range for display
    const oldestDate = contributionData[0]?.date;
    const newestDate = contributionData[contributionData.length - 1]?.date;
    const timeRange = oldestDate && newestDate 
        ? `${oldestDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })} - ${newestDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}`
        : '';

    return (
        <div ref={containerRef} className="space-y-3 w-full">
            {/* Stats */}
            <div className={cn(
                "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
            )}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
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
                {timeRange && (
                    <div className={cn("text-muted-foreground", config.text)}>
                        {timeRange}
                    </div>
                )}
            </div>

            {/* Grid */}
            <div className="w-full overflow-hidden">
                <div className="inline-flex flex-col w-full" style={{ gap: `${config.gap * 4}px` }}>
                    {/* Month labels */}
                    <div className="flex ml-8" style={{ gap: `${config.gap * 4}px`, marginBottom: `${config.gap * 4}px` }}>
                        {weeks.map((_, weekIndex) => {
                            const label = getMonthLabel(weekIndex, contributionData);
                            return (
                                <div 
                                    key={weekIndex} 
                                    className={cn(config.text, "text-muted-foreground")}
                                    style={{ width: `${config.square * 4}px` }}
                                >
                                    {label}
                                </div>
                            );
                        })}
                    </div>

                    {/* Day labels + Grid */}
                    <div className="flex" style={{ gap: `${config.labelGap * 4}px` }}>
                        {/* Day of week labels */}
                        <div 
                            className={cn("flex flex-col justify-between text-muted-foreground", config.text)}
                            style={{ gap: `${config.gap * 4}px`, minWidth: '24px' }}
                        >
                            <span>Mon</span>
                            <span className="invisible">Wed</span>
                            <span>Wed</span>
                            <span className="invisible">Fri</span>
                            <span>Fri</span>
                            <span className="invisible">Sun</span>
                            <span>Sun</span>
                        </div>

                        {/* Contribution squares */}
                        <div className="flex flex-1 overflow-x-auto" style={{ gap: `${config.gap * 4}px` }}>
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col shrink-0" style={{ gap: `${config.gap * 4}px` }}>
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
                                                whileHover={{ scale: size === "sm" ? 1.8 : 1.5, zIndex: 10 }}
                                                className={cn(
                                                    "rounded-sm cursor-pointer relative group shrink-0",
                                                    getLevelColor(day.level),
                                                    isToday && "ring-1 ring-emerald-500"
                                                )}
                                                style={{ 
                                                    width: `${config.square * 4}px`, 
                                                    height: `${config.square * 4}px` 
                                                }}
                                                title={`${day.date.toLocaleDateString()}: ${day.count} activities`}
                                            >
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 pointer-events-none">
                                                    <div className="bg-popover text-popover-foreground text-xs rounded-md px-2 py-1.5 shadow-lg whitespace-nowrap border">
                                                        <div className="font-semibold">{day.count} activities</div>
                                                        <div className="text-[10px] text-muted-foreground">
                                                            {day.date.toLocaleDateString('default', { 
                                                                weekday: 'short', 
                                                                month: 'short', 
                                                                day: 'numeric',
                                                                year: 'numeric'
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
            <div className={cn("flex items-center justify-center sm:justify-start", config.text, "text-muted-foreground")}>
                <div className="flex items-center" style={{ gap: `${config.gap * 4}px` }}>
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className={cn("rounded-sm", getLevelColor(level))}
                            style={{ 
                                width: `${config.square * 4}px`, 
                                height: `${config.square * 4}px` 
                            }}
                        />
                    ))}
                    <span>More</span>
                </div>
            </div>
        </div>
    );
}

