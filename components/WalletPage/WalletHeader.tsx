"use client";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WalletHeader() {
    const router = useRouter();
    const [balanceVisible, setBalanceVisible] = useState(true);
    const balance = 12847.50;

    return (
        <div className="sticky top-0 z-50 border-b border-input bg-background/95 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>

                <div className="flex-1 flex flex-col items-center gap-1">
                    <h1 className="text-lg font-semibold">Wallet</h1>
                    <div className="flex items-center gap-2">
                        <AnimatePresence mode="wait">
                            {balanceVisible ? (
                                <motion.div
                                    key="visible"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="flex items-baseline gap-1"
                                >
                                    <span className="text-2xl font-bold text-[#D4AF37] ave tabular-nums">
                                        {balance.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-muted-foreground font-medium">CHT</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="hidden"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="text-2xl font-bold text-[#D4AF37]"
                                >
                                    •••••
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setBalanceVisible(!balanceVisible)}
                >
                    {balanceVisible ? (
                        <Eye className="h-5 w-5" />
                    ) : (
                        <EyeOff className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </div>
    );
}

