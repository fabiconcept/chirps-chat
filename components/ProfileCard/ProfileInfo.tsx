import Link from "next/link";
import { cn } from "@/lib/utils";
import BadgeCheckIcon from "../svgs/BadgeIconSvg";
import FollowButton from "./FollowButton";

interface ProfileInfoProps {
    name: string;
    username: string;
    isVerified?: boolean;
    canFollow?: boolean;
    size: "sm" | "md" | "lg";
    nameTextClass: string;
    usernameTextClass: string;
    padding: string;
    onFollowChange?: () => void;
}

export default function ProfileInfo({
    name,
    username,
    isVerified = true,
    canFollow = true,
    size,
    nameTextClass,
    usernameTextClass,
    padding,
    onFollowChange
}: ProfileInfoProps) {
    return (
        <div className={cn("flex items-start justify-between w-full", padding)}>
            <div className="flex-1">
                <div className="flex items-center">
                    <h3 className={`${nameTextClass} truncate pr-3 font-semibold`}>
                        {name}
                    </h3>
                    {isVerified && (
                        <span className="ml-[-3%] text-blue-600">
                            <BadgeCheckIcon size={size} />
                        </span>
                    )}
                </div>
                <Link
                    href={`#${username}`}
                    className={`${usernameTextClass} truncate text-muted-foreground hover:text-[#7600C9] transition-colors duration-300 pr-3`}
                >
                    {username}
                </Link>
            </div>
            {canFollow && (
                <FollowButton
                    initialFollowing={false}
                    variant={size === "sm" ? "text" : "button"}
                    size={size}
                    onFollowChange={onFollowChange}
                />
            )}
        </div>
    );
}
