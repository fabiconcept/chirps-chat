"use client";
import { cn } from "@/lib/utils";
import { HousePlus } from "lucide-react";
import Community from "./Community";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface RecommendationProps {
    size?: "sm" | "md" | "lg";
    transparent?: boolean;
}

const sizeConfig = {
    sm: {
        container: "max-w-64 max-sm:w-full max-sm:max-w-full",
        banner: "max-h-16",
        avatar: "-mt-6 h-12 w-12",
        rankBadge: "h-6 w-6 p-1",
        avatarPadding: "p-1.5",
        title: "text-sm p-2",
        usernameText: "text-xs",
        bioText: "text-xs",
        sectionPadding: "py-2",
        padding: "p-2"
    },
    md: {
        container: "max-w-80 max-sm:w-full max-sm:max-w-full",
        banner: "max-h-24",
        avatar: "-mt-10 h-16 w-16",
        rankBadge: "h-8 w-8 p-1",
        avatarPadding: "p-2",
        title: "text-base p-2",
        usernameText: "text-sm",
        bioText: "text-sm",
        sectionPadding: "py-3",
        padding: "p-3"
    },
    lg: {
        container: "max-w-96 max-sm:w-full max-sm:max-w-full",
        banner: "max-h-32",
        avatar: "-mt-12 h-20 w-20",
        rankBadge: "h-10 w-10 p-1",
        avatarPadding: "p-2.5",
        title: "text-lg p-2",
        usernameText: "text-base",
        bioText: "text-base",
        sectionPadding: "py-4",
        padding: "p-4"
    }
};

export default function CommunityRecommendation({ size = "md", transparent = true }: RecommendationProps) {
    const config = sizeConfig[size]
    
    const [communities] = useState([
        {
            id: 1,
            avatar: "https://chirps-chat.sirv.com/panda.png",
            name: "Tech Enthusiasts",
            snippet: "Design talk",
            activeCount: 1234,
            memberCount: 45678,
            initialJoined: false
        },
        {
            id: 2,
            avatar: "https://chirps-chat.sirv.com/harambe.png",
            name: "Crypto Traders",
            snippet: "Crypto chat",
            activeCount: 892,
            memberCount: 23456,
            initialJoined: false
        },
        {
            id: 3,
            avatar: "https://chirps-chat.sirv.com/frog.png",
            name: "Meme Lords",
            snippet: "Memes",
            activeCount: 3421,
            memberCount: 89012,
            initialJoined: false
        }
    ]);

    return (
        <div className={`p-2 w-full ${config.container} rounded-4xl border border-input ${transparent ? "bg-foreground/5" : "bg-background/80 backdrop-blur-md"}`}>
            <h3 
                className={cn("font-semibold max-w-[80%] truncate px-2", config.title)}
            ><HousePlus className="font-light inline w-5 h-5 mr-2" strokeWidth={2} />Rooms Suggestions</h3>
            <div className="flex flex-col mt-2">
                <AnimatePresence mode="popLayout" initial={false}>
                    {communities.map((community) => (
                        <motion.div
                            key={community.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{
                                layout: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 },
                                y: { duration: 0.2 }
                            }}
                        >
                            <Community 
                                avatar={community.avatar}
                                name={community.name}
                                snippet={community.snippet}
                                activeCount={community.activeCount}
                                memberCount={community.memberCount}
                                id={String(community.id)}
                                initialJoined={community.initialJoined}
                                // onJoinChange={handleJoin}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
