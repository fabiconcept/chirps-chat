"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";

interface CommentFormProps {
    onSubmit: (content: string) => void;
    placeholder?: string;
    replyingTo?: string;
    onCancel?: () => void;
}

export default function CommentForm({ onSubmit, placeholder = "Share your thoughts...", replyingTo, onCancel }: CommentFormProps) {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        onSubmit(content);
        setContent("");
        setIsSubmitting(false);
    };

    const isValid = content.trim().length >= 3;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
        >
            {replyingTo && (
                <p className="text-xs text-muted-foreground">
                    Replying to <span className="font-medium text-foreground">{replyingTo}</span>
                </p>
            )}
            <div className="flex gap-3">
                <Avatar className="h-8 w-8 border border-input">
                    <AvatarImage src="https://i.pravatar.cc/150?img=10" alt="You" />
                    <AvatarFallback className="text-xs">YO</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={placeholder}
                        className="min-h-20 resize-none bg-foreground/5"
                        maxLength={1000}
                    />
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                            {content.length}/1000
                        </span>
                        <div className="flex gap-2">
                            {onCancel && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onCancel}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button
                                size="sm"
                                onClick={handleSubmit}
                                disabled={!isValid || isSubmitting}
                                className="gap-2"
                            >
                                {isSubmitting ? (
                                    "Posting..."
                                ) : (
                                    <>
                                        <SendHorizonal className="h-4 w-4" />
                                        {replyingTo ? "Reply" : "Comment"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

