"use client";

import { motion } from "framer-motion";
import { Filter, SlidersHorizontal } from "lucide-react";
import { MarketplaceFilters } from "../types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
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
                <TabsList className="w-full grid grid-cols-3 h-auto p-1">
                    <TabsTrigger value="all" className="text-xs md:text-sm">All Items</TabsTrigger>
                    <TabsTrigger value="avatar" className="text-xs md:text-sm">Avatars</TabsTrigger>
                    <TabsTrigger value="banner" className="text-xs md:text-sm">Banners</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Rarity Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">Rarity:</span>
                            <span className="font-medium capitalize">{filters.rarity}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Filter by Rarity</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={filters.rarity}
                            onValueChange={(value) => setFilters({ ...filters, rarity: value as any })}
                        >
                            <DropdownMenuRadioItem value="all">All Rarities</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="common">Common</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="rare">Rare</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="epic">Epic</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="legendary">Legendary</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="mythic">Mythic</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Price Range Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="hidden sm:inline">Price:</span>
                            <span className="font-medium">{filters.priceRange === "all" ? "All" : filters.priceRange}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Filter by Price</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={filters.priceRange}
                            onValueChange={(value) => setFilters({ ...filters, priceRange: value as any })}
                        >
                            <DropdownMenuRadioItem value="all">All Prices</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="0-100">0 - 100 CHT</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="100-500">100 - 500 CHT</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="500-1000">500 - 1K CHT</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="1000+">1K+ CHT</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            Sort: <span className="font-medium capitalize">{filters.sortBy.replace("-", " ")}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={filters.sortBy}
                            onValueChange={(value) => setFilters({ ...filters, sortBy: value as any })}
                        >
                            <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="rarity">Rarity</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Show Owned Toggle */}
                <div className="flex items-center gap-2 ml-auto">
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

