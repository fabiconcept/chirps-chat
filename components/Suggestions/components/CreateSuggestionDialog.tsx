"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
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
import { Lightbulb, Sparkles, TrendingUp, Bug, Palette, Zap, MoreHorizontal } from "lucide-react";
import { SuggestionCategory, CreateSuggestionData } from "../types";
import { motion } from "framer-motion";

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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Lightbulb className="h-6 w-6 text-primary" />
                        Share Your Idea
                    </DialogTitle>
                    <DialogDescription>
                        Help us improve the platform by sharing your suggestions, feature requests, or feedback.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-4">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="title">
                            Title <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="title"
                            placeholder="Brief, descriptive title for your suggestion"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
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
                        <Label htmlFor="category">
                            Category <span className="text-destructive">*</span>
                        </Label>
                        <Select value={category} onValueChange={(value) => setCategory(value as SuggestionCategory)}>
                            <SelectTrigger id="category" className="rounded-3xl bg-linear-to-b from-foreground/10 to-transparent">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="px-1 w-fit space-y-1 rounded-3xl bg-linear-to-t from-foreground/25 to-transparent bg-background/90 backdrop-blur-sm">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <SelectItem key={cat.value} value={cat.value} className="rounded-3xl">
                                            <div className="flex items-center gap-2">
                                                <Icon className="h-4 w-4" />
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
                        <Label htmlFor="description">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your suggestion in detail. What problem does it solve? How would it improve the platform?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-32 resize-none"
                            maxLength={1000}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Minimum 20 characters</span>
                            <span>{description.length}/1000</span>
                        </div>
                    </motion.div>

                    {/* Guidelines */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 rounded-lg bg-muted/50 border border-input"
                    >
                        <p className="text-xs text-muted-foreground">
                            💡 <strong>Tips for great suggestions:</strong>
                        </p>
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                            <li>Be clear and specific about what you're proposing</li>
                            <li>Explain the problem or use case it addresses</li>
                            <li>Check if similar suggestions already exist</li>
                            <li>Be respectful and constructive</li>
                        </ul>
                    </motion.div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!isValid || isSubmitting}
                        className="gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                >
                                    <Lightbulb className="h-4 w-4" />
                                </motion.div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Lightbulb className="h-4 w-4" />
                                Submit Suggestion
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

