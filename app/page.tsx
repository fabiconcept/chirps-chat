import Feed from "@/components/Feed/index";
import CommunityRecommendation from "@/components/CommunityRecommendation";
import ProfileCard from "@/components/ProfileCard";
import HomeHanger from "@/components/HomeHanger";
import HangMan from "@/components/HangMan";

export default function Page() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full">
            <div className="top-32 sticky space-y-3 max-[1200px]:hidden">
                <ProfileCard />
                <CommunityRecommendation />
            </div>
            <Feed />
            <HangMan className="relative">
                <HomeHanger />
            </HangMan>
        </div>
    )
}