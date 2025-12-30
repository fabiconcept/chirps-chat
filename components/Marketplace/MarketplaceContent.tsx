"use client";

import { useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { mockMarketplaceItems } from "./mockData";
import { MarketplaceFilters, MarketplaceView } from "./types";
import MarketplaceHeader from "./MarketplaceHeader";
import MarketplaceFiltersBar from "./components/MarketplaceFiltersBar";
import MarketplaceGrid from "./components/MarketplaceGrid";
import PurchaseDialog from "./components/PurchaseDialog";
import OwnedItemsView from "./components/OwnedItemsView";
import { MarketplaceItem } from "./types";
import { SearchParamKeys } from "@/lib/enums";
import { updateSearchParam, removeSearchParam } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";

export default function MarketplaceContent() {
    const searchParams = useSearchParams();

    // Get state from URL or use defaults
    const currentView = (searchParams.get(SearchParamKeys.MARKETPLACE_VIEW) as MarketplaceView) || "browse";
    const selectedItemId = searchParams.get(SearchParamKeys.MARKETPLACE_ITEM);
    
    const filters: MarketplaceFilters = {
        category: (searchParams.get(SearchParamKeys.MARKETPLACE_CATEGORY) as any) || "all",
        rarity: (searchParams.get(SearchParamKeys.MARKETPLACE_RARITY) as any) || "all",
        priceRange: (searchParams.get(SearchParamKeys.MARKETPLACE_PRICE) as any) || "all",
        sortBy: (searchParams.get(SearchParamKeys.MARKETPLACE_SORT) as any) || "featured",
        showOwned: searchParams.get(SearchParamKeys.MARKETPLACE_SHOW_OWNED) === "true"
    };

    const selectedItem = selectedItemId 
        ? mockMarketplaceItems.find(item => item.id === selectedItemId) || null
        : null;

    // Get owned items count
    const ownedItemsCount = useMemo(() => {
        return mockMarketplaceItems.filter(item => item.owned).length;
    }, []);

    // Filter and sort items
    const filteredItems = useMemo(() => {
        let items = [...mockMarketplaceItems];

        // Category filter
        if (filters.category !== "all") {
            items = items.filter(item => item.category === filters.category);
        }

        // Rarity filter
        if (filters.rarity !== "all") {
            items = items.filter(item => item.rarity === filters.rarity);
        }

        // Price range filter
        if (filters.priceRange !== "all") {
            const ranges = {
                "0-100": { min: 0, max: 100 },
                "100-500": { min: 100, max: 500 },
                "500-1000": { min: 500, max: 1000 },
                "1000+": { min: 1000, max: Infinity }
            };
            const range = ranges[filters.priceRange];
            items = items.filter(item => item.price >= range.min && item.price < range.max);
        }

        // Show owned filter
        if (!filters.showOwned) {
            items = items.filter(item => !item.owned);
        }

        // Sorting
        switch (filters.sortBy) {
            case "featured":
                items.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return 0;
                });
                break;
            case "price-low":
                items.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                items.sort((a, b) => b.price - a.price);
                break;
            case "name":
                items.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "rarity":
                const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3, mythic: 4 };
                items.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
                break;
        }

        return items;
    }, [filters]);

    // Handlers
    const handleViewChange = (view: MarketplaceView) => {
        if (view !== "browse") {
            updateSearchParam(SearchParamKeys.MARKETPLACE_VIEW, view);
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_VIEW);
        }
        
        // Reset all filters when changing tabs
        removeSearchParam(SearchParamKeys.MARKETPLACE_CATEGORY);
        removeSearchParam(SearchParamKeys.MARKETPLACE_RARITY);
        removeSearchParam(SearchParamKeys.MARKETPLACE_PRICE);
        removeSearchParam(SearchParamKeys.MARKETPLACE_SORT);
        removeSearchParam(SearchParamKeys.MARKETPLACE_SHOW_OWNED);
        removeSearchParam(SearchParamKeys.MARKETPLACE_SEARCH);
        removeSearchParam(SearchParamKeys.MARKETPLACE_VIEW_MODE);
    };

    const handleFiltersChange = (newFilters: MarketplaceFilters) => {
        // Update each filter in URL, but skip "all" defaults
        if (newFilters.category !== "all") {
            updateSearchParam(SearchParamKeys.MARKETPLACE_CATEGORY, newFilters.category);
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_CATEGORY);
        }
        
        if (newFilters.rarity !== "all") {
            updateSearchParam(SearchParamKeys.MARKETPLACE_RARITY, newFilters.rarity);
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_RARITY);
        }
        
        if (newFilters.priceRange !== "all") {
            updateSearchParam(SearchParamKeys.MARKETPLACE_PRICE, newFilters.priceRange);
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_PRICE);
        }
        
        if (newFilters.sortBy !== "featured") {
            updateSearchParam(SearchParamKeys.MARKETPLACE_SORT, newFilters.sortBy);
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_SORT);
        }
        
        if (newFilters.showOwned) {
            updateSearchParam(SearchParamKeys.MARKETPLACE_SHOW_OWNED, "true");
        } else {
            removeSearchParam(SearchParamKeys.MARKETPLACE_SHOW_OWNED);
        }
    };

    const handleItemClick = (item: MarketplaceItem) => {
        updateSearchParam(SearchParamKeys.MARKETPLACE_ITEM, item.id);
    };

    const handleCloseDialog = () => {
        removeSearchParam(SearchParamKeys.MARKETPLACE_ITEM);
    };

    return (
        <>
            <MarketplaceHeader 
                currentView={currentView}
                onViewChange={handleViewChange}
                ownedCount={ownedItemsCount}
            />

            <div className="container mx-auto h-full px-4 py-6 w-full">
                {currentView === "browse" ? (
                    <>
                        <MarketplaceFiltersBar 
                            filters={filters} 
                            setFilters={handleFiltersChange}
                            itemCount={filteredItems.length}
                        />
                        
                        <MarketplaceGrid 
                            items={filteredItems}
                            onItemClick={handleItemClick}
                        />
                    </>
                ) : (
                    <OwnedItemsView 
                        items={mockMarketplaceItems.filter(item => item.owned)}
                        onItemClick={handleItemClick}
                    />
                )}

                <AnimatePresence mode="wait">
                    {selectedItem && (
                        <PurchaseDialog
                            item={selectedItem}
                            isOpen={!!selectedItem}
                            onClose={handleCloseDialog}
                        />
                    )}
                </AnimatePresence>
            </div>
            <div className="h-20 w-full" />
        </>
    );
}