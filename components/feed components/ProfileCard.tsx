"use client";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "./FollowButton";
import RankBadge from "./RankBadge";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { BirdIcon, GiftIcon, Quote, Shield, VerifiedIcon } from "lucide-react";
import StatsSheet from "./StatsSheet";
import { Button } from "../ui/button";

interface ProfileCardProps {
    size?: "sm" | "md" | "lg";
    canFollow?: boolean;
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

export default function ProfileCard({ size = "md", canFollow = true }: ProfileCardProps) {
    const config = sizeConfig[size];

    const handleFollow = () => {
        // Handle follow action
    };

    return (
        <div className={`p-2 ${config.container} bg-foreground/5 rounded-2xl border border-input`}>
            <div>
                <div className={`${config.banner} relative overflow-hidden rounded-lg`}>
                    <Image
                        src="https://chirps-chat.sirv.com/cache/bg.jpg"
                        alt="Profile"
                        width={1000}
                        height={1000}
                        className="object-cover"
                    />
                    <div className={cn("absolute top-2 right-2 bg-background/20 grid place-items-center rounded-full", config.rankBadge)}>
                        <RankBadge
                            earnedDate="October 19, 2025"
                            rank="captain"
                            size={size}
                            variant="default"
                            showHover={true}
                        />
                    </div>
                </div>
                <div className={`${config.avatar} ml-2 ${config.avatarPadding} border-2 border-input bg-background transition-all duration-300 rounded-full grid place-items-center overflow-hidden z-10 relative cursor-pointer hover:bg-background/90 active:scale-90 active:-rotate-3`}>
                    <Image
                        src="https://chirps-chat.sirv.com/leopard.png"
                        alt="Profile"
                        width={100}
                        fetchPriority="high"
                        height={100}
                        className="object-contain h-full w-full"
                    />
                </div>
            </div>
            <div className={cn("flex items-start justify-between w-full", config.padding)}>
                <div className="flex-1">
                    <div className="flex items-center">
                        <h3 contentEditable className={`${config.nameText} truncate pr-3 font-semibold`}>
                            Favour Ajokubi
                        </h3>
                        <span className="ml-[-4%] text-blue-600">
                            <VerifiedIcon className="ml-1" size={size === "sm" ? 12 : 16} strokeWidth={size === "sm" ? 2 : 2.5} />
                        </span>
                    </div>
                    <Link
                        href="#@fabiconcept"
                        className={`${config.usernameText} truncate text-muted-foreground hover:text-[#7600C9] transition-colors duration-300 pr-3`}
                    >
                        @fabiconcept
                    </Link>
                </div>
                {canFollow &&
                    <FollowButton
                        initialFollowing={false}
                        variant={size === "sm" ? "text" : "button"}
                        size={size}
                        onFollowChange={handleFollow}
                    />
                }
            </div>

            <div className={cn(config.sectionPadding, config.padding)}>
                <p className={cn(config.bioText)}><Quote className="inline scale-x-[-1] -mt-2 mr-1" size={size === "sm" ? 12 : 16}/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit. <Quote className="inline -mt-2 ml-1" size={size === "sm" ? 12 : 16}/></p>
            </div>

            {size !== "sm" && <div className={cn("flex flex-wrap gap-1", config.padding, config.sectionPadding)}>
                <Badge variant="outline" className="bg-[#7600C9]/10 text-[#7600C9] dark:text-white">
                    <Shield/>
                    Premium
                </Badge>
                <Badge variant="outline" className="bg-[#7600C9]/10 text-[#7600C9] dark:text-white">
                    <VerifiedIcon />
                    Verified
                </Badge>
                <Badge variant="outline" className="bg-[#7600C9]/10 text-[#7600C9] dark:text-white">
                    <BirdIcon/>
                    Early Adopter
                </Badge>
                <Badge variant="outline" className="bg-[#7600C9]/10 text-[#7600C9] dark:text-white">
                    <GiftIcon/>
                    Contributor
                </Badge>
            </div>}
            <StatsSheet 
                size={size} 
                followers={1200}
                likes={71000000000}
                chirps={10393}
                className={config.sectionPadding}/>
            <div className={cn(config.padding)}><Button className={"w-full"} variant={"default"} size={"default"}>Profile</Button></div>
        </div>
    );
}