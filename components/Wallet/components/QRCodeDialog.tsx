"use client";
import { useState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Download, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import { useTheme } from "next-themes";

interface QRCodeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    address: string;
}

export default function QRCodeDialog({ open, onOpenChange, address }: QRCodeDialogProps) {
    const [copied, setCopied] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
    const { theme } = useTheme();

    useEffect(() => {
        if (open && address) {
            generateQRCode(theme as "light" | "dark");
        }
    }, [open, address, theme]);

    const generateQRCode = async (theme: string) => {
        try {
            const url = await QRCode.toDataURL(address, {
                width: 300,
                margin: 2,
                color: {
                    dark: "#D4AF37",
                    light: theme === "dark" ? "#1c1c1c" : "#FFFFFF"
                }
            });
            setQrCodeUrl(url);
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.download = "wallet-qr-code.png";
        link.href = qrCodeUrl;
        link.click();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "My Wallet Address",
                    text: address,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border bg-linear-to-br from-[#D4AF37]/5 to-background">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                            <svg className="h-5 w-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                        </div>
                        Wallet QR Code
                    </DialogTitle>
                    <DialogDescription>
                        Share your wallet address with others
                    </DialogDescription>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {/* QR Code Display */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center space-y-4"
                    >
                        <div className="relative p-3 rounded-2xl bg-background border-2 border-[#D4AF37]/30 shadow-2xl shadow-foreground/15">
                            {/* Decorative corners */}
                            <div className="absolute rounded-tl top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]"></div>
                            <div className="absolute rounded-tr top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]"></div>
                            <div className="absolute rounded-bl bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]"></div>
                            <div className="absolute rounded-br bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]"></div>

                            {qrCodeUrl && (
                                <img
                                    src={qrCodeUrl}
                                    alt="Wallet QR Code"
                                    className="w-[280px] h-[280px]"
                                />
                            )}
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-sm font-semibold text-foreground">
                                Scan to send tokens
                            </p>
                            <code className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
                                {address.slice(0, 10)}...{address.slice(-8)}
                            </code>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                        <Button
                            variant="outline"
                            onClick={handleCopy}
                            className="h-12 flex-col gap-1 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
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
                                        <Check className="h-4 w-4 text-green-600" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ scale: 0, rotate: -90 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <span className="text-xs font-medium">
                                {copied ? "Copied!" : "Copy"}
                            </span>
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleDownload}
                            className="h-12 flex-col gap-1 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
                        >
                            <Download className="h-4 w-4" />
                            <span className="text-xs font-medium">Download</span>
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleShare}
                            className="h-12 flex-col gap-1 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
                        >
                            <Share2 className="h-4 w-4" />
                            <span className="text-xs font-medium">Share</span>
                        </Button>
                    </div>

                    {/* Warning Message */}
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <p className="text-xs text-amber-700 dark:text-amber-400 text-center">
                            ⚠️ Only send CHT tokens to this address
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

