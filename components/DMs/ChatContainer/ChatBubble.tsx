import ProfileAvatar from "@/components/ProfileCard/ProfileAvatar";
import MarkDownRender from "./MarkDownRender";

export interface ChatBubbleProps {
    avatarUrl: string;
    name: string;
    content: string;
    timestamp: string;
}

export default function ChatBubble({ avatarUrl, name, content, timestamp }: ChatBubbleProps) {
    return (
        <div className="flex items-start gap-2 w-full transition-colors duration-200 dark:hover:bg-[#282828]/50 hover:bg-[#F3F3F3]/75 px-3 py-2">
            <ProfileAvatar
                avatarUrl={avatarUrl}
                fallback={name[0]}
                size="sm"
                className="border border-foreground/25 rounded-full mt-3"
            />
            <div className="flex flex-col text-sm gap-1 w-full relative z-10">
                <div className="text-base flex flex-col p-2">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{name}</span>
                        <span className="text-xs text-muted-foreground">{timestamp}</span>
                    </div>
                    <MarkDownRender content={content} />
                </div>
            </div>
        </div>
    )
}
