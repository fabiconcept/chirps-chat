import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EmptyState from "../ui/EmptyState";

export interface SectionItem {
    id: string;
    type: "user" | "room" | "channel";
    name?: string;
    data?: unknown;
}

export interface Section {
    title: string;
    items: SectionItem[];
}

export interface SectionListProps {
    sections: Section[];
    renderItem: (item: SectionItem) => ReactNode;
    emptyMessage?: string;
    isLoading?: boolean;
    error?: string | null;
}

export default function SectionList({ 
    sections, 
    renderItem,
    emptyMessage = "No results found",
    isLoading = false,
    error = null
}: SectionListProps) {
    const hasItems = sections.some(section => section.items.length > 0);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    <span className="text-muted-foreground text-sm">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-destructive text-sm font-medium">Error</span>
                    <span className="text-muted-foreground text-xs max-w-xs">{error}</span>
                </div>
            </div>
        );
    }

    if (!hasItems) {
        return (
            <div className="flex items-center flex-col justify-center py-8 text-muted-foreground text-sm">
                <EmptyState
                    autoPlay
                    onComplete={() => { }}
                    loop
                    style={{
                        animationDuration: "0.5s",
                    }}
                />
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
                {sections.map((section) => {
                    if (section.items.length === 0) return null;
                    
                    return (
                        <motion.div 
                            key={section.title}
                            layout
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                layout: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                y: { duration: 0.2 }
                            }}
                            className="flex flex-col gap-2"
                        >
                            <div className="px-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    {section.title}
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <AnimatePresence mode="popLayout">
                                    {section.items.map((item) => (
                                        <motion.div 
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95, x: -10 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, x: -10 }}
                                            transition={{
                                                layout: { type: "spring", stiffness: 300, damping: 30 },
                                                opacity: { duration: 0.2 },
                                                scale: { duration: 0.2 }
                                            }}
                                        >
                                            {renderItem(item)}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
