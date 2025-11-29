import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileAvatarProps {
    avatarUrl: string;
    fallback: string;
    avatarClass: string;
    avatarPadding: string;
}

export default function ProfileAvatar({
    avatarUrl,
    fallback,
    avatarClass,
    avatarPadding
}: ProfileAvatarProps) {
    return (
        <Avatar className={`${avatarClass} ml-2 ${avatarPadding} border-2 border-input bg-background transition-all duration-300 rounded-full grid place-items-center overflow-hidden z-10 relative cursor-pointer hover:bg-background/90 active:scale-90 active:-rotate-3`}>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
}
