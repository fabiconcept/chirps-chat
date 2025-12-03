import { cn } from "@/lib/utils";
import ProfileAvatar from "../ProfileCard/ProfileAvatar";

interface UserCardProps {
    url: string,
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl",
    name: string,
    message?: string,
    hasUnread?: boolean,
}

export default function UserCard({ 
    url,
    size,
    name,
    message,
    hasUnread
}: UserCardProps) {
    return (
        <div className={cn(
            "flex items-center gap-2 p-2 cursor-pointer active:scale-95 transition-[transform,translate,scale,rotate,color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to] duration-300 ease-in-out hover:bg-foreground/3 perspective-distant group",
            {"bg-foreground/10 hover:bg-foreground/5" : hasUnread}
        )}>
            <ProfileAvatar
                avatarUrl={url}
                fallback="HM"
                status="online"
                className="group-active:rotate-x-45 origin-bottom"
                size={size}
            />
            <div className="flex-1 flex gap-4 items-center pr-3">
                <div className="flex-1 flex flex-col w-full group-active:rotate-x-45 select-none transition-transform duration-300 origin-bottom">
                    <span className="font-medium">{name}</span>
                    <span className="text-xs max-w-56 min-w-20 truncate text-muted-foreground">{message}</span>
                </div>
                {hasUnread && <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />}
            </div>
        </div>
    )
}
