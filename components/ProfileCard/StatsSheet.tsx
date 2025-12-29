import { cn, formatNumber } from "@/lib/utils";
import { Users, CoinsIcon, ThumbsUp } from "lucide-react";

interface StatsSheetProps {
    size?: "sm" | "md" | "lg";
    followers?: number;
    likes?: number;
    chirps?: number;
    className?: string;
}

const sizeVariants = {
    sm: {
        container: "gap-3",
        stat: "flex flex-col items-center gap-1",
        icon: "w-3.5 h-3.5",
        number: "text-sm font-semibold",
        label: "hidden",
        divider: "h-4 w-px"
    },
    md: {
        container: "gap-2",
        stat: "flex flex-col items-center",
        icon: "hidden",
        number: "text-lg font-semibold",
        label: "text-xs text-muted-foreground",
        divider: "h-8 w-px"
    },
    lg: {
        container: "gap-4",
        stat: "flex flex-col items-center gap-2",
        icon: "w-6 h-6",
        number: "text-2xl font-semibold",
        label: "text-sm text-muted-foreground",
        divider: "h-12 w-px"
    }
};

export default function StatsSheet({
    size = "md",
    followers = 12,
    likes = 12,
    chirps = 12,
    className = ""
}: StatsSheetProps) {
    const styles = sizeVariants[size];

    return (
        <div className={cn("flex", styles.container, className)}>
            <div className={cn("flex-1", styles.stat)}>
                <span className="flex w-full items-center gap-1 justify-center">
                    <Users className={cn(styles.icon, "text-muted-foreground")} />
                    <span className={styles.number}>{formatNumber(followers)}</span>
                </span>
                <span className={styles.label}>Followers</span>
            </div>
            <div className={cn(styles.divider, "bg-input")} />
            <div className={cn("flex-1 flex", styles.stat)}>
                <span className="flex w-full items-center gap-1 justify-center">
                    <ThumbsUp className={cn(styles.icon, "text-muted-foreground")} />
                    <span className={styles.number}>{formatNumber(likes)}</span>
                </span>
                <span className={styles.label}>Likes</span>
            </div>
            <div className={cn(styles.divider, "bg-input")} />
            <div className={cn("flex-1 flex", styles.stat)}>
                <span className="flex w-full items-center gap-1 justify-center">
                    <CoinsIcon className={cn(styles.icon, "text-muted-foreground")} />
                    <span className={cn(styles.number, "text-[#D4AF37] dark:brightness-150 digital")}>{formatNumber(chirps)}</span>
                </span>
                <span className={styles.label}>Chirps</span>
            </div>
        </div>
    );
}