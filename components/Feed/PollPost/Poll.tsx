"use client"

import * as React from "react"
import { formatNumber, cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"
import { motion, useInView } from "framer-motion"

interface PollOption {
    id: string
    text: string
    votes: number
}

interface PollProps {
    question: React.ReactNode
    options: PollOption[]
    totalVotes?: number
    endDate?: Date
    hasVoted?: boolean
    userVote?: string
    onVote?: (optionId: string) => void
    className?: string
}

export default function Poll({
    question,
    options,
    totalVotes,
    endDate,
    hasVoted = false,
    userVote,
    onVote,
    className
}: PollProps) {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(userVote || null)
    const [isVoted, setIsVoted] = React.useState(hasVoted)
    const pollRef = React.useRef<HTMLDivElement>(null)
    const isInView = useInView(pollRef, { once: true, amount: 0.5 })

    const total = totalVotes || options.reduce((sum, opt) => sum + opt.votes, 0)
    const isEnded = endDate ? new Date() > endDate : false

    const handleVote = (optionId: string) => {
        if (isVoted || isEnded) return

        setSelectedOption(optionId)
        setIsVoted(true)
        onVote?.(optionId)
    }

    const getPercentage = (votes: number) => {
        if (total === 0) return 0
        return Math.round((votes / total) * 100)
    }

    const getTimeRemaining = () => {
        if (!endDate) return null

        const now = new Date()
        const diff = endDate.getTime() - now.getTime()

        if (diff <= 0) return "Poll ended"

        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`
        return "Less than an hour left"
    }

    const timeRemaining = getTimeRemaining()

    return (
        <motion.div
            ref={pollRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={cn("sm:px-6 px-3 my-3 mb-2", className)}
        >
            {/* Poll Question */}
            <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="text-lg font-semibold mb-4"
            >
                {question}
            </motion.h3>

            {/* Poll Options */}
            <div className="sm:space-y-2 space-y-1">
                {options.map((option, index) => {
                    const percentage = getPercentage(option.votes)
                    const isSelected = selectedOption === option.id
                    const isWinning = isVoted && option.votes === Math.max(...options.map(o => o.votes))

                    return (
                        <motion.button
                            key={option.id}
                            onClick={() => handleVote(option.id)}
                            disabled={isVoted || isEnded}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.3 + index * 0.1,
                                ease: "easeOut"
                            }}
                            whileHover={!(isVoted || isEnded) ? { scale: 1.01 } : {}}
                            whileTap={!(isVoted || isEnded) ? { scale: 0.99 } : {}}
                            className={cn(
                                "w-full relative rounded-xl border transition-colors duration-300",
                                isVoted || isEnded
                                    ? "cursor-default"
                                    : "cursor-pointer hover:border-primary/50 hover:bg-accent/50",
                                isSelected && isVoted
                                    ? "border-[#7600C9] bg-primary/5"
                                    : "border-input bg-background"
                            )}
                        >
                            {/* Progress Bar Background */}
                            <div className="absolute inset-0 rounded-xl overflow-hidden">
                                <motion.div
                                    initial={(() => {
                                        return "normal"
                                    })()}
                                    animate={(() => {
                                        return (isVoted || isEnded) ? { width: `${percentage}%` } : { width: 0 }
                                    })()}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.2 + index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    className={cn(
                                        "h-full",
                                        isWinning ? "bg-primary/20" : "bg-muted/50"
                                    )}
                                />
                            </div>

                            {/* Option Content */}
                            <div className="relative flex items-center justify-between sm:p-4 p-3">
                                <div className="flex items-center gap-3 flex-1">
                                    {isSelected && isVoted && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                                        >
                                            <CheckCircle2 className="size-5 text-primary shrink-0" />
                                        </motion.div>
                                    )}
                                    <span className="font-medium text-left max-sm:text-sm">{option.text}</span>
                                </div>

                                {(isVoted || isEnded) && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.4 + index * 0.1,
                                            ease: "easeOut"
                                        }}
                                        className="flex items-center gap-3 ml-4"
                                    >
                                        <span className="text-sm font-semibold">
                                            {percentage}%
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatNumber(option.votes)} votes
                                        </span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.button>
                    )
                })}
            </div>

            {/* Poll Footer */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
                className="flex items-center justify-between mt-3 sm:text-sm text-xs text-muted-foreground"
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    {formatNumber(total)} votes
                </motion.span>
                {timeRemaining && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                        className={cn(isEnded && "text-destructive")}
                    >
                        {timeRemaining}
                    </motion.span>
                )}
            </motion.div>
        </motion.div>
    )
}
