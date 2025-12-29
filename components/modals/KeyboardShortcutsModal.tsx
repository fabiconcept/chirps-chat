"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
    Home, 
    MessageSquare, 
    ShoppingCart, 
    Trophy, 
    Lightbulb, 
    Search, 
    PlusCircle, 
    Bell, 
    Wallet, 
    Maximize, 
    User, 
    Settings, 
    LogOut,
    Keyboard,
    Command
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/Providers/AuthProvider";

interface KeyboardShortcutsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface ShortcutItem {
    keys: string[];
    description: string;
    icon?: React.ElementType;
}

interface ShortcutCategory {
    title: string;
    description: string;
    shortcuts: ShortcutItem[];
}

export default function KeyboardShortcutsModal({ open, onOpenChange }: KeyboardShortcutsModalProps) {
    const { isMacOS } = useAuth();
    const cmdKey = isMacOS ? "⌘" : "Ctrl";

    const shortcutCategories: ShortcutCategory[] = [
        {
            title: "Navigation",
            description: "Quickly jump between pages",
            shortcuts: [
                { keys: [cmdKey, "1"], description: "Go to Feed", icon: Home },
                { keys: [cmdKey, "2"], description: "Go to Chat", icon: MessageSquare },
                { keys: [cmdKey, "3"], description: "Go to Marketplace", icon: ShoppingCart },
                { keys: [cmdKey, "4"], description: "Go to Leaderboard", icon: Trophy },
                { keys: [cmdKey, "5"], description: "Go to Suggestions", icon: Lightbulb },
            ]
        },
        {
            title: "General",
            description: "Common actions",
            shortcuts: [
                { keys: [cmdKey, "K"], description: "Open Search / Command Menu", icon: Search },
                { keys: [cmdKey, "N"], description: "Create New Post", icon: PlusCircle },
                { keys: ["Alt", "W"], description: "Open Wallet", icon: Wallet },
                { keys: ["Alt", "A"], description: "Open Activities", icon: Bell },
                { keys: ["Alt", "F"], description: "Toggle Fullscreen (Chat)", icon: Maximize },
                { keys: ["Esc"], description: "Close Modal / Exit Fullscreen" },
            ]
        },
        {
            title: "Account",
            description: "Manage your account",
            shortcuts: [
                { keys: ["⇧", cmdKey, "P"], description: "View Profile", icon: User },
                { keys: [cmdKey, "S"], description: "Open Settings", icon: Settings },
                { keys: [cmdKey, "K"], description: "Keyboard Shortcuts", icon: Keyboard },
                { keys: ["⇧", cmdKey, "Q"], description: "Log Out", icon: LogOut },
            ]
        },
        {
            title: "Chat (when in chat)",
            description: "Chat-specific shortcuts",
            shortcuts: [
                { keys: [cmdKey, "Enter"], description: "Send Message" },
                { keys: ["⇧", "Enter"], description: "New Line" },
                { keys: [cmdKey, "E"], description: "Add Emoji" },
                { keys: [cmdKey, "U"], description: "Upload File" },
            ]
        },
        {
            title: "Post Interactions",
            description: "Interact with posts quickly",
            shortcuts: [
                { keys: ["L"], description: "Like/Unlike (when focused)" },
                { keys: ["C"], description: "Comment (when focused)" },
                { keys: ["R"], description: "Repost (when focused)" },
                { keys: ["S"], description: "Share (when focused)" },
            ]
        },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[85vh] p-0 gap-0 rounded-3xl">
                {/* Header */}
                <DialogHeader className="px-6 py-4 border-b border-border bg-muted/30 bg-linear-to-b from-transparent to-foreground/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Keyboard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl">Keyboard Shortcuts</DialogTitle>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                Master these shortcuts to navigate Chirps like a pro
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Content */}
                <ScrollArea className="flex-1 max-h-[calc(85vh-220px)]">
                    <div className="px-2 py-4 space-y-6">
                        {shortcutCategories.map((category, categoryIndex) => (
                            <div key={category.title}>
                                {/* Category Header */}
                                <div className="mb-3 px-4">
                                    <h3 className="font-semibold text-base">{category.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {category.description}
                                    </p>
                                </div>

                                {/* Shortcuts List */}
                                <div className="space-y-2">
                                    {category.shortcuts.map((shortcut, shortcutIndex) => {
                                        const Icon = shortcut.icon;
                                        return (
                                            <div
                                                key={shortcutIndex}
                                                className={cn(
                                                    "flex items-center justify-between px-3 py-2 rounded-lg",
                                                    "hover:bg-muted/50 transition-colors group",
                                                    "border border-transparent hover:border-input rounded-xl",
                                                )}
                                            >
                                                {/* Description */}
                                                <div className="flex items-center gap-3">
                                                    {Icon && (
                                                        <div className="p-1.5 rounded bg-muted group-hover:bg-background transition-colors">
                                                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                    <span className="text-sm">{shortcut.description}</span>
                                                </div>

                                                {/* Keys */}
                                                <KbdGroup>
                                                    {shortcut.keys.map((key, keyIndex) => (
                                                        <Kbd key={keyIndex} className="min-w-8 h-6 text-base justify-center">
                                                            {key}
                                                        </Kbd>
                                                    ))}
                                                </KbdGroup>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Separator */}
                                {categoryIndex < shortcutCategories.length - 1 && (
                                    <Separator className="mt-6" />
                                )}
                            </div>
                        ))}

                        {/* Platform Note */}
                        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border">
                            <div className="flex items-start gap-3">
                                <Command className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Platform Note</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {isMacOS ? (
                                            <>
                                                On macOS, <Kbd className="inline-flex mx-1">⌘</Kbd> is the Command key.
                                                Most shortcuts use Command instead of Ctrl.
                                            </>
                                        ) : (
                                            <>
                                                On Windows/Linux, most shortcuts use <Kbd className="inline-flex mx-1">Ctrl</Kbd> 
                                                instead of Command.
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-border bg-muted/20">
                    <p className="text-xs text-muted-foreground text-center">
                        Press <Kbd className="inline-flex mx-1">Esc</Kbd> or click outside to close
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

