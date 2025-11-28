"use client";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Plus } from "lucide-react";

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
        <div className="px-3 relative">
            <div className="grid w-full items-center gap-3">
                <Label htmlFor="question">Question</Label>
                <Textarea
                    id="question"
                    placeholder="Question"
                    className="resize-none min-h-28"
                    value={question}
                    maxLength={maxQuestionLength}
                    onChange={(e) => handleQuestionChange(e.target.value)}
                />
                <span className="text-right text-muted-foreground text-xs">{question.length}/{maxQuestionLength}</span>
            </div>
            <div className="flex flex-col gap-y-2 mt-2">
                {options.map((option, index) => (
                    <div className="flex flex-col w-full items-start gap-3" key={option.id}>
                        <div className="flex w-full justify-between items-center">
                            <Label htmlFor="option">Option {index + 1}{(index + 1) <= minOptionLength && <sup className="text-destructive">*</sup>}</Label>
                            {optionsCount > minOptionLength && (
                                <span onClick={() => handleRemoveOption(option.id)} className="hover:text-destructive text-xs cursor-pointer">Remove Option</span>
                            )}
                        </div>
                        <Input
                            id="option"
                            type="text"
                            placeholder="Option"
                            value={option.option}
                            maxLength={maxOptionLength}
                            onChange={(e) => handleUpdateOptionValue(option.id, e.target.value)}
                        />
                        <p className="text-right w-full text-muted-foreground text-xs">{option.option.length}/{maxOptionLength}</p>
                    </div>
                ))}
            </div>
            {optionsCount < maxOptionsLength && <Button
                variant="outline"
                className="px-3 py-2"
                onClick={handleAddOption}
            >
                <Plus />
                <span className="">Add Option</span>
            </Button>}

            <div className="grid w-full items-center gap-3 mt-5">
                <Label htmlFor="question">Question</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default PollPost;
