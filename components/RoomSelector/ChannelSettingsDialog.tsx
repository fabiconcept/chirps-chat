"use client";
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { removeSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";
import { Hash, Lock, Trash2, AlertTriangle, Volume2, VolumeX, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChannelSettingsDialog() {
    const searchParams = useSearchParams();
    const isOpen = useMemo(() => searchParams.get("channel-settings") === "true", [searchParams]);
    const channelName = useMemo(() => searchParams.get("channel-name") || "general", [searchParams]);

    const [name, setName] = useState(channelName);
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [slowMode, setSlowMode] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");

    const handleClose = () => {
        removeSearchParam(SearchParamKeys.CHANNEL_SETTINGS);
        removeSearchParam(SearchParamKeys.CHANNEL_NAME);
        // Reset after animation
        setTimeout(() => {
            setShowDeleteConfirm(false);
            setDeleteConfirmText("");
            setName(channelName);
            setDescription("");
            setIsPrivate(false);
            setIsMuted(false);
            setSlowMode(false);
        }, 300);
    };

    const handleSave = () => {
        // TODO: Implement save channel settings
        console.log("Saving channel settings:", {
            name,
            description,
            isPrivate,
            isMuted,
            slowMode
        });
        handleClose();
    };

    const handleDelete = () => {
        if (deleteConfirmText.toLowerCase() === name.toLowerCase()) {
            // TODO: Implement channel deletion
            console.log("Deleting channel:", name);
            handleClose();
        }
    };

    const isGeneralChannel = channelName === "general";
    const canDelete = !isGeneralChannel;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Hash className="h-5 w-5 text-primary" />
                        Channel Settings
                    </DialogTitle>
                    <DialogDescription>
                        Configure settings for #{channelName}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Channel Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="channel-name-edit">Channel Name</Label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="channel-name-edit"
                                value={name}
                                onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                className="pl-9"
                                maxLength={50}
                                disabled={isGeneralChannel}
                            />
                        </div>
                        {isGeneralChannel && (
                            <p className="text-xs text-muted-foreground">
                                The general channel cannot be renamed
                            </p>
                        )}
                        {!isGeneralChannel && (
                            <p className="text-xs text-muted-foreground">
                                {name.length}/50 characters
                            </p>
                        )}
                    </motion.div>

                    {/* Channel Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="channel-description">Description</Label>
                        <Textarea
                            id="channel-description"
                            placeholder="What's this channel about?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="resize-none h-20"
                            maxLength={200}
                        />
                        <p className="text-xs text-muted-foreground text-right">
                            {description.length}/200
                        </p>
                    </motion.div>

                    <Separator />

                    {/* Channel Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="space-y-4"
                    >
                        <Label className="text-base font-semibold">Channel Permissions</Label>

                        {/* Private Channel */}
                        <div className="flex items-center justify-between p-3 rounded-lg border border-input bg-muted/30">
                            <div className="flex items-center gap-3 flex-1">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                                <div className="space-y-0.5 flex-1">
                                    <p className="text-sm font-medium">Private Channel</p>
                                    <p className="text-xs text-muted-foreground">
                                        Only selected members can view this channel
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={isPrivate}
                                onCheckedChange={setIsPrivate}
                                disabled={isGeneralChannel}
                            />
                        </div>

                        {/* Slow Mode */}
                        <div className="flex items-center justify-between p-3 rounded-lg border border-input bg-muted/30">
                            <div className="flex items-center gap-3 flex-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div className="space-y-0.5 flex-1">
                                    <p className="text-sm font-medium">Slow Mode</p>
                                    <p className="text-xs text-muted-foreground">
                                        Members must wait between sending messages
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={slowMode}
                                onCheckedChange={setSlowMode}
                            />
                        </div>

                        {/* Muted by Default */}
                        <div className="flex items-center justify-between p-3 rounded-lg border border-input bg-muted/30">
                            <div className="flex items-center gap-3 flex-1">
                                {isMuted ? (
                                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                                )}
                                <div className="space-y-0.5 flex-1">
                                    <p className="text-sm font-medium">Muted by Default</p>
                                    <p className="text-xs text-muted-foreground">
                                        New members won't get notifications from this channel
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={isMuted}
                                onCheckedChange={setIsMuted}
                            />
                        </div>
                    </motion.div>

                    {/* Delete Channel Section */}
                    {canDelete && (
                        <>
                            <Separator />
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-semibold text-destructive">Danger Zone</Label>
                                </div>

                                <AnimatePresence mode="wait">
                                    {!showDeleteConfirm ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                        >
                                            <div className="p-4 rounded-lg border-2 border-destructive/20 bg-destructive/5">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm text-destructive mb-1">
                                                            Delete Channel
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Permanently delete this channel and all its messages. This action cannot be undone.
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() => setShowDeleteConfirm(true)}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete Channel
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="p-4 rounded-lg border-2 border-destructive bg-destructive/10 space-y-3"
                                        >
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="font-bold text-sm text-destructive mb-1">
                                                        Are you absolutely sure?
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mb-3">
                                                        Type <strong className="text-destructive">"{name}"</strong> to confirm deletion
                                                    </p>
                                                    <Input
                                                        value={deleteConfirmText}
                                                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                                                        placeholder={`Type "${name}" to confirm`}
                                                        className="mb-3 border-destructive/50"
                                                    />
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1"
                                                            onClick={() => {
                                                                setShowDeleteConfirm(false);
                                                                setDeleteConfirmText("");
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            className="flex-1"
                                                            onClick={handleDelete}
                                                            disabled={deleteConfirmText.toLowerCase() !== name.toLowerCase()}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </>
                    )}
                </div>

                {!showDeleteConfirm && (
                    <DialogFooter>
                        <Button variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}

