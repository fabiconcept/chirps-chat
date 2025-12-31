"use client";
import { useEffect, useState } from "react";
import { Suggestion } from "../types";
import VoteButtons from "./VoteButtons";
import StatusBadge from "./StatusBadge";
import CategoryBadge from "./CategoryBadge";
import UserClump from "@/components/modular/UserClump";
import { ResponsiveModal } from "@/components/ui/responsive-modal";

interface SuggestionDetailDialogProps {
    suggestion: Suggestion | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onVote?: (suggestionId: string, voteType: "upvote" | "downvote") => void;
}

export default function SuggestionDetailDialog({ suggestion, open, onOpenChange, onVote }: SuggestionDetailDialogProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!suggestion) return null;


    const content = (
        <div className="space-y-4">
            {/* Author Header */}
            <div className="flex items-start justify-between gap-4">
                <UserClump
                    name={suggestion.author.name}
                    username={suggestion.author.username}
                    className="px-2 pr-4 -ml-2"
                    avatar={suggestion.author.avatar}
                    variant="ghost"
                    size={isMobile ? "md" : "lg"}
                    isVerified={true}
                    clickable
                />

                <StatusBadge status={suggestion.status} size="md" />
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                    {suggestion.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap font-normal">
                    {suggestion.description}
                </p>
            </div>

            {/* Category */}
            <div>
                <CategoryBadge category={suggestion.category} size="md" />
            </div>

            {/* Interaction Bar */}
            <div className="border-t border-input py-3 -mx-6 px-6">
                <VoteButtons
                    suggestionId={suggestion.id}
                    viewCount={suggestion.views}
                    score={suggestion.score}
                    userVote={suggestion.userVote}
                    onVote={onVote}
                    orientation="horizontal"
                />
            </div>
        </div>
    );

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={onOpenChange}
            title="Suggestion Details"
        >
            <div className="px-6 pb-0">
                {content}
            </div>
        </ResponsiveModal>
    );
}

