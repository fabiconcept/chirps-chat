import ChatHanger from "@/components/ChatHanger";
import DirectMessages from "@/components/ChatHanger/DirectMessages";
import RoomSelector from "@/components/RoomSelector";

export default function ChatPage() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full sticky top-32">
            <div className="flex flex-col gap-3">
                <DirectMessages />
                <ChatHanger type="in-chat" />
            </div>
            <RoomSelector />
        </div>
    )
}