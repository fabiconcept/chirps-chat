"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface UserSkeletonProps {
    className?: string;
}

export default function UserSkeleton({ className }: UserSkeletonProps) {
    return (
        <div 
            className={cn(
                "relative p-0 h-fit w-fit mx-2 rounded-full mt-2",
                className
            )}
        >
            {/* Avatar skeleton */}
            <Skeleton className="size-14 rounded-full" />
        </div>
    );
}
