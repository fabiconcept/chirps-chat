"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Check, UserPlus, X } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function RoomInvite() {
    const isMobile = useIsMobile();
    return (
        <div className="cursor-pointer hover:bg-foreground/5 border-y border-input/50 p-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Avatar className='h-12 w-12 p-1 bg-background border transition-colors duration-300'>
                        <AvatarImage src="https://chirps-chat.sirv.com/octopus.png" />
                        <AvatarFallback>OC</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-green-500 border-2 border-background">
                        <UserPlus className="w-3 h-3 text-white" />
                    </div>
                </div>
                <div className="leading-2.5">
                    <span className="font-semibold sm:text-sm text-xs">@octopus</span> <span className="sm:text-xs text-[12px]">Invited you to join <span className="font-semibold text-[#7600C9] dark:brightness-150">&quot;Tech Enthusiasts&quot;</span> room</span> <span className="sm:text-xs text-[12px] opacity-75">30 min ago</span>
                </div>
            </div>
            <div className="flex sm:gap-2 gap-1">
                <Button
                    variant="outline"
                    size={isMobile ? "icon-sm" : "sm"}
                    className="sm:hover:bg-destructive/10 hover:text-destructive hover:border-destructive sm:text-sm text-xs"
                >
                    <X className="w-3 h-3" />
                    <span className="max-sm:sr-only">Decline</span>
                </Button>
                <Button
                    size={isMobile ? "icon-sm" : "sm"}
                    className="bg-[#7600C9] hover:bg-[#7600C9]/90 text-white sm:text-sm text-xs"
                >
                    <span className="max-sm:sr-only">Join</span>
                    <Check className="w-3 h-3" />
                </Button>
            </div>
        </div>
    )
}
