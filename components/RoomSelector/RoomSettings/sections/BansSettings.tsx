"use client";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldBan } from "lucide-react";

type BannedUser = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    bannedBy: string;
    bannedAt: string;
    reason: string;
};

const mockBannedUsers: BannedUser[] = [
    {
        id: "1",
        name: "Spammer Mike",
        username: "@spammermike",
        avatar: "https://i.pravatar.cc/150?img=10",
        bannedBy: "@fabiconcept",
        bannedAt: "2025-12-20",
        reason: "Repeated spam and harassment"
    },
    {
        id: "2",
        name: "Troll Account",
        username: "@trollacct",
        avatar: "https://i.pravatar.cc/150?img=11",
        bannedBy: "@johndoe",
        bannedAt: "2025-12-15",
        reason: "Inappropriate content"
    },
];

export default function BansSettings() {
    const [bannedUsers, setBannedUsers] = useState<BannedUser[]>(mockBannedUsers);
    const [unbanDialog, setUnbanDialog] = useState<BannedUser | null>(null);

    const handleUnban = (userId: string) => {
        setBannedUsers(bannedUsers.filter(user => user.id !== userId));
        setUnbanDialog(null);
    };

    return (
        <div className="space-y-6 pb-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="md:text-lg font-semibold flex items-center gap-2">
                    <ShieldBan className="h-5 w-5 text-destructive" />
                    Room Ban List
                </h3>
                <p className="text-sm text-muted-foreground mt-1 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    Bans by default are by account and IP. A user can circumvent an IP ban by using a proxy. Ban circumvention can be made very hard by enabling phone verification in Safety & Security.
                </p>
            </motion.div>

            <Separator />

            {/* Banned Users List */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {bannedUsers.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group flex items-start justify-between p-4 rounded-xl border-2 border-destructive/30 bg-linear-to-br from-destructive/10 to-destructive/5 hover:border-destructive/50 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <div className="flex items-start gap-3 flex-1">
                                <div className="relative">
                                    <Avatar className="h-14 w-14 border-2 border-destructive/40 grayscale group-hover:grayscale-0 transition-all shadow-lg">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 bg-destructive rounded-full p-1 shadow-sm">
                                        <ShieldBan className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.username}</p>
                                    </div>
                                    <div className="text-xs space-y-1">
                                        <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                                            <span className="font-medium text-destructive">Reason:</span>{" "}
                                            <span className="text-foreground">{user.reason}</span>
                                        </div>
                                        <p className="text-muted-foreground">
                                            <span className="font-medium">Banned by:</span> {user.bannedBy} on {user.bannedAt}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setUnbanDialog(user)}
                                className="shrink-0 shadow-sm hover:shadow-md transition-shadow"
                            >
                                Unban
                            </Button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {bannedUsers.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-muted-foreground rounded-xl border-2 border-dashed border-input bg-linear-to-br from-green-500/5 to-transparent"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                            <ShieldBan className="h-16 w-16 mb-4 text-green-500/50" />
                        </motion.div>
                        <p className="text-base font-semibold text-foreground">No banned users</p>
                        <p className="text-sm">Your room is clean! 🎉</p>
                    </motion.div>
                )}
            </div>

            {/* Unban Confirmation Dialog */}
            <Dialog open={!!unbanDialog} onOpenChange={(open) => !open && setUnbanDialog(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Unban User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to unban <span className="font-semibold">{unbanDialog?.name}</span>? 
                            They will be able to rejoin the room via an invite link.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setUnbanDialog(null)}>
                            Cancel
                        </Button>
                        <Button onClick={() => unbanDialog && handleUnban(unbanDialog.id)}>
                            Unban
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}