import { MARKDOWN_EXAMPLES } from "@/constants/Messages.const";
import ChatBubble from "./ChatBubble";
import ChatSeperator, { ChatSeperatorType } from "./ChatSeperator";
import DmIntroCard from "./DmIntroCard";
import { isGapGreaterThan24Hours } from "@/lib/utils";
import TypingIndicator from "./TypingIndicator";

export default function ChatContainer() {
    // Find the first unread message index
    const firstUnreadIndex = MARKDOWN_EXAMPLES.findIndex(msg => msg.isUnread);

    return (
        <div className="flex-1 bg-background rounded-t-3xl relative overflow-y-auto border border-b-0 border-input">
            <div className="no-scrollbar flex flex-col justify-end">
                <DmIntroCard />
                {MARKDOWN_EXAMPLES.map((message, index) => {
                    const currentDate = new Date(message.timestamp);
                    const previousDate = index > 0 ? new Date(MARKDOWN_EXAMPLES[index - 1].timestamp) : null;
                    
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
                    users={MARKDOWN_EXAMPLES.slice(0, 19)}
                />
            </div>
        </div>
    )
}
