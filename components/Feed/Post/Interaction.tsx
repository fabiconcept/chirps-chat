"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/lib/utils"
import { Eye, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"
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
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-1">
                    {/* Like Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={cn(
                            "gap-2",
                            hasLiked
                                ? "text-green-500 hover:text-green-500"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <ThumbsUp
                            className="size-5"
                            fill={hasLiked ? "currentColor" : "none"}
                        />
                        <span className="font-medium">{formatNumber(likeCount)}</span>
                    </Button>

                    {/* Dislike Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDislike}
                        className={cn(
                            "gap-2",
                            hasDisliked
                                ? "text-destructive hover:text-destructive"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <ThumbsDown
                            className="size-3"
                            fill={hasDisliked ? "currentColor" : "none"}
                        />
                        <span className="font-medium">{formatNumber(dislikeCount)}</span>
                    </Button>

                    {/* Comment Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onComment}
                        className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <MessageSquare className="size-5" />
                        <span className="font-medium">{formatNumber(commentCount)}</span>
                    </Button>
                </div>

                {/* View Count */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="size-4" />
                    <span>{formatNumber(viewCount)}</span>
                </div>
            </div>
        </div>
    )
}
