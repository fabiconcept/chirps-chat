"use client";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

interface IncomeExpenseCardsProps {
    income: number;
    incomeChange: number;
    expense: number;
    expenseChange: number;
}

export default function IncomeExpenseCards({
    income,
    incomeChange,
    expense,
    expenseChange
}: IncomeExpenseCardsProps) {
    return (
        <div className="px-6 pb-4">
            <div className="grid grid-cols-2 gap-3">
                {/* Income Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border space-y-2"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-medium">
                            Income
                        </span>
                        <TrendingDown className="h-4 w-4 text-muted-foreground rotate-180" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-2xl font-bold text-foreground">
                            ${income.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                            +{incomeChange}%
                        </p>
                    </div>
                </motion.div>

                {/* Expense Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border space-y-2"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-medium">
                            Expense
                        </span>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-2xl font-bold text-foreground">
                            ${expense.toLocaleString()}
                        </p>
                        <p className="text-xs text-red-600 font-medium">
                            +{expenseChange}%
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

