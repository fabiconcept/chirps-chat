import ChatHanger from "@/components/ChatHanger";
import HangMan from "@/components/HangMan";
import { initialUsers } from "@/constants/User.const";

export default function LeaderboardPage() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full">
            <h1 className="flex-1">Leaderboard</h1>
            <HangMan className="relative">
                <ChatHanger type="feed" usersList={initialUsers.slice(0, 6)} />
            </HangMan>
        </div>
    )
}