"use client";

import { motion } from "framer-motion";
import { X, Trophy, Users, Heart, MessageSquare, Home, MapPin, LucideProps, CalendarCheck } from "lucide-react";
import { LeaderboardUser, LeaderboardCategory } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatNumber, getNumberFromRange } from "@/lib/utils";
import StreakGrid from "./StreakGrid";
import { ForwardRefExoticComponent, RefAttributes, useMemo } from "react";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useResized } from "@/hooks/use-resized";

interface UserDetailDialogProps {
    user: LeaderboardUser | null;
    isOpen: boolean;
    onClose: () => void;
    category: LeaderboardCategory;
}

const categoryConfig: Record<LeaderboardCategory, {
    label: string;
    accentColor: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    backgroundColor: string;
}> = {
    streak: {
        label: "Day Streak",
        accentColor: "#10b981",
        backgroundColor: "bg-linear-to-b from-[#10b981]/10 to-transparent shadow-lg shadow-foreground/5",
        icon: CalendarCheck
    },
    tokens: {
        label: "Tokens",
        accentColor: "#D4AF37",
        icon: Trophy,
        backgroundColor: "bg-linear-to-b from-[#D4AF37]/10 to-transparent",

    },
    followers: {
        label: "Followers",
        accentColor: "#3b82f6",
        icon: Users,
        backgroundColor: "bg-linear-to-b from-[#3b82f6]/10 to-transparent",
    },
    likes: {
        label: "Total Likes",
        accentColor: "#f43f5e",
        icon: Heart,
        backgroundColor: "bg-linear-to-b from-[#f43f5e]/10 to-transparent",
    },
    posts: {
        label: "Total Posts",
        accentColor: "#a855f7",
        icon: MessageSquare,
        backgroundColor: "bg-linear-to-b from-[#a855f7]/10 to-transparent",
    },
    rooms: {
        label: "No. of Rooms",
        accentColor: "#6366f1",
        icon: Home,
        backgroundColor: "bg-linear-to-b from-[#6366f1]/10 to-transparent",
    }
};

export default function UserDetailDialog({ user, isOpen, onClose, category }: UserDetailDialogProps) {
    const isMobile = useIsMobile();
    const resized = useResized();
    const gridSize = useMemo(() => {
        return getNumberFromRange(300, 900, 412, resized.width, 33, 10);
    }, [resized.width]);

    if (!user) return null;

    const config = categoryConfig[category];
    const CategoryIcon = config.icon;

    return (
        <ResponsiveModal
            open={isOpen}
            onOpenChange={onClose}
            title="Suggestion Details"
        >
            <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative"
                >
                    {/* Header */}
                    <div
                        className="relative p-6 pb-20 rounded-t-xl"
                        style={{
                            background: `linear-gradient(135deg, ${config.accentColor}15, ${config.accentColor}05)`
                        }}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute top-4 right-4 rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        {/* User Avatar - Overlapping */}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
                            <div className="relative">
                                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="text-3xl">
                                        {user.name.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <Badge
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold px-3"
                                    style={{
                                        backgroundColor: config.accentColor,
                                        color: 'white'
                                    }}
                                >
                                    Rank #{user.rank}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="px-6 pt-20 pb-6 text-center space-y-3">
                        <div>
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            <p className="text-muted-foreground">@{user.username} {gridSize}</p>
                        </div>

                        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{user.country}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <CategoryIcon className="h-4 w-4" style={{ color: config.accentColor }} />
                                <span style={{ color: config.accentColor }} className="font-semibold">
                                    <span className={config.label.includes("Token") ? "ave" : ""}>{user.stats[category].toLocaleString()}</span> {config.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="sm:px-6 px-3 pb-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 sm:gap-4 gap-2">
                            {Object.entries(categoryConfig).map(([key, cfg]) => {
                                const Icon = cfg.icon;
                                const value = user.stats[key as LeaderboardCategory];
                                const isActive = key === category;

                                return (
                                    <motion.div
                                        key={key}
                                        whileHover={{ y: -2 }}
                                        className={cn(
                                            "p-4 rounded-xl border-2 transition-all",
                                            isActive
                                                ? `border-foreground/20 bg-foreground/5 -translate-y-2 ${cfg.backgroundColor}`
                                                : "border-border bg-background"
                                        )}
                                        style={{
                                            borderTopColor: isActive ? cfg.accentColor : undefined,
                                            borderTopWidth: isActive ? '3px' : undefined
                                        }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon
                                                className="h-4 w-4"
                                                style={{ color: isActive ? cfg.accentColor : undefined }}
                                            />
                                            <span className="text-xs text-muted-foreground">{cfg.label}</span>
                                        </div>
                                        <p
                                            className="inline-flex gap-2 items-center"
                                        >
                                            <p className={cn("text-2xl font-bold", cfg.label.includes("Token") ? "ave text-[#D4AF37]" : "")} style={{ color: isActive ? cfg.accentColor : undefined }}>{formatNumber(value)}</p> {cfg.label.includes("Token") && <span>CHT</span>}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Streak Grid (only for streak category) */}
                    {category === 'streak' && (
                        <div className="px-6 pb-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <CalendarCheck className="h-5 w-5 text-emerald-500" />
                                    <h3 className="text-lg font-semibold">Days</h3>
                                </div>
                                <StreakGrid maxWeeks={isMobile ? gridSize : 27} size={isMobile ? "sm" : "md"} streakDays={user.stats.streak} />
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </ResponsiveModal>
    );
}

