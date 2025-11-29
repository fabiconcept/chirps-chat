import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProfileCardSkeletonProps {
    size?: "sm" | "md" | "lg";
    transparent?: boolean;
}

const sizeConfig = {
    sm: {
        container: "max-w-64",
        banner: "h-16",
        avatar: "h-12 w-12",
        avatarMargin: "-mt-6",
        nameWidth: "w-28",
        usernameWidth: "w-20",
        bioLines: 1,
        sectionPadding: "py-2",
        padding: "p-2",
        buttonHeight: "h-8"
    },
    md: {
        container: "max-w-80",
        banner: "h-24",
        avatar: "h-16 w-16",
        avatarMargin: "-mt-10",
        nameWidth: "w-40",
        usernameWidth: "w-28",
        bioLines: 2,
        sectionPadding: "py-3",
        padding: "p-3",
        buttonHeight: "h-9"
    },
    lg: {
        container: "max-w-96",
        banner: "h-32",
        avatar: "h-20 w-20",
        avatarMargin: "-mt-12",
        nameWidth: "w-48",
        usernameWidth: "w-32",
        bioLines: 2,
        sectionPadding: "py-4",
        padding: "p-4",
        buttonHeight: "h-10"
    }
};

export default function ProfileCardSkeleton({ size = "md", transparent = true }: ProfileCardSkeletonProps) {
    const config = sizeConfig[size];

    return (
        <div className={`p-2 ${config.container} rounded-2xl border border-input ${transparent ? "bg-foreground/5" : "bg-background/80 backdrop-blur-md"}`}>
            {/* Banner and Avatar */}
            <div>
                {/* Banner skeleton */}
                <div className={`${config.banner} relative overflow-hidden rounded-lg`}>
                    <Skeleton className="w-full h-full" />
                    {/* Rank badge skeleton */}
                    <div className="absolute top-2 right-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>
                {/* Avatar skeleton */}
                <Skeleton className={`${config.avatar} ${config.avatarMargin} ml-2 rounded-full`} />
            </div>

            {/* Profile Info */}
            <div className={cn("flex items-start gap-2 justify-between w-full", config.padding)}>
                <div className="flex-1 space-y-2">
                    {/* Name skeleton */}
                    <Skeleton className={`h-5 ${config.nameWidth}`} />
                    {/* Username skeleton */}
                    <Skeleton className={`h-4 ${config.usernameWidth}`} />
                </div>
                {/* Follow button skeleton */}
                <Skeleton className={`${config.buttonHeight} w-20 rounded-md`} />
            </div>

            {/* Bio skeleton */}
            <div className={cn(config.sectionPadding, config.padding, "space-y-2")}>
                {Array.from({ length: config.bioLines }).map((_, i) => (
                    <Skeleton 
                        key={i} 
                        className={`h-4 ${i === config.bioLines - 1 ? "w-3/4" : "w-full"}`} 
                    />
                ))}
            </div>

            {/* Badges skeleton (only for lg size) */}
            {size === "lg" && (
                <div className={cn("flex flex-wrap gap-1", config.padding, config.sectionPadding)}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                </div>
            )}

            {/* Stats skeleton */}
            <div className={cn("flex items-center justify-around border-t border-input", config.sectionPadding, config.padding)}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                ))}
            </div>

            {/* Profile button skeleton */}
            <div className={cn(config.padding)}>
                <Skeleton className={`w-full ${config.buttonHeight} rounded-md`} />
            </div>
        </div>
    );
}
