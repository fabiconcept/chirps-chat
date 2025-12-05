import Header from "./Header";
import ChatContainer from "./ChatContainer";

export default function DMs() {
    return (
        <div className="flex-1 bg-foreground/5 h-full rounded-r-2xl border border-input flex flex-col px-3">
            <Header />
            <ChatContainer />
        </div>
    )
}