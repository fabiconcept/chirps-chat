"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Receipt, ArrowUpRight, ArrowDownLeft, Gift, ShoppingCart, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction } from "./TransactionList";
import { ResponsiveModal } from "@/components/ui/responsive-modal";

interface AllTransactionsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transactions: Transaction[];
    onTransactionClick: (transaction: Transaction) => void;
}

const transactionConfig = {
    receive: {
        icon: ArrowDownLeft,
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
        label: "Received"
    },
    send: {
        icon: ArrowUpRight,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        borderColor: "border-destructive/20",
        label: "Sent"
    },
    reward: {
        icon: Gift,
        color: "text-[#D4AF37]",
        bgColor: "bg-[#D4AF37]/10",
        borderColor: "border-[#D4AF37]/20",
        label: "Reward"
    },
    purchase: {
        icon: ShoppingCart,
        color: "text-blue-600",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        label: "Purchase"
    }
};

export default function AllTransactionsDialog({ 
    open, 
    onOpenChange, 
    transactions, 
    onTransactionClick 
}: AllTransactionsDialogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"all" | Transaction["type"]>("all");

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (tx.hash && tx.hash.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFilter = filterType === "all" || tx.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: transactions.length,
        received: transactions.filter(tx => tx.type === "receive" || tx.type === "reward").reduce((sum, tx) => sum + tx.amount, 0),
        sent: Math.abs(transactions.filter(tx => tx.type === "send" || tx.type === "purchase").reduce((sum, tx) => sum + tx.amount, 0)),
    };

    return (
        <ResponsiveModal 
            open={open} 
            onOpenChange={onOpenChange}
            title="All Transactions"
            description="Complete transaction history"
            className="sm:max-w-[700px] p-0 gap-0"
        >
            <div className="p-0 gap-0 sm:max-h-[90vh] overflow-hidden flex flex-col">
                <div className="px-6 pt-6 pb-4 border-b border-border bg-linear-to-b from-foreground/10 to-background">
                    <h3 className="flex items-center gap-2 sm:text-xl text-lg font-semibold">
                        All Transactions
                    </h3>
                    <p className="sm:text-sm text-xs text-muted-foreground">
                        Complete transaction history
                    </p>
                </div>

                {/* Stats cards */}
                <div className="sm:px-6 px-3 pt-4 pb-2 sm:grid grid-cols-3 gap-3 flex flex-wrap">
                    <div className="p-3 rounded-xl bg-muted/50 border border-border text-center flex-1 min-w-20">
                        <p className="sm:text-2xl text-xl font-bold text-foreground">{stats.total}</p>
                        <p className="sm:text-xs text-[12px] text-muted-foreground mt-0.5">Total</p>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center flex-1 min-w-20">
                        <p className="sm:text-2xl text-xl font-bold text-green-600">+{stats.received.toLocaleString()}</p>
                        <p className="sm:text-xs text-[12px] text-green-600/70 mt-0.5">Received</p>
                    </div>
                    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-center flex-1 min-w-20">
                        <p className="sm:text-2xl text-xl font-medium text-destructive">-{stats.sent.toLocaleString()}</p>
                        <p className="sm:text-xs text-[12px] text-destructive/70 mt-0.5">Sent</p>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="sm:px-6 px-4 py-3 space-y-3 bg-background sticky top-[145px] z-10 border-b border-border">
                    <div className="relative -mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 border-2 focus-visible:ring-[#D4AF37]/20 sm:text-base text-sm rounded-3xl"
                        />
                    </div>

                    {/* Filter buttons */}
                    <div className="sm:flex grid grid-cols-3 items-center gap-2 overflow-x-auto no-scrollbar mt-5">
                        <button
                            onClick={() => setFilterType("all")}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0",
                                filterType === "all"
                                    ? "bg-[#D4AF37] text-black"
                                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                            )}
                        >
                            All
                        </button>
                        {Object.entries(transactionConfig).map(([type, config]) => {
                            const Icon = config.icon;
                            return (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type as Transaction["type"])}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0",
                                        filterType === type
                                            ? config.bgColor + " " + config.color + " border-2 " + config.borderColor
                                            : "bg-muted text-muted-foreground hover:bg-muted/70"
                                    )}
                                >
                                    <Icon className="h-3 w-3" />
                                    {config.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Transactions list */}
                <ScrollArea className="flex-1 sm:px-6 px-3 pb-6">
                    <div className="space-y-2 py-2">
                        <AnimatePresence mode="popLayout">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((tx, index) => {
                                    const config = transactionConfig[tx.type];
                                    const Icon = config.icon;
                                    const isPositive = tx.amount > 0;

                                    return (
                                        <motion.button
                                            key={tx.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                            transition={{
                                                layout: { type: "spring", stiffness: 300, damping: 30 },
                                                opacity: { duration: 0.2 },
                                                scale: { duration: 0.2 },
                                                delay: Math.min(index * 0.02, 0.2)
                                            }}
                                            onClick={() => onTransactionClick(tx)}
                                            className={cn(
                                                "w-full flex items-center gap-3 sm:p-4 p-3 rounded-xl transition-all text-left group",
                                                "bg-foreground/[0.02] hover:bg-foreground/[0.05]",
                                                "border border-border/50 hover:border-border",
                                                "active:scale-[0.98]"
                                            )}
                                        >
                                            <div className={cn(
                                                "shrink-0 sm:h-12 h-8 sm:w-12 w-8 rounded-full flex items-center justify-center border-2 transition-all",
                                                config.bgColor,
                                                config.borderColor,
                                                "group-hover:scale-110"
                                            )}>
                                                <Icon className={cn("sm:h-5 h-4 sm:w-5 w-4", config.color)} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="sm:text-sm text-xs font-semibold text-foreground truncate">
                                                        {tx.description}
                                                    </p>
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            "sm:text-[10px] text-[8px] h-3.5 sm:h-4 px-1.5",
                                                            config.bgColor,
                                                            config.color,
                                                            config.borderColor
                                                        )}
                                                    >
                                                        {config.label}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <p className="sm:text-xs text-[10px] text-muted-foreground font-medium">
                                                        {tx.date}
                                                    </p>
                                                    {tx.hash && (
                                                        <>
                                                            <span className="text-xs text-muted-foreground">•</span>
                                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                <code className="font-mono">{tx.hash}</code>
                                                                <ExternalLink className="h-2.5 w-2.5" />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-right shrink-0">
                                                <p className={cn(
                                                    "sm:text-base text-sm font-medium tabular-nums",
                                                    isPositive ? "text-green-600" : "text-destructive"
                                                )}>
                                                    {isPositive ? "+" : ""}{tx.amount.toLocaleString()}
                                                </p>
                                                <p className="sm:text-xs text-[10px] text-muted-foreground font-medium">
                                                    CHT
                                                </p>
                                            </div>
                                        </motion.button>
                                    );
                                })
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-16"
                                >
                                    <div className="inline-flex flex-col items-center gap-3">
                                        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
                                            <Receipt className="h-8 w-8 text-muted-foreground/50" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">No transactions found</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Try adjusting your search or filter
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ScrollArea>
            </div>
        </ResponsiveModal>
    );
}

