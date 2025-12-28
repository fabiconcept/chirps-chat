"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
    ArrowUpRight, 
    ArrowDownLeft, 
    Gift, 
    ShoppingCart, 
    ExternalLink, 
    Copy,
    Check,
    Calendar,
    Hash,
    DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction } from "./TransactionList";
import { useState } from "react";

interface TransactionDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transaction: Transaction | null;
}

const transactionConfig = {
    receive: {
        icon: ArrowDownLeft,
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
        label: "Received",
        description: "Tokens received into your wallet"
    },
    send: {
        icon: ArrowUpRight,
        color: "text-red-600",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        label: "Sent",
        description: "Tokens sent from your wallet"
    },
    reward: {
        icon: Gift,
        color: "text-[#D4AF37]",
        bgColor: "bg-[#D4AF37]/10",
        borderColor: "border-[#D4AF37]/20",
        label: "Reward",
        description: "Tokens earned as reward"
    },
    purchase: {
        icon: ShoppingCart,
        color: "text-blue-600",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        label: "Purchase",
        description: "Tokens spent on purchase"
    }
};

export default function TransactionDetailDialog({ 
    open, 
    onOpenChange, 
    transaction 
}: TransactionDetailDialogProps) {
    const [copiedHash, setCopiedHash] = useState(false);

    if (!transaction) return null;

    const config = transactionConfig[transaction.type];
    const Icon = config.icon;
    const isPositive = transaction.amount > 0;

    const handleCopyHash = () => {
        if (transaction.hash) {
            navigator.clipboard.writeText(transaction.hash);
            setCopiedHash(true);
            setTimeout(() => setCopiedHash(false), 2000);
        }
    };

    const handleViewOnExplorer = () => {
        if (transaction.hash) {
            window.open(`https://etherscan.io/tx/${transaction.hash}`, '_blank');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] p-0 gap-0 overflow-hidden rounded-2xl">
                {/* Header with gradient */}
                <DialogHeader className={cn(
                    "px-6 pt-6 pb-6 border-b border-border relative overflow-hidden",
                    "bg-linear-to-br",
                    isPositive ? "from-green-500/10 to-background" : "from-destructive/10 to-background"
                )}>
                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                            className="mx-auto mb-4 relative w-fit"
                        >
                            <div className={cn(
                                "h-20 w-20 rounded-full flex items-center justify-center border-4",
                                config.bgColor,
                                config.borderColor
                            )}>
                                <Icon className={cn("h-10 w-10", config.color)} strokeWidth={2.5} />
                            </div>
                            {/* Animated ring */}
                            <motion.div
                                className={cn(
                                    "absolute inset-0 rounded-full border-2",
                                    config.borderColor
                                )}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>

                        <DialogTitle className="text-center">
                            <Badge
                                variant="outline"
                                className={cn(
                                    "mb-2 text-xs",
                                    config.bgColor,
                                    config.color,
                                    config.borderColor
                                )}
                            >
                                {config.label}
                            </Badge>
                            <h2 className={cn(
                                "text-3xl font-medium tabular-nums",
                                isPositive ? "text-green-600" : "text-destructive"
                            )}>
                                {isPositive ? "+" : ""}{transaction.amount.toLocaleString()}
                                <span className="text-base ml-2 text-muted-foreground">CHT</span>
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {config.description}
                            </p>
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {/* Transaction details */}
                <div className="p-6 space-y-4">
                    {/* Description */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <Hash className="h-3.5 w-3.5" />
                            Description
                        </div>
                        <p className="text-sm font-normal text-foreground pl-6">
                            {transaction.description}
                        </p>
                    </div>

                    <Separator />

                    {/* Date */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <Calendar className="h-3.5 w-3.5" />
                            Date & Time
                        </div>
                        <p className="text-sm font-normal text-foreground pl-6">
                            {transaction.date}
                        </p>
                    </div>

                    {/* Transaction hash */}
                    {transaction.hash && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Transaction Hash
                                </div>
                                <div className="pl-6 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 text-sm font-mono bg-muted px-3 py-2 rounded-lg border border-border truncate">
                                            {transaction.hash}
                                        </code>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            onClick={handleCopyHash}
                                            className={cn(
                                                "shrink-0 transition-all",
                                                copiedHash && "bg-green-500/10 text-green-600 border-green-500/20"
                                            )}
                                        >
                                            {copiedHash ? (
                                                <Check className="h-3.5 w-3.5" />
                                            ) : (
                                                <Copy className="h-3.5 w-3.5" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Status */}
                    <Separator />
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <DollarSign className="h-3.5 w-3.5" />
                            Status
                        </div>
                        <div className="pl-6">
                            <Badge
                                variant="outline"
                                className="bg-green-500/10 text-green-600 border-green-500/20"
                            >
                                {transaction.status || "Completed"}
                            </Badge>
                        </div>
                    </div>

                    {/* Actions */}
                    {transaction.hash && (
                        <div className="pt-4">
                            <Button
                                onClick={handleViewOnExplorer}
                                className="w-full h-10 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69117] text-black font-medium"
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View on Block Explorer
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

