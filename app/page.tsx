import Feed from "@/components/Feed";
import CommunityRecommendation from "@/components/CommunityRecommendation";
import ProfileCard from "@/components/ProfileCard";
import HangMan from "@/components/HangMan";
import ChatHanger from "@/components/ChatHanger";
import { initialUsers } from "@/constants/User.const";

export default function Page() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full">
            <HangMan className="top-32 sticky max-[1200px]:hidden">
                <ProfileCard />
                <div className="h-3" />
                <CommunityRecommendation />
            </HangMan>
            <Feed />
            <HangMan className="relative">
                <ChatHanger type="feed" usersList={initialUsers.slice(0, 6)} />
            </HangMan>
        </div>
    )
}