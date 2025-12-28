"use client";

import { motion } from "framer-motion";
import { Crown, Sparkles, Check, AlertCircle } from "lucide-react";
import { MarketplaceItem } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MarketplaceItemCardProps {
    item: MarketplaceItem;
    onClick: () => void;
}

const rarityColors = {
    common: "from-slate-500/10 to-slate-500/5 border-slate-500/30 text-slate-600 dark:text-slate-400",
    rare: "from-blue-500/10 to-blue-500/5 border-blue-500/30 text-blue-600 dark:text-blue-400",
    epic: "from-purple-500/10 to-purple-500/5 border-purple-500/30 text-purple-600 dark:text-purple-400",
    legendary: "from-amber-500/10 to-amber-500/5 border-amber-500/30 text-amber-600 dark:text-amber-400",
    mythic: "from-rose-500/10 to-rose-500/5 border-rose-500/30 text-rose-600 dark:text-rose-400"
};

const rarityGlows = {
    common: "shadow-slate-500/5 hover:border-slate-500/50",
    rare: "shadow-blue-500/10 hover:border-blue-500/50",
    epic: "shadow-purple-500/10 hover:border-purple-500/50",
    legendary: "shadow-amber-500/20 hover:border-amber-500/50",
    mythic: "shadow-rose-500/20 hover:border-rose-500/50"
};

export default function MarketplaceItemCard({ item, onClick }: MarketplaceItemCardProps) {
    return (
        <motion.div
            layout
            layoutId={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                layout: {
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
            }}
            whileHover={{ y: -4 }}
            onClick={onClick}
            className={cn(
                "group relative cursor-pointer rounded-3xl border bg-background overflow-hidden",
                "hover:shadow-xl transition-all duration-300",
                rarityGlows[item.rarity]
            )}
        >
            {/* Featured Badge */}
            {item.featured && (
                <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-[#7600C9] hover:bg-[#7600C9]/90 text-white gap-1">
                        <Sparkles className="h-3 w-3" />
                        Featured
                    </Badge>
                </div>
            )}

            {/* Limited Edition Badge */}
            {item.limitedEdition && (
                <div className="absolute top-3 right-3 z-10">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm gap-1">
                        <Crown className="h-3 w-3" />
                        Limited
                    </Badge>
                </div>
            )}

            {/* Owned Overlay */}
            {item.owned && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-10 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/50">
                        <Check className="h-5 w-5 text-emerald-600" />
                        <span className="font-semibold text-emerald-600">Owned</span>
                    </div>
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted/30">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                >
                    <Avatar className="w-full h-full rounded-none">
                        <AvatarImage 
                            src={item.image} 
                            alt={item.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="rounded-none text-4xl">
                            {item.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </motion.div>

                {/* Rarity Gradient Overlay */}
                <div className={cn(
                    "absolute inset-0 bg-linear-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    rarityColors[item.rarity]
                )} />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Title & Category */}
                <div>
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-[#7600C9] transition-colors">
                        {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                </p>

                {/* Rarity Badge */}
                <div className="flex items-center gap-2">
                    <Badge 
                        variant="outline" 
                        className={cn(
                            "capitalize border bg-linear-to-r",
                            rarityColors[item.rarity]
                        )}
                    >
                        {item.rarity}
                    </Badge>
                    {item.limitedEdition && item.stock !== undefined && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {item.stock} left
                        </span>
                    )}
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="text-lg font-bold text-[#D4AF37]">
                            {item.price.toLocaleString()} <span className="text-xs font-normal">CHT</span>
                        </p>
                    </div>
                    <Button 
                        size="sm"
                        disabled={item.owned}
                        className={cn(
                            "bg-[#7600C9] hover:bg-[#7600C9]/90 text-white",
                            item.owned && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                    >
                        {item.owned ? "Owned" : "Buy Now"}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

