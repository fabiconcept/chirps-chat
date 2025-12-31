"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { X, Shield, Link as LinkIcon, MessageCircleOff, Clock, UserCheck, ShieldAlert } from "lucide-react";

export default function SafetySecuritySettings({ title, description }: { title: string, description: string }) {
    const [blockLinks, setBlockLinks] = useState(false);
    const [blockWords, setBlockWords] = useState(true);
    const [blockedWords, setBlockedWords] = useState<string[]>(["spam", "scam", "abuse"]);
    const [newWord, setNewWord] = useState("");
    const [slowMode, setSlowMode] = useState(true);
    const [slowModeSeconds, setSlowModeSeconds] = useState("5");
    const [requireApproval, setRequireApproval] = useState(false);

    const addBlockedWord = () => {
        if (newWord.trim() && !blockedWords.includes(newWord.trim().toLowerCase())) {
            setBlockedWords([...blockedWords, newWord.trim().toLowerCase()]);
            setNewWord("");
        }
    };

    const removeBlockedWord = (word: string) => {
        setBlockedWords(blockedWords.filter(w => w !== word));
    };

    return (
        <div className="space-y-10 pb-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="md:text-lg font-semibold flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-primary" />
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            </motion.div>

            <Separator />

            {/* Block Links */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl border border-input bg-linear-to-b from-red-500/5 to-transparent hover:border-red-500/30 transition-all duration-300"
            >
                <div className="space-y-0.5">
                    <Label htmlFor="block-links" className="font-medium flex items-center gap-2 text-base">
                        <LinkIcon className="h-4 w-4 text-red-500" />
                        Block Links
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Automatically remove messages containing links
                    </p>
                </div>
                <Switch
                    id="block-links"
                    checked={blockLinks}
                    onCheckedChange={setBlockLinks}
                />
            </motion.div>

            <Separator />

            {/* Block Words */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 p-4 rounded-xl border border-input bg-linear-to-b from-orange-500/5 to-transparent hover:border-orange-500/30 transition-all duration-300"
            >
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="block-words" className="font-medium flex items-center gap-2 text-base">
                            <MessageCircleOff className="h-4 w-4 text-orange-500" />
                            Block Words
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Filter out specific words or phrases
                        </p>
                    </div>
                    <Switch
                        id="block-words"
                        checked={blockWords}
                        onCheckedChange={setBlockWords}
                    />
                </div>

                <AnimatePresence>
                    {blockWords && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3"
                        >
                            <div className="flex gap-2 items-center">
                                <Input
                                    placeholder="Add word to block..."
                                    value={newWord}
                                    onChange={(e) => setNewWord(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addBlockedWord()}
                                    className="bg-background/50"
                                />
                                <Button onClick={addBlockedWord} variant="outline" className="shadow-sm">
                                    Add
                                </Button>
                            </div>

                            {blockedWords.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-3 rounded-3xl bg-background/50 border border-input">
                                    <AnimatePresence mode="popLayout">
                                        {blockedWords.map((word) => (
                                            <motion.div
                                                key={word}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Badge
                                                    variant="secondary"
                                                    className="gap-1 pr-1 shadow-sm bg-destructive/5 text-destructive border-destructive/20 bg-linear-to-b from-destructive/10 to-transparent"
                                                >
                                                    {word}
                                                    <button
                                                        onClick={() => removeBlockedWord(word)}
                                                        className="ml-1 rounded-full hover:bg-destructive/20 p-0.5 transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <Separator />

            {/* Slow Mode */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 p-4 rounded-xl border border-input bg-linear-to-b from-blue-500/5 to-transparent hover:border-blue-500/30 transition-all duration-300"
            >
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="slow-mode" className="font-medium flex items-center gap-2 text-base">
                            <Clock className="h-4 w-4 text-blue-500" />
                            Slow Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Limit how often members can send messages
                        </p>
                    </div>
                    <Switch
                        id="slow-mode"
                        checked={slowMode}
                        onCheckedChange={setSlowMode}
                    />
                </div>

                <AnimatePresence>
                    {slowMode && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="space-y-2">
                                <Label htmlFor="slow-mode-duration">
                                    Message Cooldown
                                </Label>
                                <Select value={slowModeSeconds} onValueChange={setSlowModeSeconds}>
                                    <SelectTrigger id="slow-mode-duration" className="bg-background/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5 seconds</SelectItem>
                                        <SelectItem value="10">10 seconds</SelectItem>
                                        <SelectItem value="15">15 seconds</SelectItem>
                                        <SelectItem value="30">30 seconds</SelectItem>
                                        <SelectItem value="60">1 minute</SelectItem>
                                        <SelectItem value="120">2 minutes</SelectItem>
                                        <SelectItem value="300">5 minutes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <Separator />

            {/* Require Approval */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between p-4 rounded-xl border border-input bg-linear-to-br from-green-500/5 to-transparent hover:border-green-500/30 transition-all duration-300"
            >
                <div className="space-y-0.5">
                    <Label htmlFor="require-approval" className="font-medium flex items-center gap-2 text-base">
                        <UserCheck className="h-4 w-4 text-green-500" />
                        Require Approval
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        New members must be approved by admins before posting
                    </p>
                </div>
                <Switch
                    id="require-approval"
                    checked={requireApproval}
                    onCheckedChange={setRequireApproval}
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
                    <Shield className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </motion.div>
        </div>
    );
}