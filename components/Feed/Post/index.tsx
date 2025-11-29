import UserClump from "@/components/modular/UserClump";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { EllipsisVerticalIcon } from "lucide-react";
import TextPost from "../TextPost";
import Interaction from "./Interaction";
import PollPost from "../PollPost";
// import PollPost from "../PollPost/Index";

export default function Post({ type = "text" }: { type?: "text" | "poll" }) {
    return (
        <div className="border border-input bg-foreground/5 rounded-3xl">
            <div className="flex items-center gap-2 px-2 pt-2 pr-4 justify-between">
                <HoverCard openDelay={500}>
                    <HoverCardTrigger>
                        <UserClump
                            name="Favour Ajokubi"
                            username="Posted 2h ago"
                            className="px-2 pr-4"
                            avatar="https://chirps-chat.sirv.com/premium/hello-kitty.png"
                            variant="ghost"
                            size="lg"
                            isVerified={true}
                        />
                    </HoverCardTrigger>
                    <HoverCardContent className="p-0 bg-transparent border-none shadow-none">
                        <ProfileCard size="sm" transparent={false} />
                    </HoverCardContent>
                </HoverCard>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button size={"icon-sm"} variant={"ghost"}>
                            <EllipsisVerticalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="max-w-52">
                        hello
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {type === "text" ? <TextPost /> : <PollPost/>}
            <Interaction />
        </div>
    )
}
