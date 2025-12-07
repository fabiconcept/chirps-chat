import ChatHanger from "@/components/ChatHanger";
import DirectMessages from "@/components/ChatHanger/DirectMessages";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full sticky top-32 h-full">
            <div className="flex flex-col gap-3 h-full">
                <DirectMessages />
                <ChatHanger type="in-chat" />
            </div>
            {children}
        </div>
    )
}
