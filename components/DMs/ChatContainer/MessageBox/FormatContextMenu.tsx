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
    LinkIcon,
    Plus,
    Columns,
    Rows
} from "lucide-react";
import { MarkdownFormatterActions } from "./types";

interface FormatContextMenuProps {
    formatter: MarkdownFormatterActions;
    onImageUploadClick: () => void;
}

export function FormatContextMenu({ formatter, onImageUploadClick }: FormatContextMenuProps) {
    return (
        <ContextMenuContent
            className="w-56"
            alignOffset={-5}
        >
            {/* Text Formatting Group */}
            <ContextMenuSub>
                <ContextMenuSubTrigger>
                    <Bold className="size-4 mr-2" />
                    Text Formatting
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
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
                        <span className="ml-auto text-xs text-muted-foreground">**</span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={formatter.formatItalic}>
                        <Italic className="size-4 mr-2" />
                        Italic
                        <span className="ml-auto text-xs text-muted-foreground">*</span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={formatter.formatStrikethrough}>
                        <Strikethrough className="size-4 mr-2" />
                        Strikethrough
                        <span className="ml-auto text-xs text-muted-foreground">~~</span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={formatter.formatHighlight}>
                        <Highlighter className="size-4 mr-2" />
                        Highlight
                        <span className="ml-auto text-xs text-muted-foreground">==</span>
                    </ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>

            {/* Code Group */}
            <ContextMenuSub>
                <ContextMenuSubTrigger>
                    <Code className="size-4 mr-2" />
                    Code
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem onClick={formatter.formatCode}>
                        <Code className="size-4 mr-2" />
                        Inline Code
                        <span className="ml-auto text-xs text-muted-foreground">`</span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={formatter.formatCodeBlock}>
                        <Code className="size-4 mr-2" />
                        Code Block
                        <span className="ml-auto text-xs text-muted-foreground">```</span>
                    </ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>

            {/* Links & Media Group */}
            <ContextMenuSub>
                <ContextMenuSubTrigger>
                    <Link className="size-4 mr-2" />
                    Links & Media
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem onClick={formatter.formatLink}>
                        <Link className="size-4 mr-2" />
                        Link
                        <span className="ml-auto text-xs text-muted-foreground">[]()</span>
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
                                <span className="ml-auto text-xs text-muted-foreground">![]()</span>
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuItem onClick={formatter.formatYouTube}>
                        <Youtube className="size-4 mr-2" />
                        YouTube
                        <span className="ml-auto text-xs text-muted-foreground">@[yt]</span>
                    </ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>

            {/* Lists & Blocks Group */}
            <ContextMenuSub>
                <ContextMenuSubTrigger>
                    <List className="size-4 mr-2" />
                    Lists & Blocks
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem onClick={formatter.formatUnorderedList}>
                        <List className="size-4 mr-2" />
                        Bullet List
                        <span className="ml-auto text-xs text-muted-foreground">-</span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={formatter.formatOrderedList}>
                        <ListOrdered className="size-4 mr-2" />
                        Numbered List
                        <span className="ml-auto text-xs text-muted-foreground">1.</span>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={formatter.formatQuote}>
                        <Quote className="size-4 mr-2" />
                        Quote
                        <span className="ml-auto text-xs text-muted-foreground">&gt;</span>
                    </ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>
                            <Table className="size-4 mr-2" />
                            Table
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            <ContextMenuItem onClick={formatter.formatTable}>
                                <Table className="size-4 mr-2" />
                                Basic (2x1)
                                <span className="ml-auto text-xs text-muted-foreground">2×1</span>
                            </ContextMenuItem>
                            <ContextMenuItem onClick={formatter.formatTable2x2}>
                                <Table className="size-4 mr-2" />
                                Small (2x2)
                                <span className="ml-auto text-xs text-muted-foreground">2×2</span>
                            </ContextMenuItem>
                            <ContextMenuItem onClick={formatter.formatTable3x3}>
                                <Table className="size-4 mr-2" />
                                Medium (3x3)
                                <span className="ml-auto text-xs text-muted-foreground">3×3</span>
                            </ContextMenuItem>
                            <ContextMenuItem onClick={formatter.formatTable4x4}>
                                <Table className="size-4 mr-2" />
                                Large (4x4)
                                <span className="ml-auto text-xs text-muted-foreground">4×4</span>
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem onClick={formatter.formatTableAddRow}>
                                <Rows className="size-4 mr-2" />
                                Add Row
                                <span className="ml-auto text-xs text-muted-foreground">| |</span>
                            </ContextMenuItem>
                            <ContextMenuItem onClick={formatter.formatTableAddColumn}>
                                <Columns className="size-4 mr-2" />
                                Add Column
                                <span className="ml-auto text-xs text-muted-foreground">|</span>
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                </ContextMenuSubContent>
            </ContextMenuSub>

            {/* Special Group */}
            <ContextMenuSub>
                <ContextMenuSubTrigger>
                    <AtSign className="size-4 mr-2" />
                    Special
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    <ContextMenuItem onClick={formatter.formatMention}>
                        <AtSign className="size-4 mr-2" />
                        Mention
                        <span className="ml-auto text-xs text-muted-foreground">@</span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={formatter.formatHashtag}>
                        <Hash className="size-4 mr-2" />
                        Hashtag
                        <span className="ml-auto text-xs text-muted-foreground">#</span>
                    </ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>
        </ContextMenuContent>
    );
}
