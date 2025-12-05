"use client"

import { useMemo, useState } from "react";
import { cn, copyToClipboard } from "@/lib/utils";
import Hashtag from "@/components/ui/hashtag";
import ProtectedImage from "@/components/Feed/TextPost/ProtectedImage";
import LinkPreview from "./LinkPreview";
import { Copy } from "lucide-react";

interface MarkdownRenderProps {
    content: string;
    className?: string;
    onImageClick?: (imageUrl: string, allImages: string[]) => void;
}

export default function MarkDownRender({ content, className, onImageClick }: MarkdownRenderProps) {
    const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

    const handleCopy = async (text: string, key: string) => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopiedIndex(key);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    // Extract all images from content
    const allImages = useMemo(() => {
        const imageRegex = /!\[.*?\]\((.*?)\)/g;
        const matches = content.matchAll(imageRegex);
        return Array.from(matches).map(match => match[1]);
    }, [content]);

    const renderMarkdown = useMemo(() => {
        const lines = content.split('\n');
        const elements: React.ReactElement[] = [];

        let i = 0;
        while (i < lines.length) {
            const line = lines[i];

            // Headers (h1-h6)
            if (line.startsWith('###### ')) {
                elements.push(
                    <h6 key={i} className="text-xs font-semibold mt-3 mb-1.5">
                        {parseInlineMarkdown(line.slice(7), onImageClick, allImages)}
                    </h6>
                );
            } else if (line.startsWith('##### ')) {
                elements.push(
                    <h5 key={i} className="text-sm font-semibold mt-3 mb-1.5">
                        {parseInlineMarkdown(line.slice(6), onImageClick, allImages)}
                    </h5>
                );
            } else if (line.startsWith('#### ')) {
                elements.push(
                    <h4 key={i} className="text-sm font-semibold mt-3 mb-2">
                        {parseInlineMarkdown(line.slice(5), onImageClick, allImages)}
                    </h4>
                );
            } else if (line.startsWith('### ')) {
                elements.push(
                    <h3 key={i} className="text-base font-semibold mt-4 mb-2">
                        {parseInlineMarkdown(line.slice(4), onImageClick, allImages)}
                    </h3>
                );
            } else if (line.startsWith('## ')) {
                elements.push(
                    <h2 key={i} className="text-lg font-semibold mt-4 mb-2">
                        {parseInlineMarkdown(line.slice(3), onImageClick, allImages)}
                    </h2>
                );
            } else if (line.startsWith('# ')) {
                elements.push(
                    <h1 key={i} className="text-xl font-bold mt-4 mb-2">
                        {parseInlineMarkdown(line.slice(2), onImageClick, allImages)}
                    </h1>
                );
            }
            // Code blocks with language support
            else if (line.startsWith('```')) {
                const language = line.slice(3).trim();
                const codeLines: string[] = [];
                const codeStartIndex = i;
                i++;
                while (i < lines.length && !lines[i].startsWith('```')) {
                    codeLines.push(lines[i]);
                    i++;
                }
                const codeContent = codeLines.join('\n');
                const codeKey = `code-${codeStartIndex}`;
                elements.push(
                    <div key={i} className="my-2 group relative">
                        {language && (
                            <div className="bg-foreground/10 px-3 py-1 text-xs font-mono rounded-t-md border-b border-foreground/20 flex items-center justify-between">
                                <span>{language}</span>
                                <button
                                    onClick={() => handleCopy(codeContent, codeKey)}
                                    className="opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-foreground/10 rounded"
                                    title="Copy code"
                                >
                                    {copiedIndex === codeKey ? (
                                        <span className="text-xs text-green-500">copied</span>
                                    ) : (
                                        <Copy size={14} />
                                    )}
                                </button>
                            </div>
                        )}
                        <div className="relative">
                            <pre className={cn(
                                "bg-foreground/5 p-3 rounded-md overflow-x-auto border border-foreground/10",
                                language && "rounded-t-none"
                            )}>
                                <code className="text-sm font-mono">{codeContent}</code>
                            </pre>
                            {!language && (
                                <button
                                    onClick={() => handleCopy(codeContent, codeKey)}
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 hover:bg-foreground/10 rounded bg-foreground/5 border border-foreground/10"
                                    title="Copy code"
                                >
                                    {copiedIndex === codeKey ? (
                                        <span className="text-xs text-green-500">copied</span>
                                    ) : (
                                        <Copy size={14} />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                );
            }
            // Blockquotes (multi-line support)
            else if (line.startsWith('> ')) {
                const quoteLines: string[] = [line.slice(2)];
                const quoteStartIndex = i;
                i++;
                while (i < lines.length && lines[i].startsWith('> ')) {
                    quoteLines.push(lines[i].slice(2));
                    i++;
                }
                i--;
                const quoteContent = quoteLines.join('\n');
                const quoteKey = `quote-${quoteStartIndex}`;
                elements.push(
                    <div key={i} className="relative group my-2">
                        <blockquote className="border-l-4 border-[#7600C9] dark:brightness-150 pl-4 py-2 italic text-muted-foreground">
                            {quoteLines.map((quote, idx) => (
                                <p key={idx}>{parseInlineMarkdown(quote, onImageClick, allImages)}</p>
                            ))}
                        </blockquote>
                        <button
                            onClick={() => handleCopy(quoteContent, quoteKey)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 hover:bg-foreground/10 rounded bg-foreground/5 border border-foreground/10"
                            title="Copy quote"
                        >
                            {copiedIndex === quoteKey ? (
                                <span className="text-xs text-green-500">copied</span>
                            ) : (
                                <Copy size={14} />
                            )}
                        </button>
                    </div>
                );
            }
            // Tables
            else if (line.includes('|') && line.trim().startsWith('|')) {
                const tableLines: string[] = [line];
                i++;
                while (i < lines.length && lines[i].includes('|')) {
                    tableLines.push(lines[i]);
                    i++;
                }
                i--;

                const rows = tableLines.map(row =>
                    row.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
                );

                // Check if second row is separator
                const hasSeparator = rows.length > 1 && rows[1].every(cell =>
                    /^:?-+:?$/.test(cell)
                );

                if (hasSeparator) {
                    const headers = rows[0];
                    const alignments = rows[1].map(cell => {
                        if (cell.startsWith(':') && cell.endsWith(':')) return 'center';
                        if (cell.endsWith(':')) return 'right';
                        return 'left';
                    });
                    const bodyRows = rows.slice(2);

                    elements.push(
                        <div key={i} className="my-3 overflow-x-auto">
                            <table className="min-w-full border-collapse border border-foreground/20">
                                <thead className="bg-foreground/5">
                                    <tr>
                                        {headers.map((header, idx) => (
                                            <th
                                                key={idx}
                                                className="border border-foreground/20 px-3 py-2 font-semibold text-left"
                                                style={{ textAlign: alignments[idx] }}
                                            >
                                                {parseInlineMarkdown(header, onImageClick, allImages)}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {bodyRows.map((row, rowIdx) => (
                                        <tr key={rowIdx} className="hover:bg-foreground/5">
                                            {row.map((cell, cellIdx) => (
                                                <td
                                                    key={cellIdx}
                                                    className="border border-foreground/20 px-3 py-2"
                                                    style={{ textAlign: alignments[cellIdx] }}
                                                >
                                                    {parseInlineMarkdown(cell, onImageClick, allImages)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                }
            }
            // Task lists
            else if (line.match(/^[\-\*]\s\[([ xX])\]\s/)) {
                const listItems: { checked: boolean; text: string }[] = [];
                const match = line.match(/^[\-\*]\s\[([ xX])\]\s(.+)$/);
                if (match) {
                    listItems.push({
                        checked: match[1].toLowerCase() === 'x',
                        text: match[2]
                    });
                }
                i++;
                while (i < lines.length) {
                    const taskMatch = lines[i].match(/^[\-\*]\s\[([ xX])\]\s(.+)$/);
                    if (taskMatch) {
                        listItems.push({
                            checked: taskMatch[1].toLowerCase() === 'x',
                            text: taskMatch[2]
                        });
                        i++;
                    } else {
                        break;
                    }
                }
                i--;
                elements.push(
                    <ul key={i} className="my-2 space-y-1.5">
                        {listItems.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    readOnly
                                    className="mt-1 cursor-default"
                                />
                                <span className={item.checked ? "line-through opacity-60" : ""}>
                                    {parseInlineMarkdown(item.text, onImageClick, allImages)}
                                </span>
                            </li>
                        ))}
                    </ul>
                );
            }
            // Unordered lists (nested support with different markers)
            else if (line.match(/^(\s*)[\-\*]\s/)) {
                const listItems: { indent: number; text: string }[] = [];
                const match = line.match(/^(\s*)[\-\*]\s(.+)$/);
                if (match) {
                    listItems.push({
                        indent: match[1].length,
                        text: match[2]
                    });
                }
                i++;
                while (i < lines.length) {
                    const itemMatch = lines[i].match(/^(\s*)[\-\*]\s(.+)$/);
                    if (itemMatch) {
                        listItems.push({
                            indent: itemMatch[1].length,
                            text: itemMatch[2]
                        });
                        i++;
                    } else {
                        break;
                    }
                }
                i--;
                
                // Group items by indent level
                const getListStyle = (indent: number) => {
                    const level = Math.floor(indent / 2);
                    const styles = ['disc', 'circle', 'square'];
                    return styles[level % styles.length];
                };
                
                elements.push(
                    <ul key={i} className="my-2 space-y-1">
                        {listItems.map((item, idx) => (
                            <li
                                key={idx}
                                className="ml-5"
                                style={{ 
                                    marginLeft: `${item.indent * 0.5 + 1.25}rem`,
                                    listStyleType: getListStyle(item.indent)
                                }}
                            >
                                {parseInlineMarkdown(item.text, onImageClick, allImages)}
                            </li>
                        ))}
                    </ul>
                );
            }
            // Ordered lists (nested support with different numbering: 1,2,3 -> a,b,c -> i,ii,iii)
            else if (line.match(/^(\s*)\d+\.\s/)) {
                const listItems: { indent: number; text: string; content: React.ReactNode }[] = [];
                const match = line.match(/^(\s*)\d+\.\s(.+)$/);
                if (match) {
                    listItems.push({
                        indent: match[1].length,
                        text: match[2],
                        content: null
                    });
                }
                i++;
                while (i < lines.length) {
                    const itemMatch = lines[i].match(/^(\s*)\d+\.\s(.+)$/);
                    if (itemMatch) {
                        listItems.push({
                            indent: itemMatch[1].length,
                            text: itemMatch[2],
                            content: null
                        });
                        i++;
                    } else {
                        break;
                    }
                }
                i--;
                
                // Build nested structure
                const buildNestedList = (items: typeof listItems, baseIndent: number, level: number): React.ReactNode[] => {
                    const result: React.ReactNode[] = [];
                    const styles = ['decimal', 'lower-alpha', 'lower-roman', 'upper-alpha', 'upper-roman'];
                    
                    let idx = 0;
                    while (idx < items.length) {
                        const item = items[idx];
                        
                        if (item.indent === baseIndent) {
                            // Check if next items are nested
                            const nestedItems: typeof listItems = [];
                            let j = idx + 1;
                            while (j < items.length && items[j].indent > baseIndent) {
                                nestedItems.push(items[j]);
                                j++;
                            }
                            
                            result.push(
                                <li key={idx}>
                                    {parseInlineMarkdown(item.text, onImageClick, allImages)}
                                    {nestedItems.length > 0 && (
                                        <ol style={{ listStyleType: styles[(level + 1) % styles.length] }} className="mt-1 space-y-1 ml-5">
                                            {buildNestedList(nestedItems, nestedItems[0].indent, level + 1)}
                                        </ol>
                                    )}
                                </li>
                            );
                            idx = j;
                        } else {
                            idx++;
                        }
                    }
                    
                    return result;
                };
                
                const baseIndent = listItems[0].indent;
                elements.push(
                    <ol key={i} className="my-2 space-y-1 list-decimal">
                        {buildNestedList(listItems, baseIndent, 0)}
                    </ol>
                );
            }
            // Definition lists
            else if (line.match(/^(.+)$/) && i + 1 < lines.length && lines[i + 1].startsWith(': ')) {
                const definitions: { term: string; definition: string }[] = [];
                definitions.push({
                    term: line,
                    definition: lines[i + 1].slice(2)
                });
                i += 2;
                while (i + 1 < lines.length && !lines[i].startsWith(': ') && lines[i + 1].startsWith(': ')) {
                    definitions.push({
                        term: lines[i],
                        definition: lines[i + 1].slice(2)
                    });
                    i += 2;
                }
                i--;
                elements.push(
                    <dl key={i} className="my-3">
                        {definitions.map((def, idx) => (
                            <div key={idx} className="mb-2">
                                <dt className="font-semibold">{parseInlineMarkdown(def.term, onImageClick, allImages)}</dt>
                                <dd className="ml-5 text-muted-foreground">{parseInlineMarkdown(def.definition, onImageClick, allImages)}</dd>
                            </div>
                        ))}
                    </dl>
                );
            }
            // Images ![alt](url)
            else if (line.match(/^!\[.*?\]\(.*?\)$/)) {
                const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
                if (match) {
                    const [, alt, url] = match;
                    elements.push(
                        <div 
                            key={i} 
                            className="inline-flex rounded-lg overflow-hidden border border-foreground/10 w-full cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => onImageClick?.(url, allImages)}
                        >
                            <ProtectedImage
                                src={url}
                                alt={alt}
                                className="w-full h-auto max-h-96 object-contain bg-foreground/5"
                                fill
                            />
                            {alt && (
                                <div className="px-3 py-1.5 text-xs text-muted-foreground bg-foreground/5 border-t border-foreground/10">
                                    {alt}
                                </div>
                            )}
                        </div>
                    );
                }
            }
            // Horizontal rule
            else if (line.match(/^(\-{3,}|\*{3,}|_{3,})$/)) {
                elements.push(<hr key={i} className="my-4 border-foreground/20" />);
            }
            // Empty line
            else if (line.trim() === '') {
                elements.push(<br key={i} />);
            }
            // Regular paragraph
            else {
                elements.push(
                    <p key={i} className="">
                        {parseInlineMarkdown(line, onImageClick, allImages)}
                    </p>
                );
            }

            i++;
        }

        return elements;
    }, [content, copiedIndex, allImages, onImageClick]);

    return (
        <div className={cn("prose prose-sm w-full", className)}>
            {renderMarkdown}
        </div>
    );
}

// Parse inline markdown (bold, italic, code, links, hashtags, etc.)
function parseInlineMarkdown(text: string, onImageClick?: (imageUrl: string, allImages: string[]) => void, allImages?: string[]): React.ReactNode[] {
    const elements: React.ReactNode[] = [];
    let currentText = '';
    let i = 0;

    const flushText = () => {
        if (currentText) {
            elements.push(currentText);
            currentText = '';
        }
    };

    while (i < text.length) {
        // Bold with **
        if (text.slice(i, i + 2) === '**') {
            flushText();
            const endIndex = text.indexOf('**', i + 2);
            if (endIndex !== -1) {
                elements.push(
                    <strong key={`bold-${i}`} className="font-bold">
                        {parseInlineMarkdown(text.slice(i + 2, endIndex), onImageClick, allImages)}
                    </strong>
                );
                i = endIndex + 2;
                continue;
            }
        }
        // Bold with __
        else if (text.slice(i, i + 2) === '__') {
            flushText();
            const endIndex = text.indexOf('__', i + 2);
            if (endIndex !== -1) {
                elements.push(
                    <strong key={`bold-${i}`} className="font-bold">
                        {parseInlineMarkdown(text.slice(i + 2, endIndex), onImageClick, allImages)}
                    </strong>
                );
                i = endIndex + 2;
                continue;
            }
        }
        // Italic with *
        else if (text[i] === '*' && text[i + 1] !== '*') {
            flushText();
            const endIndex = text.indexOf('*', i + 1);
            if (endIndex !== -1 && text[endIndex - 1] !== '\\') {
                elements.push(
                    <em key={`italic-${i}`} className="italic">
                        {parseInlineMarkdown(text.slice(i + 1, endIndex), onImageClick, allImages)}
                    </em>
                );
                i = endIndex + 1;
                continue;
            }
        }
        // Italic with _
        else if (text[i] === '_' && text[i + 1] !== '_') {
            flushText();
            const endIndex = text.indexOf('_', i + 1);
            if (endIndex !== -1 && text[endIndex - 1] !== '\\') {
                elements.push(
                    <em key={`italic-${i}`} className="italic">
                        {parseInlineMarkdown(text.slice(i + 1, endIndex), onImageClick, allImages)}
                    </em>
                );
                i = endIndex + 1;
                continue;
            }
        }
        // Inline code with `
        else if (text[i] === '`' && text[i + 1] !== '`') {
            flushText();
            const endIndex = text.indexOf('`', i + 1);
            if (endIndex !== -1) {
                elements.push(
                    <code key={`code-${i}`} className="bg-foreground/10 px-1.5 py-0.5 rounded text-sm font-mono">
                        {text.slice(i + 1, endIndex)}
                    </code>
                );
                i = endIndex + 1;
                continue;
            }
        }
        // Highlight with ==
        else if (text.slice(i, i + 2) === '==') {
            flushText();
            const endIndex = text.indexOf('==', i + 2);
            if (endIndex !== -1) {
                elements.push(
                    <mark key={`mark-${i}`} className="bg-yellow-200 dark:bg-yellow-700/50 dark:text-white px-1 rounded">
                        {parseInlineMarkdown(text.slice(i + 2, endIndex), onImageClick, allImages)}
                    </mark>
                );
                i = endIndex + 2;
                continue;
            }
        }
        // Subscript with ~
        else if (text[i] === '~' && text[i + 1] !== '~') {
            flushText();
            const endIndex = text.indexOf('~', i + 1);
            if (endIndex !== -1) {
                elements.push(
                    <sub key={`sub-${i}`} className="text-xs">
                        {text.slice(i + 1, endIndex)}
                    </sub>
                );
                i = endIndex + 1;
                continue;
            }
        }
        // Superscript with ^
        else if (text[i] === '^') {
            flushText();
            const endIndex = text.indexOf('^', i + 1);
            if (endIndex !== -1) {
                elements.push(
                    <sup key={`sup-${i}`} className="text-xs">
                        {text.slice(i + 1, endIndex)}
                    </sup>
                );
                i = endIndex + 1;
                continue;
            }
        }
        // Strikethrough with ~~
        else if (text.slice(i, i + 2) === '~~') {
            flushText();
            const endIndex = text.indexOf('~~', i + 2);
            if (endIndex !== -1) {
                elements.push(
                    <del key={`del-${i}`} className="line-through opacity-70">
                        {parseInlineMarkdown(text.slice(i + 2, endIndex), onImageClick, allImages)}
                    </del>
                );
                i = endIndex + 2;
                continue;
            }
        }
        // Inline images ![alt](url)
        else if (text[i] === '!' && text[i + 1] === '[') {
            const closeBracket = text.indexOf(']', i + 2);
            if (closeBracket !== -1 && text[closeBracket + 1] === '(') {
                const closeParen = text.indexOf(')', closeBracket + 2);
                if (closeParen !== -1) {
                    flushText();
                    const alt = text.slice(i + 2, closeBracket);
                    const url = text.slice(closeBracket + 2, closeParen);
                    elements.push(
                        <span 
                            key={`img-${i}`} 
                            className="inline-block my-1 mx-1 rounded-md overflow-hidden border border-foreground/10 align-middle cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => onImageClick?.(url, allImages || [])}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={url}
                                alt={alt}
                                className="max-h-48 max-w-full h-auto object-contain bg-foreground/5"
                                loading="lazy"
                                title={alt}
                            />
                        </span>
                    );
                    i = closeParen + 1;
                    continue;
                }
            }
        }
        // Links [text](url "optional title")
        else if (text[i] === '[') {
            const closeBracket = text.indexOf(']', i);
            if (closeBracket !== -1 && text[closeBracket + 1] === '(') {
                const closeParen = text.indexOf(')', closeBracket + 2);
                if (closeParen !== -1) {
                    flushText();
                    const linkText = text.slice(i + 1, closeBracket);
                    const urlPart = text.slice(closeBracket + 2, closeParen);
                    const [url] = urlPart.split(' "').map((s, idx) =>
                        idx === 1 ? s.slice(0, -1) : s
                    );
                    elements.push(
                        <LinkPreview key={`link-${i}`} url={url.trim()}>
                            {parseInlineMarkdown(linkText)}
                        </LinkPreview>
                    );
                    i = closeParen + 1;
                    continue;
                }
            }
        }
        // Auto-links <url>
        else if (text[i] === '<') {
            const closeAngle = text.indexOf('>', i);
            if (closeAngle !== -1) {
                const content = text.slice(i + 1, closeAngle);
                if (content.match(/^https?:\/\//)) {
                    flushText();
                    elements.push(
                        <LinkPreview key={`autolink-${i}`} url={content}>
                            {content}
                        </LinkPreview>
                    );
                    i = closeAngle + 1;
                    continue;
                }
            }
        }
        // Mentions @username
        else if (text[i] === '@' && (i === 0 || /\s/.test(text[i - 1]))) {
            const match = text.slice(i).match(/^@[\w-]+/);
            if (match) {
                flushText();
                elements.push(
                    <span
                        key={`mention-${i}`}
                        className="inline-flex items-center dark:brightness-150 h-5 bg-[#7600C9]/10 hover:bg-[#7600C9]/20 text-[#7600C9] dark:text-[#9D4EDD] px-1 rounded-3xl font-medium transition-colors cursor-pointer border border-[#7600C9]/20"
                    >
                        <span className="text-xs">@</span><span>{match[0].slice(1)}</span>
                    </span>
                );
                i += match[0].length;
                continue;
            }
        }
        // Hashtags #tag
        else if (text[i] === '#' && (i === 0 || /\s/.test(text[i - 1]))) {
            const match = text.slice(i).match(/^#[\w-]+/);
            if (match) {
                flushText();
                elements.push(
                    <Hashtag key={`hashtag-${i}`}>{match[0]}</Hashtag>
                );
                i += match[0].length;
                continue;
            }
        }
        // Escaped characters
        else if (text[i] === '\\' && i + 1 < text.length) {
            currentText += text[i + 1];
            i += 2;
            continue;
        }

        currentText += text[i];
        i++;
    }

    flushText();
    return elements;
}