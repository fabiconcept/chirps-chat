"use client";

import { motion } from "framer-motion";
import { Minus, Trophy, Users, Heart, MessageSquare, Home, LucideProps, CalendarCheck, Plus, Equal } from "lucide-react";
import { LeaderboardUser, LeaderboardCategory } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatNumber } from "@/lib/utils";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface LeaderboardRankCardProps {
    user: LeaderboardUser;
    rank: number;
    category: LeaderboardCategory;
    index: number;
}

const categoryConfig: Record<LeaderboardCategory, { 
    label: string; 
    accentColor: string; 
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    pattern: string;
}> = {
    streak: { 
        label: "Days", 
        accentColor: "#10b981", 
        icon: CalendarCheck,
        // Keep original - sleek diagonal stripes
        pattern: "bg-[linear-gradient(135deg,transparent_25%,rgba(16,185,129,0.03)_25%,rgba(16,185,129,0.03)_50%,transparent_50%,transparent_75%,rgba(16,185,129,0.03)_75%,rgba(16,185,129,0.03))]"
    },
    tokens: { 
        label: "CHT", 
        accentColor: "#D4AF37", 
        icon: Trophy,
        // Subtle radial fade
        pattern: "bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_50%)]"
    },
    followers: { 
        label: "Followers", 
        accentColor: "#3b82f6", 
        icon: Users,
        // Vertical gradient lines
        pattern: "bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(59,130,246,0.06)_40px,rgba(59,130,246,0.06)_41px)]"
    },
    likes: { 
        label: "Likes", 
        accentColor: "#f43f5e", 
        icon: Heart,
        // Angular diagonal (opposite direction)
        pattern: "bg-[linear-gradient(45deg,transparent_25%,rgba(244,63,94,0.06)_25%,rgba(244,63,94,0.06)_50%,transparent_50%,transparent_75%,rgba(244,63,94,0.06)_75%,rgba(244,63,94,0.06))]"
    },
    posts: { 
        label: "Posts", 
        accentColor: "#a855f7", 
        icon: MessageSquare,
        // Horizontal gradient lines
        pattern: "bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(168,85,247,0.06)_40px,rgba(168,85,247,0.06)_41px)]"
    },
    rooms: { 
        label: "Rooms", 
        accentColor: "#6366f1", 
        icon: Home,
        // Subtle corner radial
        pattern: "bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.08),transparent_50%)]"
    }
};

const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return "bg-foreground/10 text-foreground font-bold border-2 border-foreground/20";
    if (rank === 2) return "bg-foreground/8 text-foreground font-semibold border-2 border-foreground/15";
    if (rank === 3) return "bg-foreground/6 text-foreground font-semibold border-2 border-foreground/10";
    return "bg-muted text-muted-foreground border border-border";
};

export default function LeaderboardRankCard({ user, rank, category, index }: LeaderboardRankCardProps) {
    const statValue = user?.stats?.[category] || 0;
    const change = user?.change || 0;
    const config = categoryConfig[category];
    const CategoryIcon = config.icon;
    const isMobile = useIsMobile();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.03,
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
            whileHover={{ y: -2 }}
            className={cn(
                "group relative flex items-center gap-4 p-4 rounded-xl border bg-background overflow-hidden cursor-pointer",
                "hover:shadow-md transition-all duration-200",
                config.pattern,
                rank <= 3 && "border-l-4"
            )}
            style={{
                borderLeftColor: rank <= 3 ? config.accentColor : undefined,
                backgroundSize: rank <= 3 ? '20px 20px' : undefined
            }}
        >
            {/* Rank Badge */}
            <div className="flex items-center justify-center shrink-0">
                <div 
                    className={cn(
                        "sm:w-10 w-8 min-w-fit sm:h-10 h-8 flex items-center justify-center rounded-lg sm:text-sm text-[12px] transition-all duration-200",
                        getRankBadgeStyle(rank)
                    )}
                >
                    #{rank}
                </div>
            </div>

            {/* User Avatar & Info */}
            <div className="flex items-center gap-3 max-sm:-ml-2 flex-1 min-w-0">
                <Avatar className="h-11 w-11 border-2 border-border">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                        {rank === 1 && (
                            <span className="text-sm" style={{ color: config.accentColor }}>●</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">{user.countryCode}</p>
                    </div>
                </div>
            </div>

            {/* Stats & Change */}
            <div className="flex items-center gap-3 shrink-0">
                {/* Change Indicator */}
                {(
                    <div className={cn(
                        "flex items-center gap-0.5 px-2 py-1 rounded-md sm:text-xs text-[12px] font-medium",
                        change > 0 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" :
                        change < 0 ? "bg-destructive/10 text-destructive border border-destructive/20" :
                        "bg-muted text-muted-foreground border border-input/75 py-1.5"
                    )}>
                        {change > 0 ? (
                            <Plus strokeWidth={3} className="sm:h-3 h-2 sm:w-3 w-2" />
                        ) : change < 0 ? (
                            <Minus strokeWidth={3} className="sm:h-3 h-2 sm:w-3 w-2" />
                        ) : (
                            <Equal strokeWidth={3} className="h-3 w-3" />
                        )}
                        {change !== 0 && <span>{Math.abs(change)}</span>}
                    </div>
                )}

                {/* Category Icon & Stat Value */}
                <div className="flex items-center gap-2">
                    {!isMobile && <div 
                        className="p-1.5 rounded-md bg-foreground/5"
                        style={{ 
                            backgroundColor: rank <= 3 ? `${config.accentColor}15` : undefined 
                        }}
                    >
                        <CategoryIcon 
                            className="h-4 w-4" 
                            style={{ 
                                color: rank <= 3 ? config.accentColor : undefined 
                            }}
                        />
                    </div>}
                    <div className="text-right">
                        <p 
                            className="sm:text-xl text-lg font-bold"
                            style={{ 
                                color: rank <= 3 ? config.accentColor : undefined 
                            }}
                        >
                            {formatNumber(statValue)}
                        </p>
                        <p className="text-[10px] text-muted-foreground leading-none">{config.label}</p>
                    </div>
                </div>
            </div>

            {/* Subtle hover effect */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ 
                    background: `linear-gradient(90deg, transparent, ${config.accentColor}05, transparent)` 
                }}
            />
        </motion.div>
    );
}

