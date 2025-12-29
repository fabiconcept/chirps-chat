"use client";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WalletHeader } from "../Wallet/components";

export default function WalletHeaderComponent() {
    const router = useRouter();
    const [balanceVisible, setBalanceVisible] = useState(true);
    const balance = 12847.50;

    return (
        <div className="sticky top-0 z-50 border-b border-input bg-background/95 backdrop-blur-sm shadow-lg shadow-foreground/5">
            <WalletHeader
                balance={balance}
                usdValue={(balance * 0.85).toString()}
                percentageChange={12.5}
                balanceVisible={balanceVisible}
                onToggleVisibility={() => setBalanceVisible(!balanceVisible)}
            />
        </div>
    );
}