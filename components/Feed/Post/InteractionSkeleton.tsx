import { Skeleton } from "@/components/ui/skeleton";

export default function InteractionSkeleton() {
    return (
        <div className="mt-3 border-t border-input py-2">
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-1">
                    {/* Like Button Skeleton */}
                    <div className="flex items-center gap-2 px-4 py-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-12" />
                    </div>

                    {/* Dislike Button Skeleton */}
                    <div className="flex items-center gap-2 px-4 py-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-12" />
                    </div>

                    {/* Comment Button Skeleton */}
                    <div className="flex items-center gap-2 px-4 py-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                </div>

                {/* View Count Skeleton */}
                <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </div>
    );
}
