import Header from "./Header";
import ChatContent from "./ChatContent";
import MessageBox from "../DMs/ChatContainer/MessageBox";
import MemberArea from "./MemberArea";

export default function Channel() {
    return (
        <div className="flex-1 overflow-hidden bg-foreground/5 h-full sm:rounded-r-3xl max-[900px]:rounded-t-3xl border border-input flex items-stretch">
            <div className="flex flex-col h-full flex-1 w-full">
                <Header />
                <ChatContent />
                <MessageBox />
            </div>
            <MemberArea />
        </div>
    )
}