"use client";

import { motion } from "framer-motion";
import { Trophy, Crown, Medal, Users, Heart, MessageSquare, Home, Coins, CalendarCheck } from "lucide-react";
import { LeaderboardCategory, LeaderboardUser } from "../types";
import { cn, formatNumber } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardPedestalProps {
    topThree: (LeaderboardUser & { rank: number })[];
    category: LeaderboardCategory;
    onUserClick: (user: LeaderboardUser) => void;
    selectedCountry?: string | null;
}

const categoryConfig: Record<LeaderboardCategory, {
    label: string;
    unit: string;
    icon: React.ElementType;
    color: string;
    gradient: string;
}> = {
    streak: {
        label: "Streak",
        unit: "days",
        icon: CalendarCheck,
        color: "text-emerald-500",
        gradient: "from-emerald-500/20 to-emerald-600/10"
    },
    tokens: {
        label: "Tokens",
        unit: "CHT",
        icon: Coins,
        color: "text-[#D4AF37]",
        gradient: "from-[#D4AF37]/20 to-[#D4AF37]/10"
    },
    followers: {
        label: "Followers",
        unit: "Followers",
        icon: Users,
        color: "text-blue-500",
        gradient: "from-blue-500/20 to-blue-600/10"
    },
    likes: {
        label: "Likes",
        unit: "Likes",
        icon: Heart,
        color: "text-red-500",
        gradient: "from-red-500/20 to-red-600/10"
    },
    posts: {
        label: "Posts",
        unit: "Posts",
        icon: MessageSquare,
        color: "text-purple-500",
        gradient: "from-purple-500/20 to-purple-600/10"
    },
    rooms: {
        label: "Rooms",
        unit: "Rooms",
        icon: Home,
        color: "text-indigo-500",
        gradient: "from-indigo-500/20 to-indigo-600/10"
    }
};

const rankConfig = {
    1: {
        height: "h-48",
        bgGradient: "from-yellow-500/20 via-yellow-600/10 to-transparent",
        cardBg: "bg-yellow-500/5",
        borderColor: "border-yellow-500/50",
        glowColor: "shadow-yellow-500/20",
        icon: Crown,
        iconColor: "text-yellow-500",
        badgeBg: "bg-yellow-500/20 backdrop-blur-sm border-2 border-yellow-500/50",
        shineClass: "metallic-shine-gold",
        label: "Champion"
    },
    2: {
        height: "h-40",
        bgGradient: "from-gray-400/20 via-gray-500/10 to-transparent",
        cardBg: "bg-gray-400/5",
        borderColor: "border-gray-400/50",
        glowColor: "shadow-gray-400/20",
        icon: Medal,
        iconColor: "text-gray-400",
        badgeBg: "bg-gray-400/20 backdrop-blur-sm border-2 border-gray-400/50",
        shineClass: "metallic-shine-silver",
        label: "Runner-up"
    },
    3: {
        height: "h-36",
        bgGradient: "from-[#a97142]/20 via-orange-700/10 to-transparent",
        cardBg: "bg-[#a97142]/5",
        borderColor: "border-[#a97142]/50",
        glowColor: "shadow-[#a97142]/20",
        icon: Trophy,
        iconColor: "text-[#a97142]",
        badgeBg: "bg-[#a97142]/20 backdrop-blur-sm border-2 border-[#a97142]/50",
        shineClass: "metallic-shine-bronze",
        label: "3rd Place"
    }
};

