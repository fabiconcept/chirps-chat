"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Reply, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Comment {
    id: string;
    author: {
        id: string;
        name: string;
        username: string;
        avatar: string;
    };
    content: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    userVote?: "upvote" | "downvote" | null;
    replies?: Comment[];
}

interface CommentProps {
    comment: Comment;
    onVote?: (commentId: string, voteType: "upvote" | "downvote") => void;
    onReply?: (commentId: string) => void;
    depth?: number;
}

export default function CommentComponent({ comment, onVote, onReply, depth = 0 }: CommentProps) {
    const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(comment.userVote || null);
    const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

    const handleVote = (voteType: "upvote" | "downvote") => {
        if (userVote === voteType) {
            setUserVote(null);
        } else {
            setUserVote(voteType);
        }
        onVote?.(comment.id, voteType);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "space-y-2",
                depth > 0 && "ml-8 border-l-2 border-input pl-4"
            )}
        >
            <div className="flex gap-3">
                <Avatar className="h-8 w-8 border border-input">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback className="text-xs">
                        {comment.author.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground">
                            {comment.author.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {comment.author.username}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{timeAgo}</span>
                    </div>

                    <p className="text-sm text-foreground leading-relaxed">
                        {comment.content}
                    </p>

                    <div className="flex items-center gap-1 pt-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote("upvote")}
                            className={cn(
                                "h-7 gap-1 text-xs",
                                userVote === "upvote"
                                    ? "text-green-600 hover:text-green-600"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <ThumbsUp
                                className="h-3 w-3"
                                fill={userVote === "upvote" ? "currentColor" : "none"}
                            />
                            <span>{comment.upvotes}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote("downvote")}
                            className={cn(
                                "h-7 gap-1 text-xs",
                                userVote === "downvote"
                                    ? "text-destructive hover:text-destructive"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <ThumbsDown
                                className="h-3 w-3"
                                fill={userVote === "downvote" ? "currentColor" : "none"}
                            />
                            <span>{comment.downvotes}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onReply?.(comment.id)}
                            className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                            <Reply className="h-3 w-3" />
                            Reply
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        >
                            <MoreHorizontal className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="space-y-2 mt-3">
                    {comment.replies.map((reply) => (
                        <CommentComponent
                            key={reply.id}
                            comment={reply}
                            onVote={onVote}
                            onReply={onReply}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}

