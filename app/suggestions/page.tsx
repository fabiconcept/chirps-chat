import HangMan from "@/components/HangMan";
import ChatHanger from "@/components/ChatHanger";
import { initialUsers } from "@/constants/User.const";

export default function SuggestionsPage() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full">
            <h1 className="flex-1">Suggestions</h1>
            <HangMan className="relative">
                <ChatHanger type="feed" usersList={initialUsers.slice(0, 5)} />
            </HangMan>
        </div>
    )
}