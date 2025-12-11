import ChatBubble from "@/components/DMs/ChatContainer/ChatBubble";
import ChatSeperator, { ChatSeperatorType } from "@/components/DMs/ChatContainer/ChatSeperator";
import DmIntroCard from "@/components/DMs/ChatContainer/DmIntroCard";
import TypingIndicator from "@/components/DMs/ChatContainer/TypingIndicator";
import { CHANNEL_CHAT_EXAMPLES } from "@/constants/Messages.const";
import { isGapGreaterThan24Hours } from "@/lib/utils";

export default function ChatContent() {
    const firstUnreadIndex = CHANNEL_CHAT_EXAMPLES.findIndex(msg => msg.isUnread);

    return (
        <div className="flex-1 bg-background w-full relative overflow-y-auto border border-b-0 border-input">
            <div className="no-scrollbar flex flex-col justify-end">
                <DmIntroCard variant="channel" isOwner={true} />
                {CHANNEL_CHAT_EXAMPLES.map((message, index) => {
                    const currentDate = new Date(message.timestamp);
                    const previousDate = index > 0 ? new Date(CHANNEL_CHAT_EXAMPLES[index - 1].timestamp) : null;

                    // Check if we need a date separator (only if gap > 24 hours)
                    const needsDateSeparator = !previousDate || isGapGreaterThan24Hours(currentDate, previousDate);

                    // Check if we need a "New Message" separator
                    const needsNewMessageSeparator = firstUnreadIndex !== -1 && index === firstUnreadIndex;

                    return (
                        <div key={index}>
                            {needsDateSeparator && (
                                <ChatSeperator
                                    type={ChatSeperatorType.Date}
                                    date={message.timestamp}
                                />
                            )}
                            {needsNewMessageSeparator && (
                                <ChatSeperator type={ChatSeperatorType.NewMessage} />
                            )}
                            <ChatBubble {...message} />
                        </div>
                    );
                })}
                <TypingIndicator
                    users={CHANNEL_CHAT_EXAMPLES.slice(0, 19)}
                />
            </div>
        </div>
    )
}