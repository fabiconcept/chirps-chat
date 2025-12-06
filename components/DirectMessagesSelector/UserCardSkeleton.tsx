"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface UserCardSkeletonProps {
    variant?: "default" | "compact" | "detailed";
    isLast?: boolean;
    className?: string;
}

const variantStyles = {
    default: "p-2 py-3",
    compact: "p-1.5 py-2",
    detailed: "p-3 py-4",
};

export default function UserCardSkeleton({ 
    variant = "default",
    isLast = false,
    className
}: UserCardSkeletonProps) {
    return (
        <div 
            className={cn(
                "flex items-center gap-2 max-w-xs",
                variantStyles[variant],
                { "rounded-b-2xl": isLast },
                className
            )}
        >
            {/* Avatar skeleton */}
            <Skeleton className="size-10 rounded-full shrink-0" />
            
            {/* Content skeleton */}
            <div className="flex-1 flex gap-2 items-center pr-2 min-w-0">
                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                    {/* Name skeleton */}
                    <Skeleton className="h-4 w-28" />
                    
                    {/* Message skeleton */}
                    <Skeleton className="h-3 w-40" />
                </div>
                
                {/* Timestamp and badge skeleton */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="size-4 rounded-full" />
                </div>
            </div>
        </div>
    );
}
