"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChatSeperatorSkeletonProps {
    className?: string;
    type?: "date" | "newMessage";
}

export default function ChatSeperatorSkeleton({ className, type = "date" }: ChatSeperatorSkeletonProps) {
    return (
        <div className={cn("flex items-center justify-center py-4 px-5", className)}>
            {type === "date" ? (
                <Skeleton className="h-6 w-32 rounded-full" />
            ) : (
                <div className="flex items-center gap-2 w-full">
                    <Skeleton className="h-px flex-1" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-px flex-1" />
                </div>
            )}
        </div>
    );
}
