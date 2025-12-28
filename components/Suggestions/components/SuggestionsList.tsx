"use client";
import { Suggestion } from "../types";
import SuggestionCard from "./SuggestionCard";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface SuggestionsListProps {
    suggestions: Suggestion[];
    onVote?: (suggestionId: string, voteType: "upvote" | "downvote") => void;
    onSuggestionClick?: (suggestion: Suggestion) => void;
}

export default function SuggestionsList({ suggestions, onVote, onSuggestionClick }: SuggestionsListProps) {
    if (suggestions.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 px-4"
            >
                <div className="text-center space-y-4 max-w-md">
                    <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="inline-block"
                    >
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Lightbulb className="h-10 w-10 text-primary" />
                        </div>
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground">
                        No suggestions yet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Be the first to share your ideas for improving the platform!
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
                <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    onVote={onVote}
                    onClick={onSuggestionClick}
                    index={index}
                />
            ))}
        </div>
    );
}

