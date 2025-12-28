"use client";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Suggestion } from "../types";
import VoteButtons from "./VoteButtons";
import StatusBadge from "./StatusBadge";
import CategoryBadge from "./CategoryBadge";

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

    const timeAgo = formatDistanceToNow(new Date(suggestion.createdAt), { addSuffix: true });

    const content = (
        <div className="space-y-4">
            {/* Author Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                    <Avatar className="h-12 w-12 border border-input">
                        <AvatarImage src={suggestion.author.avatar} alt={suggestion.author.name} />
                        <AvatarFallback>{suggestion.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm sm:text-base text-foreground">{suggestion.author.name}</span>
                            <span className="text-xs sm:text-sm text-muted-foreground font-normal">{suggestion.author.username}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs sm:text-sm text-muted-foreground font-normal">{timeAgo}</span>
                            {suggestion.implementedAt && (
                                <>
                                    <span className="text-xs sm:text-sm text-muted-foreground">•</span>
                                    <span className="text-xs sm:text-sm text-green-600 font-medium">
                                        Implemented {formatDistanceToNow(new Date(suggestion.implementedAt), { addSuffix: true })}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <StatusBadge status={suggestion.status} size="md" />
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    {suggestion.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-foreground leading-relaxed whitespace-pre-wrap font-normal">
                    {suggestion.description}
                </p>
            </div>

            {/* Category */}
            <div>
                <CategoryBadge category={suggestion.category} size="md" />
            </div>

            {/* Interaction Bar */}
            <div className="border-t border-input py-3 -mx-6 px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <VoteButtons
                            suggestionId={suggestion.id}
                            upvotes={suggestion.upvotes}
                            downvotes={suggestion.downvotes}
                            score={suggestion.score}
                            userVote={suggestion.userVote}
                            onVote={onVote}
                            orientation="horizontal"
                        />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 10000) + 1000} views</span>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className="max-h-[85vh]">
                    <DrawerHeader className="sr-only">
                        <DrawerTitle>Suggestion Details</DrawerTitle>
                    </DrawerHeader>
                    <div className="overflow-y-auto px-6 pb-6">
                        {content}
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl bg-background/95 backdrop-blur-sm">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="sr-only">Suggestion Details</DialogTitle>
                </DialogHeader>
                <div className="px-6 pb-6">
                    {content}
                </div>
            </DialogContent>
        </Dialog>
    );
}

