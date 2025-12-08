"use client"
import Channel from "@/components/Channel";
import RoomSelector from "@/components/RoomSelector";
import { notFound, useParams } from "next/navigation";
import { useAuth } from "@/components/Providers/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function page() {
    const { roomId } = useParams<{ roomId: string }>();
    const { isMobile, isTablet } = useAuth();
    const channel = useSearchParams().get("channel");

    // Validate room ID pattern (must be "room-" followed by text)
    const isValidPattern = /^room-[a-zA-Z0-9]+$/.test(roomId);

    if (!isValidPattern) {
        console.log("Invalid room ID pattern", roomId);
        notFound();
    }

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

        <div className="flex flex-row overflow-hidden items-start flex-wrap flex-1 md:h-[calc(100dvh-2.5rem)] sm:h-[calc(100dvh-1.5rem)] h-[calc(100dvh-2rem)]">
            {(isMobile || isTablet) ? (
                <AnimatePresence mode="popLayout" initial={false} custom={channel ? 1 : -1}>
                    {channel ? (
                        <motion.div
                            key="channel"
                            custom={1}
                            variants={cardShuffleVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                            className="w-full h-full"
                            style={{ perspective: 1000 }}
                        >
                            <Channel />
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
                            <RoomSelector />
                        </motion.div>
                    )}
                </AnimatePresence>
            ) : (
                <>
                    <RoomSelector />
                    <Channel />
                </>
            )}
        </div>
    )
}