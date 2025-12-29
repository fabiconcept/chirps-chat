"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Heart, MessageSquare, Home, CalendarCheck } from "lucide-react";
import { LeaderboardCategory } from "../types";
import { cn } from "@/lib/utils";

interface LeaderboardStatsProps {
    activeCategory: LeaderboardCategory;
    onCategoryChange: (category: LeaderboardCategory) => void;
}

const categories = [
    {
        id: "streak" as LeaderboardCategory,
        label: "Most Streak",
        icon: CalendarCheck,
        accentColor: "#10b981" // Emerald
    },
    {
        id: "tokens" as LeaderboardCategory,
        label: "Most Tokens",
        icon: Trophy,
        accentColor: "#D4AF37" // Gold
    },
    {
        id: "followers" as LeaderboardCategory,
        label: "Most Followers",
        icon: Users,
        accentColor: "#3b82f6" // Blue
    },
    {
        id: "likes" as LeaderboardCategory,
        label: "Most Liked",
        icon: Heart,
        accentColor: "#f43f5e" // Rose
    },
    {
        id: "posts" as LeaderboardCategory,
        label: "Most Posts",
        icon: MessageSquare,
        accentColor: "#a855f7" // Purple
    },
    {
        id: "rooms" as LeaderboardCategory,
        label: "Most Rooms",
        icon: Home,
        accentColor: "#6366f1" // Indigo
    }
];

export default function LeaderboardStats({ activeCategory, onCategoryChange }: LeaderboardStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category, index) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                    <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                        }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onCategoryChange(category.id)}
                        className={cn(
                            "relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                            "flex flex-col items-center gap-2.5 overflow-hidden",
                            isActive
                                ? "border-foreground/20 bg-foreground/5"
                                : "border-border bg-background hover:border-foreground/10"
                        )}
                        style={{
                            borderTopColor: isActive ? category.accentColor : undefined,
                            borderTopWidth: isActive ? '3px' : undefined
                        }}
                    >
                        {/* Icon */}
                        <div className={cn(
                            "p-2.5 rounded-lg transition-all duration-200",
                            isActive ? "bg-foreground/10" : "bg-muted/50"
                        )}>
                            <Icon 
                                className="h-5 w-5 transition-colors duration-200"
                                style={{ 
                                    color: isActive ? category.accentColor : undefined 
                                }}
                            />
                        </div>

                        {/* Label */}
                        <p className={cn(
                            "font-medium text-xs transition-colors duration-200 text-center",
                            isActive ? "text-foreground" : "text-muted-foreground"
                        )}>
                            {category.label}
                        </p>

                        {/* Active Indicator Dot */}
                        {isActive && (
                            <motion.div
                                layoutId="activeDot"
                                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: category.accentColor }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}

