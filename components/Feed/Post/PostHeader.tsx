"use client"
import UserClump from "@/components/modular/UserClump";
import ProfileCard from "@/components/ProfileCard";
import { useAuth } from "@/components/Providers/AuthProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { BookmarkIcon, EllipsisVerticalIcon, FlagIcon, LinkIcon, UserPlusIcon, VolumeXIcon } from "lucide-react";

export default function PostHeader() {
    const { isMobile } = useAuth()
    return (
        <div className="flex items-center gap-2 px-2 pt-2 pr-4 justify-between">
            <HoverCard openDelay={500}>
                <HoverCardTrigger>
                    <UserClump
                        name="Favour Ajokubi"
                        username="Posted 2h ago"
                        className="sm:px-2 px-1 pr-4"
                        avatar="https://chirps-chat.sirv.com/premium/hello-kitty.png"
                        variant="ghost"
                        size={isMobile ? "md" : "lg"}
                        isVerified={true}
                    />
                </HoverCardTrigger>
                <HoverCardContent className="p-0 bg-transparent border-none shadow-none">
                    <ProfileCard size="sm" transparent={false} />
                </HoverCardContent>
            </HoverCard>
            <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-full cursor-pointer">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={-4} alignOffset={4} className="max-w-52 rounded-lg">
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                        <BookmarkIcon className="w-4 h-4" />
                        <span>Save post</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                        <LinkIcon className="w-4 h-4" />
                        <span>Copy link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                        <UserPlusIcon className="w-4 h-4" />
                        <span>Follow @username</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                        <VolumeXIcon className="w-4 h-4" />
                        <span>Mute @username</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
                        <FlagIcon className="w-4 h-4" />
                        <span>Report post</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
