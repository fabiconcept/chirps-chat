"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Suggestion } from "../types";
import VoteButtons from "./VoteButtons";
import StatusBadge from "./StatusBadge";
import CategoryBadge from "./CategoryBadge";
import { formatDistanceToNow } from "date-fns";

interface SuggestionCardProps {
    suggestion: Suggestion;
    onVote?: (suggestionId: string, voteType: "upvote" | "downvote") => void;
    onClick?: (suggestion: Suggestion) => void;
    index?: number;
}

export default function SuggestionCard({ suggestion, onVote, onClick, index = 0 }: SuggestionCardProps) {
    const timeAgo = formatDistanceToNow(new Date(suggestion.createdAt), { addSuffix: true });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex gap-4 p-4 rounded-3xl border border-input bg-foreground/5 hover:bg-muted/30 transition-all duration-200 cursor-pointer"
        >
            {/* Vote Buttons */}
            <VoteButtons
                suggestionId={suggestion.id}
                upvotes={suggestion.upvotes}
                downvotes={suggestion.downvotes}
                score={suggestion.score}
                userVote={suggestion.userVote}
                onVote={(id, type) => {
                    onVote?.(id, type);
                }}
                orientation="vertical"
            />

            {/* Content */}
            <div onClick={() => onClick?.(suggestion)} className="flex-1 min-w-0 space-y-3">
                {/* Header */}
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-base sm:text-lg md:text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {suggestion.title}
                        </h3>
                        <StatusBadge status={suggestion.status} size="sm" />
                    </div>
                    
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground line-clamp-2 font-normal">
                        {suggestion.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Author */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Avatar className="h-5 w-5 sm:h-6 sm:w-6 border border-border">
                                <AvatarImage src={suggestion.author.avatar} alt={suggestion.author.name} />
                                <AvatarFallback className="text-[10px] sm:text-xs">
                                    {suggestion.author.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                                {suggestion.author.username}
                            </span>
                        </div>

                        <span className="text-[11px] sm:text-xs text-muted-foreground">•</span>

                        {/* Time */}
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-normal">
                            {timeAgo}
                        </span>

                        {suggestion.implementedAt && (
                            <>
                                <span className="text-[11px] sm:text-xs text-muted-foreground max-sm:hidden">•</span>
                                <span className="text-[11px] sm:text-xs text-green-600 font-medium max-sm:hidden">
                                    Implemented {formatDistanceToNow(new Date(suggestion.implementedAt), { addSuffix: true })}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Category */}
                    <CategoryBadge category={suggestion.category} size="sm" />
                </div>
            </div>
        </motion.div>
    );
}

