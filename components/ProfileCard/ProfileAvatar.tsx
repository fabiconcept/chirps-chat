import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
    avatarUrl: string;
    fallback: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    avatarClass?: string;
    avatarPadding?: string;
    className?: string;
    status?: "online" | "offline" | "away";
}

const sizeClasses = {
    xs: "w-6 h-6 border-none",
    sm: "w-8 h-8 border-none",
    md: "w-10 h-10 border-none",
    lg: "w-12 h-12 border-none",
    xl: "w-16 h-16 border-none",
    xxl: "w-20 h-20 border-none"
};

const statusSizeClasses = {
    xs: "w-1.5 h-1.5 bottom-0 right-0",
    sm: "w-2 h-2 bottom-0 right-0",
    md: "w-2.5 h-2.5 bottom-0.5 right-0.5",
    lg: "w-3 h-3 bottom-0.5 right-0.5 border-2",
    xl: "w-3.5 h-3.5 bottom-1 right-1 border-2",
    xxl: "w-4 h-4 bottom-1 right-1 border-2"
};

export default function ProfileAvatar({
    avatarClass,
    avatarPadding,
    avatarUrl,
    className,
    fallback,
    size = "md",
    status
}: ProfileAvatarProps) {
    const avatarSizeClass = sizeClasses[size];
    const statusSizeClass = statusSizeClasses[size];

    return (
        <div className={cn(
            "relative w-fit h-fit cursor-pointer active:scale-90 active:-rotate-3 transition-all duration-300 group",
            className
        )}>
            <Avatar className={cn(
                "ml-2 border-2 border-input bg-background transition-all duration-300 rounded-full grid place-items-center overflow-hidden z-10 relative group-hover:bg-background/90",
                avatarSizeClass,
                avatarClass,
                avatarPadding || "p-0.5"
            )}>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            {status && (
                <>
                    {status === "online" && <div className={`absolute ${statusSizeClass} bg-green-500 rounded-full border-2 border-background z-10`} />}
                    {status === "away" && <div className={`absolute ${statusSizeClass} bg-yellow-500 rounded-full border-2 border-background z-10`} />}
                    {status === "offline" && <div className={`absolute ${statusSizeClass} bg-red-500 rounded-full border-2 border-background z-10`} />}
                </>
            )}
        </div>
    );
}