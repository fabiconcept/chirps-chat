"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderSkeleton() {
    return (
        <div className="flex items-center justify-between gap-5 p-2 px-0">
            {/* Profile section skeleton */}
            <div className="flex items-center gap-2 px-1 pr-3 py-1">
                {/* Avatar skeleton */}
                <Skeleton className="size-12 rounded-full" />
                
                {/* Name and status skeleton */}
                <div className="grid gap-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>

            {/* Star button skeleton */}
            <Skeleton className="size-6 rounded-full" />
        </div>
    );
}
