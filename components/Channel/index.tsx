"use client"

import Header from "./Header";
import ChatContent from "./ChatContent";
import MessageBox from "../DMs/ChatContainer/MessageBox";
import MemberArea from "./MemberArea";
import { useState } from "react";

export default function Channel() {
    const [showMembers, setShowMembers] = useState(false);

    return (
        <div className="flex-1 overflow-hidden bg-foreground/5 h-full rounded-r-2xl border border-input flex items-stretch">
            <div className="flex flex-col h-full flex-1">
                <Header 
                    showMembers={showMembers}
                    onToggleMembers={() => setShowMembers(!showMembers)}
                />
                <ChatContent />
                <MessageBox />
            </div>
            <MemberArea isOpen={showMembers} />
        </div>
    )
}