import { Star } from "lucide-react";
import ProfileAvatar from "../ProfileCard/ProfileAvatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ChatBubble from "./ChatContainer/ChatBubble";
import { MARKDOWN_EXAMPLES } from "@/constants/Messages.const";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

export default function Header() {
    return (
        <div className="flex items-center justify-between gap-5 p-2 px-0">

            <Button
                tabIndex={-1}
                variant="ghost"
                className="px-1 pr-3 py-1 border border-transparent hover:border-input/50 h-fit rounded-full"
            >
                <ProfileAvatar
                    avatarUrl={"https://chirps-chat.sirv.com/parrot.png"}
                    fallback="PL"
                    size="lg"
                />
                <div className="grid text-sm text-start">
                    <span className="font-semibold">Passage Lovers</span>
                    <span className="text-xs dark:text-green-500 text-green-700 lowercase">Online</span>
                </div>
            </Button>

            <Tooltip>
                <Popover>
                    <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Star />
                            </Button>
                        </TooltipTrigger>
                    </PopoverTrigger>
                    <PopoverContent
                        align="end"
                        side="bottom"
                        sideOffset={-5}
                        alignOffset={5}
                        className="w-sm max-h-96 bg-background/50 backdrop-blur-sm overflow-y-auto p-2 rounded-2xl overflow-x-hidden"
                    >
                        {MARKDOWN_EXAMPLES.slice(0, 6).map((message, index) => (
                            <ChatBubble
                                key={index}
                                {...message}
                                type="starred"
                            />
                        ))}
                    </PopoverContent>
                </Popover>
                <TooltipContent>Starred messages</TooltipContent>
            </Tooltip>
        </div >
    )
}
