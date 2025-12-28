"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Gift, ShoppingCart, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Transaction = {
    id: string;
    type: "receive" | "send" | "reward" | "purchase";
    amount: number;
    description: string;
    date: string;
    hash?: string;
    status?: "completed" | "pending" | "failed";
};

interface TransactionListProps {
    transactions: Transaction[];
    onViewAll: () => void;
    onTransactionClick?: (transaction: Transaction) => void;
}

const transactionConfig = {
    receive: {
        icon: ArrowDownLeft,
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
    },
    send: {
        icon: ArrowUpRight,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        borderColor: "border-destructive/20",
    },
    reward: {
        icon: Gift,
        color: "text-[#D4AF37]",
        bgColor: "bg-[#D4AF37]/10",
        borderColor: "border-[#D4AF37]/20",
    },
    purchase: {
        icon: ShoppingCart,
        color: "text-blue-600",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
    }
};

export default function TransactionList({ transactions, onViewAll, onTransactionClick }: TransactionListProps) {
    return (
        <div className="px-4 py-4 bg-background">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                    Recent Transactions
                </h3>
                <button
                    onClick={onViewAll}
                    className="text-xs text-muted-foreground hover:text-[#D4AF37] flex items-center gap-1 font-medium transition-colors"
                >
                    View All
                    <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                    {transactions.map((tx, index) => {
                        const config = transactionConfig[tx.type];
                        const Icon = config.icon;
                        const isPositive = tx.amount > 0;

                        return (
                            <motion.button
                                key={tx.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                transition={{
                                    layout: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 },
                                    y: { duration: 0.2 },
                                    delay: index * 0.03
                                }}
                                onClick={() => onTransactionClick?.(tx)}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group",
                                    "bg-foreground/[0.02] hover:bg-foreground/[0.05]",
                                    "border border-border/50 hover:border-border",
                                    "active:scale-[0.98]"
                                )}
                            >
                                <div className={cn(
                                    "shrink-0 h-11 w-11 rounded-full flex items-center justify-center border-2 transition-all",
                                    config.bgColor,
                                    config.borderColor,
                                    "group-hover:scale-110"
                                )}>
                                    <Icon className={cn("h-5 w-5", config.color)} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">
                                        {tx.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-xs text-muted-foreground font-medium">
                                            {tx.date}
                                        </p>
                                        {tx.hash && (
                                            <>
                                                <span className="text-xs text-muted-foreground">•</span>
                                                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="text-right shrink-0">
                                    <p className={cn(
                                        "text-sm font-medium tabular-nums",
                                        isPositive ? "text-green-600" : "text-destructive"
                                    )}>
                                        {isPositive ? "+" : ""}{tx.amount.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-medium">
                                        CHT
                                    </p>
                                </div>
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </div>

            {transactions.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <div className="inline-flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                            <ArrowUpRight className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                        <p className="text-sm font-medium">No transactions yet</p>
                        <p className="text-xs">Your transaction history will appear here</p>
                    </div>
                </div>
            )}
        </div>
    );
}

