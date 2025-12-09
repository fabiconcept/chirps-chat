"use client"
import DirectMessagesSelector from "@/components/DirectMessagesSelector";
import DMs from "@/components/DMs";
import ProtectedImage from "@/components/Feed/TextPost/ProtectedImage";
import { useAuth } from "@/components/Providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
    const { isMobile, isTablet } = useAuth();
    const searchParams = useSearchParams();
    const user = searchParams.get("user");
    const { theme } = useTheme();

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
                    {user ? 
                    <DMs /> : 
                    <div className="flex-1 bg-background relative h-full grid place-items-center sm:rounded-r-2xl max-[900px]:rounded-2xl border border-input">
                        <div className="flex flex-col items-center gap-4">
                            <ProtectedImage
                                src={theme === 'dark' ? "/chirps-chat-logo-white.svg" : "/chirps-chat-logo.svg"}
                                alt="Chirps Logo"
                                className='z-20 -mt-1 object-contain opacity-50'
                                width={48}
                                height={48}
                                priority
                            />
                            <h1 className='opacity-50 text-3xl text-foreground max-sm:hidden -translate-x-2.5 z-10 text-center'>Check <span className="ave">your DMs</span> Now!</h1>
                            <p className='text-sm text-muted-foreground z-10 text-center absolute bottom-10 font-semibold'>Kinda Encrypted &quot;end-to-end&quot; <span className="text-sm opacity-75">maybe</span></p>
                        </div>
                    </div>
                    }
                </>
            )}
        </div>
    )
}