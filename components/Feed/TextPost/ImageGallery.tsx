"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, LucideExpand, XIcon, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ProtectedImage from "./ProtectedImage"

interface ImageGalleryProps {
    images: string[]
    className?: string
}

type AspectRatio = 'portrait' | 'landscape' | 'square'

interface ImageDimensions {
    width: number
    height: number
    aspectRatio: AspectRatio
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [imageDimensions, setImageDimensions] = React.useState<ImageDimensions[]>([])

    // Limit to max 4 images
    const displayImages = images.slice(0, 4)
    const imageCount = displayImages.length

    // Load image dimensions to detect aspect ratios
    React.useEffect(() => {
        const loadDimensions = async () => {
            const dimensions = await Promise.all(
                displayImages.map((src) => {
                    return new Promise<ImageDimensions>((resolve) => {
                        const img = new window.Image()
                        img.onload = () => {
                            const ratio = img.width / img.height
                            let aspectRatio: AspectRatio
                            if (ratio > 1.2) aspectRatio = 'landscape'
                            else if (ratio < 0.8) aspectRatio = 'portrait'
                            else aspectRatio = 'square'
                            resolve({ width: img.width, height: img.height, aspectRatio })
                        }
                        img.onerror = () => {
                            // Default to square if image fails to load
                            resolve({ width: 1, height: 1, aspectRatio: 'square' })
                        }
                        img.src = src
                    })
                })
            )
            setImageDimensions(dimensions)
        }
        loadDimensions()
    }, [displayImages])

    const openCarousel = (index: number) => {
        setCurrentIndex(index)
        setIsOpen(true)
    }

