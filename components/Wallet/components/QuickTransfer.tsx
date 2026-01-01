"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type QuickTransferUser = {
    id: string;
    name: string;
    username: string;
    avatar: string;
};

interface QuickTransferProps {
    users: QuickTransferUser[];
    onSelectUser: (user: QuickTransferUser) => void;
    onViewAll: () => void;
}

export default function QuickTransfer({ users, onSelectUser, onViewAll }: QuickTransferProps) {
    return (
        <div className="px-4 py-4 bg-background">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                    Quick Transfer
                </h3>
                <button 
                    onClick={onViewAll}
                    className="text-xs text-muted-foreground hover:text-[#D4AF37] flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                    View All
                    <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="space-y-1">
                {users.slice(0, 4).map((user, index) => (
                    <motion.button
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelectUser(user)}
                        className={cn(
                            "flex items-center gap-3 w-full p-2.5 rounded-xl transition-all duration-200",
                            "hover:bg-foreground/5 active:scale-[0.98]",
                            "border border-transparent hover:border-border",
                            "group relative overflow-hidden"
                        )}
                    >
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative shrink-0">
                            <Avatar className="h-10 w-10 border-2 border-border group-hover:border-[#D4AF37]/50 transition-all">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="text-xs font-semibold">
                                    {user.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {/* Online indicator */}
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                        </div>

                        <div className="flex-1 min-w-0 text-left relative">
                            <p className="text-sm font-semibold text-foreground truncate group-hover:text-[#D4AF37] transition-colors">
                                {user.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {user.username}
                            </p>
                        </div>

                        <div className="relative shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                            <div className="p-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                                <ArrowUpRight className="h-3.5 w-3.5 text-[#D4AF37]" />
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

