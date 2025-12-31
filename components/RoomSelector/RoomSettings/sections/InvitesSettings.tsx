"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Link2, Trash2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Invite = {
    id: string;
    code: string;
    createdBy: string;
    expiresAt: string | null;
    maxUses: number | null;
    uses: number;
};

const mockInvites: Invite[] = [
    { id: "1", code: "abc123xyz", createdBy: "@fabiconcept", expiresAt: "2025-12-31", maxUses: 10, uses: 3 },
    { id: "2", code: "def456uvw", createdBy: "@fabiconcept", expiresAt: null, maxUses: null, uses: 15 },
];

export default function InvitesSettings({ title, description }: { title: string, description: string }) {
    const [invites, setInvites] = useState<Invite[]>(mockInvites);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showRevokeDialog, setShowRevokeDialog] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    
    // Create invite form
    const [expiry, setExpiry] = useState<string>("never");
    const [maxUses, setMaxUses] = useState<string>("unlimited");

    const generateInviteCode = () => {
        return Math.random().toString(36).substring(2, 11);
    };

    const handleCreateInvite = () => {
        const newInvite: Invite = {
            id: Date.now().toString(),
            code: generateInviteCode(),
            createdBy: "@fabiconcept",
            expiresAt: expiry === "never" ? null : expiry,
            maxUses: maxUses === "unlimited" ? null : parseInt(maxUses),
            uses: 0
        };
        
        setInvites([newInvite, ...invites]);
        setShowCreateDialog(false);
        setExpiry("never");
        setMaxUses("unlimited");
    };

    const handleCopyInvite = (inviteCode: string, id: string) => {
        const inviteUrl = `https://chirps-chat.com/invite/${inviteCode}`;
        navigator.clipboard.writeText(inviteUrl);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleRevokeInvite = (id: string) => {
        setInvites(invites.filter(inv => inv.id !== id));
        setShowRevokeDialog(null);
    };

    return (
        <div className="space-y-6 pb-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="md:text-lg font-semibold flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-primary" />
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            </motion.div>

            <Separator />

            {/* Create Invite Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-between items-center p-4 rounded-xl border border-input bg-linear-to-br from-primary/5 to-transparent"
            >
                <div>
                    <Label className="font-medium text-base">Active Invites</Label>
                    <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">{invites.length}</span> invite{invites.length !== 1 ? "s" : ""} active
                    </p>
                </div>
                <Button onClick={() => setShowCreateDialog(true)} className="shadow-lg hover:shadow-xl transition-shadow">
                    <Link2 className="mr-2 h-4 w-4" />
                    Create Invite
                </Button>
            </motion.div>

            {/* Invites List */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {invites.map((invite, index) => (
                        <motion.div
                            key={invite.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group flex items-center justify-between p-4 rounded-xl border border-input bg-linear-to-br from-green-500/5 to-transparent hover:from-green-500/10 hover:border-green-500/30 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <code className="text-sm font-mono bg-linear-to-r from-primary/10 to-primary/5 px-3 py-1.5 rounded-lg border border-primary/20 font-semibold text-primary">
                                        {invite.code}
                                    </code>
                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                        by {invite.createdBy}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                                        <span className="font-semibold text-foreground">{invite.uses}</span>
                                        <span className="text-muted-foreground">/{invite.maxUses || "∞"} uses</span>
                                    </span>
                                    <span className="text-muted-foreground">•</span>
                                    <span className="flex items-center gap-1 text-muted-foreground">
                                        Expires: <span className="font-medium text-foreground">{invite.expiresAt || "Never"}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleCopyInvite(invite.code, invite.id)}
                                    className="shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {copiedId === invite.id ? (
                                        <>
                                            <Check className="mr-2 h-4 w-4 text-green-500" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowRevokeDialog(invite.id)}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {invites.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No active invites. Create one to get started.
                    </div>
                )}
            </div>

            {/* Create Invite Dialog */}
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent className="rounded-3xl">
                    <DialogHeader>
                        <DialogTitle>Create Invite Link</DialogTitle>
                        <DialogDescription>
                            Generate a new invite link with optional expiry and usage limits
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expire After</Label>
                            <Select value={expiry} onValueChange={setExpiry}>
                                <SelectTrigger className="w-full bg-linear-to-b from-foreground/10 to-transparent rounded-3xl" id="expiry">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="never">Never</SelectItem>
                                    <SelectItem value="1h">1 Hour</SelectItem>
                                    <SelectItem value="24h">24 Hours</SelectItem>
                                    <SelectItem value="7d">7 Days</SelectItem>
                                    <SelectItem value="30d">30 Days</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="max-uses">Max Uses</Label>
                            <Select value={maxUses} onValueChange={setMaxUses}>
                                <SelectTrigger id="max-uses">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="unlimited">Unlimited</SelectItem>
                                    <SelectItem value="1">1 Use</SelectItem>
                                    <SelectItem value="5">5 Uses</SelectItem>
                                    <SelectItem value="10">10 Uses</SelectItem>
                                    <SelectItem value="25">25 Uses</SelectItem>
                                    <SelectItem value="50">50 Uses</SelectItem>
                                    <SelectItem value="100">100 Uses</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateInvite}>
                            Create Invite
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Revoke Invite Dialog */}
            <Dialog open={!!showRevokeDialog} onOpenChange={(open) => !open && setShowRevokeDialog(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Revoke Invite</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to revoke this invite? The link will become invalid immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRevokeDialog(null)}>
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={() => showRevokeDialog && handleRevokeInvite(showRevokeDialog)}
                        >
                            Revoke
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}