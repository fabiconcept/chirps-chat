import ChatHanger from "@/components/ChatHanger";
import Feed from "@/components/Feed";
import CommunityRecommendation from "@/components/CommunityRecommendation";
import ProfileCard from "@/components/ProfileCard";
import { initialUsers } from "@/constants/User.const";

export default function Page() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full">
            <div className="top-32 sticky space-y-3 max-[1200px]:hidden">
                <ProfileCard />
                <CommunityRecommendation />
            </div>
            <Feed />
            <ChatHanger usersList={initialUsers.slice(0, 6)} />
        </div>
    )
}