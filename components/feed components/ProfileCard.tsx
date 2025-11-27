"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Lottie from "lottie-react";
import plusChecked from "@/components/lottie/plus-checked.json";
import explode from "@/components/lottie/explode.json";
import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileCard() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [showCheckmark, setShowCheckmark] = useState(false);
    const [showExplosion, setShowExplosion] = useState(false);

    const handleFollow = () => {
        setIsFollowing((prev) => !prev);
        if (!isFollowing) {
            setShowExplosion(true);
            setShowCheckmark(true);
        } else {
            setShowCheckmark(false);
            setShowExplosion(false);
        }
    };

    const handleAnimationComplete = () => {

        console.log("Animation complete");
        // Remove animations after they finish
        setTimeout(() => {
            setShowCheckmark(false);
            setShowExplosion(false);
        }, 500); // Match the animation duration
    };

    return (
        <div className="p-2 max-w-80 bg-foreground/5 rounded-2xl border border-input">
            <div>
                <div className="max-h-24 overflow-hidden rounded-lg">
                    <Image
                        src="https://chirps-chat.sirv.com/cache/bg.jpg"
                        alt="Profile"
                        width={1000}
                        height={1000}
                        className="object-cover"
                    />
                </div>
                <div className="-mt-10 ml-2 h-16 w-16 p-2 border-2 border-input bg-background transition-all duration-300 rounded-full grid place-items-center overflow-hidden z-10 relative cursor-pointer hover:bg-background/90 active:scale-90 active:-rotate-3">
                    <Image
                        src="https://chirps-chat.sirv.com/premium/troll.png"
                        alt="Profile"
                        width={100}
                        fetchPriority="high"
                        height={100}
                        className="object-contain h-full w-full"
                    />
                </div>
            </div>

            <div className="flex items-start justify-between p-3 w-full">
                <div className="flex-1">
                    <h3 contentEditable className="text-lg truncate max-w-40 pr-3 font-semibold">Favour Ajokubi</h3>
                    <Link href="#@fabiconcept" className="text-sm truncate text-muted-foreground hover:text-[#7600C9] transition-colors duration-300 pr-3">@fabiconcept</Link>
                </div>
                <div className="relative">
                    <AnimatePresence>
                        {showExplosion && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                // onAnimationComplete={handleAnimationComplete}
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
                        variant={isFollowing ? "default" : "outline"}
                        className="px-4 py-2 relative z-20"
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
                                    <Plus size={16} />
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
                                        className="w-3 h-3"
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
                </div>
            </div>
        </div>
    )
}