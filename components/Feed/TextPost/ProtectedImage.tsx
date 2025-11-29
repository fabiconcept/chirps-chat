"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface ProtectedImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  aspectRatio?: string
  onClick?: () => void
  priority?: boolean
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
  fallbackSrc = "https://placehold.co/600x400/1a1a1a/666666?text=Image+Not+Found"
}: ProtectedImageProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)
  const [currentSrc, setCurrentSrc] = React.useState(src)

  // Reset states when src changes
  React.useEffect(() => {
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
        className={cn(
          "select-none transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        draggable={false}
        unoptimized={hasError} // Use unoptimized for fallback
      />
    </div>
  )
}
