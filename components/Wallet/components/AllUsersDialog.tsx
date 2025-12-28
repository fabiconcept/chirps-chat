"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

type User = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    balance?: number;
    status?: "online" | "away" | "offline";
};

interface AllUsersDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    users: User[];
    onSelectUser: (user: User) => void;
}

export default function AllUsersDialog({ open, onOpenChange, users, onSelectUser }: AllUsersDialogProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectUser = (user: User) => {
        onSelectUser(user);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 gap-0 max-h-[85vh] overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border bg-linear-to-br from-[#D4AF37]/5 to-background sticky top-0 z-10">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                            <Users className="h-5 w-5 text-[#D4AF37]" />
                        </div>
                        All Users
                    </DialogTitle>
                    <DialogDescription>
                        Select a user to send tokens to
                    </DialogDescription>
                </DialogHeader>

                {/* Search bar */}
                <div className="px-6 pt-4 pb-2 bg-background sticky top-[89px] z-10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or username..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-11 border-2 focus-visible:ring-[#D4AF37]/20"
                        />
                    </div>
                </div>

                {/* Users list */}
                <ScrollArea className="flex-1 px-6 pb-6">
                    <div className="space-y-2 py-2">
                        <AnimatePresence mode="popLayout">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <motion.button
                                        key={user.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{
                                            layout: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 },
                                            delay: Math.min(index * 0.03, 0.3)
                                        }}
                                        onClick={() => handleSelectUser(user)}
                                        className={cn(
                                            "w-full flex items-center gap-4 p-4 rounded-xl transition-all group",
                                            "hover:bg-[#D4AF37]/5 border-2 border-transparent hover:border-[#D4AF37]/30",
                                            "active:scale-[0.98]"
                                        )}
                                    >
                                        <div className="relative">
                                            <Avatar className="h-14 w-14 border-2 border-border group-hover:border-[#D4AF37]/50 transition-all">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback className="font-semibold">
                                                    {user.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            {/* Status indicator */}
                                            {user.status && (
                                                <div className={cn(
                                                    "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background",
                                                    user.status === "online" && "bg-green-500",
                                                    user.status === "away" && "bg-yellow-500",
                                                    user.status === "offline" && "bg-gray-400"
                                                )} />
                                            )}
                                        </div>

                                        <div className="flex-1 text-left min-w-0">
                                            <p className="font-bold text-foreground group-hover:text-[#D4AF37] transition-colors truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {user.username}
                                            </p>
                                            {user.balance !== undefined && (
                                                <Badge
                                                    variant="outline"
                                                    className="mt-1.5 text-xs h-5 bg-green-500/10 text-green-600 border-green-500/20"
                                                >
                                                    <Wallet className="h-3 w-3 mr-1" />
                                                    {user.balance.toLocaleString()} CHT
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                                            <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                                                <ArrowUpRight className="h-5 w-5 text-[#D4AF37]" />
                                            </div>
                                        </div>
                                    </motion.button>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12"
                                >
                                    <div className="inline-flex flex-col items-center gap-3">
                                        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
                                            <Search className="h-8 w-8 text-muted-foreground/50" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">No users found</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Try searching with a different term
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

