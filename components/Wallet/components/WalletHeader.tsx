"use client";
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WalletHeaderProps {
    balance: number;
    usdValue: string;
    percentageChange: number;
    balanceVisible: boolean;
    onToggleVisibility: () => void;
}

export default function WalletHeader({
    balance,
    usdValue,
    percentageChange,
    balanceVisible,
    onToggleVisibility
}: WalletHeaderProps) {
    const formatBalance = (amount: number) => {
        if (!balanceVisible) return "••••••";
        return amount.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    };

    return (
        <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground font-medium">
                            Total Balance
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onToggleVisibility}
                    className="text-muted-foreground"
                >
                    {balanceVisible ? (
                        <Eye className="h-4 w-4" />
                    ) : (
                        <EyeOff className="h-4 w-4" />
                    )}
                </Button>
            </div>

            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="space-y-2"
            >
                <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-foreground ave">
                        {formatBalance(balance)}
                    </span>
                    <span className="text-lg font-medium text-muted-foreground">
                        CHT
                    </span>
                </div>
                
                {balanceVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                    >
                        <span className="text-sm text-muted-foreground">
                            ≈ ${usdValue} USD
                        </span>
                        <Badge 
                            variant="outline" 
                            className={`gap-1 ${
                                percentageChange >= 0 
                                    ? "bg-green-500/10 text-green-600 border-green-500/20" 
                                    : "bg-red-500/10 text-red-600 border-red-500/20"
                            }`}
                        >
                            <TrendingUp className="h-3 w-3" />
                            {percentageChange >= 0 ? "+" : ""}{percentageChange}%
                        </Badge>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

