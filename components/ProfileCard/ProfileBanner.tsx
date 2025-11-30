import Image from "next/image";
import { cn } from "@/lib/utils";
import RankBadge from "./RankBadge";

type RankKey =
    | 'private'
    | 'corporal'
    | 'sergeant'
    | 'staff-sergeant'
    | 'master-sergeant'
    | 'first-sergeant'
    | 'sergeant-major'
    | 'command-sergeant-major'
    | 'sergeant-major-of-army'
    | 'lieutenant'
    | 'captain'
    | 'major'
    | 'colonel'
    | 'general';

interface ProfileBannerProps {
    bannerUrl: string;
    rankBadgeSize: "sm" | "md" | "lg";
    earnedDate: string;
    rank: RankKey;
    bannerHeight: string;
    rankBadgeClass: string;
}

export default function ProfileBanner({
    bannerUrl,
    rankBadgeSize,
    earnedDate,
    rank,
    bannerHeight,
    rankBadgeClass
}: ProfileBannerProps) {
    return (
        <div className={`${bannerHeight} relative overflow-hidden rounded-lg rounded-t-3xl`}>
            <Image
                src={bannerUrl}
                alt="Profile"
                width={1000}
                height={1000}
                className="object-cover"
            />
            <div className={cn("absolute top-2 right-2 bg-background/20 grid place-items-center rounded-full", rankBadgeClass)}>
                <RankBadge
                    earnedDate={earnedDate}
                    rank={rank}
                    size={rankBadgeSize}
                    variant="default"
                    showHover={true}
                />
            </div>
        </div>
    );
}
