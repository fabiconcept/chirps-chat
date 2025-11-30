"use client";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import plusChecked from "@/components/lottie/plus-checked.json";
import explode from "@/components/lottie/explode.json";
import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
    initialFollowing?: boolean;
    onFollowChange?: (isFollowing: boolean) => void;
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "button" | "text";
}

export default function FollowButton({ 
    initialFollowing = false, 
    onFollowChange,
    className = "",
    size = "md",
    variant = "button"
}: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialFollowing);
    const [showCheckmark, setShowCheckmark] = useState(false);
    const [showExplosion, setShowExplosion] = useState(false);

    const handleFollow = () => {
        const newFollowingState = !isFollowing;
        setIsFollowing(newFollowingState);
        
        if (newFollowingState) {
            setShowExplosion(true);
            setShowCheckmark(true);
        } else {
            setShowCheckmark(false);
            setShowExplosion(false);
        }

        onFollowChange?.(newFollowingState);
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
            padding: "px-2 py-1.5",
            text: "text-sm",
            lottieSize: "w-2.5 h-2.5"
        },
        md: {
            iconSize: 16,
            padding: "px-2 py-2",
            text: "text-base",
            lottieSize: "w-3 h-3"
        },
        lg: {
            iconSize: 18,
            padding: "px-4 py-2.5",
            text: "text-lg",
            lottieSize: "w-4 h-4"
        }
    };

    const config = sizeConfig[size];
    const isTextVariant = variant === "text";

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

            {isTextVariant ? (
                <button
                    onClick={handleFollow}
                    className={`relative cursor-pointer z-20 font-medium transition-colors duration-200 ${config.text} ${
                        isFollowing 
                            ? "text-primary hover:text-primary/80" 
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    <span className="flex items-center gap-1.5">
                        <AnimatePresence mode="wait">
                            {!isFollowing ? (
                                <motion.div
                                    key="plus"
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
                                        className={cn(config.lottieSize, "invert")}
                                        autoPlay
                                        loop={false}
                                        style={{
                                            animationDuration: "0.5s",
                                        }}
                                    />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                        <span className={cn((isFollowing && !showCheckmark) && "text-green-500")}>{!isFollowing ? "Follow" : "Following"}</span>
                    </span>
                </button>
            ) : (
                <Button
                    variant={!isFollowing ? "default" : "outline"}
                    className={cn(
                        "relative z-20", 
                        config.padding, 
                        config.text, 
                    )}
                    onClick={handleFollow}
                >
                    <AnimatePresence mode="wait">
                        {!isFollowing ? (
                            <motion.div
                                key="plus"
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
                    {!isFollowing ? "Follow" : "Following"}
                </Button>
            )}
        </div>
    );
}