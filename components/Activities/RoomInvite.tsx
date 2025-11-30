import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";

export default function RoomInvite() {
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
                    <span className="font-semibold text-sm">@octopus</span> <span className="text-xs">Invited you to join <span className="font-semibold text-[#7600C9] dark:brightness-150">&quot;Tech Enthusiasts&quot;</span> room</span> <span className="text-xs opacity-75">30 min ago</span>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive">
                    Decline
                </Button>
                <Button size="sm" className="bg-[#7600C9] hover:bg-[#7600C9]/90 text-white">
                    Join
                </Button>
            </div>
        </div>
    )
}
