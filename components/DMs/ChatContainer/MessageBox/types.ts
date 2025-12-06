export interface UploadedImage {
    file: File;
    preview: string;
}

export interface MarkdownFormatterActions {
    formatBold: () => void;
    formatItalic: () => void;
    formatStrikethrough: () => void;
    formatCode: () => void;
    formatCodeBlock: () => void;
    formatHighlight: () => void;
    formatLink: () => void;
    formatImageUrl: () => void;
    formatQuote: () => void;
    formatUnorderedList: () => void;
    formatOrderedList: () => void;
    formatH1: () => void;
    formatH2: () => void;
    formatH3: () => void;
    formatMention: () => void;
    formatHashtag: () => void;
    formatTable: () => void;
    formatTable2x2: () => void;
    formatTable3x3: () => void;
    formatTable4x4: () => void;
    formatTableAddRow: () => void;
    formatTableAddColumn: () => void;
    formatYouTube: () => void;
}
