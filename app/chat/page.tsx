"use client"
import DirectMessagesSelector from "@/components/DirectMessagesSelector";
import DMs from "@/components/DMs";
import { useAuth } from "@/components/Providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
    const { isMobile, isTablet } = useAuth();
    const searchParams = useSearchParams();
    const user = searchParams.get("user");

    const cardShuffleVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 30 : -30,
            opacity: 0,
            rotateY: direction > 0 ? 15 : -15,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 30 : -30,
            opacity: 0,
            rotateY: direction < 0 ? 15 : -15,
            scale: 0.9,
        }),
    };

    const transition = {
        x: { type: "spring" as const, stiffness: 500, damping: 35, duration: 0.25 },
        opacity: { duration: 0.2 },
        rotateY: { duration: 0.05 },
        scale: { duration: 0.05 },
    };

    return (
        <div className="flex overflow-hidden flex-row items-start flex-wrap flex-1 md:h-[calc(100dvh-2.5rem)] sm:h-[calc(100dvh-1.5rem)] h-[calc(100dvh-2rem)]">
            {(isMobile || isTablet) ? (
                <AnimatePresence mode="popLayout" initial={false} custom={user ? 1 : -1}>
                    {user ? (
                        <motion.div
                            key="dms"
                            custom={1}
                            variants={cardShuffleVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                            className="w-full h-full"
                            style={{ perspective: 1000 }}
                        >
                            <DMs />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="selector"
                            custom={-1}
                            variants={cardShuffleVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                            className="w-full h-full"
                            style={{ perspective: 1000 }}
                        >
                            <DirectMessagesSelector />
                        </motion.div>
                    )}
                </AnimatePresence>
            ) : (
                <>
                    <DirectMessagesSelector />
                    <DMs />
                </>
            )}
        </div>
    )
}