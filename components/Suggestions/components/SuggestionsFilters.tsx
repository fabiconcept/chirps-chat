"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Filter, Sparkles, TrendingUp, Bug, Palette, Zap, MoreHorizontal } from "lucide-react";
import { SortOption, FilterOption } from "../types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SuggestionsFiltersProps {
    currentSort: SortOption;
    currentFilter: FilterOption;
    onSortChange: (sort: SortOption) => void;
    onFilterChange: (filter: FilterOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "top", label: "Top Rated" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" }
];

const filterOptions: { value: FilterOption; label: string; icon: React.ElementType }[] = [
    { value: "all", label: "All Categories", icon: Filter },
    { value: "feature", label: "Features", icon: Sparkles },
    { value: "improvement", label: "Improvements", icon: TrendingUp },
    { value: "bug-fix", label: "Bug Fixes", icon: Bug },
    { value: "ui-ux", label: "UI/UX", icon: Palette },
    { value: "performance", label: "Performance", icon: Zap },
    { value: "other", label: "Other", icon: MoreHorizontal }
];

export default function SuggestionsFilters({
    currentSort,
    currentFilter,
    onSortChange,
    onFilterChange
}: SuggestionsFiltersProps) {
    const currentFilterLabel = filterOptions.find(f => f.value === currentFilter)?.label || "All Categories";
    const currentSortLabel = sortOptions.find(s => s.value === currentSort)?.label || "Top Rated";

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 flex-wrap"
        >
            {/* Sort Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 rounded-3xl border-none bg-linear-to-b from-foreground/10 to-transparent">
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="max-sm:hidden">{currentSortLabel}</span>
                        <span className="sm:hidden">Sort</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 p-1 space-y-1 rounded-3xl bg-linear-to-t from-foreground/25 to-transparent bg-background/90 backdrop-blur-sm">
                    {sortOptions.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => onSortChange(option.value)}
                            className={cn(
                                "cursor-pointer rounded-3xl",
                                currentSort === option.value && "bg-primary/10 text-primary font-medium"
                            )}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 rounded-3xl border-none bg-linear-to-b from-foreground/10 to-transparent">
                        <Filter className="h-4 w-4" />
                        <span className="max-sm:hidden">{currentFilterLabel}</span>
                        <span className="sm:hidden">Filter</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52 p-1 space-y-1 rounded-3xl bg-linear-to-t from-foreground/25 to-transparent bg-background/90 backdrop-blur-sm">
                    {filterOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                            <div key={option.value}>
                                {index === 1 && <DropdownMenuSeparator />}
                                <DropdownMenuItem
                                    onClick={() => onFilterChange(option.value)}
                                    className={cn(
                                        "cursor-pointer flex items-center gap-2 rounded-3xl",
                                        currentFilter === option.value && "bg-primary/10 text-primary font-medium"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {option.label}
                                </DropdownMenuItem>
                            </div>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </motion.div>
    );
}

