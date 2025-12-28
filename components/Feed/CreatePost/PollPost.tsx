"use client";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const PollDuration = [
    {
        id: "1",
        value: 24,
        label: "1 day"
    },
    {
        id: "2",
        value: 72,
        label: "3 days"
    },
    {
        id: "3",
        value: 168,
        label: "1 week"
    },
    {
        id: "4",
        value: 336,
        label: "2 weeks"
    }
]

const PollPost = ({ pollData, onPollChange }: { pollData: { question: string; options: { id: string; option: string; }[] }, onPollChange: (poll: { question: string; options: { id: string; option: string; }[] }) => void }) => {
    const question = pollData.question;
    const options = pollData.options;

    
    const optionsCount = options.length;
    
    const minOptionLength = 2;
    const maxQuestionLength = 256;
    const maxOptionLength = 40;
    const maxOptionsLength = 3;
    
    const handleUpdateOptionValue = (id: string, option: string) => {
        const newOptions = options.map((item) => item.id === id ? { ...item, option: option.slice(0, maxOptionLength) } : item);
        onPollChange({ ...pollData, options: newOptions });
    }

    const handleQuestionChange = (question: string) => {
        onPollChange({ ...pollData, question: question.slice(0, maxQuestionLength) });
    }

    const handleRemoveOption = (id: string) => {
        const newOptions = options.filter((item) => item.id !== id);
        onPollChange({ ...pollData, options: newOptions });
    }

    const handleAddOption = () => {
        if (optionsCount >= maxOptionsLength) return;
        const newOptions = [...options, { id: (options.length + 1).toString(), option: "" }].slice(0, maxOptionsLength);
        onPollChange({ ...pollData, options: newOptions });
    }

    return (
        <div className="px-4 py-4 relative space-y-6">
            {/* Question Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
            >
                <div className="flex items-center justify-between">
                    <Label htmlFor="question" className="text-sm font-semibold">
                        Poll Question
                    </Label>
                    <span className={cn(
                        "text-xs font-medium tabular-nums transition-colors",
                        question.length > maxQuestionLength * 0.9 ? "text-destructive" : "text-muted-foreground"
                    )}>
                        {question.length}/{maxQuestionLength}
                    </span>
                </div>
                <Textarea
                    id="question"
                    placeholder="What would you like to ask?"
                    className="resize-none min-h-28 bg-background/50 border-input/60 focus-visible:ring-primary/20"
                    value={question}
                    maxLength={maxQuestionLength}
                    onChange={(e) => handleQuestionChange(e.target.value)}
                />
            </motion.div>

            {/* Options Section */}
            <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-semibold">
                        Answer Options
                    </Label>
                    <span className="text-xs text-muted-foreground">
                        {optionsCount}/{maxOptionsLength} options
                    </span>
                </div>

                <div className="space-y-2.5">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {options.map((option, index) => (
                            <motion.div
                                key={option.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                transition={{
                                    layout: { type: "spring", stiffness: 350, damping: 35 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 },
                                    y: { duration: 0.2 }
                                }}
                                className="relative group"
                            >
                                <div className={cn(
                                    "p-3 rounded-xl border-2 transition-all",
                                    "bg-background/50 border-input/60",
                                    "hover:border-primary/30 hover:bg-primary/5",
                                    "focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10"
                                )}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                                {index + 1}
                                            </span>
                                            <Label htmlFor={`option-${option.id}`} className="text-sm font-medium">
                                                Option {index + 1}
                                                {(index + 1) <= minOptionLength && <sup className="text-destructive ml-0.5">*</sup>}
                                            </Label>
                                        </div>
                                        {optionsCount > minOptionLength && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveOption(option.id)}
                                                className="h-7 px-2 text-xs hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                    <Input
                                        id={`option-${option.id}`}
                                        type="text"
                                        placeholder={`Enter option ${index + 1}`}
                                        value={option.option}
                                        maxLength={maxOptionLength}
                                        onChange={(e) => handleUpdateOptionValue(option.id, e.target.value)}
                                        className="border-0 bg-transparent focus-visible:ring-0 px-3 h-9"
                                    />
                                    <div className="flex items-center justify-end mt-1">
                                        <span className={cn(
                                            "text-[10px] font-medium tabular-nums transition-colors",
                                            option.option.length > maxOptionLength * 0.9 ? "text-destructive" : "text-muted-foreground"
                                        )}>
                                            {option.option.length}/{maxOptionLength}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {optionsCount < maxOptionsLength && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                transition={{
                                    layout: { type: "spring", stiffness: 350, damping: 35 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 },
                                    y: { duration: 0.2 }
                                }}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    className={cn(
                                        "w-full h-11 gap-2 border-2 border-dashed",
                                        "hover:border-primary/50 hover:bg-primary/5",
                                        "hover:text-primary transition-all"
                                    )}
                                    onClick={handleAddOption}
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="font-medium">Add Option</span>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Duration Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
            >
                <Label htmlFor="duration" className="text-sm font-semibold">
                    Poll Duration
                </Label>
                <Select defaultValue={PollDuration[0].value.toString()}>
                    <SelectTrigger id="duration" className="w-full h-11 bg-background/50 border-input/60 focus:ring-primary/20">
                        <SelectValue placeholder="Select a duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {PollDuration.map((duration) => (
                                <SelectItem 
                                    key={duration.id} 
                                    value={duration.value.toString()}
                                    className="cursor-pointer"
                                >
                                    {duration.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </motion.div>
        </div>
    )
}

export default PollPost;
