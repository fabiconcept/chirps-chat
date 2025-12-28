"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Receipt, ArrowUpRight, ArrowDownLeft, Gift, ShoppingCart, ExternalLink, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction } from "./TransactionList";

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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] p-0 gap-0 max-h-[90vh] overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border bg-linear-to-br from-[#D4AF37]/5 to-background sticky top-0 z-10">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                            <Receipt className="h-5 w-5 text-[#D4AF37]" />
                        </div>
                        All Transactions
                    </DialogTitle>
                    <DialogDescription>
                        Complete transaction history
                    </DialogDescription>
                </DialogHeader>

                {/* Stats cards */}
                <div className="px-6 pt-4 pb-2 grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-muted/50 border border-border text-center">
                        <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Total</p>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                        <p className="text-2xl font-bold text-green-600">+{stats.received.toLocaleString()}</p>
                        <p className="text-xs text-green-600/70 mt-0.5">Received</p>
                    </div>
                    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-center">
                        <p className="text-2xl font-medium text-destructive">-{stats.sent.toLocaleString()}</p>
                        <p className="text-xs text-destructive/70 mt-0.5">Sent</p>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="px-6 py-3 space-y-3 bg-background sticky top-[145px] z-10 border-b border-border">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 border-2 focus-visible:ring-[#D4AF37]/20"
                        />
                    </div>

                    {/* Filter buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
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
                <ScrollArea className="flex-1 px-6 pb-6">
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
                                                "w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left group",
                                                "bg-foreground/[0.02] hover:bg-foreground/[0.05]",
                                                "border border-border/50 hover:border-border",
                                                "active:scale-[0.98]"
                                            )}
                                        >
                                            <div className={cn(
                                                "shrink-0 h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all",
                                                config.bgColor,
                                                config.borderColor,
                                                "group-hover:scale-110"
                                            )}>
                                                <Icon className={cn("h-5 w-5", config.color)} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-semibold text-foreground truncate">
                                                        {tx.description}
                                                    </p>
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            "text-[10px] h-4 px-1.5",
                                                            config.bgColor,
                                                            config.color,
                                                            config.borderColor
                                                        )}
                                                    >
                                                        {config.label}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <p className="text-xs text-muted-foreground font-medium">
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
                                                    "text-base font-medium tabular-nums",
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
            </DialogContent>
        </Dialog>
    );
}

