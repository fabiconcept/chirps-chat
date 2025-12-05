"use client"

import { useEffect, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface LinkMetadata {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    url: string;
}

interface LinkPreviewProps {
    url: string;
    children: React.ReactNode;
}

export default function LinkPreview({ url, children }: LinkPreviewProps) {
    const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Only fetch metadata for http/https URLs
        if (!url.match(/^https?:\/\//)) {
            return;
        }

        const fetchMetadata = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                
                if (response.ok) {
                    setMetadata(data);
                } else {
                    // Fallback to basic metadata
                    setMetadata({
                        url,
                        siteName: new URL(url).hostname
                    });
                }
            } catch (error) {
                console.error("Failed to fetch metadata:", error);
                // Fallback to basic metadata
                setMetadata({
                    url,
                    siteName: new URL(url).hostname
                });
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && !metadata && !loading) {
            fetchMetadata();
        }
    }, [url, isOpen, metadata, loading]);

    return (
        <HoverCard openDelay={300} closeDelay={100} onOpenChange={setIsOpen}>
            <HoverCardTrigger asChild>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7600C9] hover:underline inline-flex items-center gap-1"
                >
                    {children}
                    <ExternalLink size={12} className="opacity-50" />
                </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-0" align="start">
                {loading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : metadata ? (
                    <>
                        {metadata.image && (
                            <div className="w-full h-40 bg-foreground/5 relative rounded-t-md overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={metadata.image}
                                    alt={metadata.title || "Preview"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="p-4">
                            {metadata.siteName && (
                                <div className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                                    <ExternalLink size={10} />
                                    {metadata.siteName}
                                </div>
                            )}
                            {metadata.title && (
                                <div className="font-semibold text-sm mb-1.5 line-clamp-2">
                                    {metadata.title}
                                </div>
                            )}
                            {metadata.description && (
                                <div className="text-xs text-muted-foreground line-clamp-3">
                                    {metadata.description}
                                </div>
                            )}
                        </div>
                    </>
                ) : null}
            </HoverCardContent>
        </HoverCard>
    );
}
