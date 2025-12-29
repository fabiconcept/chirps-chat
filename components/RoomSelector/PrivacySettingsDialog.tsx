"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { removeSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";
import { Lock, Eye, MessageSquare, UserCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { useKeyBoardShortCut } from "../Providers/KeyBoardShortCutProvider";

type PrivacySetting = {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
    enabled: boolean;
};

export default function PrivacySettingsDialog() {
    const searchParams = useSearchParams();
    const isOpen = useMemo(() => searchParams.get("privacy") === "true", [searchParams]);
    const { allowShortcuts, disallowShortcuts, notoriousShortcuts } = useKeyBoardShortCut();

    useEffect(()=>{
        if (isOpen) {
            disallowShortcuts([...notoriousShortcuts, "alt+F", "commandESC"]);
            allowShortcuts([
                "arrowDown",
                "arrowUp",
                "enter",
            ]);
        } else {
            allowShortcuts([...notoriousShortcuts, "alt+F"]);
            setTimeout(() => {
                allowShortcuts(["commandESC"]);
            }, 100);
            disallowShortcuts([
                "arrowDown",
                "arrowUp",
                "enter",
            ]);
        }
    }, [isOpen, allowShortcuts, disallowShortcuts, notoriousShortcuts]);
    
    const [settings, setSettings] = useState<PrivacySetting[]>([
        {
            id: "dm-from-members",
            label: "Allow Direct Messages",
            description: "Let server members send you direct messages",
            icon: MessageSquare,
            enabled: true
        },
        {
            id: "show-online-status",
            label: "Show Online Status",
            description: "Display when you're online in this server",
            icon: Eye,
            enabled: true
        },
        {
            id: "read-receipts",
            label: "Read Receipts",
            description: "Show when you've read messages",
            icon: UserCheck,
            enabled: false
        },
        {
            id: "data-privacy",
            label: "Enhanced Privacy Mode",
            description: "Limit data collection and analytics",
            icon: ShieldCheck,
            enabled: false
        }
    ]);

    const handleClose = () => {
        removeSearchParam(SearchParamKeys.PRIVACY);
    };

    const handleToggle = (id: string) => {
        setSettings(prev => prev.map(setting => 
            setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
        ));
    };

    const handleSave = () => {
        // TODO: Save privacy settings
        console.log("Saving privacy settings:", settings);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[550px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" />
                        Privacy Settings
                    </DialogTitle>
                    <DialogDescription>
                        Control your privacy and how others interact with you in this server
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
                        transition={{ delay: 0.25 }}
                        className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20"
                    >
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                            🔒 <strong>Privacy Note:</strong> These settings only apply to this server. You can adjust global privacy settings in your account preferences.
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

