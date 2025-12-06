"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DmIntroCardSkeletonProps {
    className?: string;
}

export default function DmIntroCardSkeleton({ className }: DmIntroCardSkeletonProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center py-8 px-5 gap-4", className)}>
            {/* Avatar Skeleton */}
            <Skeleton className="size-20 rounded-full" />

            {/* Name Skeleton */}
            <Skeleton className="h-7 w-40" />

            {/* Username Skeleton */}
            <Skeleton className="h-4 w-24" />

            {/* Bio/Description Skeleton */}
            <div className="flex flex-col items-center gap-2 w-full max-w-md">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
            </div>
        </div>
    );
}
