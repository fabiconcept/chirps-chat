"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Suggestion } from "../types";
import VoteButtons from "./VoteButtons";
import StatusBadge from "./StatusBadge";
import CategoryBadge from "./CategoryBadge";
import { formatDistanceToNow } from "date-fns";
import UserClump from "@/components/modular/UserClump";
import { useAuth } from "@/components/Providers/AuthProvider";

interface SuggestionCardProps {
    suggestion: Suggestion;
    onVote?: (suggestionId: string, voteType: "upvote" | "downvote") => void;
    onClick?: (suggestion: Suggestion) => void;
    index?: number;
}

export default function SuggestionCard({ suggestion, onVote, onClick, index = 0 }: SuggestionCardProps) {
    const timeAgo = formatDistanceToNow(new Date(suggestion.createdAt), { addSuffix: true });
    const { isMobile } = useAuth();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group rounded-3xl border border-input bg-foreground/5 hover:bg-muted/30 transition-all duration-200 overflow-hidden"
        >
            {/* Post Content */}
            <div onClick={() => onClick?.(suggestion)} className="p-4 cursor-pointer space-y-3">
                {/* Header - Author & Status */}
                <div className="flex items-center justify-between gap-3">
                    <UserClump
                        name={suggestion.author.name}
                        username={suggestion.author.username}
                        className="px-2 pr-4 -ml-2"
                        avatar={suggestion.author.avatar}
                        variant="ghost"
                        size={isMobile ? "sm" : "md"}
                        isVerified={true}
                        clickable
                    />
                    <div className="flex items-center gap-2">
                        <CategoryBadge category={suggestion.category} size="sm" />
                        <StatusBadge status={suggestion.status} size="sm" />
                    </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {suggestion.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {suggestion.description}
                    </p>
                </div>

                {/* Implementation Info */}
                {suggestion.implementedAt && (
                    <div className="pt-2 border-t border-border/50">
                        <span className="text-xs text-green-600 font-medium">
                            ✓ Implemented {formatDistanceToNow(new Date(suggestion.implementedAt), { addSuffix: false, includeSeconds: true })}
                        </span>
                    </div>
                )}
            </div>

            {/* Interaction Bar */}
            <div className="border-t border-border/50 px-4 py-2 bg-muted/20">
                <VoteButtons
                    suggestionId={suggestion.id}
                    score={suggestion.score}
                    viewCount={suggestion.views}
                    userVote={suggestion.userVote}
                    onVote={(id, type) => {
                        onVote?.(id, type);
                    }}
                    orientation="horizontal"
                />
            </div>
        </motion.div>
    );
}

