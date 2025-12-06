"use client";

import {
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger
} from "@/components/ui/context-menu";
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
    Heading,
    Hash,
    AtSign,
    Highlighter,
    Table,
    Youtube,
    Upload,
    LinkIcon
} from "lucide-react";
import { MarkdownFormatterActions } from "./types";

interface FormatContextMenuProps {
    formatter: MarkdownFormatterActions;
    onImageUploadClick: () => void;
}

export function FormatContextMenu({ formatter, onImageUploadClick }: FormatContextMenuProps) {
    return (
        <ContextMenuContent alignOffset={-100} className="w-64">
            <ContextMenuSub>
                <ContextMenuSubTrigger>
                    <Heading className="size-4 mr-2" />
                    Headings
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem onClick={formatter.formatH1}>
                        <span className="text-lg font-bold">H1</span>
                        <span className="ml-auto text-xs text-muted-foreground"># </span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={formatter.formatH2}>
                        <span className="text-base font-bold">H2</span>
                        <span className="ml-auto text-xs text-muted-foreground">## </span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={formatter.formatH3}>
                        <span className="text-sm font-bold">H3</span>
                        <span className="ml-auto text-xs text-muted-foreground">### </span>
                    </ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>
            
            <ContextMenuSeparator />
            
            <ContextMenuItem onClick={formatter.formatBold}>
                <Bold className="size-4 mr-2" />
                Bold
                <span className="ml-auto text-xs text-muted-foreground">**text**</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={formatter.formatItalic}>
                <Italic className="size-4 mr-2" />
                Italic
                <span className="ml-auto text-xs text-muted-foreground">*text*</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={formatter.formatStrikethrough}>
                <Strikethrough className="size-4 mr-2" />
                Strikethrough
                <span className="ml-auto text-xs text-muted-foreground">~~text~~</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={formatter.formatHighlight}>
                <Highlighter className="size-4 mr-2" />
                Highlight
                <span className="ml-auto text-xs text-muted-foreground">==text==</span>
            </ContextMenuItem>
            
            <ContextMenuSeparator />
            
            <ContextMenuItem onClick={formatter.formatCode}>
                <Code className="size-4 mr-2" />
                Inline Code
                <span className="ml-auto text-xs text-muted-foreground">`code`</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={formatter.formatCodeBlock}>
                <Code className="size-4 mr-2" />
                Code Block
                <span className="ml-auto text-xs text-muted-foreground">```</span>
            </ContextMenuItem>
            
            <ContextMenuSeparator />
            
            <ContextMenuItem onClick={formatter.formatLink}>
                <Link className="size-4 mr-2" />
                Link
                <span className="ml-auto text-xs text-muted-foreground">[text](url)</span>
            </ContextMenuItem>
            <ContextMenuSub>
                <ContextMenuSubTrigger>
                    {/* eslint-disable-next-line */}
                    <Image className="size-4 mr-2" />
                    Image
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem onClick={onImageUploadClick}>
                        <Upload className="size-4 mr-2" />
                        Upload Image
                    </ContextMenuItem>
                    <ContextMenuItem onClick={formatter.formatImageUrl}>
                        <LinkIcon className="size-4 mr-2" />
                        Image URL
                        <span className="ml-auto text-xs text-muted-foreground">![alt](url)</span>
                    </ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem onClick={formatter.formatYouTube}>
                <Youtube className="size-4 mr-2" />
                YouTube
                <span className="ml-auto text-xs text-muted-foreground">@[youtube](id)</span>
            </ContextMenuItem>
            
            <ContextMenuSeparator />
            
            <ContextMenuItem onClick={formatter.formatUnorderedList}>
                <List className="size-4 mr-2" />
                Bullet List
                <span className="ml-auto text-xs text-muted-foreground">- item</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={formatter.formatOrderedList}>
                <ListOrdered className="size-4 mr-2" />
                Numbered List
                <span className="ml-auto text-xs text-muted-foreground">1. item</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={formatter.formatQuote}>
                <Quote className="size-4 mr-2" />
                Quote
                <span className="ml-auto text-xs text-muted-foreground">&gt; text</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={formatter.formatTable}>
                <Table className="size-4 mr-2" />
                Table
                <span className="ml-auto text-xs text-muted-foreground">| | |</span>
            </ContextMenuItem>
            
            <ContextMenuSeparator />
            
            <ContextMenuItem onClick={formatter.formatMention}>
                <AtSign className="size-4 mr-2" />
                Mention
                <span className="ml-auto text-xs text-muted-foreground">@user</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={formatter.formatHashtag}>
                <Hash className="size-4 mr-2" />
                Hashtag
                <span className="ml-auto text-xs text-muted-foreground">#tag</span>
            </ContextMenuItem>
        </ContextMenuContent>
    );
}
