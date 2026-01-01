"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Check, AlertTriangle, User as UserIcon, Wallet as WalletIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import UserClump from "@/components/modular/UserClump";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import HiddenText from "./TrimText";

type User = {
    id: string;
    name: string;
    username: string;
    avatar: string;
};

interface TransferModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedUser?: User;
    onTransferComplete: (amount: number, recipient: User, note: string) => void;
    maxBalance: number;
}

// Mock users for search
const mockUsers: User[] = [
    { id: "1", name: "Jack Oswald White", username: "@joker", avatar: "https://chirps-chat.sirv.com/premium/joker.png" },
    { id: "2", name: "Bruce Wayne", username: "@batman", avatar: "https://chirps-chat.sirv.com/premium/batman.png" },
    { id: "3", name: "Alfred Pennyworth", username: "@anonymous", avatar: "https://chirps-chat.sirv.com/premium/decision.png" },
    { id: "4", name: "Tony Stark", username: "@ironman", avatar: "https://chirps-chat.sirv.com/premium/ironman.png" },
];

const presetAmounts = [10, 25, 50, 100, 250, 500];

export default function TransferModal({
    open,
    onOpenChange,
    selectedUser: initialUser,
    onTransferComplete,
    maxBalance
}: TransferModalProps) {
    const [step, setStep] = useState<"select" | "amount" | "confirm" | "success">(initialUser ? "amount" : "select");
    const [selectedUser, setSelectedUser] = useState<User | undefined>(initialUser);
    const [transferMode, setTransferMode] = useState<"user" | "address">("user");
    const [walletAddress, setWalletAddress] = useState("");
    const [addressError, setAddressError] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    const canProceed = () => {
        return amount && parseFloat(amount) > 10 && !error;
    };

    // Validate wallet address (Ethereum address format)
    const validateAddress = (address: string): boolean => {
        const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
        return ethAddressRegex.test(address);
    };

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
        setTransferMode("user");
        setWalletAddress("");
        setAddressError("");
        setStep("amount");
    };

    const handleAddressSubmit = () => {
        const trimmedAddress = walletAddress.trim();
        if (!trimmedAddress) {
            setAddressError("Please enter a wallet address");
            return;
        }
        if (!validateAddress(trimmedAddress)) {
            setAddressError("Invalid wallet address format (must be 0x followed by 40 hex characters)");
            return;
        }
        setWalletAddress(trimmedAddress);
        setAddressError("");
        setTransferMode("address");
        setSelectedUser(undefined);
        setStep("amount");
    };

    const handleAmountSelect = (value: number) => {
        setAmount(value.toString());
    };

    const handleContinue = () => {
        if (step === "amount") {
            if (!canProceed()) return;
            setStep("confirm");
        }
    };

    const handleConfirm = async () => {
        if (!selectedUser) return;

        setIsProcessing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setStep("success");
        setIsProcessing(false);
        
        // Reset and close after success
        setTimeout(() => {
            onTransferComplete(parseFloat(amount), selectedUser, note);
            handleClose();
        }, 2500);
    };

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            setStep(initialUser ? "amount" : "select");
            setSelectedUser(initialUser);
            setTransferMode("user");
            setWalletAddress("");
            setAddressError("");
            setAmount("");
            setNote("");
            setSearchQuery("");
        }, 300);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(e.target.value);

        if (e.target.value === '') {
            setAmount('');
            setError('');
            return;
        }

        if (num < 10) {
            setError('Minimum value is 10');
        } else if (num > 10000) {
            setError('Maximum value is 10,000');
        } else {
            setError('');
        }

        setAmount(e.target.value);
    };

    return (
        <ResponsiveModal 
            open={open} 
            onOpenChange={handleClose}
            title="Transfer Tokens"
            description="Select a user or enter wallet address"
        >
            <div className="sm:max-w-[520px] min-h-128 p-0 gap-0 overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                    {/* Select User Step */}
                    {step === "select" && (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="px-6 pt-6 pb-4 border-b border-border bg-linear-to-b from-[#D4AF37]/10 to-background">
                                <h3 className="flex items-center gap-2 sm:text-xl text-lg font-semibold">
                                    Transfer Tokens
                                </h3>
                                <p className="sm:text-sm text-xs text-muted-foreground">
                                    Select a user or enter wallet address
                                </p>
                            </div>

                            <Tabs defaultValue="users" className="sm:p-6 p-4">
                                <TabsList className="grid w-full grid-cols-2 mb-4 rounded-2xl">
                                    <TabsTrigger value="users" className="gap-2 rounded-2xl sm:text-sm text-xs">
                                        <UserIcon className="h-4 w-4" />
                                        Users
                                    </TabsTrigger>
                                    <TabsTrigger value="address" className="gap-2 rounded-2xl sm:text-sm text-xs">
                                        <WalletIcon className="h-4 w-4" />
                                        Wallet Address
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="users" className="space-y-4 mt-0">
                                    <div className="relative -mt-4">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by name or username..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 h-12 border-2 focus-visible:ring-[#D4AF37]/20 sm:text-base text-sm rounded-3xl"
                                        />
                                    </div>

                                    <div className="max-h-[320px] overflow-y-auto space-y-2 pr-2">
                                        {filteredUsers.map((user, index) => (
                                            <motion.button
                                                key={user.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => handleUserSelect(user)}
                                                className={cn(
                                                    "w-full flex justify-between items-center gap-3 p-1 pr-3 rounded-3xl transition-all group cursor-pointer",
                                                    "hover:bg-[#D4AF37]/5 border-2 border-input/10 hover:border-[#D4AF37]/30 bg-linear-to-t from-transparent hover:from-[#D4AF37]/10 to-background active:scale-95 delay-0"
                                                )}
                                            >
                                                <UserClump
                                                    name={user.name}
                                                    username={user.username}
                                                    avatar={user.avatar}
                                                    size="md"
                                                    clickable={false}
                                                    isVerified
                                                    className="cursor-pointer"
                                                    variant="ghost"
                                                />
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="p-1.5 rounded-lg bg-[#D4AF37]/10">
                                                        <ArrowRight className="h-4 w-4 text-[#D4AF37]" />
                                                    </div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="address" className="space-y-4 mt-0">
                                    <div className="space-y-3">
                                        <Label htmlFor="wallet-address" className="text-sm font-medium">
                                            Recipient Wallet Address
                                        </Label>
                                        <div className="space-y-2">
                                            <Input
                                                id="wallet-address"
                                                placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
                                                value={walletAddress}
                                                onChange={(e) => {
                                                    setWalletAddress(e.target.value);
                                                    if (addressError) setAddressError("");
                                                }}
                                                className={cn(
                                                    "font-mono text-sm h-12 border-2",
                                                    addressError && "border-red-500 focus-visible:ring-red-500/20"
                                                )}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleAddressSubmit();
                                                    }
                                                }}
                                            />
                                            {addressError && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-xs text-red-600 flex items-center gap-1"
                                                >
                                                    <AlertTriangle className="h-3 w-3" />
                                                    {addressError}
                                                </motion.p>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Enter a valid Ethereum wallet address (0x followed by 40 hexadecimal characters)
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-linear-to-b from-transparent to-blue-500/10 border-2 border-blue-500/30">
                                        <div className="flex gap-3">
                                            <div className="shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                    <WalletIcon className="h-5 w-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                                                    External Wallet Transfer
                                                </p>
                                                <p className="text-xs text-blue-600 dark:text-blue-500">
                                                    Tokens will be sent to this wallet address. Double-check the address as transfers cannot be reversed.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleAddressSubmit}
                                        disabled={!walletAddress.trim()}
                                        className="w-full h-11 font-medium bg-linear-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69117] text-black shadow-md hover:shadow-lg transition-all"
                                    >
                                        Continue
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    )}

                    {/* Amount Step */}
                    {step === "amount" && (selectedUser || walletAddress) && (
                        <motion.div
                            key="amount"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="px-6 pt-6 pb-4 border-b border-border bg-linear-to-t from-transparent to-[#D4AF37]/10">
                                <h3 className="flex items-center gap-2 sm:text-xl text-lg font-semibold">
                                    Transfer Amount
                                </h3>
                                <p className="sm:text-sm text-xs text-muted-foreground">
                                    {transferMode === "user" && selectedUser
                                        ? `Sending tokens to ${selectedUser.name}`
                                        : `Sending tokens to wallet address`}
                                </p>
                            </div>

                            <div className="sm:p-6 p-4 space-y-6">
                                {/* Recipient Card */}
                                <div className="relative p-4 rounded-xl bg-linear-to-t from-foreground/10 to-background border border-[#D4AF37]/30 overflow-hidden group">
                                    <div className="absolute inset-0 bg-linear-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    {transferMode === "user" && selectedUser ? (
                                        <UserClump
                                            name={selectedUser.name}
                                            username={selectedUser.username}
                                            avatar={selectedUser.avatar}
                                            size="md"
                                            className=""
                                            variant="ghost"
                                            clickable={false}
                                            isVerified
                                        />
                                    ) : (
                                        <div className="relative flex items-center gap-3">
                                            <div className="h-14 w-14 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37]/50 flex items-center justify-center">
                                                <WalletIcon className="h-7 w-7 text-[#D4AF37]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-foreground text-sm">External Wallet</p>
                                                <code className="text-xs font-mono text-muted-foreground truncate block">
                                                    <HiddenText text={walletAddress} maxLength={20} />
                                                </code>
                                            </div>
                                            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                                                External
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                {/* Amount Input */}
                                <div className="space-y-3">
                                    <Label htmlFor="amount" className="text-sm font-medium">
                                        Amount
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="0.00"
                                            maxLength={10}
                                            minLength={1}
                                            min={10}
                                            max={maxBalance}
                                            step={10}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            onKeyDown={(e) => {
                                                if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                                                    e.preventDefault();
                                                }
                                            }}  
                                            value={amount}
                                            onChange={handleChange}
                                            className="text-2xl font-medium h-14 pr-20 border-2 focus-visible:ring-[#D4AF37]/20"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-medium text-[#D4AF37]">
                                            CHT
                                        </span>
                                    </div>
                                    {error && (
                                        <p className="text-xs text-red-500">{error}</p>
                                    )}
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">
                                            Available: <span className="font-medium text-foreground">{maxBalance.toLocaleString()}</span> CHT
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setAmount(maxBalance.toString())}
                                            className="h-6 text-xs text-[#D4AF37] hover:text-[#C5A028] hover:bg-[#D4AF37]/10"
                                        >
                                            Max
                                        </Button>
                                    </div>
                                </div>

                                {/* Preset Amounts */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Quick Select
                                    </Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {presetAmounts.map((preset) => (
                                            <Button
                                                key={preset}
                                                variant="outline"
                                                onClick={() => handleAmountSelect(preset)}
                                                className={cn(
                                                    "h-9 font-medium border-2 transition-all",
                                                    amount === preset.toString()
                                                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                                                        : "hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
                                                )}
                                            >
                                                {preset}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="space-y-2">
                                    <Label htmlFor="note" className="sm:text-sm text-xs font-medium">
                                        Note (Optional)
                                    </Label>
                                    <Textarea
                                        id="note"
                                        placeholder="Add a message..."
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="resize-none h-20 border-2"
                                        maxLength={100}
                                    />
                                    <p className="text-xs text-muted-foreground text-right">
                                        {note.length}/100
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setStep("select")}
                                        className="flex-1 h-11 font-medium border-2"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleContinue}
                                        disabled={!canProceed()}
                                        className="flex-1 h-11 font-medium bg-linear-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69117] text-black shadow-md hover:shadow-lg transition-all"
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Confirm Step */}
                    {step === "confirm" && (selectedUser || walletAddress) && (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-4 flex-1"
                        >
                            <div className="px-6 pt-6 pb-4 border-b border-border bg-linear-to-br from-[#D4AF37]/5 to-background">
                                <h3 className="flex items-center gap-2 sm:text-xl text-lg font-semibold">
                                    Confirm Transfer
                                </h3>
                                <p className="sm:text-sm text-xs text-muted-foreground">
                                    Review details before confirming
                                </p>
                            </div>

                            <div className="sm:p-6 p-4 flex-1 flex flex-col gap-4">
                                {/* Summary Card */}
                                <div className="sm:p-5 p-4 rounded-xl bg-linear-to-br from-muted/50 to-background border-2 border-border space-y-4">
                                    <div className="flex items-center justify-between pb-3 border-b border-border">
                                        <span className="sm:text-sm text-xs font-medium text-muted-foreground">Recipient</span>
                                        {transferMode === "user" && selectedUser ? (
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-7 w-7 border-2 border-[#D4AF37]/50">
                                                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                                                    <AvatarFallback className="text-xs font-medium">{selectedUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{selectedUser.name}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 max-w-[60%]">
                                                <div className="h-7 w-7 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                                                    <WalletIcon className="h-3.5 w-3.5 text-[#D4AF37]" />
                                                </div>
                                                <code className="text-xs font-mono font-medium"><HiddenText text={walletAddress} maxLength={20} /></code>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="sm:text-sm text-xs font-medium text-muted-foreground">Amount</span>
                                        <div className="text-right">
                                            <p className="sm:text-xl text-lg font-medium text-[#D4AF37]">{Number(amount).toLocaleString()}</p>
                                            <p className="text-xs text-muted-foreground">CHT</p>
                                        </div>
                                    </div>
                                    {note && (
                                        <div className="flex flex-col gap-2 pt-3 border-t border-border">
                                            <span className="sm:text-sm text-xs font-medium text-muted-foreground">Note</span>
                                            <p className="sm:text-sm text-xs bg-background/50 rounded-lg p-3 border border-border">"{note}"</p>
                                        </div>
                                    )}
                                </div>

                                {/* Warning */}
                                <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 bg-linear-to-br from-foreground/5 to-transparent">
                                    <div className="flex gap-2.5">
                                        <div className="space-y-0.5">
                                            <p className="sm:text-sm text-xs font-medium text-amber-700 dark:text-amber-400 flex items-center gap-1">
                                                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                                                Transaction is irreversible
                                            </p>
                                            <p className="sm:text-sm text-xs text-amber-200 mt-1">
                                                Please verify all details before confirming. This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1" />

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setStep("amount")}
                                        disabled={isProcessing}
                                        className="flex-1 h-11 font-medium border-2"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleConfirm}
                                        disabled={isProcessing}
                                        className="flex-1 h-11 font-medium bg-linear-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69117] text-black shadow-md hover:shadow-lg transition-all"
                                    >
                                        {isProcessing ? (
                                            <span className="flex items-center gap-2">
                                                <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                                Processing...
                                            </span>
                                        ) : "Confirm Transfer"}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Success Step */}
                    {step === "success" && (selectedUser || walletAddress) && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="p-12"
                        >
                            <div className="flex flex-col items-center justify-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"></div>
                                    <div className="relative h-24 w-24 rounded-full bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl">
                                        <Check className="h-12 w-12 text-white" strokeWidth={3} />
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-center space-y-3"
                                >
                                    <h3 className="text-xl font-medium text-foreground">Transfer Successful!</h3>
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-[#D4AF37]">{amount} CHT</span> sent to{" "}
                                        {transferMode === "user" && selectedUser ? (
                                            <span className="font-medium">{selectedUser.name}</span>
                                        ) : (
                                            <code className="font-mono font-medium text-sm">
                                                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                                            </code>
                                        )}
                                    </p>
                                    <div className="pt-2">
                                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-1">
                                            Transaction Complete
                                        </Badge>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ResponsiveModal>
    );
}
