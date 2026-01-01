import ChatSideBar from "@/components/ChatSideBar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row sm:gap-1 gap-0 items-start flex-wrap w-full md:sticky md:top-32 h-full overflow-hidden max-sm:px-0">
            <ChatSideBar />
            {children}
        </div>
    )
}