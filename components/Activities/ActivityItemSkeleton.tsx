import { Skeleton } from "@/components/ui/skeleton";

interface ActivityItemSkeletonProps {
    /**
     * Whether to show an action button on the right (like "Follow back")
     */
    showActionButton?: boolean;
    /**
     * Whether to show a thumbnail image on the right (like post preview)
     */
    showThumbnail?: boolean;
}

export default function ActivityItemSkeleton({
    showActionButton = false,
    showThumbnail = false
}: ActivityItemSkeletonProps) {
    return (
        <div className="border-y border-input/50 p-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
                {/* Avatar skeleton */}
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                
                {/* Content skeleton */}
                <div className="flex-1 space-y-1.5">
                    {/* First line - username and action */}
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-3.5 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                    {/* Second line - timestamp */}
                    <Skeleton className="h-3 w-full" />
                </div>
            </div>

            {/* Right side - either action button or thumbnail */}
            {showActionButton && (
                <Skeleton className="h-8 w-24 rounded-md shrink-0" />
            )}
            
            {showThumbnail && (
                <Skeleton className="h-16 w-16 rounded-2xl shrink-0" />
            )}
        </div>
    );
}
