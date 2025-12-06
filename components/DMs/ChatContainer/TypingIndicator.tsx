"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface TypingUser {
    avatarUrl: string;
    name: string;
}

export interface TypingIndicatorProps {
    users: TypingUser | TypingUser[];
    className?: string;
}

export default function TypingIndicator({ users, className }: TypingIndicatorProps) {
    const userArray = Array.isArray(users) ? users : [users];
    const userCount = userArray.length;

    // Generate typing text
    const getTypingText = () => {
        if (userCount === 1) {
            return `${userArray[0].name} is typing`;
        } else if (userCount === 2) {
            return `${userArray[0].name} and ${userArray[1].name} are typing`;
        } else if (userCount === 3) {
            return `${userArray[0].name}, ${userArray[1].name}, and ${userArray[2].name} are typing`;
        } else {
            return `${userArray[0].name}, ${userArray[1].name}, ${userArray[2].name}, and ${userCount - 3} other${userCount - 3 > 1 ? 's' : ''} are typing`;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "flex items-center w-full px-5 py-2",
                className
            )}
        >
            <div className="relative w-fit h-fit flex items-center -space-x-2">
                {userArray.slice(0, 3).map((user, index) => (
                    <Avatar key={index} className="size-6 bg-foreground border-2 border-background">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                ))}
                {userCount > 3 && (
                    <div className="size-6 rounded-full text-xs font-medium grid place-items-center text-background bg-foreground relative z-20 border-2 border-background">
                        {userCount - 3}
                    </div>
                )}
            </div>

            <div className="flex flex-col text-sm w-full relative z-10">
                <div className="text-sm flex items-center p-2 gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground italic">
                            {getTypingText()}
                        </span>
                    </div>

                    {/* Animated typing dots */}
                    <div className="flex items-center gap-1">
                        <motion.div
                            className="size-1.5 rounded-full bg-blue-500"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: 0
                            }}
                        />
                        <motion.div
                            className="size-1.5 rounded-full bg-blue-500"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: 0.2
                            }}
                        />
                        <motion.div
                            className="size-1.5 rounded-full bg-blue-500"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: 0.4
                            }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
