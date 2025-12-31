"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Pin, Sparkles } from "lucide-react";

export default function EngagementSettings({ title, description }: { title: string, description: string }) {
    const [welcomeEnabled, setWelcomeEnabled] = useState(true);
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome to our room! 👋");
    const [pinnedIntro, setPinnedIntro] = useState("Read our guidelines before posting.");
    const [allowReactions, setAllowReactions] = useState(true);
    const [allowPosts, setAllowPosts] = useState(true);

    return (
        <div className="space-y-10 pb-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="md:text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            </motion.div>

            <Separator />

            {/* Welcome Message */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4 p-4 rounded-xl border border-input bg-linear-to-br from-primary/5 to-transparent hover:border-primary/30 transition-all duration-300"
            >
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                        <Label htmlFor="welcome-toggle" className="font-medium flex items-center gap-2 text-base">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            Welcome Message
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Show a welcome message when users join
                        </p>
                    </div>
                    <Switch
                        id="welcome-toggle"
                        checked={welcomeEnabled}
                        onCheckedChange={setWelcomeEnabled}
                    />
                </div>

                <AnimatePresence>
                    {welcomeEnabled && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <Textarea
                                placeholder="Enter welcome message..."
                                value={welcomeMessage}
                                onChange={(e) => setWelcomeMessage(e.target.value)}
                                className="min-h-20 bg-background/50"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <Separator />

            {/* Pinned Intro */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 p-4 rounded-xl border border-input bg-linear-to-br from-amber-500/5 to-transparent hover:border-amber-500/30 transition-all duration-300"
            >
                <div className="space-y-0.5">
                    <Label htmlFor="pinned-intro" className="font-medium flex items-center gap-2 text-base">
                        <Pin className="h-4 w-4 text-amber-500" />
                        Pinned Introduction
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        First message everyone sees at the top of the room
                    </p>
                </div>
                <Input
                    id="pinned-intro"
                    placeholder="Enter pinned message..."
                    value={pinnedIntro}
                    onChange={(e) => setPinnedIntro(e.target.value)}
                    className="bg-background/50"
                />
            </motion.div>

            <Separator />

            {/* Allow Reactions */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between p-4 rounded-xl border border-input bg-linear-to-br from-pink-500/5 to-transparent hover:border-pink-500/30 transition-all duration-300"
            >
                <div className="space-y-0.5">
                    <Label htmlFor="reactions-toggle" className="font-medium flex items-center gap-2 text-base">
                        <Heart className="h-4 w-4 text-pink-500" />
                        Allow Reactions
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Enable emoji reactions on messages
                    </p>
                </div>
                <Switch
                    id="reactions-toggle"
                    checked={allowReactions}
                    onCheckedChange={setAllowReactions}
                />
            </motion.div>

            <Separator />

            {/* Allow Posts */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between p-4 rounded-xl border border-input bg-linear-to-br from-blue-500/5 to-transparent hover:border-blue-500/30 transition-all duration-300"
            >
                <div className="space-y-0.5">
                    <Label htmlFor="posts-toggle" className="font-medium flex items-center gap-2 text-base">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        Allow Posts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Enable feed-style posts in this room
                    </p>
                </div>
                <Switch
                    id="posts-toggle"
                    checked={allowPosts}
                    onCheckedChange={setAllowPosts}
                />
            </motion.div>

            <Separator />

            {/* Save Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-end gap-2 sticky -bottom-6 bg-linear-to-t from-background via-background to-transparent py-10 pb-5"
            >
                <Button className="shadow-lg hover:shadow-xl transition-shadow">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </motion.div>
        </div>
    );
}