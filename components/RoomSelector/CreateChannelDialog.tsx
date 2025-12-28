"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "next/navigation";
import { removeSearchParam, updateSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";
import { Hash, Lock, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function CreateChannelDialog() {
    const searchParams = useSearchParams();
    const isOpen = useMemo(() => searchParams.get("create-channel") === "true", [searchParams]);
    const [channelName, setChannelName] = useState("");
    const [channelDescription, setChannelDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const handleClose = () => {
        removeSearchParam(SearchParamKeys.CREATE_CHANNEL);
        // Reset form
        setTimeout(() => {
            setChannelName("");
            setChannelDescription("");
            setIsPrivate(false);
            setIsMuted(false);
        }, 300);
    };

    const handleCreate = () => {
        // TODO: Implement channel creation
        console.log("Creating channel:", {
            name: channelName,
            description: channelDescription,
            isPrivate,
            isMuted
        });
        handleClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Hash className="h-5 w-5 text-primary" />
                        Create Channel
                    </DialogTitle>
                    <DialogDescription>
                        Create a new channel for your server. Channels help organize conversations by topic.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Channel Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="channel-name">Channel Name *</Label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="channel-name"
                                placeholder="general-chat"
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                className="pl-9"
                                maxLength={50}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {channelName.length}/50 characters
                        </p>
                    </motion.div>

                    {/* Channel Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="channel-description">Description (Optional)</Label>
                        <Textarea
                            id="channel-description"
                            placeholder="What's this channel about?"
                            value={channelDescription}
                            onChange={(e) => setChannelDescription(e.target.value)}
                            className="resize-none h-20"
                            maxLength={200}
                        />
                        <p className="text-xs text-muted-foreground text-right">
                            {channelDescription.length}/200
                        </p>
                    </motion.div>

                    {/* Channel Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <Label className="text-base">Channel Settings</Label>
                        
                        {/* Private Channel */}
                        <div className="flex items-center justify-between p-3 rounded-lg border border-input bg-muted/30">
                            <div className="flex items-center gap-3">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Private Channel</p>
                                    <p className="text-xs text-muted-foreground">
                                        Only selected members can view this channel
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={isPrivate}
                                onCheckedChange={setIsPrivate}
                            />
                        </div>

                        {/* Muted by Default */}
                        <div className="flex items-center justify-between p-3 rounded-lg border border-input bg-muted/30">
                            <div className="flex items-center gap-3">
                                {isMuted ? (
                                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                                )}
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Muted by Default</p>
                                    <p className="text-xs text-muted-foreground">
                                        Members won't get notifications from this channel
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={isMuted}
                                onCheckedChange={setIsMuted}
                            />
                        </div>
                    </motion.div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleCreate}
                        disabled={!channelName.trim()}
                    >
                        Create Channel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

