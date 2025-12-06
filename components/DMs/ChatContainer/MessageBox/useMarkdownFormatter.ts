import { useCallback, RefObject } from "react";
import { MarkdownFormatterActions } from "./types";

interface UseMarkdownFormatterProps {
    message: string;
    setMessage: (message: string) => void;
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    setIsImageDropdownOpen?: (open: boolean) => void;
}

export function useMarkdownFormatter({
    message,
    setMessage,
    textareaRef,
    setIsImageDropdownOpen
}: UseMarkdownFormatterProps): MarkdownFormatterActions {
    
    // Insert markdown syntax at cursor position
    const insertMarkdown = useCallback((before: string, after: string = "", placeholder: string = "") => {
        const textarea = textareaRef?.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = message.substring(start, end);
        const textToInsert = selectedText || placeholder;
        
        const newText = 
            message.substring(0, start) + 
            before + textToInsert + after + 
            message.substring(end);
        
        setMessage(newText);
        
        // Set cursor position after insertion
        setTimeout(() => {
            const newCursorPos = start + before.length + textToInsert.length;
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    }, [message, setMessage, textareaRef]);

    // Smart line break helper - checks if current line has content
    const insertWithSmartLineBreak = useCallback((syntax: string, placeholder: string) => {
        const textarea = textareaRef?.current;
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const lineStart = message.lastIndexOf('\n', start - 1) + 1;
        const currentLine = message.substring(lineStart, start);
        
        // Only add line break if current line has content
        if (currentLine.trim()) {
            insertMarkdown(`\n${syntax}`, "", placeholder);
        } else {
            insertMarkdown(syntax, "", placeholder);
        }
    }, [message, textareaRef, insertMarkdown]);

    // Formatting actions
    const formatBold = useCallback(() => insertMarkdown("**", "**", "bold text here"), [insertMarkdown]);
    const formatItalic = useCallback(() => insertMarkdown("*", "*", "italic text here"), [insertMarkdown]);
    const formatStrikethrough = useCallback(() => insertMarkdown("~~", "~~", "strikethrough"), [insertMarkdown]);
    const formatCode = useCallback(() => insertMarkdown("`", "`", "code"), [insertMarkdown]);
    const formatCodeBlock = useCallback(() => insertMarkdown("\n```\n", "\n```\n", "code block"), [insertMarkdown]);
    const formatHighlight = useCallback(() => insertMarkdown("==", "==", "highlighted text here"), [insertMarkdown]);
    const formatLink = useCallback(() => insertMarkdown("[", "](url)", "link text here"), [insertMarkdown]);
    
    const formatImageUrl = useCallback(() => {
        setIsImageDropdownOpen?.(false);
        insertMarkdown("![", "](image-url)", "alt text here");
    }, [insertMarkdown, setIsImageDropdownOpen]);
    
    const formatQuote = useCallback(() => insertWithSmartLineBreak("> ", "quote text here"), [insertWithSmartLineBreak]);
    const formatUnorderedList = useCallback(() => insertWithSmartLineBreak("- ", "list item"), [insertWithSmartLineBreak]);
    const formatOrderedList = useCallback(() => insertWithSmartLineBreak("1. ", "list item"), [insertWithSmartLineBreak]);
    
    const formatH1 = useCallback(() => insertMarkdown("\n# ", "", "Heading 1"), [insertMarkdown]);
    const formatH2 = useCallback(() => insertMarkdown("\n## ", "", "Heading 2"), [insertMarkdown]);
    const formatH3 = useCallback(() => insertMarkdown("\n### ", "", "Heading 3"), [insertMarkdown]);
    const formatMention = useCallback(() => insertMarkdown("@", "", "username"), [insertMarkdown]);
    const formatHashtag = useCallback(() => insertMarkdown("#", "", "tag"), [insertMarkdown]);
    
    // Table formatters
    const formatTable = useCallback(() => insertMarkdown("\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n", "", ""), [insertMarkdown]);
    const formatTable2x2 = useCallback(() => insertMarkdown("\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |\n", "", ""), [insertMarkdown]);
    const formatTable3x3 = useCallback(() => insertMarkdown("\n| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n| Cell 7   | Cell 8   | Cell 9   |\n", "", ""), [insertMarkdown]);
    const formatTable4x4 = useCallback(() => insertMarkdown("\n| Header 1 | Header 2 | Header 3 | Header 4 |\n|----------|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   | Cell 4   |\n| Cell 5   | Cell 6   | Cell 7   | Cell 8   |\n| Cell 9   | Cell 10  | Cell 11  | Cell 12  |\n| Cell 13  | Cell 14  | Cell 15  | Cell 16  |\n", "", ""), [insertMarkdown]);
    const formatTableAddRow = useCallback(() => insertMarkdown("| Cell 1   | Cell 2   |\n", "", ""), [insertMarkdown]);
    const formatTableAddColumn = useCallback(() => insertMarkdown(" | Column ", "", ""), [insertMarkdown]);
    
    const formatYouTube = useCallback(() => insertMarkdown("@[youtube](", ")", "videoId"), [insertMarkdown]);

    return {
        formatBold,
        formatItalic,
        formatStrikethrough,
        formatCode,
        formatCodeBlock,
        formatHighlight,
        formatLink,
        formatImageUrl,
        formatQuote,
        formatUnorderedList,
        formatOrderedList,
        formatH1,
        formatH2,
        formatH3,
        formatMention,
        formatHashtag,
        formatTable,
        formatTable2x2,
        formatTable3x3,
        formatTable4x4,
        formatTableAddRow,
        formatTableAddColumn,
        formatYouTube
    };
}
