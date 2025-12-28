"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { Sparkles, TrendingUp, Bug, Palette, Zap, MoreHorizontal, Send } from "lucide-react";
import { SuggestionCategory } from "../types";
import { cn } from "@/lib/utils";

const categories: { value: SuggestionCategory; label: string; icon: React.ElementType }[] = [
    { value: "feature", label: "Feature", icon: Sparkles },
    { value: "improvement", label: "Improvement", icon: TrendingUp },
    { value: "bug-fix", label: "Bug Fix", icon: Bug },
    { value: "ui-ux", label: "UI/UX", icon: Palette },
    { value: "performance", label: "Performance", icon: Zap },
    { value: "other", label: "Other", icon: MoreHorizontal }
];

export default function QuickSuggestionForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<SuggestionCategory>("feature");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedCategory = categories.find(c => c.value === category);
    const CategoryIcon = selectedCategory?.icon || Sparkles;

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log({
            title,
            description,
            category
        });

        // Reset form
        setTitle("");
        setDescription("");
        setCategory("feature");
        setIsSubmitting(false);
    };

    const charLimit = {
        title: 100,
        description: 500
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[320px] rounded-xl border-2 border-border bg-background overflow-hidden"
        >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-sm">New Suggestion</h3>
            </div>

            {/* Form */}
            <div className="p-4 space-y-3.5">
                {/* Category Select */}
                <div className="space-y-2">
                    <Label htmlFor="category" className="text-xs">Category</Label>
                    <Select value={category} onValueChange={(value: SuggestionCategory) => setCategory(value)}>
                        <SelectTrigger id="category" className="h-9 text-sm">
                            <SelectValue>
                                <div className="flex items-center gap-2">
                                    {CategoryIcon && <CategoryIcon className="h-3.5 w-3.5 text-muted-foreground" />}
                                    <span>{selectedCategory?.label}</span>
                                </div>
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <SelectItem key={cat.value} value={cat.value}>
                                        <div className="flex items-center gap-2">
                                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-sm">{cat.label}</span>
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="title" className="text-xs">Title</Label>
                        <span className="text-[10px] text-muted-foreground">
                            {title.length}/{charLimit.title}
                        </span>
                    </div>
                    <Input
                        id="title"
                        placeholder="Suggestion title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, charLimit.title))}
                        className="h-9 text-sm"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="description" className="text-xs">Description</Label>
                        <span className="text-[10px] text-muted-foreground">
                            {description.length}/{charLimit.description}
                        </span>
                    </div>
                    <Textarea
                        id="description"
                        placeholder="Describe your suggestion..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, charLimit.description))}
                        className="min-h-[120px] text-sm resize-none"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !title.trim() || !description.trim()}
                    className="w-full h-9"
                    size="sm"
                    variant="outline"
                >
                    {isSubmitting ? (
                        <>
                            <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span className="ml-2">Submitting...</span>
                        </>
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </div>
        </motion.div>
    );
}

