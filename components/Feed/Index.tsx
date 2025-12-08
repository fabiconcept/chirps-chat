"use client";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Feed() {
    const [posts] = useState([
        { id: 1, type: "text" as const },
        { id: 2, type: "poll" as const },
        { id: 3, type: "text" as const },
    ]);

    return (
        <div className="flex-1 w-full mb-16">
            <CreatePost />
            <div className="mt-3 flex flex-col gap-3">
                <AnimatePresence mode="popLayout" initial={false}>
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
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
                            <Post type={post.type} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="min-[900px]:hidden md:h-6 h-20" />
            </div>
        </div>
    )
}
