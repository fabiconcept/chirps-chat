import { Skeleton } from "@/components/ui/skeleton";

export default function TextPostSkeleton() {
    return (
        <>
            {/* Text content skeleton */}
            <div className="px-6 my-2 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Image gallery skeleton */}
            <div className="px-4 mt-3 grid grid-cols-3 gap-2">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
            </div>
        </>
    );
}