    const nextImage = React.useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % displayImages.length)
    }, [displayImages.length])

    const prevImage = React.useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
    }, [displayImages.length])

    const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (!isOpen) return
        if (e.key === "ArrowRight") nextImage()
        if (e.key === "ArrowLeft") prevImage()
        if (e.key === "Escape") setIsOpen(false)
    }, [isOpen, nextImage, prevImage])

    React.useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    if (imageCount === 0) return null

    // Wait for dimensions to load
    if (imageDimensions.length !== imageCount) {
        return (
            <div className={cn("w-full", className)}>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                        <Loader2 className="size-8 animate-spin" />
                        <span className="text-sm font-medium">Loading images...</span>
                    </div>
                </div>
            </div>
        )
    }

    // Helper to render an image
    const renderImage = (idx: number, aspectClass: string) => (
        <button 
            key={idx} 
            className={cn("relative", aspectClass, "overflow-hidden border border-transparent transition-all duration-200 group hover:border-input/20 rounded-3xl grid place-items-center")}
            onClick={() => openCarousel(idx)}
        >
            <ProtectedImage
                src={displayImages[idx]}
                alt={`Image ${idx + 1}`}
                fill
                className="object-cover group-active:scale-95 cursor-pointer group-hover:scale-[1.015] transition-transform duration-200"
            />
            <Button
                tabIndex={-1}
                size={"icon-lg"} 
                variant={"ghost"} 
                className="absolute group-hover:opacity-100 opacity-0 transition-opacity delay-200 group-active:-rotate-6 z-10"
            >
                <LucideExpand />
            </Button>
            <span className="sr-only">View image {idx + 1}</span>
        </button>
    )

    // Choose layout based on aspect ratios
    const getLayout = () => {
        const ratios = imageDimensions.map(d => d.aspectRatio)

        switch (imageCount) {
            case 1:
                // [1] - Full width, respect aspect ratio
                const singleAspect = ratios[0] === 'portrait' ? 'aspect-3/4' : ratios[0] === 'landscape' ? 'aspect-video' : 'aspect-square'
                return (
                    <div className={cn("rounded-2xl overflow-hidden w-full", singleAspect)}>
                        {renderImage(0, 'w-full h-full')}
                    </div>
                )

            case 2:
                // Choose between [1, 2] or [[1], [2]]
                if (ratios[0] === 'landscape' && ratios[1] === 'landscape') {
                    // [[1], [2]] - Stack vertically
                    return (
                        <div className="flex flex-col gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-video')}
                            {renderImage(1, 'aspect-video')}
                        </div>
                    )
                } else {
                    // [1, 2] - Side by side
                    return (
                        <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-square')}
                            {renderImage(1, 'aspect-square')}
                        </div>
                    )
                }

            case 3:
                // Choose between [1, [2, 3]], [[1, 2], [3]], [[1, 2, 3]]
                if (ratios[0] === 'portrait' || (ratios[1] === 'portrait' && ratios[2] === 'portrait')) {
                    // [1, [2, 3]] - One large left, two stacked right
                    return (
                        <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-square row-span-2')}
                            {renderImage(1, 'aspect-square')}
                            {renderImage(2, 'aspect-square')}
                        </div>
                    )
                } else if (ratios[0] === 'landscape' && ratios[1] === 'landscape') {
                    // [[1, 2], [3]] - Two on top, one bottom
                    return (
                        <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-square')}
                            {renderImage(1, 'aspect-square')}
                            <div className="col-span-2">
                                {renderImage(2, 'aspect-video')}
                            </div>
                        </div>
                    )
                } else {
                    // [[1, 2, 3]] - Three in a row
                    return (
                        <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-square')}
                            {renderImage(1, 'aspect-square')}
                            {renderImage(2, 'aspect-square')}
                        </div>
                    )
                }

            case 4:
                // Choose between [[1, 2], [3, 4]], [[1, 2, 3, 4]], [1, [2, 3, 4]], [[1, 2, 3], 4], [[1], [2], [3], [4]]
                const allLandscape = ratios.every(r => r === 'landscape')
                const allPortrait = ratios.every(r => r === 'portrait')
                const firstPortrait = ratios[0] === 'portrait'
                const lastPortrait = ratios[3] === 'portrait'

                if (allLandscape) {
                    // [[1], [2], [3], [4]] - Stack vertically
                    return (
                        <div className="flex flex-col gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-video')}
                            {renderImage(1, 'aspect-video')}
                            {renderImage(2, 'aspect-video')}
                            {renderImage(3, 'aspect-video')}
                        </div>
                    )
                } else if (allPortrait) {
                    // [[1, 2, 3, 4]] - Four in a row
                    return (
                        <div className="grid grid-cols-4 gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-3/4')}
                            {renderImage(1, 'aspect-3/4')}
                            {renderImage(2, 'aspect-3/4')}
                            {renderImage(3, 'aspect-3/4')}
                        </div>
                    )
                } else if (firstPortrait) {
                    // [1, [2, 3, 4]] - One large left, three stacked right
                    return (
                        <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-square row-span-3')}
                            {renderImage(1, 'aspect-square')}
                            {renderImage(2, 'aspect-square')}
                            {renderImage(3, 'aspect-square')}
                        </div>
                    )
                } else if (lastPortrait) {
                    // [[1, 2, 3], 4] - Three on left, one large right
                    return (
                        <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-square')}
                            {renderImage(1, 'aspect-square')}
                            {renderImage(2, 'aspect-square')}
                            {renderImage(3, 'aspect-square row-span-3')}
                        </div>
                    )
                } else {
                    // [[1, 2], [3, 4]] - Classic 2x2 grid
                    return (
                        <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden">
                            {renderImage(0, 'aspect-square')}
                            {renderImage(1, 'aspect-square')}
                            {renderImage(2, 'aspect-square')}
                            {renderImage(3, 'aspect-square')}
                        </div>
                    )
                }

            default:
                return null
        }
    }

    return (
        <>
            <div className={cn("w-full", className)}>
                {getLayout()}
            </div>

            {/* Carousel Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent
                    className="max-w-[98vw] w-full h-[95vh] p-0 bg-background/70 backdrop-blur-sm border-input"
                    showCloseButton={false}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Close Button */}
                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                            >
                                <XIcon className="size-6" />
                                <span className="sr-only">Close Image viewer</span>
                            </Button>
                        </DialogClose>

                        {/* Navigation Buttons */}
                        {displayImages.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon-lg"
                                    className="absolute left-4 z-50 text-white hover:bg-white/20 rounded-full"
                                    onClick={prevImage}
                                >
                                    <ChevronLeftIcon className="size-8" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon-lg"
                                    className="absolute right-4 z-50 text-white hover:bg-white/20 rounded-full"
                                    onClick={nextImage}
                                >
                                    <ChevronRightIcon className="size-8" />
                                </Button>
                            </>
                        )}

                        {/* Current Image */}
                        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
                            <div className="relative w-full h-full">
                                <ProtectedImage
                                    src={displayImages[currentIndex]}
                                    alt={`Image ${currentIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Image Counter */}
                        {displayImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                                {currentIndex + 1} / {displayImages.length}
                            </div>
                        )}

                        {/* Thumbnail Navigation */}
                        {displayImages.length > 1 && (
                            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                                {displayImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={cn(
                                            "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                                            currentIndex === idx
                                                ? "border-white scale-110"
                                                : "border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <ProtectedImage
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
