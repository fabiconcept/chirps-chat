"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { removeSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";
import { Bell, MessageSquare, UserPlus, AtSign, Volume2, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";

type NotificationSetting = {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
    enabled: boolean;
};

export default function NotificationSettingsDialog() {
    const searchParams = useSearchParams();
    const isOpen = useMemo(() => searchParams.get("notifications") === "true", [searchParams]);
    
    const [settings, setSettings] = useState<NotificationSetting[]>([
        {
            id: "all-messages",
            label: "All Messages",
            description: "Get notified for every message in this server",
            icon: MessageSquare,
            enabled: true
        },
        {
            id: "mentions",
            label: "Mentions Only",
            description: "Only get notified when someone mentions you",
            icon: AtSign,
            enabled: false
        },
        {
            id: "new-members",
            label: "New Members",
            description: "Get notified when someone joins the server",
            icon: UserPlus,
            enabled: true
        },
        {
            id: "push-notifications",
            label: "Push Notifications",
            description: "Receive notifications on your device",
            icon: Smartphone,
            enabled: true
        },
        {
            id: "notification-sound",
            label: "Notification Sound",
            description: "Play a sound when you receive a notification",
            icon: Volume2,
            enabled: true
        }
    ]);

    const handleClose = () => {
        removeSearchParam(SearchParamKeys.NOTIFICATIONS);
    };

    const handleToggle = (id: string) => {
        setSettings(prev => prev.map(setting => 
            setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
        ));
    };

    const handleSave = () => {
        // TODO: Save notification settings
        console.log("Saving notification settings:", settings);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Notification Settings
                    </DialogTitle>
                    <DialogDescription>
                        Customize how you receive notifications from this server
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {settings.map((setting, index) => {
                        const Icon = setting.icon;
                        return (
                            <motion.div
                                key={setting.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="flex items-center justify-between p-4 rounded-lg border border-input bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="mt-0.5">
                                            <Icon className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <Label htmlFor={setting.id} className="text-sm font-medium cursor-pointer">
                                                {setting.label}
                                            </Label>
                                            <p className="text-xs text-muted-foreground">
                                                {setting.description}
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        id={setting.id}
                                        checked={setting.enabled}
                                        onCheckedChange={() => handleToggle(setting.id)}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}

                    <Separator className="my-4" />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 rounded-lg bg-muted/50 border border-input"
                    >
                        <p className="text-xs text-muted-foreground">
                            💡 <strong>Tip:</strong> You can customize notification settings for individual channels in their respective settings.
                        </p>
                    </motion.div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

