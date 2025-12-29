"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { LeaderboardCategory, LeaderboardUser } from "./types";
import { mockLeaderboardUsers, currentUser } from "./mockData";
import { SearchParamKeys } from "@/lib/enums";
import { updateSearchParam, removeSearchParam } from "@/lib/utils";
import CategoryDropdown from "./components/CategoryDropdown";
import LeaderboardRankCard from "./components/LeaderboardRankCard";
import LeaderboardPedestal from "./components/LeaderboardPedestal";
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
            {/* Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="space-y-6">
                    {/* Top Controls */}
                    <div className="flex items-center justify-between">
                        {/* Country Filter (Left) */}
                        <AnimatePresence mode="wait">
                            {selectedCountry ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={clearCountryFilter}
                                        className="gap-2"
                                    >
                                        <MapPin className="h-4 w-4" />
                                        <span>{selectedCountry}</span>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </motion.div>
                            ) : (
                                <div />
                            )}
                        </AnimatePresence>

                        {/* Category Dropdown (Right) */}
                        <CategoryDropdown 
                            activeCategory={activeCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                    </div>

                    {/* Top 3 Pedestal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <LeaderboardPedestal
                            topThree={[
                                ...(currentUserWithRank && currentUserRank <= 3 ? [currentUserWithRank] : []),
                                ...rankedUsers.filter(u => u.rank && u.rank <= 3)
                            ].slice(0, 3)}
                            category={activeCategory}
                            onUserClick={handleUserClick}
                            selectedCountry={selectedCountry}
                        />
                    </motion.div>

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
                                    <h2 className="text-xl font-semibold">
                                        {selectedCountry ? `Rankings From ${selectedCountry}` : 'Rankings'}
                                    </h2>
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

                                {/* Top Rankings (Starting from 4th since top 3 are on pedestal) */}
                                {(() => {
                                    const items = [];
                                    // Start from rank 4 since top 3 are on pedestal
                                    const usersToShow = rankedUsers.filter(u => u.rank && u.rank > 3);
                                    
                                    for (let i = 0; i < usersToShow.length; i++) {
                                        const user = usersToShow[i];
                                        const currentRank = user.rank || (i + 4);
                                        
                                        // Insert current user at their rank position if shown and in list range
                                        if (showCurrentUser && currentUserWithRank && currentUserRank > 3 && currentUserRank === currentRank) {
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
                                        }
                                        
                                        // Add regular user (skip if this is the current user's position)
                                        if (!currentUserWithRank || user.id !== currentUser.id) {
                                            items.push(
                                                <div 
                                                    key={user.id}
                                                    className="cursor-pointer"
                                                    onClick={() => handleUserClick(user)}
                                                >
                                                    <LeaderboardRankCard
                                                        user={user}
                                                        rank={currentRank}
                                                        category={activeCategory}
                                                        index={items.length}
                                                    />
                                                </div>
                                            );
                                        }
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

