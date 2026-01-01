"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function NewFollower() {
    const isMobile = useIsMobile();
    return (
        <div className="cursor-pointer hover:bg-foreground/5 border-y border-input/50 p-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
                <Avatar className='h-12 w-12 p-1 bg-background border transition-colors duration-300'>
                    <AvatarImage src="https://chirps-chat.sirv.com/panda.png" />
                    <AvatarFallback>HK</AvatarFallback>
                </Avatar>
                <div className="leading-2.5">
                    <span className="font-semibold sm:text-sm text-xs">@hello-kitty</span> <span className="sm:text-xs text-[12px]">Started following you.</span> <span className="sm:text-xs text-[12px] opacity-75">2 days ago.</span>
                </div>
            </div>
            <Button variant="outline" size={isMobile ? "icon-sm" : "sm"}>
                <UserPlus className="w-3 h-3" />
                <span className="max-sm:sr-only">Follow back</span>
            </Button>
        </div>
    )
}
