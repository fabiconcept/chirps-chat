"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, MoreVertical, VolumeX, UserX, Users, Crown, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Member = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    role: "owner" | "admin" | "member";
    isMuted?: boolean;
};

const mockMembers: Member[] = [
    { id: "1", name: "Favour Ajokubi", username: "@fabiconcept", avatar: "https://chirps-chat.sirv.com/premium/rasta.png", role: "owner" },
    { id: "2", name: "John Doe", username: "@johndoe", avatar: "https://i.pravatar.cc/150?img=1", role: "admin" },
    { id: "3", name: "Jane Smith", username: "@janesmith", avatar: "https://i.pravatar.cc/150?img=2", role: "member" },
    { id: "4", name: "Bob Wilson", username: "@bobwilson", avatar: "https://i.pravatar.cc/150?img=3", role: "member", isMuted: true },
    { id: "5", name: "Alice Brown", username: "@alicebrown", avatar: "https://i.pravatar.cc/150?img=4", role: "member" },
];

const roleColors = {
    owner: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    admin: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    member: "bg-foreground/5 text-muted-foreground border-input"
};

export default function MembersSettings({ title, description }: { title: string, description: string }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [members, setMembers] = useState<Member[]>(mockMembers);
    const [actionDialog, setActionDialog] = useState<{ isOpen: boolean; type: "mute" | "kick" | null; member: Member | null }>({
        isOpen: false,
        type: null,
        member: null
    });

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAction = (type: "mute" | "kick", member: Member) => {
        setActionDialog({ isOpen: true, type, member });
    };

    const confirmAction = () => {
        if (!actionDialog.member) return;

        if (actionDialog.type === "mute") {
            setMembers(members.map(m =>
                m.id === actionDialog.member?.id ? { ...m, isMuted: !m.isMuted } : m
            ));
        } else if (actionDialog.type === "kick") {
            setMembers(members.filter(m => m.id !== actionDialog.member?.id));
        }

        setActionDialog({ isOpen: false, type: null, member: null });
    };

    return (
        <div className="space-y-6 pb-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="md:text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            </motion.div>

            <Separator />

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative"
            >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-linear-to-r from-primary/5 to-transparent border-primary/20 focus-visible:border-primary"
                />
            </motion.div>

            {/* Members List */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {filteredMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group relative flex items-center justify-between p-4 rounded-xl border border-input bg-linear-to-br from-foreground/5 to-transparent hover:from-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Avatar className="h-12 w-12 border-2 border-background shadow-lg ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    {member.role === "owner" && (
                                        <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                                            <Crown className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                    {member.role === "admin" && (
                                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                                            <Shield className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm">{member.name}</p>
                                        {member.isMuted && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="bg-destructive/10 rounded-full p-1"
                                            >
                                                <VolumeX className="h-3 w-3 text-destructive" />
                                            </motion.div>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">{member.username}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className={`${roleColors[member.role]} shadow-sm`}>
                                    {member.role}
                                </Badge>
                                
                                {member.role !== "owner" && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleAction("mute", member)}>
                                                <VolumeX className="mr-2 h-4 w-4" />
                                                {member.isMuted ? "Unmute" : "Mute"}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => handleAction("kick", member)}
                                                className="text-destructive"
                                            >
                                                <UserX className="mr-2 h-4 w-4" />
                                                Kick
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredMembers.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No members found
                    </div>
                )}
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={actionDialog.isOpen} onOpenChange={(open) => !open && setActionDialog({ isOpen: false, type: null, member: null })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {actionDialog.type === "mute" ? (
                                actionDialog.member?.isMuted ? "Unmute Member" : "Mute Member"
                            ) : "Kick Member"}
                        </DialogTitle>
                        <DialogDescription>
                            {actionDialog.type === "mute" ? (
                                actionDialog.member?.isMuted 
                                    ? `Are you sure you want to unmute ${actionDialog.member?.name}? They will be able to post again.`
                                    : `Are you sure you want to mute ${actionDialog.member?.name}? They won't be able to post messages.`
                            ) : (
                                `Are you sure you want to kick ${actionDialog.member?.name}? They will lose access to this room immediately.`
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setActionDialog({ isOpen: false, type: null, member: null })}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant={actionDialog.type === "kick" ? "destructive" : "default"}
                            onClick={confirmAction}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}