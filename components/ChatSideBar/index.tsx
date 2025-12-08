"use client"

import { rooms } from "@/constants/User.const";
import DirectMessages from "../ChatHanger/DirectMessages";
import ChatHanger from "../ChatHanger";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../Providers/AuthProvider";

export default function ChatSideBar() {
    const { isMobile } = useAuth();
    const searchParams = useSearchParams();
    const user = searchParams.get("user");
    const isOpen = searchParams.get("hide-menu") === "true";

    const isHidden = !!user || isOpen;

    const initial = {
        opacity: 0, 
        x: isHidden ? -40 : 0,
        width: isHidden ? 0 : "auto",
        marginRight: isHidden ? -0 : "0.75rem",    
    }

    const animate = {
        opacity: isHidden ? 0 : 1, 
        x: isHidden ? -40 : 0,
        width: isHidden ? 0 : "auto",
        marginRight: isHidden ? -0 : "0.75rem",
    }

    return (
        <motion.div 
            className="flex flex-col md:gap-3 gap-2 h-full overflow-hidden max-[807px]:mr-3"
            initial={isMobile ? initial : undefined}
            animate={isMobile ? animate : undefined}
            transition={{ duration: 0.2 }}
        >
            <DirectMessages />
            <ChatHanger type="in-chat" usersList={rooms} />
        </motion.div>
    )
}
