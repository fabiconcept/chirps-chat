"use client"

import { useEffect, useRef } from "react";
import { useHangMan } from "./HangMan";
import ChatHanger from "./ChatHanger";
import { initialUsers } from "@/constants/User.const";

export default function HomeHanger() {
    const { setBaseWidth } = useHangMan();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            setBaseWidth(ref.current.offsetWidth);
        }
    }, [ref, setBaseWidth]);
    
    return (
        <div ref={ref} className="fixed min-w-10">
            <ChatHanger type="feed" usersList={initialUsers.slice(0, 6)} />
        </div>
    )
}
