"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Package, Grid3x3, List, Search } from "lucide-react";
import { MarketplaceItem, MarketplaceItemCategory } from "../types";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MarketplaceItemCard from "./MarketplaceItemCard";
import { cn, updateSearchParam, removeSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";

interface OwnedItemsViewProps {
    items: MarketplaceItem[];
    onItemClick: (item: MarketplaceItem) => void;
}

export default function OwnedItemsView({ items, onItemClick }: OwnedItemsViewProps) {
    const searchParams = useSearchParams();
    
    // Get state from URL or use defaults
    const searchQuery = searchParams.get(SearchParamKeys.MARKETPLACE_SEARCH) || "";
    const categoryFilter = (searchParams.get(SearchParamKeys.MARKETPLACE_CATEGORY) as MarketplaceItemCategory | "all") || "all";
    const viewMode = (searchParams.get(SearchParamKeys.MARKETPLACE_VIEW_MODE) as "grid" | "list") || "grid";

    // Handlers
    const handleSearchChange = (value: string) => {
        if (value) {
            updateSearchParam(SearchParamKeys.MARKETPLACE_SEARCH, value);
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_SEARCH);
        }
    };

    const handleCategoryChange = (value: string) => {
        if (value !== "all") {
            updateSearchParam(SearchParamKeys.MARKETPLACE_CATEGORY, value);
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_CATEGORY);
        }
    };

    const handleViewModeChange = (mode: "grid" | "list") => {
        if (mode !== "grid") {
            updateSearchParam(SearchParamKeys.MARKETPLACE_VIEW_MODE, mode);
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_VIEW_MODE);
        }
    };

    // Category counts
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {
            all: items.length,
            avatar: 0,
            badge: 0,
            theme: 0,
            emote: 0,
            banner: 0
        };

        items.forEach(item => {
            counts[item.category]++;
        });

        return counts;
    }, [items]);

    // Filter items
    const filteredItems = useMemo(() => {
        let filtered = [...items];

        // Category filter
        if (categoryFilter !== "all") {
            filtered = filtered.filter(item => item.category === categoryFilter);
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [items, categoryFilter, searchQuery]);

    if (items.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 space-y-4 min-h-[400px] w-full"
            >
                <div className="p-6 rounded-full bg-muted/50 border-2 border-dashed border-border">
                    <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">No items in your collection</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        Start browsing the marketplace to discover and purchase exclusive items
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-linear-to-br from-[#7600C9]/10 to-[#7600C9]/5 border border-[#7600C9]/30"
                >
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="text-2xl font-bold text-[#7600C9]">{categoryCounts.all}</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border"
                >
                    <p className="text-sm text-muted-foreground">Avatars</p>
                    <p className="text-2xl font-bold">{categoryCounts.avatar}</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border"
                >
                    <p className="text-sm text-muted-foreground">Badges</p>
                    <p className="text-2xl font-bold">{categoryCounts.badge}</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border"
                >
                    <p className="text-sm text-muted-foreground">Themes</p>
                    <p className="text-2xl font-bold">{categoryCounts.theme}</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border"
                >
                    <p className="text-sm text-muted-foreground">Emotes</p>
                    <p className="text-2xl font-bold">{categoryCounts.emote}</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border"
                >
                    <p className="text-sm text-muted-foreground">Banners</p>
                    <p className="text-2xl font-bold">{categoryCounts.banner}</p>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search your collection..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/50 border border-border">
                    <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleViewModeChange("grid")}
                        className={cn("px-3", viewMode === "grid" && "bg-[#7600C9] hover:bg-[#7600C9]/90 text-white")}
                    >
                        <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleViewModeChange("list")}
                        className={cn("px-3", viewMode === "list" && "bg-[#7600C9] hover:bg-[#7600C9]/90 text-white")}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Category Tabs */}
            <Tabs
                value={categoryFilter}
                onValueChange={handleCategoryChange}
                className="w-full"
            >
                <TabsList className="w-full grid grid-cols-3 h-auto p-1">
                    <TabsTrigger value="all" className="text-xs md:text-sm">
                        All ({categoryCounts.all})
                    </TabsTrigger>
                    <TabsTrigger value="avatar" className="text-xs md:text-sm">
                        Avatars ({categoryCounts.avatar})
                    </TabsTrigger>
                    <TabsTrigger value="banner" className="text-xs md:text-sm">
                        Banners ({categoryCounts.banner})
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Items Grid/List */}
            {filteredItems.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 min-h-[400px] w-full"
                >
                    <p className="text-lg font-semibold">No items found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                </motion.div>
            ) : (
                <div
                    className={cn(
                        "grid gap-6 w-full",
                        viewMode === "grid" 
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            : "grid-cols-1"
                    )}
                >
                    {filteredItems.map((item) => (
                        <MarketplaceItemCard
                            key={item.id}
                            item={item}
                            onClick={() => onItemClick(item)}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}

