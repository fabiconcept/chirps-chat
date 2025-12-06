"use client";

import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Link,
    Image,
    List,
    ListOrdered,
    Quote,
    Eye,
    EyeOff,
    Hash,
    AtSign,
    Highlighter,
    Upload,
    LinkIcon
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { MarkdownFormatterActions } from "./types";

interface FormattingToolbarProps {
    formatter: MarkdownFormatterActions;
    showPreview: boolean;
    onTogglePreview: () => void;
    isImageDropdownOpen: boolean;
    onImageDropdownChange: (open: boolean) => void;
    onImageUploadClick: () => void;
}

export function FormattingToolbar({
    formatter,
    showPreview,
    onTogglePreview,
    isImageDropdownOpen,
    onImageDropdownChange,
    onImageUploadClick
}: FormattingToolbarProps) {
    return (
        <div className="flex items-center gap-1 px-3 py-2 border-b border-input/50 flex-wrap">
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatBold}
                title="Bold (Ctrl+B)"
            >
                <Bold className="size-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatItalic}
                title="Italic (Ctrl+I)"
            >
                <Italic className="size-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatStrikethrough}
                title="Strikethrough"
            >
                <Strikethrough className="size-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatHighlight}
                title="Highlight"
            >
                <Highlighter className="size-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6 mx-1" />
            
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatCode}
                title="Inline Code"
            >
                <Code className="size-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatLink}
                title="Link (Ctrl+K)"
            >
                <Link className="size-4" />
            </Button>
            <DropdownMenu open={isImageDropdownOpen} onOpenChange={onImageDropdownChange}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        title="Image"
                    >
                        {/* eslint-disable-next-line */}
                        <Image className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={onImageUploadClick}>
                        <Upload className="size-4 mr-2" />
                        Upload Image
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={formatter.formatImageUrl}>
                        <LinkIcon className="size-4 mr-2" />
                        Image URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
            <Separator orientation="vertical" className="h-6 mx-1" />
            
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatUnorderedList}
                title="Bullet List"
            >
                <List className="size-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatOrderedList}
                title="Numbered List"
            >
                <ListOrdered className="size-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatQuote}
                title="Quote"
            >
                <Quote className="size-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6 mx-1" />
            
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatMention}
                title="Mention"
            >
                <AtSign className="size-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={formatter.formatHashtag}
                title="Hashtag"
            >
                <Hash className="size-4" />
            </Button>
            
            <div className="flex-1" />
            
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={onTogglePreview}
                title={showPreview ? "Hide Preview" : "Show Preview"}
            >
                {showPreview ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
        </div>
    );
}
