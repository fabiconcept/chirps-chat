"use client";
import { Store, TrendingUp, Clock, Package } from "lucide-react";
import { motion } from "framer-motion";
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
        <div className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4"
                >
                    {/* Header Title */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-linear-to-br from-[#7600C9]/20 to-[#7600C9]/5 border border-[#7600C9]/30">
                                {currentView === "browse" ? (
                                    <Store className="h-6 w-6 text-[#7600C9]" />
                                ) : (
                                    <Package className="h-6 w-6 text-[#7600C9]" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">
                                    {currentView === "browse" ? "Marketplace" : "My Collection"}
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    {currentView === "browse" 
                                        ? "Discover exclusive avatars, badges & more" 
                                        : `${ownedCount} items in your collection`
                                    }
                                </p>
                            </div>
                        </div>

                        {/* View Toggle & Stats */}
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-2 p-1 rounded-lg bg-muted/50 border border-border">
                                <Button
                                    variant={currentView === "browse" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => onViewChange("browse")}
                                    className={currentView === "browse" ? "bg-[#7600C9] hover:bg-[#7600C9]/90 text-white" : ""}
                                >
                                    <Store className="h-4 w-4 mr-2" />
                                    Browse
                                </Button>
                                <Button
                                    variant={currentView === "owned" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => onViewChange("owned")}
                                    className={currentView === "owned" ? "bg-[#7600C9] hover:bg-[#7600C9]/90 text-white" : ""}
                                >
                                    <Package className="h-4 w-4 mr-2" />
                                    Collection
                                    <Badge variant="secondary" className="ml-2">
                                        {ownedCount}
                                    </Badge>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View Toggle */}
                    <div className="md:hidden flex gap-2">
                        <Button
                            variant={currentView === "browse" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onViewChange("browse")}
                            className={currentView === "browse" ? "bg-[#7600C9] hover:bg-[#7600C9]/90 text-white flex-1" : "flex-1"}
                        >
                            <Store className="h-4 w-4 mr-2" />
                            Browse
                        </Button>
                        <Button
                            variant={currentView === "owned" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onViewChange("owned")}
                            className={currentView === "owned" ? "bg-[#7600C9] hover:bg-[#7600C9]/90 text-white flex-1" : "flex-1"}
                        >
                            <Package className="h-4 w-4 mr-2" />
                            Collection ({ownedCount})
                        </Button>
                    </div>

                    {/* Featured Banner - Only show in browse view */}
                    {currentView === "browse" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative overflow-hidden rounded-xl bg-linear-to-t from-[#7600C9]/10 via-[#7600C9]/5 to-transparent border border-[#7600C9]/30 p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-[#7600C9] hover:bg-[#7600C9]/90 text-white">
                                        🔥 Featured
                                    </Badge>
                                    <span className="text-sm font-medium">New legendary items just dropped!</span>
                                </div>
                                <span className="text-xs text-muted-foreground hidden sm:block">
                                    Limited stock available
                                </span>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

