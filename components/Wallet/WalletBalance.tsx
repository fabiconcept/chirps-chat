"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import WalletHeader from "./components/WalletHeader";
import WalletAddress from "./components/WalletAddress";
import QuickActions from "./components/QuickActions";
import IncomeExpenseCards from "./components/IncomeExpenseCards";
import QuickTransfer from "./components/QuickTransfer";
import TransactionList, { Transaction } from "./components/TransactionList";
import TransferModal from "./components/TransferModal";

// Mock data
const mockTransactions: Transaction[] = [
    { id: "1", type: "reward", amount: 250, description: "Daily login bonus", date: "2 hours ago" },
    { id: "2", type: "purchase", amount: -500, description: "Legendary Avatar", date: "1 day ago", hash: "0x7a8b..." },
    { id: "3", type: "receive", amount: 1000, description: "From @johndoe", date: "2 days ago", hash: "0x9c4d..." },
    { id: "4", type: "reward", amount: 150, description: "Comment liked", date: "3 days ago" },
    { id: "5", type: "send", amount: -300, description: "To @janesmith", date: "5 days ago", hash: "0x2f1e..." },
];

const quickTransferUsers = [
    { id: "1", name: "John Doe", username: "@johndoe", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: "2", name: "Jane Smith", username: "@janesmith", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: "3", name: "Bob Wilson", username: "@bobwilson", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: "4", name: "Alice Brown", username: "@alicebrown", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: "5", name: "Mike Johnson", username: "@mikej", avatar: "https://i.pravatar.cc/150?img=5" },
];

export default function WalletBalance({ compact = false }: { compact?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [selectedTransferUser, setSelectedTransferUser] = useState<typeof quickTransferUsers[0] | undefined>();
    
    // Mock wallet data
    const balance = 12847.50;
    const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
    const usdValue = (balance * 0.85).toFixed(2);

    const formatBalance = (amount: number) => {
        if (!balanceVisible) return "••••••";
        return amount.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    };

    const handleTransferComplete = (amount: number, recipient: typeof quickTransferUsers[0], note: string) => {
        // Add new transaction
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "send",
            amount: -amount,
            description: `To ${recipient.username}`,
            date: "Just now",
            hash: "0x" + Math.random().toString(16).slice(2, 10) + "..."
        };
        setTransactions([newTransaction, ...transactions]);
        setShowTransferModal(false);
        setSelectedTransferUser(undefined);
    };

    const handleQuickTransfer = (user: typeof quickTransferUsers[0]) => {
        setSelectedTransferUser(user);
        setShowTransferModal(true);
        setIsOpen(false);
    };

    return (
        <>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size={compact ? "sm" : "default"}
                        className="gap-2 bg-linear-to-r from-[#D4AF37]/10 to-transparent border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <Wallet className="h-4 w-4 text-[#D4AF37]" />
                        <span className="font-semibold text-[#D4AF37]">
                            {compact ? "Wallet" : formatBalance(balance)}
                        </span>
                        <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 px-1.5">
                            CHT
                        </Badge>
                    </Button>
                </PopoverTrigger>
                <PopoverContent 
                    className="w-[440px] p-0 border shadow-2xl" 
                    align="end"
                >
                    <div className="max-h-[650px] overflow-y-auto scrollbar-thin">
                        <WalletHeader
                            balance={balance}
                            usdValue={usdValue}
                            percentageChange={12.5}
                            balanceVisible={balanceVisible}
                            onToggleVisibility={() => setBalanceVisible(!balanceVisible)}
                        />

                        <WalletAddress address={walletAddress} />

                        <QuickActions
                            onTopUp={() => console.log("Top up")}
                            onTransfer={() => {
                                setShowTransferModal(true);
                                setIsOpen(false);
                            }}
                        />

                        <IncomeExpenseCards
                            income={20450}
                            incomeChange={12.06}
                            expense={22450}
                            expenseChange={12.06}
                        />

                        <QuickTransfer
                            users={quickTransferUsers}
                            onSelectUser={handleQuickTransfer}
                            onViewAll={() => console.log("View all users")}
                        />

                        <TransactionList
                            transactions={transactions}
                            onViewAll={() => console.log("View all transactions")}
                            onTransactionClick={(tx) => console.log("Transaction:", tx)}
                        />
                    </div>
                </PopoverContent>
            </Popover>

            <TransferModal
                open={showTransferModal}
                onOpenChange={setShowTransferModal}
                selectedUser={selectedTransferUser}
                onTransferComplete={handleTransferComplete}
                maxBalance={balance}
            />
        </>
    );
}

