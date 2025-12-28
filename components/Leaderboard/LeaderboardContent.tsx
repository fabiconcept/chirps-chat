"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Globe, MapPin, X } from "lucide-react";
import { LeaderboardCategory, LeaderboardFilters, LeaderboardUser } from "./types";
import { mockLeaderboardUsers, currentUser } from "./mockData";
import { SearchParamKeys } from "@/lib/enums";
import { updateSearchParam, removeSearchParam } from "@/lib/utils";
import LeaderboardStats from "./components/LeaderboardStats";
import LeaderboardRankCard from "./components/LeaderboardRankCard";
import GlobeVisualization from "./components/GlobeVisualization";
import UserDetailDialog from "./components/UserDetailDialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function LeaderboardContent() {
    const searchParams = useSearchParams();
    
    // Get state from URL or use defaults
    const activeCategory = (searchParams.get(SearchParamKeys.MARKETPLACE_CATEGORY) as LeaderboardCategory) || "streak";
    const selectedCountry = searchParams.get(SearchParamKeys.LEADERBOARD_COUNTRY) || null;
    const selectedUserId = searchParams.get("leaderboard-user") || null;
    
    const [showGlobe, setShowGlobe] = useState(true);

    // Sort and filter users by active category and country
    const { rankedUsers, currentUserRank, currentUserWithRank, showCurrentUser } = useMemo(() => {
        // Check if current user matches country filter
        const currentUserMatchesFilter = !selectedCountry || currentUser.country === selectedCountry;
        
        // Include current user in the ranking only if they match the filter
        let allUsers = [...mockLeaderboardUsers];
        if (currentUserMatchesFilter) {
            allUsers.push(currentUser);
        }
        
        // Filter by country if selected
        if (selectedCountry) {
            allUsers = allUsers.filter(user => user.country === selectedCountry);
        }
        
        // Sort by active category
        const sorted = allUsers.sort((a, b) => 
            b.stats[activeCategory] - a.stats[activeCategory]
        );
        
        const ranked = sorted.map((user, index) => ({
            ...user,
            rank: index + 1
        }));
        
        // Find current user's rank (only if they're in the filtered list)
        const currentUserIndex = ranked.findIndex(u => u.id === currentUser.id);
        const currentUserRank = currentUserIndex >= 0 ? currentUserIndex + 1 : -1;
        const currentUserWithRank = currentUserIndex >= 0 ? ranked[currentUserIndex] : null;
        
        // Remove current user from the main list (we'll show them separately if they exist)
        const withoutCurrentUser = ranked.filter(u => u.id !== currentUser.id);
        
        return { 
            rankedUsers: withoutCurrentUser, 
            currentUserRank, 
            currentUserWithRank,
            showCurrentUser: currentUserMatchesFilter && currentUserWithRank !== null
        };
    }, [activeCategory, selectedCountry]);

    const handleCategoryChange = (category: LeaderboardCategory) => {
        if (category !== "streak") {
            updateSearchParam(SearchParamKeys.MARKETPLACE_CATEGORY, category);
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_CATEGORY);
        }
    };

    const handleCountryFilter = (country: string) => {
        updateSearchParam(SearchParamKeys.LEADERBOARD_COUNTRY, country);
    };

    const clearCountryFilter = () => {
        removeSearchParam(SearchParamKeys.LEADERBOARD_COUNTRY);
    };

    const handleUserClick = (user: LeaderboardUser) => {
        updateSearchParam("leaderboard-user", user.id);
    };

    const handleCloseUserDetail = () => {
        removeSearchParam("leaderboard-user");
    };

    const selectedUser = useMemo(() => {
        if (!selectedUserId) return null;
        const allUsers = currentUserWithRank 
            ? [...rankedUsers, currentUserWithRank]
            : rankedUsers;
        return allUsers.find(u => u?.id === selectedUserId) || null;
    }, [selectedUserId, rankedUsers, currentUserWithRank]);

    return (
        <>
            {/* Header */}
            <div className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm w-full">
                <div className="container mx-auto px-4 py-6 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-4 w-full"
                    >
                        {/* Title */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-linear-to-br from-[#7600C9]/20 to-[#7600C9]/5 border border-[#7600C9]/30">
                                    <Trophy className="h-6 w-6 text-[#7600C9]" />
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold">Global Leaderboard</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Top performers from around the world
                                    </p>
                                </div>
                            </div>

                            {/* Globe Toggle */}
                            <Button
                                variant={showGlobe ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowGlobe(!showGlobe)}
                                className={showGlobe ? "bg-[#7600C9] hover:bg-[#7600C9]/90" : ""}
                            >
                                <Globe className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">
                                    {showGlobe ? "Hide" : "Show"} Globe
                                </span>
                            </Button>
                        </div>

                        {/* Stats Banner with Country Filter */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-linear-to-r from-[#7600C9]/10 via-[#7600C9]/5 to-transparent border border-[#7600C9]/30"
                        >
                            <div className="flex items-center gap-3 flex-wrap">
                                <Badge className="bg-[#7600C9] hover:bg-[#7600C9]/90 text-white">
                                    {selectedCountry ? `📍 ${selectedCountry}` : "🌍 Global"}
                                </Badge>
                                <span className="text-sm font-medium">
                                    Tracking {rankedUsers.length} elite performers
                                </span>
                                
                                {/* Country Filter Badge */}
                                <AnimatePresence mode="wait">
                                    {selectedCountry && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={clearCountryFilter}
                                                className="h-7 px-2 text-xs gap-1 hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                <MapPin className="h-3 w-3" />
                                                <span>{selectedCountry}</span>
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <span className="text-xs text-muted-foreground hidden sm:block">
                                Updated in real-time
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="space-y-6">
                    {/* Category Stats */}
                    <LeaderboardStats 
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />

                    {/* Globe & Rankings Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Globe Visualization */}
                        {showGlobe && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="lg:sticky lg:top-24 h-fit"
                            >
                                <div className="py-6 rounded-2xl border border-border bg-black/5 overflow-hidden">
                                    <div className="flex items-center justify-between mb-4 px-6">
                                        <h2 className="text-xl font-semibold">Global Distribution</h2>
                                        <Badge variant="outline" className="text-xs">
                                            Interactive
                                        </Badge>
                                    </div>
                                    <div className="relative overflow-hidden">
                                        <GlobeVisualization 
                                            users={mockLeaderboardUsers.slice(0, 30)}
                                            onUserClick={(user) => {
                                                handleCountryFilter(user.country);
                                            }}
                                            selectedCountry={selectedCountry}
                                            activeCategory={activeCategory}
                                        />
                                    </div>
                                    <div className="mt-4 px-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                                            <span>Top 3</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#7600C9]" />
                                            <span>Top 10</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                                            <span>Others</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Rankings List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={showGlobe ? "" : "lg:col-span-2"}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Rankings</h2>
                                    <Badge variant="secondary">
                                        {showCurrentUser ? rankedUsers.length + 1 : rankedUsers.length} Users
                                    </Badge>
                                </div>

                                {/* Current User Position - Visible only if in filtered results */}
                                {showCurrentUser && currentUserWithRank && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="sticky top-24 z-10 mb-4"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-linear-to-r from-[#7600C9]/20 via-[#7600C9]/10 to-transparent blur-xl" />
                                            <div 
                                                className="relative cursor-pointer"
                                                onClick={() => handleUserClick(currentUserWithRank)}
                                            >
                                                <LeaderboardRankCard
                                                    user={currentUserWithRank}
                                                    rank={currentUserRank}
                                                    category={activeCategory}
                                                    index={0}
                                                />
                                            </div>
                                            <div className="absolute -top-2 -right-2">
                                                <Badge className="bg-[#7600C9] text-white text-xs">
                                                    Your Position
                                                </Badge>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Top Rankings */}
                                {(() => {
                                    const items = [];
                                    let rankCounter = 1;
                                    
                                    for (let i = 0; i < rankedUsers.length; i++) {
                                        const user = rankedUsers[i];
                                        
                                        // Insert current user at their rank position if in top 15 and shown
                                        if (showCurrentUser && currentUserWithRank && currentUserRank <= 15 && currentUserRank === rankCounter) {
                                            items.push(
                                                <div 
                                                    key={`current-user-in-list`}
                                                    className="cursor-pointer"
                                                    onClick={() => handleUserClick(currentUserWithRank)}
                                                >
                                                    <LeaderboardRankCard
                                                        user={currentUserWithRank}
                                                        rank={currentUserRank}
                                                        category={activeCategory}
                                                        index={items.length}
                                                    />
                                                </div>
                                            );
                                            rankCounter++;
                                        }
                                        
                                        // Add regular user
                                        items.push(
                                            <div 
                                                key={user.id}
                                                className="cursor-pointer"
                                                onClick={() => handleUserClick(user)}
                                            >
                                                <LeaderboardRankCard
                                                    user={user}
                                                    rank={user.rank!}
                                                    category={activeCategory}
                                                    index={items.length}
                                                />
                                            </div>
                                        );
                                        rankCounter++;
                                    }
                                    
                                    return items;
                                })()}
                            </div>
                        </motion.div>
                    </div>
                    <div className="h-20" />
                </div>
            </div>

            {/* User Detail Dialog */}
            <UserDetailDialog
                user={selectedUser}
                isOpen={!!selectedUserId}
                onClose={handleCloseUserDetail}
                category={activeCategory}
            />
        </>
    );
}

