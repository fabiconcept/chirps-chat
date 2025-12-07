import Header from "./Header";
import ChatContent from "./ChatContent";
import MessageBox from "../DMs/ChatContainer/MessageBox";

export default function Channel() {
    return (
        <div className="flex-1 overflow-hidden bg-foreground/5 h-full rounded-r-2xl border border-input flex flex-col">
            <Header />
            <ChatContent />
            <MessageBox />
        </div>
    )
}