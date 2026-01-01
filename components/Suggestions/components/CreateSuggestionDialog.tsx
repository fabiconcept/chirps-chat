"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Lightbulb, Sparkles, TrendingUp, Bug, Palette, Zap, MoreHorizontal, Loader2, CheckCircle } from "lucide-react";
import { SuggestionCategory, CreateSuggestionData } from "../types";
import { motion } from "framer-motion";
import { ResponsiveModal } from "@/components/ui/responsive-modal";

interface CreateSuggestionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CreateSuggestionData) => void;
}

const categories: { value: SuggestionCategory; label: string; icon: React.ElementType }[] = [
    { value: "feature", label: "Feature Request", icon: Sparkles },
    { value: "improvement", label: "Improvement", icon: TrendingUp },
    { value: "bug-fix", label: "Bug Fix", icon: Bug },
    { value: "ui-ux", label: "UI/UX Enhancement", icon: Palette },
    { value: "performance", label: "Performance", icon: Zap },
    { value: "other", label: "Other", icon: MoreHorizontal }
];

export default function CreateSuggestionDialog({ open, onOpenChange, onSubmit }: CreateSuggestionDialogProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<SuggestionCategory>("feature");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) return;

        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        onSubmit({ title, description, category });
        
        // Reset form
        setTitle("");
        setDescription("");
        setCategory("feature");
        setIsSubmitting(false);
        onOpenChange(false);
    };

    const isValid = title.trim().length >= 10 && description.trim().length >= 20;

    return (
        <ResponsiveModal 
            open={open} 
            onOpenChange={onOpenChange}
            title="Share Your Idea"
            description="Help us improve the platform by sharing your suggestions, feature requests, or feedback."
        >
            <div className="sm:max-w-[600px]">
                <div className="px-6 pt-6 pb-4 border-b border-border bg-linear-to-br from-[#D4AF37]/5 max-sm:from-transparent to-transparent">
                    <h3 className="flex items-center gap-2 sm:text-xl text-lg font-semibold">
                        <Lightbulb className="sm:h-6 h-5 sm:w-6 w-5 text-primary" />
                        Share Your Idea
                    </h3>
                    <p className="sm:text-sm text-xs text-muted-foreground">
                        Help us improve the platform by sharing your suggestions, feature requests, or feedback.
                    </p>
                </div>

                <div className="space-y-5 py-4 sm:px-6 px-4">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="title" className="sm:text-sm text-[12px]">
                            Title <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="title"
                            placeholder="Brief, descriptive title for your suggestion"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="sm:text-base text-xs"
                            maxLength={100}
                        />
                        <div className="flex justify-between sm:text-xs text-[10px] text-muted-foreground">
                            <span>Minimum 10 characters</span>
                            <span>{title.length}/100</span>
                        </div>
                    </motion.div>

                    {/* Category */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="category" className="sm:text-sm text-[12px]">
                            Category <span className="text-destructive">*</span>
                        </Label>
                        <Select value={category} onValueChange={(value) => setCategory(value as SuggestionCategory)}>
                            <SelectTrigger id="category" className="rounded-3xl bg-linear-to-b from-foreground/10 to-transparent sm:text-base text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="px-1 w-fit space-y-1 rounded-3xl bg-linear-to-t from-foreground/25 to-transparent bg-background/90 backdrop-blur-sm">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <SelectItem key={cat.value} value={cat.value} className="rounded-3xl">
                                            <div className="flex items-center gap-2 sm:text-base text-xs">
                                                <Icon className="sm:h-4 h-3 sm:w-4 w-3" />
                                                {cat.label}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="description" className="sm:text-sm text-[12px]">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your suggestion in detail. What problem does it solve? How would it improve the platform?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-32 resize-none sm:text-base text-xs"
                            maxLength={1000}
                        />
                        <div className="flex justify-between sm:text-xs text-[10px] text-muted-foreground">
                            <span>Minimum 20 characters</span>
                            <span>{description.length}/1000</span>
                        </div>
                    </motion.div>

                    {/* Guidelines */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 rounded-lg bg-muted/50 border border-input sm:text-base text-xs"
                    >
                        <p className="sm:text-xs text-[10px] text-muted-foreground">
                            💡 <strong>Tips for great suggestions:</strong>
                        </p>
                        <ul className="sm:text-xs text-[10px] text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                            <li>Be clear and specific about what you're proposing</li>
                            <li>Explain the problem or use case it addresses</li>
                            <li>Check if similar suggestions already exist</li>
                            <li>Be respectful and constructive</li>
                        </ul>
                    </motion.div>
                </div>

                <div className="sm:px-6 px-4 sm:py-4 py-3 flex items-center sm:justify-end justify-center gap-2 border-t border-border">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                        className="sm:text-base text-xs max-sm:py-1 max-sm:flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!isValid || isSubmitting}
                        className="gap-2 sm:text-base text-xs max-sm:py-1 max-sm:flex-1"
                    >
                        {isSubmitting ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                >
                                    <Loader2 className="sm:h-4 h-3 sm:w-4 w-3 animate-spin" />
                                </motion.div>
                                <span className="sm:text-base text-xs max-sm:sr-only">Submitting...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle className="sm:h-4 h-3 sm:w-4 w-3" />
                                <span className="sm:text-base text-xs">Submit <span className="max-sm:sr-only">Suggestion</span></span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </ResponsiveModal>
    );
}

