"use client";

import { RefObject } from "react";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Send, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/useIsMobile";

interface MessageInputProps {
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    message: string;
    onMessageChange: (message: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    onClear: () => void;
    onSend: () => void;
}

export function MessageInput({
    textareaRef,
    message,
    onMessageChange,
    onKeyDown,
    onFocus,
    onBlur,
    onClear,
    onSend
}: MessageInputProps) {
    const isMobile = useIsMobile();
    return (
        <InputGroup className="border-x shadow-none rounded-none relative items-end">
            <InputGroupTextarea
                ref={textareaRef}
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus
                enterKeyHint="enter"
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={isMobile ? "Type a message..." : "Type a message... (Enter for new line, Ctrl+Enter to send)"}
                className="min-h-28 max-h-64 px-4 py-3 sm:text-base text-sm"
                rows={1}
            />

            <div className="grid h-fit gap-2 pr-4 pb-4">
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
        </InputGroup>
    );
}
