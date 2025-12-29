"use client";
import * as React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "./drawer";
import { ScrollArea } from "./scroll-area";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useKeyBoardShortCut } from "../Providers/KeyBoardShortCutProvider";

interface ResponsiveModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export function ResponsiveModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    className
}: ResponsiveModalProps) {
    const isMobile = useIsMobile();
    const { allowShortcuts, disallowShortcuts, notoriousShortcuts } = useKeyBoardShortCut();

    useEffect(()=>{
        if (open) {
            disallowShortcuts([...notoriousShortcuts]);
        }

        return () => {
            allowShortcuts([...notoriousShortcuts]);
        };
    }, [open, allowShortcuts, disallowShortcuts, notoriousShortcuts]);

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className={cn(
                    className,
                    "rounded-t-3xl"
                )}>
                    {(title || description) && (
                        <DrawerHeader className="text-left sr-only">
                            {title && <DrawerTitle>{title}</DrawerTitle>}
                            {description && <DrawerDescription>{description}</DrawerDescription>}
                        </DrawerHeader>
                    )}
                    <ScrollArea className="max-h-[70vh] overflow-y-auto">
                        {children}
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className={cn("p-0 rounded-3xl", className)}>
                {(title || description) && (
                    <DialogHeader className="sr-only">
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                )}
                {children}
            </DialogContent>
        </Dialog>
    );
}

