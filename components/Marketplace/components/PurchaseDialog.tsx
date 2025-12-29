"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Check, Sparkles, AlertCircle, Crown } from "lucide-react";
import { MarketplaceItem } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ResponsiveModal } from "@/components/ui/responsive-modal";

interface PurchaseDialogProps {
    item: MarketplaceItem;
    isOpen: boolean;
    onClose: () => void;
}

const rarityColors = {
    common: "from-slate-500/20 to-slate-500/5 border-slate-500/30 text-slate-600 dark:text-slate-400",
    rare: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-600 dark:text-blue-400",
    epic: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-600 dark:text-purple-400",
    legendary: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-600 dark:text-amber-400",
    mythic: "from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-600 dark:text-rose-400"
};

type PurchaseStep = "confirm" | "processing" | "success";

export default function PurchaseDialog({ item, isOpen, onClose }: PurchaseDialogProps) {
    const [step, setStep] = useState<PurchaseStep>("confirm");
    const [userBalance] = useState(5000); // Mock user balance

    const canPurchase = userBalance >= item.price && !item.owned;
    const insufficientFunds = userBalance < item.price;

    const handlePurchase = () => {
        setStep("processing");
        
        // Simulate purchase processing
        setTimeout(() => {
            setStep("success");
            
            // Auto close after success
            setTimeout(() => {
                handleClose();
            }, 2000);
        }, 2000);
    };

    const handleClose = () => {
        setStep("confirm");
        onClose();
    };

    return (
        <ResponsiveModal 
            open={isOpen} 
            onOpenChange={handleClose}
            title="Purchase Item"
            description={item.owned ? "You already own this item" : "Review your purchase before confirming"}
        >
            <div className="relative">
                <AnimatePresence mode="wait">
                    {step === "confirm" && (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* Header */}
                            <div className="space-y-2 px-6 pt-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-bold">Purchase Item</h2>
                                        {item.featured && (
                                            <Badge className="bg-[#7600C9] hover:bg-[#7600C9]/90 text-white gap-1">
                                                <Sparkles className="h-3 w-3" />
                                                Featured
                                            </Badge>
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handleClose}
                                        className="shrink-0"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Review your purchase before confirming
                                </p>
                            </div>

                            <Separator />

                            <div className="px-6 pb-6 space-y-6">
                                {/* Item Preview */}
                                <div className="flex gap-4">
                                    <div className="relative shrink-0">
                                        <Avatar className="w-24 h-24 rounded-xl">
                                            <AvatarImage src={item.image} alt={item.name} />
                                            <AvatarFallback className="rounded-xl text-2xl">
                                                {item.name.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        {item.limitedEdition && (
                                            <div className="absolute -top-2 -right-2">
                                                <Badge variant="outline" className="bg-background gap-1">
                                                    <Crown className="h-3 w-3" />
                                                    Limited
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div>
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                                        </div>
                                        <p className="text-sm">{item.description}</p>
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
                                            {item.tags && item.tags.length > 0 && (
                                                <>
                                                    {item.tags.slice(0, 2).map(tag => (
                                                        <Badge key={tag} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {item.limitedEdition && item.stock !== undefined && (
                                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-amber-600">Limited Edition</p>
                                            <p className="text-muted-foreground">Only {item.stock} remaining in stock</p>
                                        </div>
                                    </div>
                                )}
                                <Separator />
                                {/* Pricing Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Item Price</span>
                                        <span className="font-semibold">{item.price.toLocaleString()} CHT</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Platform Fee</span>
                                        <span className="font-semibold text-emerald-600">Free</span>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between text-lg">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-bold text-[#D4AF37]">{item.price.toLocaleString()} CHT</span>
                                    </div>
                                </div>
                                {/* Wallet Balance */}
                                <div className={cn(
                                    "p-4 rounded-lg border flex items-center justify-between",
                                    insufficientFunds ? "bg-destructive/10 border-destructive/30" : "bg-muted/50"
                                )}>
                                    <div className="flex items-center gap-2">
                                        <Wallet className={cn(
                                            "h-5 w-5",
                                            insufficientFunds ? "text-destructive" : "text-[#D4AF37]"
                                        )} />
                                        <div>
                                            <p className="text-sm font-medium">Your Balance</p>
                                            <p className={cn(
                                                "text-lg font-bold",
                                                insufficientFunds ? "text-destructive" : "text-[#D4AF37]"
                                            )}>
                                                {userBalance.toLocaleString()} CHT
                                            </p>
                                        </div>
                                    </div>
                                    {!insufficientFunds && (
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">After Purchase</p>
                                            <p className="text-lg font-bold text-muted-foreground">
                                                {(userBalance - item.price).toLocaleString()} CHT
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {insufficientFunds && (
                                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-destructive">Insufficient Funds</p>
                                            <p className="text-muted-foreground">
                                                You need {(item.price - userBalance).toLocaleString()} more CHT to purchase this item
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={handleClose}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handlePurchase}
                                        disabled={!canPurchase}
                                        className="flex-1 bg-[#7600C9] hover:bg-[#7600C9]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {item.owned ? "Already Owned" : insufficientFunds ? "Insufficient Funds" : "Confirm Purchase"}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === "processing" && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="py-12 flex flex-col items-center justify-center space-y-6"
                        >
                            <motion.div
                                animate={{
                                    rotate: 360,
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 1, repeat: Infinity }
                                }}
                                className="p-6 rounded-full bg-[#7600C9]/10 border-2 border-[#7600C9]/30"
                            >
                                <Wallet className="h-12 w-12 text-[#7600C9]" />
                            </motion.div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-semibold">Processing Purchase</h3>
                                <p className="text-sm text-muted-foreground">Please wait while we complete your transaction...</p>
                            </div>
                        </motion.div>
                    )}

                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="py-12 flex flex-col items-center justify-center space-y-6"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="p-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30"
                            >
                                <Check className="h-12 w-12 text-emerald-600" />
                            </motion.div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-semibold text-emerald-600">Purchase Successful!</h3>
                                <p className="text-sm text-muted-foreground">
                                    {item.name} has been added to your collection
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ResponsiveModal>
    );
}

