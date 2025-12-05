import { MARKDOWN_EXAMPLES } from "@/constants/Messages.const";
import ChatBubble from "./ChatBubble";

export default function ChatContainer() {
    return (
        <div className="flex-1 bg-background rounded-t-3xl relative overflow-y-auto border border-b-0 border-input">
            {/* <div className="container opacity-10 max-h-full overflow-hidden"></div> */}
            <div className="">
                {MARKDOWN_EXAMPLES.map((message, index) => (
                    <ChatBubble 
                        key={index}
                        {...message}
                    />
                ))}
            </div>
        </div>
    )
}
