"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { UserCircle, Sparkles, Type, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarSelector from "./assets/AvatarSelector";

export default function PerRoomProfileSettings({ title, description }: { title: string, description: string }) {
    const [useCustomProfile, setUseCustomProfile] = useState(false);
    const [displayName, setDisplayName] = useState("Favour Ajokubi");
    const [customBio, setCustomBio] = useState("Just here to chat and have fun!");
    const [avatarUrl, setAvatarUrl] = useState("https://chirps-chat.sirv.com/premium/rasta.png");

    return (
        <div className="space-y-10 pb-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="md:text-lg font-semibold flex items-center gap-2">
                    <UserCircle className="h-5 w-5 text-primary" />
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            </motion.div>

            <Separator />

            {/* Enable Custom Profile */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl border-2 border-input bg-linear-to-br from-primary/10 to-transparent hover:border-primary/30 transition-all duration-300 shadow-sm"
            >
                <div className="space-y-0.5">
                    <Label htmlFor="custom-profile" className="font-medium text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Use Custom Profile
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Override your global profile for this room only
                    </p>
                </div>
                <Switch
                    id="custom-profile"
                    checked={useCustomProfile}
                    onCheckedChange={setUseCustomProfile}
                />
            </motion.div>

            <AnimatePresence mode="wait">
                {useCustomProfile && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Separator />

                        {/* Preview Card */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-3"
                        >
                            <Label className="font-medium text-base">Live Preview</Label>
                            <div className="p-6 rounded-xl border-2 border-input bg-linear-to-br from-primary/5 to-transparent shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="relative">
                                        <Avatar className="h-20 w-20 border-4 border-background shadow-xl ring-2 ring-primary/20">
                                            <AvatarImage src={avatarUrl} alt={displayName} />
                                            <AvatarFallback className="text-lg">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1"
                                        >
                                            <Sparkles className="h-3 w-3 text-white" />
                                        </motion.div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h4 className="font-bold text-xl bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                            {displayName || "Your Name"}
                                        </h4>
                                        <p className="text-sm text-muted-foreground p-2 rounded-lg bg-background/50 border border-input">
                                            {customBio || "Your bio will appear here..."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <Separator />

                        {/* Custom Avatar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-3 p-4 rounded-xl border border-input bg-linear-to-br from-purple-500/5 to-transparent"
                        >
                            <Label htmlFor="avatar" className="font-medium text-base flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-purple-500" />
                                Room Avatar
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Choose from your collection or buy new avatars from the marketplace
                            </p>
                            <div className="flex items-center gap-4">
                                <AvatarSelector
                                    selectedAvatarUrl={avatarUrl}
                                    onAvatarSelect={setAvatarUrl}
                                    displayName={displayName}
                                    type="user"
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                        <p className="text-xs font-medium text-primary mb-1">💎 Avatar Collection</p>
                                        <p className="text-xs text-muted-foreground">
                                            Click the avatar to browse your collection
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted/50 border border-input">
                                        <p className="text-xs font-medium mb-1">🛒 Want more?</p>
                                        <p className="text-xs text-muted-foreground">
                                            Visit the marketplace to purchase unique avatars
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <Separator />

                        {/* Display Name */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3 p-4 rounded-xl border border-input bg-linear-to-br from-blue-500/5 to-transparent"
                        >
                            <Label htmlFor="display-name" className="font-medium text-base flex items-center gap-2">
                                <Type className="h-4 w-4 text-blue-500" />
                                Display Name
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Choose a custom name for this room
                            </p>
                            <Input
                                id="display-name"
                                type="text"
                                placeholder="Your display name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                maxLength={50}
                                className="bg-background/50"
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {displayName.length}/50
                            </p>
                        </motion.div>

                        <Separator />

                        {/* Custom Bio */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-3 p-4 rounded-xl border border-input bg-linear-to-br from-green-500/5 to-transparent"
                        >
                            <Label htmlFor="custom-bio" className="font-medium text-base flex items-center gap-2">
                                <FileText className="h-4 w-4 text-green-500" />
                                Custom Bio
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                A short bio visible only in this room
                            </p>
                            <Textarea
                                id="custom-bio"
                                placeholder="Tell people about yourself in this room..."
                                value={customBio}
                                onChange={(e) => setCustomBio(e.target.value)}
                                className="min-h-24 bg-background/50"
                                maxLength={200}
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {customBio.length}/200
                            </p>
                        </motion.div>

                        <Separator />

                        {/* Save Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex justify-end gap-2 sticky bottom-0 bg-linear-to-t from-background via-background to-transparent pt-6 pb-2"
                        >
                            <Button 
                                variant="outline"
                                onClick={() => {
                                    setUseCustomProfile(false);
                                    setDisplayName("Favour Ajokubi");
                                    setCustomBio("Just here to chat and have fun!");
                                    setAvatarUrl("https://chirps-chat.sirv.com/premium/rasta.png");
                                }}
                                className="shadow-sm"
                            >
                                Reset to Global Profile
                            </Button>
                            <Button className="shadow-lg hover:shadow-xl transition-shadow">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!useCustomProfile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-16 rounded-xl border-2 border-dashed border-input bg-linear-to-br from-muted/30 to-transparent"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                            <UserCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                        </motion.div>
                        <p className="text-base font-semibold text-foreground mb-2">
                            Using Global Profile
                        </p>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            You're currently using your global profile in this room.
                            Enable custom profile to override your display name, avatar, and bio.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}