export default function LeaderboardPedestal({ topThree, category, onUserClick, selectedCountry }: LeaderboardPedestalProps) {
    const config = categoryConfig[category];

    // Ensure we have exactly 3 users, fill with null if needed
    const [first, second, third] = [
        topThree.find(u => u.rank === 1),
        topThree.find(u => u.rank === 2),
        topThree.find(u => u.rank === 3)
    ];

    const renderPodium = (user: (LeaderboardUser & { rank: number }) | undefined, position: 1 | 2 | 3, delay: number) => {
        if (!user) return null;

        const rankStyle = rankConfig[position];
        const RankIcon = rankStyle.icon;
        const CategoryIcon = config.icon;
        const statValue = user.stats[category];

        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay
                }}
                className={cn(
                    "flex flex-col items-center gap-4",
                    position === 1 ? "order-2" : position === 2 ? "order-1" : "order-3"
                )}
            >
                {/* User Card */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.05 }}
                    onClick={() => onUserClick(user)}
                    className={cn(
                        "relative flex flex-col items-center p-6 rounded-3xl border cursor-pointer w-full",
                        rankStyle.cardBg,
                        "transition-all duration-300",
                        rankStyle.borderColor,
                        `hover:shadow-xl hover:${rankStyle.glowColor}`,
                        position === 1 && "z-10"
                    )}
                >
                    {/* Metallic Shine Overlay */}
                    <div className={cn(
                        "absolute inset-0 z-10 min-h-10 pointer-events-none h-full w-full overflow-hidden rounded-3xl dark:opacity-50 bg-foreground/10",
                    )}>
                        <div className={cn("h-full w-full", rankStyle.shineClass)} />
                    </div>
                    {/* Rank Badge - Now shows position number */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: delay + 0.3, type: "spring", stiffness: 500, damping: 20 }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                    >
                        <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border",
                            rankStyle.badgeBg,
                            "shadow-md"
                        )}>
                            <span className="text-lg font-semibold text-white relative z-10">{position}</span>
                        </div>
                    </motion.div>

                    {/* Avatar */}
                    <div className="relative mt-4 z-10">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="relative z-10"
                        >
                            <Avatar className={cn(
                                "w-20 h-20 border-2",
                                rankStyle.borderColor,
                                "shadow-lg relative z-10"
                            )}>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>

                            {/* Icon overlay */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: delay + 0.5, type: "spring" }}
                                className={cn(
                                    "absolute -bottom-1 -right-1 p-1.5 rounded-full border z-10",
                                    "bg-background shadow-md",
                                    rankStyle.borderColor
                                )}
                            >
                                <RankIcon className={cn("h-3.5 w-3.5", rankStyle.iconColor)} />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* User Info */}
                    <div className="mt-3 mb-5 text-center relative z-10">
                        <h3 className="font-semibold text-base truncate max-w-[150px]">{user.name}</h3>
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">@{user.username}</p>
                    </div>

                    {/* Stat Display */}
                    <div className={cn(
                        "mt-2 px-3 py-3 rounded-full border relative z-10",
                        `bg-background border-2 ${rankStyle.borderColor}`,
                    )}>
                        <div className="flex items-center gap-2">
                            <div className="text-center">
                                <p className={cn("text-xl font-semibold flex flex-col items-center justify-center", config.color)}>
                                    <CategoryIcon className={cn("h-4 w-4", config.color)} />
                                    {formatNumber(statValue)}
                                </p>
                                {config.unit && (
                                    <p className="text-[10px] text-muted-foreground font-normal">{config.unit}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Country Flag */}
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground relative z-10">
                        <span className="font-normal">{user.country}</span>
                    </div>
                </motion.div>

                {/* Podium Base */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: delay + 0.2, type: "spring", stiffness: 200, damping: 20 }}
                    className={cn(
                        rankStyle.height,
                        "w-48 rounded-t-lg border-x border-t relative",
                        `bg-linear-to-b ${rankStyle.bgGradient}`,
                        rankStyle.borderColor,
                        "origin-bottom"
                    )}
                >
                    {/* Rank Number */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={cn(
                            "text-7xl font-bold opacity-10",
                            rankStyle.iconColor
                        )}>
                            {position}
                        </span>
                    </div>

                    {/* Decorative Lines */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-current to-transparent opacity-20" />
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-transparent via-current to-transparent opacity-20" />
                </motion.div>
            </motion.div>
        );
    };

    if (!first && !second && !third) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-muted-foreground">Not enough users to display podium</p>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h2 className="text-2xl md:text-3xl font-semibold flex items-center justify-center gap-2">
                    <Trophy className="h-6 w-6 md:h-7 md:w-7 text-yellow-500" />
                    {selectedCountry ? `Top Champions From ${selectedCountry}` : 'Top Champions'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1.5 font-normal">
                    Celebrating our {config.label} leaders{selectedCountry ? ` in ${selectedCountry}` : ' globally'}
                </p>
            </motion.div>

            {/* Podium */}
            <div className="flex items-end justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
                {/* 2nd Place */}
                {second && renderPodium(second, 2, 0.1)}

                {/* 1st Place */}
                {first && renderPodium(first, 1, 0)}

                {/* 3rd Place */}
                {third && renderPodium(third, 3, 0.2)}
            </div>
        </div>
    );
}

