"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import WalletAddress from "../Wallet/components/WalletAddress";
import QuickActions from "../Wallet/components/QuickActions";
import QuickTransfer from "../Wallet/components/QuickTransfer";
import TransactionList from "../Wallet/components/TransactionList";
import { Transaction } from "../Wallet/types";
import { quickTransferUsers, mockTransactions } from "../Wallet/mockData";
import TopUpDialog from "../Wallet/components/TopUpDialog";
import TransferModal from "../Wallet/components/TransferModal";
import AllUsersDialog from "../Wallet/components/AllUsersDialog";
import AllTransactionsDialog from "../Wallet/components/AllTransactionsDialog";
import TransactionDetailDialog from "../Wallet/components/TransactionDetailDialog";

export default function WalletContent() {
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showTopUpDialog, setShowTopUpDialog] = useState(false);
    const [showAllUsersDialog, setShowAllUsersDialog] = useState(false);
    const [showAllTransactionsDialog, setShowAllTransactionsDialog] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [selectedTransferUser, setSelectedTransferUser] = useState<typeof quickTransferUsers[0] | undefined>();
    const [currentBalance, setCurrentBalance] = useState(12847.50);

    const handleTopUpComplete = (amount: number, method: string) => {
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "receive",
            amount: amount,
            description: `Top Up via ${method === "card" ? "Card" : method === "crypto" ? "Crypto" : "QR Code"}`,
            date: "Just now",
        };
        setTransactions([newTransaction, ...transactions]);
        setCurrentBalance(prev => prev + amount);
        setShowTopUpDialog(false);
    };

    const handleTransferComplete = (amount: number, recipient: typeof quickTransferUsers[0], note: string) => {
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: "send",
            amount: -amount,
            description: `To ${recipient.username}`,
            date: "Just now",
            hash: "0x" + Math.random().toString(16).slice(2, 10) + "..."
        };
        setTransactions([newTransaction, ...transactions]);
        setCurrentBalance(prev => prev - amount);
        setShowTransferModal(false);
        setSelectedTransferUser(undefined);
    };

    const handleQuickTransfer = (user: typeof quickTransferUsers[0]) => {
        setSelectedTransferUser(user);
        setShowTransferModal(true);
    };

    const handleViewAllTransactions = () => {
        setShowAllTransactionsDialog(true);
    };

    const handleTransactionClick = (tx: Transaction) => {
        setSelectedTransaction(tx);
    };

    return (
        <div className="px-4 pb-24">
            <div className="max-w-2xl mx-auto space-y-6 pt-6">
                {/* Wallet Address */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <WalletAddress address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" />
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <QuickActions
                        onTopUp={() => setShowTopUpDialog(true)}
                        onTransfer={() => setShowTransferModal(true)}
                    />
                </motion.div>

                {/* Quick Transfer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <QuickTransfer
                        users={quickTransferUsers}
                        onSelectUser={handleQuickTransfer}
                        onViewAll={() => setShowAllUsersDialog(true)}
                    />
                </motion.div>

                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <TransactionList
                        transactions={transactions.slice(0, 5)}
                        onViewAll={handleViewAllTransactions}
                        onTransactionClick={handleTransactionClick}
                    />
                </motion.div>
            </div>

            {/* Modals */}
            <TopUpDialog
                open={showTopUpDialog}
                onOpenChange={setShowTopUpDialog}
                onTopUpComplete={handleTopUpComplete}
            />

            <TransferModal
                open={showTransferModal}
                onOpenChange={setShowTransferModal}
                selectedUser={selectedTransferUser}
                onTransferComplete={handleTransferComplete}
                maxBalance={currentBalance}
            />

            <AllUsersDialog
                open={showAllUsersDialog}
                onOpenChange={setShowAllUsersDialog}
                users={quickTransferUsers}
                onSelectUser={(user) => {
                    setSelectedTransferUser(user);
                    setShowAllUsersDialog(false);
                    setShowTransferModal(true);
                }}
            />

            <AllTransactionsDialog
                open={showAllTransactionsDialog}
                onOpenChange={setShowAllTransactionsDialog}
                transactions={transactions}
                onTransactionClick={(tx) => {
                    setShowAllTransactionsDialog(false);
                    handleTransactionClick(tx);
                }}
            />

            <TransactionDetailDialog
                open={!!selectedTransaction}
                onOpenChange={(open) => !open && setSelectedTransaction(null)}
                transaction={selectedTransaction}
            />
        </div>
    );
}

