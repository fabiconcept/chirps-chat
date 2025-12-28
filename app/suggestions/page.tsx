import HangMan from "@/components/HangMan";
import ChatHanger from "@/components/ChatHanger";
import { initialUsers } from "@/constants/User.const";
import { SuggestionsContainer } from "@/components/Suggestions";

export default function SuggestionsPage() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full md:p-5 p-2">
            <SuggestionsContainer />
            <HangMan className="relative">
                <ChatHanger type="feed" usersList={initialUsers.slice(0, 5)} />
            </HangMan>
        </div>
    )
}