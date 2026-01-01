"use client";
import { useState } from "react";
import { WalletHeader } from "../Wallet/components";

export default function WalletHeaderComponent() {
    const [balanceVisible, setBalanceVisible] = useState(true);
    const balance = 12847.50;

    return (
        <div className="sticky top-[9.5%] z-20 bg-background/80 backdrop-blur-sm">
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