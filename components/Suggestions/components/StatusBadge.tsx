"use client";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Lightbulb, Eye, XCircle } from "lucide-react";
import { SuggestionStatus } from "../types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: SuggestionStatus;
    size?: "sm" | "md";
}

const statusConfig = {
    pending: {
        label: "Pending",
        icon: Clock,
        className: "bg-muted/50 text-muted-foreground border-input"
    },
    "under-review": {
        label: "Under Review",
        icon: Eye,
        className: "bg-muted/50 text-foreground border-input"
    },
    planned: {
        label: "Planned",
        icon: Lightbulb,
        className: "bg-muted/50 text-foreground border-input"
    },
    implemented: {
        label: "Implemented",
        icon: CheckCircle2,
        className: "bg-green-500/10 text-green-600 border-green-500/20"
    },
    declined: {
        label: "Declined",
        icon: XCircle,
        className: "bg-muted/50 text-muted-foreground border-input"
    }
};

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
    const config = statusConfig[status];
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

