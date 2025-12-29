"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { Collapsible, CollapsibleHeader, CollapsibleContent, CollapsibleTrigger, CollapsibleIcon } from "../ui/custom-collapsable";
import { Badge } from "../ui/badge";
import { Kbd, KbdGroup } from "../ui/kbd";
import { motion, AnimatePresence } from "framer-motion";
import { cn, removeSearchParam, updateSearchParam } from "@/lib/utils";
import { useAuth } from "../Providers/AuthProvider";
import { useKeyBoardShortCut } from "../Providers/KeyBoardShortCutProvider";
import { usePathname, useSearchParams } from "next/navigation";
import useShortcuts, { KeyboardKey } from "@useverse/useshortcuts";
import { SearchParamKeys } from "@/lib/enums";
import WalletHeader from "./components/WalletHeader";
import WalletAddress from "./components/WalletAddress";
import QuickActions from "./components/QuickActions";
import QuickTransferHorizontal from "./components/QuickTransferHorizontal";
import TransactionList from "./components/TransactionList";
import TransferModal from "./components/TransferModal";
import TopUpDialog from "./components/TopUpDialog";
import AllUsersDialog from "./components/AllUsersDialog";
import AllTransactionsDialog from "./components/AllTransactionsDialog";
import TransactionDetailDialog from "./components/TransactionDetailDialog";
import { mockTransactions, quickTransferUsers } from "./mockData";
import { Transaction } from "./types";

export default function WalletHangingPanel() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isMobile } = useAuth();
    const { allowedShortcuts } = useKeyBoardShortCut();
    const triggerRef = useRef<HTMLDivElement>(null);
    
    // Wallet panel open state from search params
    const open = useMemo(() => searchParams.get("wallet") === "open", [searchParams]);
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [selectedTransferUser, setSelectedTransferUser] = useState<typeof quickTransferUsers[0] | undefined>();
    const [currentBalance, setCurrentBalance] = useState(12847.50);

    // Modal states from search params
    const showTopUpDialog = useMemo(() => searchParams.get(SearchParamKeys.WALLET_TOP_UP) === "true", [searchParams]);
    const showTransferModal = useMemo(() => searchParams.get(SearchParamKeys.WALLET_TRANSFER) === "true", [searchParams]);
    const showAllUsersDialog = useMemo(() => searchParams.get(SearchParamKeys.WALLET_ALL_USERS) === "true", [searchParams]);
    const showAllTransactionsDialog = useMemo(() => searchParams.get(SearchParamKeys.WALLET_ALL_TXS) === "true", [searchParams]);
    const txDetailId = useMemo(() => searchParams.get(SearchParamKeys.WALLET_TX_DETAIL), [searchParams]);
    const selectedTransaction = useMemo(() => 
        txDetailId ? transactions.find(tx => tx.id === txDetailId) || null : null, 
        [txDetailId, transactions]
    );

    // Mock wallet data
    const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
    const usdValue = (currentBalance * 0.85).toFixed(2);

    const { allowShortcuts, disallowShortcuts, notoriousShortcuts } = useKeyBoardShortCut();

    useEffect(()=>{
        if (open) {
            disallowShortcuts([...notoriousShortcuts, "commandK", "commandF", "search"]);
            allowShortcuts(["alt+W"]);
        }

        return () => {
            allowShortcuts([...notoriousShortcuts, "commandK", "commandF", "search"]);
        };
    }, [open, allowShortcuts, disallowShortcuts, notoriousShortcuts]);

    // Alt+W shortcut handler
    useShortcuts({
        shortcuts: [
            { key: KeyboardKey.KeyW, altKey: true, enabled: allowedShortcuts.has("alt+W") },
        ],
        onTrigger: () => {
            if (open) {
                removeSearchParam("wallet");
            } else {
                updateSearchParam("wallet", "open");
            }
        }
    }, [allowedShortcuts, open]);

    const handleTopUpComplete = (amount: number, method: string) => {
        // Add top-up transaction
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
        // Add new transaction and update balance
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

    const handleViewAllUsers = () => {
        updateSearchParam(SearchParamKeys.WALLET_ALL_USERS, "true");
    };

    const handleViewAllTransactions = () => {
        updateSearchParam(SearchParamKeys.WALLET_ALL_TXS, "true");
    };

    const handleTransactionClick = (tx: Transaction) => {
        updateSearchParam(SearchParamKeys.WALLET_TX_DETAIL, tx.id);
    };

    if (isMobile) return null;

    return (
        <>
            <Collapsible
                defaultOpen={open}
                onOpenChange={(state) => {
                    if (state) {
                        updateSearchParam("wallet", "open");
                    } else {
                        removeSearchParam("wallet");
                    }
                }}
                fullCollapse={(pathname === "/chat" || pathname.includes("/chat/"))}
                expandedHeight="70vh"
                collapsedHeight="4.25rem"
                searchParamKey="wallet"
                className={cn('md:left-10 left-[2%] gap-3 max-w-[96%] w-[440px] mx-auto')}
            >
                {/* Custom Header with Alt+W shortcut */}
                <CollapsibleTrigger
                    className={cn(
                        'rounded-t-2xl border-t border-l border-r',
                        'bg-linear-to-br dark:from-[#D4AF37]/5 from-[#D4AF37]/5 to-background/95 backdrop-blur-sm',
                        'hover:border-[#D4AF37]/50 active:translate-y-3 transition-all py-3'
                    )}
                    ref={triggerRef}
                >
                    <div className="flex items-center gap-2">
                        <div>
                            <h2 className="text-base font-medium text-foreground">
                                My Wallet <KbdGroup><Kbd>Alt</Kbd><Kbd>W</Kbd></KbdGroup>
                            </h2>
                            <p className="text-sm text-muted-foreground">Balance & Transactions</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <CollapsibleIcon />
                    </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="border-r border-l bg-background/95 backdrop-blur-sm mt-2 overflow-y-auto">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{
                                layout: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                y: { duration: 0.2 }
                            }}
                            className="space-y-1 pb-4"
                        >
                            <WalletHeader
                                balance={currentBalance}
                                usdValue={usdValue}
                                percentageChange={12.5}
                                balanceVisible={balanceVisible}
                                onToggleVisibility={() => setBalanceVisible(!balanceVisible)}
                            />

                            <WalletAddress address={walletAddress} />
                                    <QuickActions
                                        onTopUp={() => updateSearchParam(SearchParamKeys.WALLET_TOP_UP, "true")}
                                        onTransfer={() => updateSearchParam(SearchParamKeys.WALLET_TRANSFER, "true")}
                                    />

                                    <QuickTransferHorizontal
                                        users={quickTransferUsers}
                                        onSelectUser={handleQuickTransfer}
                                        onViewAll={handleViewAllUsers}
                                    />

                                    <TransactionList
                                        transactions={transactions}
                                        onViewAll={handleViewAllTransactions}
                                        onTransactionClick={handleTransactionClick}
                                    />
                        </motion.div>
                    </AnimatePresence>
                </CollapsibleContent>
            </Collapsible>

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
                onTransactionClick={handleTransactionClick}
            />

            <TransactionDetailDialog
                open={!!selectedTransaction}
                onOpenChange={(open) => !open && removeSearchParam(SearchParamKeys.WALLET_TX_DETAIL)}
                transaction={selectedTransaction}
            />
        </>
    );
}
