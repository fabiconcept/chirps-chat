"use client"

import { removeSearchParam } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetClose } from "../ui/sheet";
import { useSearchParams } from "next/navigation";
import ProfileCard from "../ProfileCard";
import { Button } from "../ui/button";
import { XIcon, ImageIcon, Users, Trash2, Ban, ChevronRight, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { useState, useCallback, useEffect } from "react";
import ProtectedImage from "../Feed/TextPost/ProtectedImage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

// Mock data for images
const mockImages = [
    "https://chirps-chat.sirv.com/parrot.png",
    "https://chirps-chat.sirv.com/octopus.png",
    "https://chirps-chat.sirv.com/tiger.png",
    "https://chirps-chat.sirv.com/frog.png",
    "https://chirps-chat.sirv.com/premium/rasta.png",
    "https://chirps-chat.sirv.com/bug.png",
];

// Mock data for mutual rooms
const mockMutualRooms = [
    { id: "1", name: "🏠 - General", icon: "#", members: 44 },
    { id: "2", name: "💻 - Development", icon: "#", members: 28 },
    { id: "3", name: "🎨 - Design", icon: "#", members: 15 },
];

export default function ProfileContainer() {
    const searchParams = useSearchParams();
    const viewingProfile = searchParams.get("viewing-profile");
    const [showClearChatDialog, setShowClearChatDialog] = useState(false);
    const [showBlockDialog, setShowBlockDialog] = useState(false);
    const [showAllImages, setShowAllImages] = useState(false);
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleClearChat = () => {
        console.log("Clear chat confirmed");
        setShowClearChatDialog(false);
    };

    const handleBlock = () => {
        console.log("Block user confirmed");
        setShowBlockDialog(false);
        removeSearchParam("viewing-profile");
    };

    const openImageViewer = (index: number) => {
        setCurrentImageIndex(index);
        setImageViewerOpen(true);
    };

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % mockImages.length);
    }, []);

    const prevImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + mockImages.length) % mockImages.length);
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!imageViewerOpen) return;
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") setImageViewerOpen(false);
    }, [imageViewerOpen, nextImage, prevImage]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const displayedImages = showAllImages ? mockImages : mockImages.slice(0, 6);

    return (
        <>
        <Sheet
            open={viewingProfile === "1"}
            onOpenChange={(open)=> {
                if(!open) {
                    removeSearchParam("viewing-profile");
                }
            }}
        >
            <SheetContent showCloseButton={false} className="max-w-80 min-w-0 px-0 p-0 py-0 flex flex-col">
                <SheetClose className="absolute top-2 right-2 size-6 rounded-full bg-foreground/10 hover:bg-foreground/20 backdrop-blur-sm grid place-items-center z-10">
                    <XIcon className="size-4" />
                </SheetClose>
                
                <ScrollArea className="flex-1 overflow-y-auto">
                    <SheetHeader className="p-2">
                        <ProfileCard 
                            canFollow={false} 
                            transparent 
                            size="md" 
                            className="w-full max-w-full"
                        />
                    </SheetHeader>

                    {/* Images Section */}
                    <div className="px-4 py-3 my-3">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="size-4 text-muted-foreground" />
                                <h3 className="font-semibold text-sm">Images</h3>
                                <span className="text-xs text-muted-foreground">({mockImages.length})</span>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-xs"
                                onClick={() => setShowAllImages(!showAllImages)}
                            >
                                {showAllImages ? "Show Less" : "View All"}
                                <ChevronRight className={cn(
                                    "size-3 ml-1 transition-transform",
                                    showAllImages && "rotate-90"
                                )} />
                            </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                            {displayedImages.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => openImageViewer(index)}
                                    className="aspect-square rounded-md overflow-hidden bg-muted border border-input cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <ProtectedImage
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        height={200}
                                        width={200}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Mutual Rooms Section */}
                    <div className="px-4 py-3 my-3">
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="size-4 text-muted-foreground" />
                            <h3 className="font-semibold text-sm">Mutual Rooms</h3>
                            <span className="text-xs text-muted-foreground">({mockMutualRooms.length})</span>
                        </div>
                        <div className="space-y-2">
                            {mockMutualRooms.map((room) => (
                                <Button
                                    key={room.id}
                                    variant="ghost"
                                    className="w-full justify-start h-auto py-2 px-3"
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="size-8 rounded-full bg-muted border border-input grid place-items-center shrink-0">
                                            <span className="text-sm font-semibold">{room.icon}</span>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-sm font-medium">{room.name}</p>
                                            <p className="text-xs text-muted-foreground">{room.members} members</p>
                                        </div>
                                        <ChevronRight className="size-4 text-muted-foreground" />
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Actions Section */}
                    <div className="px-4 py-3 space-y-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-orange-600 hover:text-orange-600 hover:bg-orange-600/10 px-3 py-2"
                            onClick={() => setShowClearChatDialog(true)}
                        >
                            <Trash2 className="size-4 mr-2" />
                            Clear Chat History
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-600/10 px-3 py-2"
                            onClick={() => setShowBlockDialog(true)}
                        >
                            <Ban className="size-4 mr-2" />
                            Block User
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>

        {/* Clear Chat Confirmation Dialog */}
        <Dialog open={showClearChatDialog} onOpenChange={setShowClearChatDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Clear Chat History?</DialogTitle>
                    <DialogDescription>
                        This will permanently delete all messages in this conversation. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowClearChatDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleClearChat}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        Clear Chat
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Block User Confirmation Dialog */}
        <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Block @fabiconcept?</DialogTitle>
                    <DialogDescription>
                        Blocked users won't be able to send you messages or see your activity. You can unblock them anytime from settings.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowBlockDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleBlock}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Block User
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Image Viewer Dialog */}
        <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
            <DialogContent
                className="max-w-[98vw] w-full h-[95vh] p-0 bg-transparent border-none shadow-none"
                showCloseButton={false}
            >
                <DialogHeader hidden>
                    <DialogTitle>Image Viewer</DialogTitle>
                </DialogHeader>
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                        onClick={() => setImageViewerOpen(false)}
                    >
                        <XIcon className="size-6" />
                        <span className="sr-only">Close Image viewer</span>
                    </Button>

                    {/* Navigation Buttons */}
                    {mockImages.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 z-50 text-white hover:bg-white/20 rounded-full size-12"
                                onClick={prevImage}
                            >
                                <ChevronLeftIcon className="size-8" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 z-50 text-white hover:bg-white/20 rounded-full size-12"
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
                                src={mockImages[currentImageIndex]}
                                alt={`Image ${currentImageIndex + 1}`}
                                className="w-full h-full object-contain"
                                fill
                            />
                        </div>
                    </div>

                    {/* Image Counter */}
                    {mockImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                            {currentImageIndex + 1} / {mockImages.length}
                        </div>
                    )}

                    {/* Thumbnail Navigation */}
                    {mockImages.length > 1 && (
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2">
                            {mockImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={cn(
                                        "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                                        currentImageIndex === idx
                                            ? "border-white scale-110"
                                            : "border-transparent opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <ProtectedImage
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                        height={100}
                                        width={100}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    </>
    );
}