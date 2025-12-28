"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MarketplaceItem } from "../types";
import MarketplaceItemCard from "./MarketplaceItemCard";

interface MarketplaceGridProps {
    items: MarketplaceItem[];
    onItemClick: (item: MarketplaceItem) => void;
}

export default function MarketplaceGrid({ items, onItemClick }: MarketplaceGridProps) {
    if (items.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 min-h-[400px] w-full"
            >
                <div className="text-center space-y-2">
                    <p className="text-2xl font-semibold">No items found</p>
                    <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {items.map((item) => (
                <MarketplaceItemCard
                    key={item.id}
                    item={item}
                    onClick={() => onItemClick(item)}
                />
            ))}
        </div>
    );
}

