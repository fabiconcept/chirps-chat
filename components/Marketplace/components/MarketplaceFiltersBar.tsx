"use client";

import { motion } from "framer-motion";
import { Filter, SlidersHorizontal } from "lucide-react";
import { MarketplaceFilters } from "../types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface MarketplaceFiltersBarProps {
    filters: MarketplaceFilters;
    setFilters: (filters: MarketplaceFilters) => void;
    itemCount: number;
}

export default function MarketplaceFiltersBar({ filters, setFilters, itemCount }: MarketplaceFiltersBarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 space-y-4"
        >
            {/* Category Tabs */}
            <Tabs
                value={filters.category}
                onValueChange={(value) => setFilters({ ...filters, category: value as any })}
                className="w-full"
            >
                <TabsList className="w-full grid grid-cols-3 h-auto p-1 rounded-3xl">
                    <TabsTrigger value="all" className="text-xs md:text-sm rounded-3xl">All Items</TabsTrigger>
                    <TabsTrigger value="avatar" className="text-xs md:text-sm rounded-3xl">Avatars</TabsTrigger>
                    <TabsTrigger value="banner" className="text-xs md:text-sm rounded-3xl">Banners</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Rarity Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-linear-to-b rounded-3xl from-foreground/10 to-transparent gap-2" size="sm" title="Filter by Rarity">
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">Rarity:</span>
                            <span className="font-medium capitalize">{filters.rarity}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-linear-to-t rounded-3xl from-foreground/25 to-transparent p-1 space-y-1 bg-background/90 backdrop-blur-sm">
                        <DropdownMenuRadioGroup
                            value={filters.rarity}
                            onValueChange={(value) => setFilters({ ...filters, rarity: value as any })}
                            className="flex flex-col gap-1"
                        >
                            <DropdownMenuRadioItem value="all" className="rounded-3xl">All Rarities</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="common" className="rounded-3xl">Common</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="rare" className="rounded-3xl">Rare</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="epic" className="rounded-3xl">Epic</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="legendary" className="rounded-3xl">Legendary</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="mythic" className="rounded-3xl">Mythic</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Price Range Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-linear-to-b rounded-3xl from-foreground/10 to-transparent gap-2" size="sm" title="Filter by Price">
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="hidden sm:inline">Price:</span>
                            <span className="font-medium">{filters.priceRange === "all" ? "All" : filters.priceRange}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-linear-to-t rounded-3xl from-foreground/25 to-transparent p-1 space-y-1 bg-background/90 backdrop-blur-sm">
                        <DropdownMenuRadioGroup
                            value={filters.priceRange}
                            onValueChange={(value) => setFilters({ ...filters, priceRange: value as any })}
                            className="flex flex-col gap-1"
                        >
                            <DropdownMenuRadioItem value="all" className="rounded-3xl">All Prices</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="0-100" className="rounded-3xl">0 - 100 CHT</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="100-500" className="rounded-3xl">100 - 500 CHT</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="500-1000" className="rounded-3xl">500 - 1K CHT</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="1000+" className="rounded-3xl">1K+ CHT</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-linear-to-b rounded-3xl from-foreground/10 to-transparent gap-2" size="sm" title="Sort by">
                            Sort: <span className="font-medium capitalize">{filters.sortBy.replace("-", " ")}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-linear-to-t rounded-3xl from-foreground/25 to-transparent p-1 space-y-1 bg-background/90 backdrop-blur-sm">
                        <DropdownMenuRadioGroup
                            value={filters.sortBy}
                            className="flex flex-col gap-1"
                            onValueChange={(value) => setFilters({ ...filters, sortBy: value as any })}
                        >
                            <DropdownMenuRadioItem value="featured" className="rounded-3xl">Featured</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="price-low" className="rounded-3xl">Price: Low to High</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="price-high" className="rounded-3xl">Price: High to Low</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="name" className="rounded-3xl">Name</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="rarity" className="rounded-3xl">Rarity</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Show Owned Toggle */}
                <div className="flex items-center gap-2 ml-auto cursor-pointer">
                    <Switch
                        id="show-owned"
                        checked={filters.showOwned}
                        onCheckedChange={(checked) => setFilters({ ...filters, showOwned: checked })}
                    />
                    <Label htmlFor="show-owned" className="text-sm cursor-pointer">
                        Show Owned
                    </Label>
                </div>

                {/* Item Count */}
                <div className="text-sm text-muted-foreground hidden md:block">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                </div>
            </div>
        </motion.div>
    );
}

