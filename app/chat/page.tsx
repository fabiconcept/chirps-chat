import DirectMessagesSelector from "@/components/DirectMessagesSelector";
import DMs from "@/components/DMs";

export default function ChatPage() {
    return (
        <div className="flex overflow-hidden flex-row items-start flex-wrap flex-1 h-[calc(100dvh-2.5rem)] translate-y-2">
            <DirectMessagesSelector />
            <DMs />
        </div>
    )
}