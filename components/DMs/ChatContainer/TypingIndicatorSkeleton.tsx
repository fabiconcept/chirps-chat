"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TypingIndicatorSkeletonProps {
    className?: string;
}

export default function TypingIndicatorSkeleton({ className }: TypingIndicatorSkeletonProps) {
    return (
        <div
            className={cn(
                "flex items-center w-full px-5 py-2 animate-pulse",
                className
            )}
        >
            {/* Avatars Skeleton */}
            <div className="relative w-fit h-fit flex items-center -space-x-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="size-6 rounded-full" />
            </div>

            {/* Typing Text and Dots Skeleton */}
            <div className="flex flex-col text-sm w-full relative z-10">
                <div className="text-sm flex items-center p-2 gap-2">
                    <Skeleton className="h-4 w-32" />
                    
                    {/* Animated dots skeleton */}
                    <div className="flex items-center gap-1">
                        <Skeleton className="size-1.5 rounded-full" />
                        <Skeleton className="size-1.5 rounded-full" />
                        <Skeleton className="size-1.5 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
