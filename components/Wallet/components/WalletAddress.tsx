"use client";
import { useState, useMemo } from "react";
import { Copy, Check, QrCode, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn, updateSearchParam, removeSearchParam } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { SearchParamKeys } from "@/lib/enums";
import QRCodeDialog from "./QRCodeDialog";

interface WalletAddressProps {
    address: string;
}

export default function WalletAddress({ address }: WalletAddressProps) {
    const searchParams = useSearchParams();
    const [copied, setCopied] = useState(false);
    const showQRDialog = useMemo(() => searchParams.get(SearchParamKeys.WALLET_QR) === "true", [searchParams]);

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative">
            <div className="mx-4 my-4 p-4 rounded-2xl bg-linear-to-br from-[#D4AF37]/10 via-background to-background border border-[#D4AF37]/30 relative overflow-hidden group">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-linear-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/30">
                                <div className="h-2 w-2 rounded-full bg-[#D4AF37]"></div>
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Wallet Address
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => window.open(`https://etherscan.io/address/${address}`, '_blank')}
                                className="h-7 w-7 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={handleCopy}
                                className={cn(
                                    "h-7 w-7 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]",
                                    copied && "bg-green-500/10 text-green-600"
                                )}
                            >
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div
                                            key="check"
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Check className="h-3.5 w-3.5" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="copy"
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Copy className="h-3.5 w-3.5" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <code className="text-sm font-mono text-foreground font-semibold tracking-tight flex-1 bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2 border border-border/50">
                            {address.slice(0, 6)}...{address.slice(-6)}
                        </code>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateSearchParam(SearchParamKeys.WALLET_QR, "true")}
                            className="h-8 gap-2 border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                        >
                            <QrCode className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">QR</span>
                        </Button>
                    </div>

                    <AnimatePresence>
                        {copied && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-xs text-green-600 font-medium flex items-center gap-1"
                            >
                                <Check className="h-3 w-3" />
                                Address copied to clipboard
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <QRCodeDialog
                open={showQRDialog}
                onOpenChange={(open) => open ? updateSearchParam(SearchParamKeys.WALLET_QR, "true") : removeSearchParam(SearchParamKeys.WALLET_QR)}
                address={address}
            />
        </div>
    );
}

