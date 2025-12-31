"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingCart, Sparkles, Lock } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import ProtectedImage from "@/components/Feed/TextPost/ProtectedImage";
import { HugeiconsIcon } from "@hugeicons/react";
import { Coins01FreeIcons } from "@hugeicons/core-free-icons";

type AvatarItem = {
    id: string;
    url: string;
    name: string;
    isOwned: boolean;
    price?: number;
    rarity?: "common" | "rare" | "epic" | "legendary";
};

// Mock data - Replace with actual API call
const mockAvatars: AvatarItem[] = [
    { id: "1", url: "https://chirps-chat.sirv.com/premium/rasta.png", name: "Rasta", isOwned: true, rarity: "legendary" },
    { id: "2", url: "https://chirps-chat.sirv.com/premium/god.png", name: "God", isOwned: true, rarity: "epic" },
    { id: "3", url: "https://chirps-chat.sirv.com/premium/frankenstein.png", name: "Frankenstein", isOwned: true, rarity: "rare" },
    { id: "4", url: "https://chirps-chat.sirv.com/premium/anonymous.png", name: "Anonymous", isOwned: true, rarity: "epic" },
    { id: "5", url: "https://chirps-chat.sirv.com/premium/ironman.png", name: "Ironman", isOwned: false, price: 500, rarity: "rare" },
    { id: "6", url: "https://chirps-chat.sirv.com/premium/decision.png", name: "Decision", isOwned: false, price: 1000, rarity: "epic" },
    { id: "7", url: "https://chirps-chat.sirv.com/premium/grinch.png", name: "Grinch", isOwned: false, price: 2500, rarity: "legendary" },
    { id: "8", url: "https://chirps-chat.sirv.com/premium/batman.png", name: "Batman", isOwned: false, price: 100, rarity: "common" },
];

const rarityColors = {
    common: "from-gray-500/20 to-gray-500/5 border-gray-500/30",
    rare: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    epic: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
    legendary: "from-amber-500/20 to-amber-500/5 border-amber-500/30"
};

const rarityBadgeColors = {
    common: "bg-gray-500/70 text-white border-gray-500/20",
    rare: "bg-blue-500/70 text-white border-blue-500/20",
    epic: "bg-purple-500/70 text-white border-purple-500/20",
    legendary: "bg-amber-500/70 text-white border-amber-500/20"
};

interface AvatarSelectorProps {
    selectedAvatarUrl: string;
    onAvatarSelect: (url: string) => void;
    displayName: string;
    type?: "user" | "room";
}

export default function AvatarSelector({ selectedAvatarUrl, onAvatarSelect, displayName, type = "user" }: AvatarSelectorProps) {
    const [avatars] = useState<AvatarItem[]>(mockAvatars);
    const [isOpen, setIsOpen] = useState(false);

    const ownedAvatars = avatars.filter(a => a.isOwned);
    const marketplaceAvatars = avatars.filter(a => !a.isOwned);

    const handleSelect = (avatar: AvatarItem) => {
        if (avatar.isOwned) {
            onAvatarSelect(avatar.url);
            setIsOpen(false);
        }
    };

    const handleMarketplace = () => {
        // Navigate to marketplace
        window.location.href = "/marketplace";
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button className="relative group cursor-pointer">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-xl ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                        <AvatarImage src={selectedAvatarUrl} alt={displayName} />
                        <AvatarFallback className="text-lg">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="absolute -bottom-1 -right-1 bg-primary rounded-full p-2 shadow-lg cursor-pointer"
                    >
                        <Sparkles className="h-4 w-4 text-white" />
                    </motion.div>
                </button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-[420px] p-0 border-2 border-primary/20 shadow-2xl rounded-3xl overflow-hidden" 
                align="start"
                side="right"
            >
                <div className="max-h-[600px] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-input p-4 bg-linear-to-b from-foreground/5 to-transparent">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            {type === "user" ? "Your Avatars" : "Room Avatars"}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            Select from your collection or visit the marketplace
                        </p>
                    </div>

                    {/* Owned Avatars */}
                    <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="font-semibold text-sm">Owned ({ownedAvatars.length})</Label>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Available
                            </Badge>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3">
                            <AnimatePresence mode="popLayout">
                                {ownedAvatars.map((avatar, index) => (
                                    <motion.button
                                        key={avatar.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSelect(avatar)}
                                        className={cn(
                                            "relative cursor-pointer aspect-square rounded-xl border-2 bg-linear-to-br overflow-hidden transition-all duration-300",
                                            selectedAvatarUrl === avatar.url
                                                ? "border-primary shadow-lg shadow-primary/25"
                                                : "border-input hover:border-primary/50",
                                            rarityColors[avatar.rarity || "common"]
                                        )}
                                    >
                                        <ProtectedImage 
                                            src={avatar.url} 
                                            alt={avatar.name}
                                            fill
                                            className="w-full h-full object-cover"
                                        />
                                        
                                        {/* Selected Indicator */}
                                        {selectedAvatarUrl === avatar.url && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] overflow-hidden rounded-lg flex items-center justify-center"
                                            >
                                                <div className="bg-background/30 backdrop-blur-sm border border-background/40 rounded-full p-1.5">
                                                    <Check className="h-4 w-4 text-foreground" strokeWidth={3} />
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Rarity Badge */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2">
                                            <Badge 
                                                variant="outline" 
                                                className={cn("text-[10px] px-1.5 py-0 h-4 backdrop-blur-sm", rarityBadgeColors[avatar.rarity || "common"])}
                                            >
                                                {avatar.rarity}
                                            </Badge>
                                        </div>
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>

                        {ownedAvatars.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                <Lock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No avatars owned yet</p>
                            </div>
                        )}
                    </div>

                    {/* Marketplace Preview */}
                    {marketplaceAvatars.length > 0 && (
                        <>
                            <div className="border-t border-input" />
                            <div className="p-4 space-y-3 bg-muted/30">
                                <div className="flex items-center justify-between">
                                    <Label className="font-semibold text-sm">Marketplace Preview</Label>
                                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                        {marketplaceAvatars.length} Available
                                    </Badge>
                                </div>
                                
                                <div className="grid grid-cols-4 gap-3">
                                    {marketplaceAvatars.slice(0, 8).map((avatar, index) => (
                                        <motion.div
                                            key={avatar.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={cn(
                                                "relative aspect-square rounded-xl border-2 bg-linear-to-br overflow-hidden cursor-not-allowed",
                                                rarityColors[avatar.rarity || "common"]
                                            )}
                                        >
                                            <ProtectedImage 
                                                src={avatar.url} 
                                                alt={avatar.name}
                                                fill
                                                className="w-full h-full object-cover grayscale-50"
                                            />
                                            
                                            {/* Locked Overlay */}
                                            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-xl">
                                                <HugeiconsIcon 
                                                    icon={Coins01FreeIcons} 
                                                    className="h-5 w-5 text-[#D4Af37] mt-1" 
                                                />
                                                <span className="text-[10px] font-bold text-[#D4Af37]">
                                                    <span>{formatNumber(avatar.price || 0)}</span> <span>CHT</span>
                                                </span>
                                            </div>

                                            {/* Rarity Badge */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                                                <Badge 
                                                    variant="outline" 
                                                    className={cn("text-[10px] px-1.5 py-0 h-4", rarityBadgeColors[avatar.rarity || "common"])}
                                                >
                                                    {avatar.rarity}
                                                </Badge>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-input p-4">
                        <Button 
                            onClick={handleMarketplace}
                            className="w-full shadow-lg hover:shadow-xl transition-all"
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Visit Marketplace
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
    return <div className={className}>{children}</div>;
}

