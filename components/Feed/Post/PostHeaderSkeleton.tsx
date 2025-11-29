import { Skeleton } from "@/components/ui/skeleton";

export default function PostHeaderSkeleton() {
    return (
        <div className="flex items-center gap-2 px-2 pt-2 pr-4 justify-between">
            <div className="flex items-center gap-2 px-2 pr-4">
                {/* Avatar skeleton */}
                <Skeleton className="h-12 w-12 rounded-full" />
                
                {/* Name and username skeleton */}
                <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
            
            {/* Menu button skeleton */}
            <Skeleton className="h-8 w-8 rounded-full" />
        </div>
    );
}
