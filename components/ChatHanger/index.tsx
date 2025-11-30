"use client";
import { Users } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import User, { UserProps } from "./User";
import { ScrollArea } from "../ui/scroll-area";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const initialUsers: UserProps[] = [
    {
        src: "https://chirps-chat.sirv.com/termite.png",
        name: "Termite",
        status: "online",
        hasNewMessage: true,
        messagePreview: "Hey! I just saw your latest post about the new feature. That's really cool! Can we discuss it further?",
    },
    {
        src: "https://chirps-chat.sirv.com/harambe.png",
        name: "Harambe",
        status: "online",
    },
    {
        src: "https://chirps-chat.sirv.com/frog.png",
        name: "Frog",
        status: "online",
    },
    {
        src: "https://chirps-chat.sirv.com/octopus.png",
        name: "Octopus",
        status: "online",
    },
    {
        src: "https://chirps-chat.sirv.com/parrot.png",
        name: "Parrot",
        status: "online",
    },
    {
        src: "https://chirps-chat.sirv.com/panda.png",
        name: "Panda",
        status: "online",
    },
];

export default function ChatHanger() {
    const [users, setUsers] = useState<UserProps[]>(initialUsers);

    // Simulate incoming messages at different intervals
    useEffect(() => {
        // Harambe sends a message after 3 seconds
        const timer1 = setTimeout(() => {
            setUsers((prevUsers) => {
                const updatedUsers = [...prevUsers];
                const harambeIndex = updatedUsers.findIndex(u => u.name === "Harambe");
                if (harambeIndex !== -1) {
                    updatedUsers[harambeIndex] = {
                        ...updatedUsers[harambeIndex],
                        hasNewMessage: true,
                        messagePreview: "What's up? Want to grab lunch later today? I found this amazing new place downtown!"
                    };
                }
                return updatedUsers;
            });
        }, 3000);

        // Frog sends a message after 8 seconds
        const timer2 = setTimeout(() => {
            setUsers((prevUsers) => {
                const updatedUsers = [...prevUsers];
                const frogIndex = updatedUsers.findIndex(u => u.name === "Frog");
                if (frogIndex !== -1) {
                    updatedUsers[frogIndex] = {
                        ...updatedUsers[frogIndex],
                        hasNewMessage: true,
                        messagePreview: "Did you see the game last night? Absolutely insane! 🏀"
                    };
                }
                return updatedUsers;
            });
        }, 8000);

        // Panda sends a message after 13 seconds
        const timer3 = setTimeout(() => {
            setUsers((prevUsers) => {
                const updatedUsers = [...prevUsers];
                const pandaIndex = updatedUsers.findIndex(u => u.name === "Panda");
                if (pandaIndex !== -1) {
                    updatedUsers[pandaIndex] = {
                        ...updatedUsers[pandaIndex],
                        hasNewMessage: true,
                        messagePreview: "Hey! Can you help me with that project we discussed? I'm stuck on something."
                    };
                }
                return updatedUsers;
            });
        }, 13000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const handleShuffle = () => {
        setUsers((prevUsers) => {
            const shuffled = [...prevUsers];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        });
    };

    return (
        <div className="sticky shadow-lg shadow-foreground/5 top-28 p-2 px-0 rounded-4xl border border-input bg-foreground/5 flex items-center gap-2 flex-col">
            <Button
                size={"icon"}
                variant={"ghost"}
                onClick={handleShuffle}
                title="Shuffle users"
            >
                <Users className="h-6 w-6"/>
            </Button>
            <Separator />
            <ScrollArea className="max-h-[calc(100vh*0.5)] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                    {users.map((user) => (
                        <motion.div
                            key={user.name}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: -20 }}
                            transition={{
                                layout: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 }
                            }}
                        >
                            <User
                                src={user.src}
                                name={user.name}
                                status={user.status}
                                hasNewMessage={user.hasNewMessage}
                                messagePreview={user.messagePreview}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </ScrollArea>
        </div>
    )
}