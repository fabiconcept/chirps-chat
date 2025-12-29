"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Trophy, Users, Heart, MessageSquare, Home, ChevronDown, Check } from "lucide-react";
import { LeaderboardCategory } from "../types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryDropdownProps {
    activeCategory: LeaderboardCategory;
    onCategoryChange: (category: LeaderboardCategory) => void;
}

const categories = [
    {
        id: "streak" as LeaderboardCategory,
        label: "Most Streak",
        icon: TrendingUp,
        accentColor: "#10b981",
        description: "Longest active streaks"
    },
    {
        id: "tokens" as LeaderboardCategory,
        label: "Most Tokens",
        icon: Trophy,
        accentColor: "#D4AF37",
        description: "Highest token earners"
    },
    {
        id: "followers" as LeaderboardCategory,
        label: "Most Followers",
        icon: Users,
        accentColor: "#3b82f6",
        description: "Top followed users"
    },
    {
        id: "likes" as LeaderboardCategory,
        label: "Most Liked",
        icon: Heart,
        accentColor: "#f43f5e",
        description: "Most liked content"
    },
    {
        id: "posts" as LeaderboardCategory,
        label: "Most Posts",
        icon: MessageSquare,
        accentColor: "#a855f7",
        description: "Most active posters"
    },
    {
        id: "rooms" as LeaderboardCategory,
        label: "Most Rooms",
        icon: Home,
        accentColor: "#6366f1",
        description: "Top room creators"
    }
];

export default function CategoryDropdown({ activeCategory, onCategoryChange }: CategoryDropdownProps) {
    const activeConfig = categories.find(c => c.id === activeCategory) || categories[0];
    const ActiveIcon = activeConfig.icon;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-3xl"
                >
                    <ActiveIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">{activeConfig.label}</span>
                    <ChevronDown className="h-3 w-3" />
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-[240px] rounded-3xl">
                <DropdownMenuLabel className="text-xs font-normal">
                    Category
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;
                    
                    return (
                        <DropdownMenuItem
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={cn(
                                "gap-2 cursor-pointer",
                                isActive && "bg-muted"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <span className="flex-1 text-sm">{category.label}</span>
                            {isActive && (
                                <Check className="h-3 w-3 shrink-0" />
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

