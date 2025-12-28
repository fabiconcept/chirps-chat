"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface QuickActionsProps {
    onTopUp: () => void;
    onTransfer: () => void;
}

export default function QuickActions({ onTopUp, onTransfer }: QuickActionsProps) {
    return (
        <div className="px-4 py-4">
            <div className="grid grid-cols-2 gap-3">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button 
                        onClick={onTopUp}
                        className="w-full h-12 bg-gradient-to-br from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69117] text-black font-bold shadow-lg hover:shadow-xl transition-all duration-200 border border-[#D4AF37]/30"
                    >
                        <Plus className="mr-2 h-4 w-4" strokeWidth={3} />
                        Top Up
                    </Button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button 
                        onClick={onTransfer}
                        variant="outline" 
                        className="w-full h-12 border-2 border-border hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 font-bold transition-all duration-200"
                    >
                        <ArrowUpRight className="mr-2 h-4 w-4" strokeWidth={3} />
                        Transfer
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}

