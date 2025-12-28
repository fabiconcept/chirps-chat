"use client";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Bug, Palette, Zap, MoreHorizontal } from "lucide-react";
import { SuggestionCategory } from "../types";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
    category: SuggestionCategory;
    size?: "sm" | "md";
}

const categoryConfig = {
    feature: {
        label: "Feature",
        icon: Sparkles,
        className: "bg-muted/50 text-muted-foreground border-input"
    },
    improvement: {
        label: "Improvement",
        icon: TrendingUp,
        className: "bg-muted/50 text-muted-foreground border-input"
    },
    "bug-fix": {
        label: "Bug Fix",
        icon: Bug,
        className: "bg-muted/50 text-muted-foreground border-input"
    },
    "ui-ux": {
        label: "UI/UX",
        icon: Palette,
        className: "bg-muted/50 text-muted-foreground border-input"
    },
    performance: {
        label: "Performance",
        icon: Zap,
        className: "bg-muted/50 text-muted-foreground border-input"
    },
    other: {
        label: "Other",
        icon: MoreHorizontal,
        className: "bg-muted/50 text-muted-foreground border-input"
    }
};

export default function CategoryBadge({ category, size = "md" }: CategoryBadgeProps) {
    const config = categoryConfig[category];
    const Icon = config.icon;

    return (
        <Badge
            variant="outline"
            className={cn(
                "gap-1 font-medium",
                config.className,
                size === "sm" ? "text-xs px-2 py-0 h-5" : "text-sm px-2.5 py-0.5"
            )}
        >
            <Icon className={cn(size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} />
            {config.label}
        </Badge>
    );
}

