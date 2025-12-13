import { ChevronLeft, Star, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CHANNEL_CHAT_EXAMPLES } from "@/constants/Messages.const";
import ChatBubble from "../DMs/ChatContainer/ChatBubble";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn, removeSearchParam, updateSearchParam } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { SearchParamKeys } from "@/lib/enums";

export default function Header() {
    const searchParams = useSearchParams();
    const showMembers = searchParams.get(SearchParamKeys.MEMBERS_AREA) === "true";

    const toggleMembers = () => {
        if (showMembers) {
            removeSearchParam(SearchParamKeys.MEMBERS_AREA);
        } else {
            updateSearchParam(SearchParamKeys.MEMBERS_AREA, "true");
        }
    };
    return (
        <div className="flex items-center justify-between gap-5 p-3 md:px-5 px-3 border-b border-input">
            <h3 className="flex gap-1 items-center text-lg">
                <Button 
                    variant="ghost" 
                    size="icon-sm"
                    className="min-[900px]:hidden"
                    onClick={() => removeSearchParam("channel")}
                >
                    <ChevronLeft />
                </Button>
                <span className="text-muted-foreground">#</span>
                <span className="font-semibold">General</span>
            </h3>

            <div className="flex items-center gap-2">
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
                            {CHANNEL_CHAT_EXAMPLES.slice(0, 6).map((message, index) => (
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
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button 
                            variant={!showMembers ? "ghost" : "default"}
                            size="icon"
                            onClick={toggleMembers}
                            className={cn(
                                "transition-colors",
                                showMembers && "bg-[#7600C9] text-white hover:bg-[#7600C9]"
                            )}
                        >
                            <Users />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {showMembers ? <span>Hide members</span> : <span>44 Members</span>}
                    </TooltipContent>
                </Tooltip>
            </div>
        </div >
    )
}
