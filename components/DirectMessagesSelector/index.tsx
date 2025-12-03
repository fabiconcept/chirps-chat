import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import UserCard from "./UserCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";

export default function DirectMessagesSelector() {
    return (
        <div className="border border-input rounded-2xl bg-foreground/5 overflow-hidden">
            <div className="p-3">
                <Button
                    variant="outline"
                    className="w-full p-2"
                >
                    Find or start a conversation
                </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between px-3 bg-[#282828] sticky top-0 z-10 py-1">
                <span className="text-sm font-medium">Direct Messages</span>
                <Tooltip delayDuration={500}>
                    <TooltipTrigger>
                        <Button variant="ghost" size="icon">
                            <Plus />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={-10}>
                        <p className="text-xs">New DM</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <ScrollArea className="grid h-fit gap-0.5 max-h-[calc(100dvh-16.25vmax)] overflow-y-auto relative">
                <UserCard
                    url="https://chirps-chat.sirv.com/fox.png"
                    size="lg"
                    name="Guacamolli"
                    message="Great spirits have always encounte..."
                    timestamp="2025-12-03T23:30:00" // 36 minutes ago
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/bat.png"
                    size="lg"
                    name="Flo-Jo"
                    hasUnread
                    unreadCount={3}
                    message="Eighty percent of success is showin..."
                    timestamp="2025-12-03T12:00:00" // 12 hours ago
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/bull.png"
                    size="lg"
                    name="Mattylce"
                    isYou
                    messageStatus="seen"
                    message="Hey!"
                    timestamp="2024-12-03T09:00:00" // 15 hours ago
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/bug.png"
                    size="lg"
                    name="Passage Lovers"
                    message="Guacamolli: Great spirits have alway..."
                    timestamp="2025-12-01T18:00:00" // Friday
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/termite.png"
                    size="lg"
                    name="TheChief"
                    message="Anyways, that's my two cents plan f..."
                    timestamp="2025-12-04T14:00:00" // Monday
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/frog.png"
                    size="lg"
                    name="Butterbean"
                    isTyping
                    timestamp="2024-12-04T00:05:00"
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/guinea-pig.png"
                    size="lg"
                    name="Sarah Chen"
                    isYou
                    messageStatus="delivered"
                    message="Thanks for the update!"
                    timestamp="2022-09-16T10:30:00" // Old message with full date
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/fly.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/octopus.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/fish.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/guinea-pig.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/fly.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/octopus.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/fish.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
            </ScrollArea>
        </div>
    )
}
