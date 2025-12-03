import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import UserCard from "./UserCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
            <div className="grid h-fit gap-0.5 overflow-y-auto">
                <div className="flex items-center justify-between px-3 py-1">
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
                <UserCard
                    url="https://chirps-chat.sirv.com/fox.png"
                    size="lg"
                    name="Favour Ajokubi"
                    hasUnread
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/bat.png"
                    size="lg"
                    name="Favour Ajokubi"
                    hasUnread
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/bull.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/bug.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/termite.png"
                    size="lg"
                    name="Favour Ajokubi"
                    message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima."
                />
                <UserCard
                    url="https://chirps-chat.sirv.com/frog.png"
                    size="lg"
                    name="Favour Ajokubi"
                    hasUnread
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
            </div>
        </div>
    )
}
