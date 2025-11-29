"use client"

import * as React from "react"
import { cn, copyToClipboard } from "@/lib/utils"
import Hashtag from "@/components/ui/hashtag"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { CheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

interface RichTextProps {
    text: string
    className?: string
    maxLines?: number
}

export default function RichText({ text, className, maxLines = 2 }: RichTextProps) {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [isCopied, setIsCopied] = React.useState(false)

    // Convert escaped newlines to actual newlines
    const normalizedText = text.replace(/\\n/g, '\n')

    // Calculate approximate character limit based on maxLines
    // Average ~80-100 chars per line for text-lg
    const getCharLimit = () => {
        const charsPerLine = 100
        return maxLines * charsPerLine
    }

    // Truncate text intelligently
    const getTruncatedText = (content: string) => {
        const charLimit = getCharLimit()
        
        if (content.length <= charLimit) {
            return { text: content, isTruncated: false }
        }

        // Find a good breaking point (space, newline, or punctuation)
        let truncateAt = charLimit
        const breakChars = [' ', '\n', '.', ',', '!', '?', ';']
        
        // Look backwards from limit to find a natural break
        for (let i = charLimit; i > charLimit - 50 && i > 0; i--) {
            if (breakChars.includes(content[i])) {
                truncateAt = i
                break
            }
        }

        return {
            text: content.substring(0, truncateAt).trim() + '...',
            isTruncated: true
        }
    }

    const { text: displayText, isTruncated } = isExpanded 
        ? { text: normalizedText, isTruncated: false }
        : getTruncatedText(normalizedText)

    const handleCopy = async () => {
        const success = await copyToClipboard(normalizedText)
        if (success) {
            setIsCopied(true)
            toast.success("Text copied to clipboard")
            setTimeout(() => setIsCopied(false), 2000)
        } else {
            toast.error("Failed to copy text")
        }
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    // Parse text to detect hashtags and line breaks
    const parseText = (content: string) => {
        const lines = content.split('\n')

        return lines.map((line, lineIndex) => {
            // Split by hashtags while preserving them
            const parts = line.split(/(#\w+)/g)

            return (
                <React.Fragment key={lineIndex}>
                    {parts.map((part, partIndex) => {
                        if (part.startsWith('#')) {
                            return <Hashtag key={`${lineIndex}-${partIndex}`}>{part}</Hashtag>
                        }
                        return part ? <span key={`${lineIndex}-${partIndex}`}>{part}</span> : null
                    })}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            )
        })
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div className={cn("relative", className)}>
                    <div className="text-lg whitespace-pre-wrap">
                        {parseText(displayText)}
                        {isTruncated && !isExpanded && (
                            <span
                                onClick={toggleExpanded}
                                className="text-blue-500 hover:underline cursor-pointer font-medium ml-1 inline"
                            >
                                Read more
                            </span>
                        )}
                    </div>
                </div>
            </ContextMenuTrigger>

            <ContextMenuContent className="w-48">
                <ContextMenuItem onClick={handleCopy} className="gap-2">
                    {isCopied ? (
                        <>
                            <CheckIcon className="size-4" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <CopyIcon className="size-4" />
                            <span>Copy text</span>
                        </>
                    )}
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
