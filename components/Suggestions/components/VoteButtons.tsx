"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
    suggestionId: string;
    upvotes: number;
    downvotes: number;
    score: number;
    userVote?: "upvote" | "downvote" | null;
    onVote?: (suggestionId: string, voteType: "upvote" | "downvote") => void;
    orientation?: "vertical" | "horizontal";
}

export default function VoteButtons({
    suggestionId,
    upvotes,
    downvotes,
    score,
    userVote,
    onVote,
    orientation = "vertical"
}: VoteButtonsProps) {
    const [currentVote, setCurrentVote] = useState<"upvote" | "downvote" | null>(userVote || null);
    const [currentScore, setCurrentScore] = useState(score);

    const handleVote = (voteType: "upvote" | "downvote") => {
        let newScore = currentScore;

        if (currentVote === voteType) {
            // Unvote
            newScore += voteType === "upvote" ? -1 : 1;
            setCurrentVote(null);
        } else if (currentVote) {
            // Change vote
            newScore += voteType === "upvote" ? 2 : -2;
            setCurrentVote(voteType);
        } else {
            // New vote
            newScore += voteType === "upvote" ? 1 : -1;
            setCurrentVote(voteType);
        }

        setCurrentScore(newScore);
        onVote?.(suggestionId, voteType);
    };

    const containerClass = orientation === "vertical"
        ? "flex flex-col items-center gap-1"
        : "flex items-center gap-2";

    return (
        <div className={containerClass}>
            <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleVote("upvote")}
                className={cn(
                    "transition-colors",
                    currentVote === "upvote"
                        ? "text-green-600 hover:text-green-600"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <motion.div
                    animate={currentVote === "upvote" ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <ArrowUp className="h-5 w-5" strokeWidth={currentVote === "upvote" ? 2.5 : 2} />
                </motion.div>
            </Button>

            <motion.div
                key={currentScore}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                    "font-bold text-sm min-w-[2rem] text-center",
                    currentScore > 0 && "text-foreground",
                    currentScore < 0 && "text-muted-foreground",
                    currentScore === 0 && "text-muted-foreground"
                )}
            >
                {currentScore > 0 ? `+${currentScore}` : currentScore}
            </motion.div>

            <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleVote("downvote")}
                className={cn(
                    "transition-colors",
                    currentVote === "downvote"
                        ? "text-destructive hover:text-destructive"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <motion.div
                    animate={currentVote === "downvote" ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <ArrowDown className="h-5 w-5" strokeWidth={currentVote === "downvote" ? 2.5 : 2} />
                </motion.div>
            </Button>
        </div>
    );
}

