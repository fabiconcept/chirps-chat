import ChatHanger from "@/components/ChatHanger";
import Feed from "@/components/Feed";
import CommunityRecommendation from "@/components/CommunityRecommendation";
import ProfileCard from "@/components/ProfileCard";

export default function Page() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full">
            <div className="top-28 sticky space-y-3">
                <ProfileCard />
                <CommunityRecommendation />
            </div>
            <Feed />
            <ChatHanger />
        </div>
    )
}