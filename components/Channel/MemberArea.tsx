"use client";

import ChatHanger from "../ChatHanger";
import { motion, AnimatePresence } from "framer-motion";

interface MemberAreaProps {
    isOpen: boolean;
}

export default function MemberArea({ isOpen }: MemberAreaProps) {
    return (
        <AnimatePresence mode="wait">
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
                    className="overflow-hidden"
                >
                    <div className="w-20">
                        <ChatHanger type="side" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
