"use client";
import { cn } from "@/lib/utils";
import StatsSheet from "./StatsSheet";
import { Button } from "../ui/button";
import ProfileBanner from "./ProfileBanner";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfileBio from "./ProfileBio";
import ProfileBadges, { defaultBadges } from "./ProfileBadges";


interface ProfileCardProps {
    size?: "sm" | "md" | "lg";
    canFollow?: boolean;
    transparent?: boolean;
}

const sizeConfig = {
    sm: {
        container: "max-w-64",
        banner: "max-h-16",
        avatar: "-mt-6 h-12 w-12",
        rankBadge: "h-6 w-6 p-1",
        avatarPadding: "p-1.5",
        nameText: "text-base max-w-28",
        usernameText: "text-xs",
        bioText: "text-xs",
        sectionPadding: "py-2",
        padding: "p-2"
    },
    md: {
        container: "max-w-80",
        banner: "max-h-24",
        avatar: "-mt-10 h-16 w-16",
        rankBadge: "h-8 w-8 p-1",
        avatarPadding: "p-2",
        nameText: "text-lg max-w-40",
        usernameText: "text-sm",
        bioText: "text-sm",
        sectionPadding: "py-3",
        padding: "p-3"
    },
    lg: {
        container: "max-w-96",
        banner: "max-h-32",
        avatar: "-mt-12 h-20 w-20",
        rankBadge: "h-10 w-10 p-1",
        avatarPadding: "p-2.5",
        nameText: "text-xl max-w-48",
        usernameText: "text-base",
        bioText: "text-base",
        sectionPadding: "py-4",
        padding: "p-4"
    }
};

export default function ProfileCard({ size = "md", canFollow = true, transparent = true }: ProfileCardProps) {
    const config = sizeConfig[size];

    const handleFollow = () => {
        // Handle follow action
    };


    return (
        <div className={`p-2 ${config.container} rounded-4xl border border-input ${transparent ? "bg-foreground/5": "bg-background/80 backdrop-blur-md"}`}>
            <div>
                <ProfileBanner
                    bannerUrl="https://chirps-chat.sirv.com/cache/bg.jpg"
                    rankBadgeSize={size}
                    earnedDate="October 19, 2025"
                    rank="captain"
                    bannerHeight={config.banner}
                    rankBadgeClass={config.rankBadge}
                />
                <ProfileAvatar
                    avatarUrl="https://chirps-chat.sirv.com/leopard.png"
                    fallback="HK"
                    avatarClass={config.avatar}
                    avatarPadding={config.avatarPadding}
                />
            </div>
            
            <ProfileInfo
                name="Favour Ajokubi"
                username="@fabiconcept"
                isVerified={true}
                canFollow={canFollow}
                size={size}
                nameTextClass={config.nameText}
                usernameTextClass={config.usernameText}
                padding={config.padding}
                onFollowChange={handleFollow}
            />

            <ProfileBio
                bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit."
                size={size}
                bioTextClass={config.bioText}
                sectionPadding={config.sectionPadding}
                padding={config.padding}
            />

            {size === "lg" && (
                <ProfileBadges
                    badges={defaultBadges}
                    sectionPadding={config.sectionPadding}
                    padding={config.padding}
                />
            )}
            
            <StatsSheet 
                size={size} 
                followers={1200}
                likes={71000000000}
                chirps={10393}
                className={config.sectionPadding}
            />
            
            <div className={cn(config.padding)}>
                <Button className={"w-full"} variant={"default"} size={"default"}>
                    Profile
                </Button>
            </div>
        </div>
    );
}