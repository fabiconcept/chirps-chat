"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChatBubbleSkeletonProps {
    className?: string;
    hasReply?: boolean;
}

export default function ChatBubbleSkeleton({ className, hasReply = false }: ChatBubbleSkeletonProps) {
    return (
        <div
            className={cn(
                "flex items-start gap-2 w-full px-5 py-2 animate-pulse",
                className
            )}
        >
            {/* Avatar Skeleton */}
            <div className="relative w-fit h-fit">
                <Skeleton className="size-10 rounded-full mt-3" />
            </div>

            <div className="flex flex-col text-sm gap-1 w-full">
                {/* Reply Skeleton */}
                {hasReply && (
                    <div className="flex items-center gap-2 w-full pr-3 mb-1">
                        <Skeleton className="size-5 rounded-full ml-2" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                )}

                {/* Message Content Skeleton */}
                <div className="text-sm flex flex-col p-2 gap-2">
                    {/* Name and Timestamp */}
                    <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-3 w-16" />
                    </div>

                    {/* Message Text Lines */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>
                </div>

                {/* Reactions Skeleton */}
                <div className="flex items-center gap-1 mt-1 ml-2">
                    <Skeleton className="h-6 w-12 rounded-full" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                </div>
            </div>
        </div>
    );
}
