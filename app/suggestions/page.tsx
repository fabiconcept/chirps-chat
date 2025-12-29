import HangMan from "@/components/HangMan";
import ChatHanger from "@/components/ChatHanger";
import { initialUsers } from "@/constants/User.const";
import { SuggestionsContainer } from "@/components/Suggestions";
import ProfileCard from "@/components/ProfileCard";

export default function SuggestionsPage() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full max-sm:px-3">
            <HangMan className="top-32 sticky max-[1200px]:hidden">
                <ProfileCard />
            </HangMan>
            <SuggestionsContainer />
            <HangMan className="relative max-sm:hidden">
                <ChatHanger type="feed" usersList={initialUsers.slice(0, 5)} />
            </HangMan>
        </div>
    )
}