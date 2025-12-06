"use client";

import { useKeyBoardShortCut } from "@/components/Providers/KeyBoardShortCutProvider";
import { useAuth } from "@/components/Providers/AuthProvider";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import useShortcuts from "@useverse/useshortcuts";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { UploadedImage } from "./types";
import { useMarkdownFormatter } from "./useMarkdownFormatter";
import { FormattingToolbar } from "./FormattingToolbar";
import { MessageInput } from "./MessageInput";
import { MessagePreview } from "./MessagePreview";
import { FormatContextMenu } from "./FormatContextMenu";

export default function MessageBox() {
    const { disallowShortcuts, allowShortcuts, notoriousShortcuts, allowedShortcuts } = useKeyBoardShortCut();
    const { isMacOS } = useAuth();
    
    const [message, setMessage] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [isImageDropdownOpen, setIsImageDropdownOpen] = useState(false);
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Use markdown formatter hook
    const formatter = useMarkdownFormatter({
        message,
        setMessage,
        textareaRef,
        setIsImageDropdownOpen
    });

    // Handle image upload
    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const preview = URL.createObjectURL(file);
        const newIndex = uploadedImages.length;

        setUploadedImages(prev => [...prev, { file, preview }]);

        // Insert placeholder with index
        const indexStr = String(newIndex).padStart(2, '0');
        const textarea = textareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newText = 
                message.substring(0, start) + 
                `![upload ${indexStr}](${indexStr})` + 
                message.substring(end);
            setMessage(newText);
        }
        setIsImageDropdownOpen(false);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [uploadedImages.length, message]);

    // Replace upload placeholders with preview URLs for rendering
    const messageWithPreviews = useMemo(() => {
        let processedMessage = message;

        // Replace ![upload XX](XX) with ![upload XX](preview-url)
        uploadedImages.forEach((img, index) => {
            const indexStr = String(index).padStart(2, '0');
            const placeholder = `](${indexStr})`;
            const replacement = `](${img.preview})`;
            processedMessage = processedMessage.replace(placeholder, replacement);
        });

        return processedMessage;
    }, [message, uploadedImages]);

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            uploadedImages.forEach(img => {
                if (img.preview.startsWith('blob:')) {
                    URL.revokeObjectURL(img.preview);
                }
            });
        };
    }, [uploadedImages]);

    const handleSend = () => {
        if (message.trim()) {
            console.log("Sending message:", message);
            console.log("Uploaded images:", uploadedImages);
            // TODO: Implement send logic with uploaded images
            setMessage("");
            setUploadedImages([]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Send on Ctrl/Cmd + Enter
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
        // Allow plain Enter for new lines (default behavior)
        // No need to prevent default for plain Enter
    };

    // Keyboard shortcuts for formatting
    useShortcuts({
        shortcuts: [
            { 
                key: "b", 
                ctrlKey: !isMacOS, 
                metaKey: isMacOS, 
                enabled: allowedShortcuts.has("commandB") 
            },
            { 
                key: "i", 
                ctrlKey: !isMacOS, 
                metaKey: isMacOS, 
                enabled: allowedShortcuts.has("commandI") 
            },
            { 
                key: "k", 
                ctrlKey: !isMacOS, 
                metaKey: isMacOS, 
                enabled: allowedShortcuts.has("command-K") 
            }
        ],
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case "b":
                    formatter.formatBold();
                    break;
                case "i":
                    formatter.formatItalic();
                    break;
                case "k":
                    formatter.formatLink();
                    break;
            }
        }
    }, [formatter, allowedShortcuts]);

    // Handlers for shortcuts management
    const handleFocus = useCallback(() => {
        disallowShortcuts([...notoriousShortcuts]);
        allowShortcuts(["commandB", "commandI", "command-K"]);
    }, [disallowShortcuts, allowShortcuts, notoriousShortcuts]);

    const handleBlur = useCallback(() => {
        allowShortcuts([...notoriousShortcuts]);
        disallowShortcuts(["commandB", "commandI", "command-K"]);
    }, [allowShortcuts, disallowShortcuts, notoriousShortcuts]);

    const handleClear = useCallback(() => {
        setMessage("");
        setUploadedImages([]);
    }, []);

    const handleTogglePreview = useCallback(() => {
        setShowPreview(prev => !prev);
    }, []);

    return (
        <div className="border-t border-input bg-background">
            <FormattingToolbar
                formatter={formatter}
                showPreview={showPreview}
                onTogglePreview={handleTogglePreview}
                isImageDropdownOpen={isImageDropdownOpen}
                onImageDropdownChange={setIsImageDropdownOpen}
                onImageUploadClick={() => fileInputRef.current?.click()}
            />

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />

            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <div className="relative">
                        {!showPreview ? (
                            <MessageInput
                                textareaRef={textareaRef}
                                message={message}
                                onMessageChange={setMessage}
                                onKeyDown={handleKeyDown}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onClear={handleClear}
                                onSend={handleSend}
                            />
                        ) : (
                            <MessagePreview
                                message={message}
                                messageWithPreviews={messageWithPreviews}
                                onClear={handleClear}
                                onSend={handleSend}
                            />
                        )}
                    </div>
                </ContextMenuTrigger>
                
                <FormatContextMenu
                    formatter={formatter}
                    onImageUploadClick={() => fileInputRef.current?.click()}
                />
            </ContextMenu>
        </div>
    );
}