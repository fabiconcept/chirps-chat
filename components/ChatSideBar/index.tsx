"use client"

import { rooms } from "@/constants/User.const";
import DirectMessages from "../ChatHanger/DirectMessages";
import ChatHanger from "../ChatHanger";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../Providers/AuthProvider";
import { useEffect } from "react";
import { removeSearchParam } from "@/lib/utils";
import { useMemo } from "react";

export default function ChatSideBar() {
    const { isMobile, isTablet } = useAuth();
    const searchParams = useSearchParams();
    const user = useMemo(()=>searchParams.get("user"), [searchParams]);
    const channel = useMemo(()=>searchParams.get("channel"), [searchParams]);
    const isOpen = useMemo(()=>searchParams.get("hide-menu") === "true", [searchParams]);

    useEffect(() => {
        if (isMobile) return;
        if (!isOpen) return;
        removeSearchParam("hide-menu");
    }, [isMobile, isOpen]);

    const isHidden = (!!user || !!channel) || isOpen;

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
            className="flex flex-col md:gap-3 gap-2 h-full overflow-hidden min-[900px]:mr-3 mr-2"
            initial={(isMobile || isTablet) ? initial : undefined}
            animate={(isMobile || isTablet) ? animate : undefined}
            transition={{ duration: 0.2 }}
        >
            <DirectMessages />
            <ChatHanger type="in-chat" usersList={rooms} />
        </motion.div>
    )
}
