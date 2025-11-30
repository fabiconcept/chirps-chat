"use client";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import plusChecked from "@/components/lottie/plus-checked.json";
import explode from "@/components/lottie/explode.json";
import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface JoinButtonProps {
    initialJoined?: boolean;
    onJoinChange?: (isJoined: boolean) => void;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export default function JoinButton({ 
    initialJoined = false, 
    onJoinChange,
    className = "",
    size = "sm"
}: JoinButtonProps) {
    const [isJoined, setIsJoined] = useState(initialJoined);
    const [showCheckmark, setShowCheckmark] = useState(false);
    const [showExplosion, setShowExplosion] = useState(false);

    const handleJoin = () => {
        const newJoinedState = !isJoined;
        setIsJoined(newJoinedState);
        
        if (newJoinedState) {
            setShowExplosion(true);
            setShowCheckmark(true);
        } else {
            setShowCheckmark(false);
            setShowExplosion(false);
        }

        onJoinChange?.(newJoinedState);
    };

    const handleAnimationComplete = () => {
        setTimeout(() => {
            setShowCheckmark(false);
            setShowExplosion(false);
        }, 500);
    };

    // Size configurations
    const sizeConfig = {
        sm: {
            iconSize: 14,
            padding: "px-3 py-1.5",
            text: "text-sm",
            lottieSize: "w-2.5 h-2.5"
        },
        md: {
            iconSize: 16,
            padding: "px-4 py-2",
            text: "text-base",
            lottieSize: "w-3 h-3"
        },
        lg: {
            iconSize: 18,
            padding: "px-5 py-2.5",
            text: "text-lg",
            lottieSize: "w-4 h-4"
        }
    };

    const config = sizeConfig[size];

    return (
        <div className={`relative ${className}`}>
            <AnimatePresence>
                {showExplosion && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-[200%] absolute -top-24 -left-12"
                    >
                        <Lottie
                            animationData={explode}
                            autoPlay
                            onComplete={handleAnimationComplete}
                            loop={false}
                            style={{
                                animationDuration: "0.5s",
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                variant={!isJoined ? "default" : "outline"}
                className={cn(
                    "relative z-20 shrink-0 bg-[#7600C9] hover:bg-[#7600C9]/90 text-white", 
                    config.padding, 
                    config.text,
                    isJoined && "bg-transparent hover:bg-transparent text-foreground"
                )}
                onClick={handleJoin}
            >
                <AnimatePresence mode="wait">
                    {!isJoined ? (
                        <motion.div
                            key="userplus"
                            initial={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <Plus size={config.iconSize} />
                        </motion.div>
                    ) : showCheckmark ? (
                        <motion.div
                            key="checkmark"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <Lottie
                                animationData={plusChecked}
                                className={cn(config.lottieSize, "dark:invert")}
                                autoPlay
                                loop={false}
                                style={{
                                    animationDuration: "0.5s",
                                }}
                            />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                {!isJoined ? "Join" : "Joined"}
            </Button>
        </div>
    );
}
