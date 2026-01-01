"use client";

import { Button } from "@/components/ui/button";
import { Send, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import MarkDownRender from "../MarkDownRender";

interface MessagePreviewProps {
    message: string;
    messageWithPreviews: string;
    onClear: () => void;
    onSend: () => void;
}

export function MessagePreview({
    message,
    messageWithPreviews,
    onClear,
    onSend
}: MessagePreviewProps) {
    return (
        <div className="min-h-28 max-h-64 overflow-y-auto px-4 py-3 sm:text-sm text-xs flex-1 flex items-end">
            {message ? (
                <>
                    <div className="flex-1 self-start">
                        <MarkDownRender content={messageWithPreviews} />
                    </div>
                    <div className="grid h-fit gap-2 pb-1">
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="hover:border-destructive dark:hover:border-destructive hover:text-destructive"
                                    size="icon-lg"
                                    onClick={onClear}
                                    disabled={!message}
                                >
                                    <Trash2 />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Clear message</TooltipContent>
                        </Tooltip>
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon-lg"
                                    onClick={onSend}
                                    disabled={!message.trim()}
                                >
                                    <Send />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Send message</TooltipContent>
                        </Tooltip>
                    </div>
                </>
            ) : (
                <p className="text-muted-foreground italic self-start">Preview will appear here...</p>
            )}
        </div>
    );
}
