"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, QrCode, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatNumber } from "@/lib/utils";
import { ResponsiveModal } from "@/components/ui/responsive-modal";

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
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [step, setStep] = useState<"amount" | "payment" | "processing" | "success">("amount");
    const [error, setError] = useState("");

    const handleAmountSelect = (value: number) => {
        setAmount(value.toString());
    };

    const canProceed = () => {
        return amount && parseFloat(amount) > 10 && !error;
    };

    const handleNext = () => {
        if (step === "amount" && canProceed()) {
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
            onOpenChange={onOpenChange}
            title="Top Up Wallet"
            description="Purchase Chirps (<abbr className='no-underline font-semibold text-[#D4AF37]' title='Chirps Token'>CHT</abbr>) tokens to your wallet using your bank card or crypto wallet."
            className="sm:max-w-[480px] p-0 gap-0"
        >
            <div className="px-6 pt-6 pb-4 border-b border-border bg-linear-to-b from-foreground/10 to-background max-sm:hidden">
                <h3 className="flex items-center gap-2 sm:text-xl text-lg font-semibold">
                    Top Up Wallet
                </h3>
                <p className="sm:text-sm text-xs text-muted-foreground mt-1">
                    Purchase Chirps (<abbr className="no-underline font-semibold text-[#D4AF37]" title="Chirps Token">CHT</abbr>) tokens to your wallet
                    using your bank card or crypto wallet.
                </p>
            </div>
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
                            <Label htmlFor="amount" className="font-semibold sm:text-base text-sm">
                                Enter Amount <span className="text-[#D4AF37] text-xs">(₦)</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    maxLength={10}
                                    minLength={1}
                                    min={10}
                                    max={10_000}
                                    step={10}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    onKeyDown={(e) => {
                                        if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                                            e.preventDefault();
                                        }
                                    }}
                                    className="text-2xl font-bold h-14 pl-8 pr-8"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">
                                    <span className="font-semibold text-[#D4AF37]">₦</span>
                                </span>
                            </div>
                            {error && (
                                <p className="text-destructive text-xs mt-1">{error}</p>
                            )}
                            <div className="flex items-center justify-between">
                                <span className="sm:text-lg text-base font-semibold text-[#D4AF37]">{(Number(amount) * 23).toLocaleString()} CHT</span>
                                <span className="text-sm text-muted-foreground">1 CHT = ₦23</span>
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
                                            "h-12 sm:text-base text-sm font-semibold",
                                            amount === preset.toString() && "bg-[#D4AF37]/10 text-[#D4AF37] hover:text-[#D4AF37] bg-linear-to-b from-[#D4AF37]/25 via-transparent to-transparent"
                                        )}
                                    >
                                        ₦{(preset).toLocaleString()}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Button
                            onClick={handleNext}
                            disabled={!canProceed()}
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
                                <span className="sm:text-sm text-xs text-muted-foreground">Amount</span>
                                <span className="sm:text-2xl text-lg font-bold text-foreground">
                                    ₦{Number(amount) > 1_000_000 ? formatNumber(Number(amount)) : parseFloat(amount).toLocaleString()} <span className="text-sm font-medium">/<span className="text-[#D4AF37]/75">{(Number(amount) * 23).toLocaleString()} CHT</span></span>
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="sm:text-base text-sm font-semibold">
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
                                                <div className="flex items-center gap-3 flex-1 max-sm:flex-row-reverse">
                                                    <div className={cn(
                                                        "p-2 rounded-lg",
                                                        paymentMethod === method.id
                                                            ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                                                            : "bg-muted text-muted-foreground"
                                                    )}>
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="sm:flex-1 max-sm:text-right">
                                                        <p className="font-semibold sm:text-sm text-xs text-foreground">
                                                            {method.name}
                                                        </p>
                                                        <p className="sm:text-xs text-[12px] text-muted-foreground">
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
                                Pay ₦{parseFloat(amount).toLocaleString()}
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
                                ₦{parseFloat(amount).toLocaleString()} <span className="text-sm font-medium">/ <span className="text-[#D4AF37]/75">{(Number(amount) * 23).toLocaleString()} CHT</span></span> added to your wallet
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ResponsiveModal>
    );
}

