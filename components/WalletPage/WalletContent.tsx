"use client";

import { useMemo, useState } from "react";
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
import { SearchParamKeys } from "@/lib/enums";
import { useSearchParams } from "next/navigation";
import { removeSearchParam, updateSearchParam } from "@/lib/utils";
import QRCodeDialog from "../Wallet/components/QRCodeDialog";

export default function WalletContent() {
    
    const searchParams = useSearchParams();
    
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [selectedTransferUser, setSelectedTransferUser] = useState<typeof quickTransferUsers[0] | undefined>();
    const [currentBalance, setCurrentBalance] = useState(12847.50);

    // Modal states from search params
    const showTopUpDialog = useMemo(() => searchParams.get(SearchParamKeys.WALLET_TOP_UP) === "true", [searchParams]);
    const showTransferModal = useMemo(() => searchParams.get(SearchParamKeys.WALLET_TRANSFER) === "true", [searchParams]);
    const showAllUsersDialog = useMemo(() => searchParams.get(SearchParamKeys.WALLET_ALL_USERS) === "true", [searchParams]);
    const showAllTransactionsDialog = useMemo(() => searchParams.get(SearchParamKeys.WALLET_ALL_TXS) === "true", [searchParams]);
    const txDetailId = useMemo(() => searchParams.get(SearchParamKeys.WALLET_TX_DETAIL), [searchParams]);
    const showQRDialog = useMemo(() => searchParams.get(SearchParamKeys.WALLET_QR) === "true", [searchParams]);

    const selectedTransaction = useMemo(() => 
        txDetailId ? transactions.find(tx => tx.id === txDetailId) || null : null, 
        [txDetailId, transactions]
    );
    
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
        removeSearchParam(SearchParamKeys.WALLET_TOP_UP);
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
        removeSearchParam(SearchParamKeys.WALLET_TRANSFER);
        setSelectedTransferUser(undefined);
    };

    const handleQuickTransfer = (user: typeof quickTransferUsers[0]) => {
        setSelectedTransferUser(user);
        updateSearchParam(SearchParamKeys.WALLET_TRANSFER, "true");
    };

    const handleViewAllTransactions = () => {
        updateSearchParam(SearchParamKeys.WALLET_ALL_TXS, "true");
    };

    const handleTransactionClick = (tx: Transaction) => {
        updateSearchParam(SearchParamKeys.WALLET_TX_DETAIL, tx.id);
    };

    return (
        <div className="px-0 pb-24">
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
                        onTopUp={() => updateSearchParam(SearchParamKeys.WALLET_TOP_UP, "true")}
                        onTransfer={() => updateSearchParam(SearchParamKeys.WALLET_TRANSFER, "true")}
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
                        onViewAll={() => updateSearchParam(SearchParamKeys.WALLET_ALL_USERS, "true")}
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
                onOpenChange={(open) => open ? updateSearchParam(SearchParamKeys.WALLET_TOP_UP, "true") : removeSearchParam(SearchParamKeys.WALLET_TOP_UP)}
                onTopUpComplete={handleTopUpComplete}
            />

            <TransferModal
                open={showTransferModal}
                onOpenChange={(open) => open ? updateSearchParam(SearchParamKeys.WALLET_TRANSFER, "true") : removeSearchParam(SearchParamKeys.WALLET_TRANSFER)}
                selectedUser={selectedTransferUser}
                onTransferComplete={handleTransferComplete}
                maxBalance={currentBalance}
            />

            <AllUsersDialog
                open={showAllUsersDialog}
                onOpenChange={(open) => open ? updateSearchParam(SearchParamKeys.WALLET_ALL_USERS, "true") : removeSearchParam(SearchParamKeys.WALLET_ALL_USERS)}
                users={quickTransferUsers}
                onSelectUser={(user) => {
                    setSelectedTransferUser(user);
                    removeSearchParam(SearchParamKeys.WALLET_ALL_USERS);
                    updateSearchParam(SearchParamKeys.WALLET_TRANSFER, "true");
                }}
            />

            <AllTransactionsDialog
                open={showAllTransactionsDialog}
                onOpenChange={(open) => open ? updateSearchParam(SearchParamKeys.WALLET_ALL_TXS, "true") : removeSearchParam(SearchParamKeys.WALLET_ALL_TXS)}
                transactions={transactions}
                onTransactionClick={(tx) => {
                    removeSearchParam(SearchParamKeys.WALLET_ALL_TXS);
                    handleTransactionClick(tx);
                }}
            />

            <TransactionDetailDialog
                open={!!selectedTransaction}
                onOpenChange={(open) => !open && removeSearchParam(SearchParamKeys.WALLET_TX_DETAIL)}
                transaction={selectedTransaction}
            />

            <QRCodeDialog
                open={showQRDialog}
                onOpenChange={(open) => open ? updateSearchParam(SearchParamKeys.WALLET_QR, "true") : removeSearchParam(SearchParamKeys.WALLET_QR)}
                address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
            />
        </div>
    );
}

