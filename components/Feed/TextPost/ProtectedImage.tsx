"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

// Global cache for loaded images (persists across component instances)
const globalImageCache = new Set<string>()

interface ProtectedImageProps {
    src: string
    alt: string
    fill?: boolean
    className?: string
    aspectRatio?: string
    onClick?: () => void
    width?: number
    height?: number
    priority?: boolean
    unoptimized?: boolean
    fallbackSrc?: string
}

export default function ProtectedImage({
    src,
    alt,
    fill = false,
    className,
    aspectRatio,
    onClick,
    priority = false,
    width = undefined,
    height = undefined,
    unoptimized = false,
    fallbackSrc = "https://placehold.co/600x400/1a1a1a/666666?text=Image+Not+Found"
}: ProtectedImageProps) {
    const [isLoading, setIsLoading] = React.useState(!globalImageCache.has(src))
    const [hasError, setHasError] = React.useState(false)
    const [currentSrc, setCurrentSrc] = React.useState(src)

    // Reset states when src changes
    React.useEffect(() => {
        // Check if image was already loaded successfully in global cache
        if (globalImageCache.has(src)) {
            setIsLoading(false)
            setHasError(false)
            setCurrentSrc(src)
            return
        }

        setIsLoading(true)
        setHasError(false)
        setCurrentSrc(src)
    }, [src])

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        return false
    }

    const handleLoad = () => {
        setIsLoading(false)
        setHasError(false)
        // Mark this image as successfully loaded in global cache
        globalImageCache.add(src)
    }

    const handleError = () => {
        setIsLoading(false)
        if (!hasError) {
            setHasError(true)
            setCurrentSrc(fallbackSrc)
        }
    }

    return (
        <div
            className={cn(
                "relative",
                fill ? "w-full h-full" : aspectRatio
            )}
            onClick={onClick}
            onContextMenu={handleContextMenu}
        >
            {/* Loading Skeleton */}
            {isLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <ImageIcon className="size-8 animate-pulse" />
                        <span className="text-xs">Loading...</span>
                    </div>
                </div>
            )}

            {/* Error State Overlay */}
            {hasError && (
                <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-20 pointer-events-none">
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <ImageIcon className="size-6" />
                        <span className="text-xs">Failed to load</span>
                    </div>
                </div>
            )}

            {/* Actual Image */}
            <Image
                src={currentSrc}
                alt={alt}
                fill={fill}
                width={width}
                height={height}
                className={cn(
                    "select-none transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                hidden={hasError}
                onLoad={handleLoad}
                onError={handleError}
                priority={priority}
                draggable={false}
                unoptimized={hasError || unoptimized}
                quality={90}
                loading={priority ? "eager" : "lazy"}
            />
        </div>
    )
}
