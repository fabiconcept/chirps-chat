"use client";
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plus, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { updateSearchParam, removeSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";
import SuggestionsList from "./components/SuggestionsList";
import SuggestionsFilters from "./components/SuggestionsFilters";
import CreateSuggestionDialog from "./components/CreateSuggestionDialog";
import SuggestionDetailDialog from "./components/SuggestionDetailDialog";
import { mockSuggestions } from "./mockData";
import { Suggestion, SortOption, FilterOption, CreateSuggestionData } from "./types";

export default function SuggestionsContainer() {
    const searchParams = useSearchParams();
    const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
    
    // Get state from URL params
    const activeTab = useMemo(() => 
        (searchParams.get(SearchParamKeys.SUGGESTION_TAB) || "active") as "active" | "implemented",
        [searchParams]
    );
    const sortBy = useMemo(() => 
        (searchParams.get(SearchParamKeys.SUGGESTION_SORT) || "top") as SortOption,
        [searchParams]
    );
    const filterBy = useMemo(() => 
        (searchParams.get(SearchParamKeys.SUGGESTION_FILTER) || "all") as FilterOption,
        [searchParams]
    );
    const isCreateDialogOpen = useMemo(() => 
        searchParams.get(SearchParamKeys.NEW_SUGGESTION) === "true",
        [searchParams]
    );
    const suggestionId = useMemo(() => 
        searchParams.get(SearchParamKeys.SUGGESTION_ID),
        [searchParams]
    );
    
    // Get selected suggestion from ID
    const selectedSuggestion = useMemo(() => 
        suggestionId ? suggestions.find(s => s.id === suggestionId) || null : null,
        [suggestionId, suggestions]
    );

    // Filter suggestions by implementation status
    const activeSuggestions = useMemo(
        () => suggestions.filter(s => s.status !== "implemented"),
        [suggestions]
    );

    const implementedSuggestions = useMemo(
        () => suggestions.filter(s => s.status === "implemented"),
        [suggestions]
    );

    // Apply filters and sorting
    const getFilteredAndSortedSuggestions = (suggestionList: Suggestion[]) => {
        let filtered = suggestionList;

        // Apply category filter
        if (filterBy !== "all") {
            filtered = filtered.filter(s => s.category === filterBy);
        }

        // Apply sorting
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "top":
                    return b.score - a.score;
                case "newest":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case "oldest":
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                default:
                    return 0;
            }
        });

        return sorted;
    };

    const displayedActiveSuggestions = getFilteredAndSortedSuggestions(activeSuggestions);
    const displayedImplementedSuggestions = getFilteredAndSortedSuggestions(implementedSuggestions);

    const handleVote = (suggestionId: string, voteType: "upvote" | "downvote") => {
        setSuggestions(prev => prev.map(suggestion => {
            if (suggestion.id === suggestionId) {
                const currentVote = suggestion.userVote;
                let newUpvotes = suggestion.upvotes;
                let newDownvotes = suggestion.downvotes;
                let newUserVote: "upvote" | "downvote" | null = null;

                if (currentVote === voteType) {
                    // Unvote
                    if (voteType === "upvote") newUpvotes--;
                    else newDownvotes--;
                } else if (currentVote) {
                    // Change vote
                    if (voteType === "upvote") {
                        newUpvotes++;
                        newDownvotes--;
                        newUserVote = "upvote";
                    } else {
                        newDownvotes++;
                        newUpvotes--;
                        newUserVote = "downvote";
                    }
                } else {
                    // New vote
                    if (voteType === "upvote") {
                        newUpvotes++;
                        newUserVote = "upvote";
                    } else {
                        newDownvotes++;
                        newUserVote = "downvote";
                    }
                }

                return {
                    ...suggestion,
                    upvotes: newUpvotes,
                    downvotes: newDownvotes,
                    score: newUpvotes - newDownvotes,
                    userVote: newUserVote
                };
            }
            return suggestion;
        }));
    };

    const handleCreateSuggestion = (data: CreateSuggestionData) => {
        const newSuggestion: Suggestion = {
            id: Date.now().toString(),
            title: data.title,
            description: data.description,
            category: data.category,
            status: "pending",
            upvotes: 1,
            downvotes: 0,
            score: 1,
            views: 0,
            author: {
                id: "current-user",
                name: "You",
                username: "@you",
                avatar: "https://i.pravatar.cc/150?img=10"
            },
            createdAt: new Date().toISOString(),
            userVote: "upvote",
        };

        setSuggestions(prev => [newSuggestion, ...prev]);
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        updateSearchParam(SearchParamKeys.SUGGESTION_ID, suggestion.id);
    };

    const handleCloseDetail = () => {
        removeSearchParam(SearchParamKeys.SUGGESTION_ID);
    };

    const handleTabChange = (value: string) => {
        const tab = value as "active" | "implemented";
        if (tab === "active") {
            removeSearchParam(SearchParamKeys.SUGGESTION_TAB);
        } else {
            updateSearchParam(SearchParamKeys.SUGGESTION_TAB, tab);
        }
    };

    const handleSortChange = (sort: SortOption) => {
        if (sort === "top") {
            removeSearchParam(SearchParamKeys.SUGGESTION_SORT);
        } else {
            updateSearchParam(SearchParamKeys.SUGGESTION_SORT, sort);
        }
    };

    const handleFilterChange = (filter: FilterOption) => {
        if (filter === "all") {
            removeSearchParam(SearchParamKeys.SUGGESTION_FILTER);
        } else {
            updateSearchParam(SearchParamKeys.SUGGESTION_FILTER, filter);
        }
    };

    const handleOpenCreateDialog = () => {
        updateSearchParam(SearchParamKeys.NEW_SUGGESTION, "true");
    };

    const handleCloseCreateDialog = () => {
        removeSearchParam(SearchParamKeys.NEW_SUGGESTION);
    };

    return (
        <div className="flex-1 w-full space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between gap-4 flex-wrap max-sm:px-2 mt-5"
            >
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2 sm:gap-3">
                        <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                        Suggestions
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-normal">
                        Share your ideas and help shape the future of the platform
                    </p>
                </div>
                <Button
                    onClick={handleOpenCreateDialog}
                    className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                    <Plus className="h-4 w-4" />
                    New Suggestion
                </Button>
            </motion.div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={handleTabChange}>
                <div className="flex items-center justify-between gap-4 flex-wrap max-sm:px-2">
                    <TabsList className="rounded-3xl max-sm:w-full">
                        <TabsTrigger value="active" className="gap-2 rounded-3xl">
                            <Lightbulb className="h-4 w-4" />
                            Active
                            <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                {activeSuggestions.length}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger value="implemented" className="gap-2 rounded-3xl">
                            <CheckCircle2 className="h-4 w-4" />
                            Implemented
                            <span className="ml-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs font-semibold">
                                {implementedSuggestions.length}
                            </span>
                        </TabsTrigger>
                    </TabsList>

                    <SuggestionsFilters
                        currentSort={sortBy}
                        currentFilter={filterBy}
                        onSortChange={handleSortChange}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <AnimatePresence mode="wait">
                    {/* Active Suggestions */}
                    {activeTab === "active" && (
                        <TabsContent value="active" className="mt-6" forceMount>
                            <motion.div
                                key="active-tab"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <SuggestionsList
                                    suggestions={displayedActiveSuggestions}
                                    onVote={handleVote}
                                    onSuggestionClick={handleSuggestionClick}
                                />
                            </motion.div>
                        </TabsContent>
                    )}

                    {/* Implemented Suggestions */}
                    {activeTab === "implemented" && (
                        <TabsContent value="implemented" className="mt-6" forceMount>
                            <motion.div
                                key="implemented-tab"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <SuggestionsList
                                    suggestions={displayedImplementedSuggestions}
                                    onVote={handleVote}
                                    onSuggestionClick={handleSuggestionClick}
                                />
                            </motion.div>
                        </TabsContent>
                    )}
                </AnimatePresence>
                <div className="h-24" />
            </Tabs>

            {/* Create Suggestion Dialog */}
            <CreateSuggestionDialog
                open={isCreateDialogOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        handleCloseCreateDialog();
                    }
                }}
                onSubmit={handleCreateSuggestion}
            />

            {/* Suggestion Detail Dialog */}
            <SuggestionDetailDialog
                suggestion={selectedSuggestion}
                open={!!suggestionId}
                onOpenChange={(open) => {
                    if (!open) {
                        handleCloseDetail();
                    }
                }}
                onVote={handleVote}
            />
        </div>
    );
}

