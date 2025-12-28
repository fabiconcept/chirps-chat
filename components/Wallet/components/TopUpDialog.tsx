"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreditCard, Wallet, QrCode, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

interface TopUpDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTopUpComplete?: (amount: number, method: string) => void;
}

const presetAmounts = [50, 100, 250, 500, 1000, 2500];

const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
    { id: "crypto", name: "Crypto Wallet", icon: Wallet, description: "ETH, BTC, USDT" },
    { id: "qr", name: "QR Code", icon: QrCode, description: "Scan to pay" },
];

export default function TopUpDialog({ open, onOpenChange, onTopUpComplete }: TopUpDialogProps) {
    const isMobile = useIsMobile();
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [step, setStep] = useState<"amount" | "payment" | "processing" | "success">("amount");

    const handleAmountSelect = (value: number) => {
        setAmount(value.toString());
    };

    const handleNext = () => {
        if (step === "amount" && amount && parseFloat(amount) > 0) {
            setStep("payment");
        } else if (step === "payment") {
            setStep("processing");
            // Simulate payment processing
            setTimeout(() => {
                setStep("success");
                setTimeout(() => {
                    onTopUpComplete?.(parseFloat(amount), paymentMethod);
                    handleClose();
                }, 2000);
            }, 2000);
        }
    };

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            setStep("amount");
            setAmount("");
            setPaymentMethod("card");
        }, 300);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                            <Plus className="h-5 w-5 text-[#D4AF37]" />
                        </div>
                        Top Up Wallet
                    </DialogTitle>
                    <DialogDescription>
                        Add CHT tokens to your wallet
                    </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    {/* Amount Selection */}
                    {step === "amount" && (
                        <motion.div
                            key="amount"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="p-6 space-y-6"
                        >
                            <div className="space-y-3">
                                <Label htmlFor="amount" className="text-base font-semibold">
                                    Enter Amount
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="text-2xl font-bold h-14 pl-12 pr-16"
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
                                        $
                                    </span>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                                        CHT
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
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
                                                "h-12 text-base font-semibold",
                                                amount === preset.toString() && "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                                            )}
                                        >
                                            ${preset}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                onClick={handleNext}
                                disabled={!amount || parseFloat(amount) <= 0}
                                className="w-full h-12 text-base font-semibold bg-[#D4AF37] hover:bg-[#C5A028] text-black"
                            >
                                Continue
                            </Button>
                        </motion.div>
                    )}

                    {/* Payment Method Selection */}
                    {step === "payment" && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="p-6 space-y-6"
                        >
                            <div className="p-4 rounded-xl bg-muted/30 border border-border">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Amount</span>
                                    <span className="text-2xl font-bold text-foreground">
                                        ${parseFloat(amount).toLocaleString()} CHT
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-base font-semibold">
                                    Payment Method
                                </Label>
                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <div className="space-y-2">
                                        {paymentMethods.map((method) => {
                                            const Icon = method.icon;
                                            return (
                                                <label
                                                    key={method.id}
                                                    className={cn(
                                                        "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                                        paymentMethod === method.id
                                                            ? "border-[#D4AF37] bg-[#D4AF37]/5"
                                                            : "border-border hover:border-muted-foreground/30"
                                                    )}
                                                >
                                                    <RadioGroupItem value={method.id} id={method.id} className="shrink-0" />
                                                    <div className="flex items-center gap-3 flex-1">
                                                        <div className={cn(
                                                            "p-2 rounded-lg",
                                                            paymentMethod === method.id
                                                                ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                                                                : "bg-muted text-muted-foreground"
                                                        )}>
                                                            <Icon className="h-5 w-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-sm text-foreground">
                                                                {method.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {method.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep("amount")}
                                    className="flex-1 h-12"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    className="flex-1 h-12 text-base font-semibold bg-[#D4AF37] hover:bg-[#C5A028] text-black"
                                >
                                    Pay ${parseFloat(amount).toLocaleString()}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Processing */}
                    {step === "processing" && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="p-12 flex flex-col items-center justify-center space-y-4"
                        >
                            <div className="relative">
                                <div className="h-20 w-20 rounded-full border-4 border-[#D4AF37]/20"></div>
                                <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>
                            </div>
                            <div className="text-center space-y-1">
                                <p className="text-lg font-semibold">Processing Payment</p>
                                <p className="text-sm text-muted-foreground">Please wait...</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Success */}
                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="p-12 flex flex-col items-center justify-center space-y-4"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center"
                            >
                                <Check className="h-10 w-10 text-green-600" />
                            </motion.div>
                            <div className="text-center space-y-1">
                                <p className="text-lg font-semibold">Top Up Successful!</p>
                                <p className="text-sm text-muted-foreground">
                                    ${parseFloat(amount).toLocaleString()} CHT added to your wallet
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}

