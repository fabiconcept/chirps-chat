import DirectMessagesSelector from "@/components/DirectMessagesSelector";

export default function ChatPage() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap flex-1 sticky top-32">
            <DirectMessagesSelector />
        </div>
    )
}