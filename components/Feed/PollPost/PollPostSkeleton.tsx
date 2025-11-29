import { Skeleton } from "@/components/ui/skeleton";

export default function PollPostSkeleton() {
    return (
        <>
            {/* Text content skeleton */}
            <div className="px-6 my-2 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Poll skeleton */}
            <div className="px-6 mt-4 space-y-3">
                {/* Poll question skeleton */}
                <Skeleton className="h-5 w-3/4" />
                
                {/* Poll options skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                </div>

                {/* Poll end date skeleton */}
                <Skeleton className="h-3 w-32" />
            </div>
        </>
    );
}
