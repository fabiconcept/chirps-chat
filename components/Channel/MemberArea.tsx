"use client";

import { channelMembers } from "@/constants/User.const";
import ChatHanger from "../ChatHanger";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SearchParamKeys } from "@/lib/enums";

export default function MemberArea() {
    const searchParams = useSearchParams();
    const isOpen = searchParams.get(SearchParamKeys.MEMBERS_AREA) === "true";
    
    return (
        <AnimatePresence mode="sync">
            {isOpen && (
                <motion.div
                    initial={{ 
                        width: 0, 
                        opacity: 0,
                        pointerEvents: "none" as const
                    }}
                    animate={{ 
                        width: "auto", 
                        opacity: 1,
                        pointerEvents: "auto" as const,
                        transition: {
                            width: { duration: 0.3, ease: "easeInOut" },
                            opacity: { duration: 0.25, delay: 0.05 }
                        }
                    }}
                    exit={{ 
                        width: 0, 
                        opacity: 0,
                        pointerEvents: "none" as const,
                        transition: {
                            width: { duration: 0.3, ease: "easeInOut", delay: 0.1 },
                            opacity: { duration: 0.1 }
                        }
                    }}
                    className="overflow-hidden shrink-0"
                >
                    <div className="w-20 h-full">
                        <ChatHanger type="side" usersList={[...channelMembers, ...channelMembers.map(user => ({ ...user, name: user.name + "2" }))]} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
