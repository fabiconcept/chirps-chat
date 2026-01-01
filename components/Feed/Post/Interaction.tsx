"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/lib/utils"
import { BarChart3, MessageSquare, ThumbsUp, ThumbsDown, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface InteractionProps {
    likeCount?: number
    dislikeCount?: number
    commentCount?: number
    viewCount?: number
    onLike?: () => void
    onDislike?: () => void
    onComment?: () => void
}

export default function Interaction({
    likeCount = 25820000,
    dislikeCount = 890009,
    commentCount = 83209,
    viewCount = 700000409,
    onLike,
    onDislike,
    onComment
}: InteractionProps) {
    const [hasLiked, setHasLiked] = React.useState(false)
    const [hasDisliked, setHasDisliked] = React.useState(false)

    const handleLike = () => {
        setHasLiked(!hasLiked);
        setHasDisliked(false);
        onLike?.();
    }

    const handleDislike = () => {
        setHasDisliked(!hasDisliked);
        setHasLiked(false);
        onDislike?.();
    }

    return (
        <div className="mt-3 border-t border-input py-2">
            <div className="flex items-center justify-between sm:px-4 px-2">
                <div className="flex items-center gap-1">
                    {/* Like Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={cn(
                            "sm:gap-2 gap-1",
                            hasLiked
                                ? "text-green-500 hover:text-green-500"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <ThumbsUp
                            className="sm:size-5 size-3"
                            fill={hasLiked ? "currentColor" : "none"}
                        />
                        <span className="font-medium sm:text-base text-xs">{formatNumber(likeCount)}</span>
                    </Button>

                    {/* Dislike Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDislike}
                        className={cn(
                            "sm:gap-2 gap-1",
                            hasDisliked
                                ? "text-destructive hover:text-destructive"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <ThumbsDown
                            className="sm:size-5 size-3"
                            fill={hasDisliked ? "currentColor" : "none"}
                        />
                        <span className="font-medium sm:text-base text-xs">{formatNumber(dislikeCount)}</span>
                    </Button>

                    {/* Comment Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onComment}
                        className="sm:gap-2 gap-1 text-muted-foreground hover:text-foreground"
                    >
                        <MessageSquare className="sm:size-5 size-3" />
                        <span className="font-medium sm:text-base text-xs">{formatNumber(commentCount)}</span>
                    </Button>
                </div>

                {/* View Count */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BarChart2 className="sm:size-4 size-3" />
                    <span className="sm:text-base text-xs">{formatNumber(viewCount)}</span>
                </div>
            </div>
        </div>
    )
}
