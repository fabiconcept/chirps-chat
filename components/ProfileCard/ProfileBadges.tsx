import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { BirdIcon, GiftIcon, Shield, VerifiedIcon } from "lucide-react";

interface ProfileBadgesProps {
    badges: Array<{
        icon: React.ReactNode;
        label: string;
    }>;
    sectionPadding: string;
    padding: string;
}

export default function ProfileBadges({
    badges,
    sectionPadding,
    padding
}: ProfileBadgesProps) {
    return (
        <div className={cn("flex flex-wrap gap-1", padding, sectionPadding)}>
            {badges.map((badge, index) => (
                <Badge
                    key={index}
                    variant="outline"
                    className="bg-[#7600C9]/10 text-[#7600C9] dark:text-white"
                >
                    {badge.icon}
                    {badge.label}
                </Badge>
            ))}
        </div>
    );
}

// Default badges export for convenience
export const defaultBadges = [
    { icon: <Shield />, label: "Premium" },
    { icon: <VerifiedIcon />, label: "Verified" },
    { icon: <BirdIcon />, label: "Early Adopter" },
    { icon: <GiftIcon />, label: "Contributor" }
];
