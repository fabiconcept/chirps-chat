"use client";
import { Users } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import User, { UserProps } from "./User";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const initialUsers: UserProps[] = [
    {
        src: "https://chirps-chat.sirv.com/termite.png",
        name: "Termite",
        status: "online",
        // hasNewMessage: true,
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
    const [users] = useState<UserProps[]>(initialUsers);

    

    return (
        <div className="sticky max-sm:hidden shadow-lg shadow-foreground/5 top-28 p-2 px-0 rounded-4xl border border-input bg-foreground/5 flex items-center gap-2 flex-col">
            <Button
                size={"icon"}
                variant={"ghost"}
                className="h-10 w-10"
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
                <div className="mb-1" />
            </ScrollArea>
        </div>
    )
}