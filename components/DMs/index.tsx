import Header from "./Header";
import ChatContainer from "./ChatContainer";
import MessageBox from "./ChatContainer/MessageBox";
import ProfileContainer from "./ProfileContainer";

export default function DMs() {
    return (
        <div className="flex-1 overflow-hidden bg-foreground/5 h-full sm:rounded-r-2xl max-[807px]:rounded-2xl border border-input flex flex-col md:px-3">
            <Header />
            <ChatContainer />
            <MessageBox />
            <ProfileContainer />
        </div>
    )
}