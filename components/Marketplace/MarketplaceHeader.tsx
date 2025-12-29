"use client";
import { Store, Package } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MarketplaceView } from "./types";

interface MarketplaceHeaderProps {
    currentView: MarketplaceView;
    onViewChange: (view: MarketplaceView) => void;
    ownedCount: number;
}

export default function MarketplaceHeader({ currentView, onViewChange, ownedCount }: MarketplaceHeaderProps) {
    return (
        <div className="container mx-auto px-4 py-4 w-full">
            <div className="flex items-center justify-between w-full">
                {/* Title */}
                <h1 className="text-xl md:text-2xl font-semibold flex-1">
                    {currentView === "browse" ? "Marketplace" : "My Collection"}
                </h1>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                    <Button
                        variant={currentView === "browse" ? "default" : "outline"}
                        size="sm"
                        onClick={() => onViewChange("browse")}
                    >
                        <Store className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Browse</span>
                    </Button>
                    <Button
                        variant={currentView === "owned" ? "default" : "outline"}
                        size="sm"
                        onClick={() => onViewChange("owned")}
                    >
                        <Package className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Collection</span>
                        {ownedCount > 0 && (
                            <Badge variant="secondary" className="ml-2">
                                {ownedCount}
                            </Badge>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

