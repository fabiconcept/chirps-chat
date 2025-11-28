import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

export default function NewFollower() {
    return (
        <div className="cursor-pointer hover:bg-foreground/5 border-y border-input/50 p-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
                <Avatar className='h-12 w-12 p-1 bg-background border transition-colors duration-300'>
                    <AvatarImage src="https://chirps-chat.sirv.com/panda.png" />
                    <AvatarFallback>HK</AvatarFallback>
                </Avatar>
                <div className="leading-2.5">
                    <span className="font-semibold text-sm">@hello-kitty</span> <span className="text-xs">Started following you.</span> <span className="text-xs opacity-75">2 days ago.</span>
                </div>
            </div>
            <Button variant="outline" size="sm">Follow back</Button>
        </div>
    )
}
