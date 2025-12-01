import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import ProtectedImage from "../Feed/TextPost/ProtectedImage";

export default function RepliedComment() {
    return (
        <div className="cursor-pointer hover:bg-foreground/5 border-y border-input/50 p-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Avatar className='h-12 w-12 p-1 bg-background border transition-colors duration-300'>
                        <AvatarImage src="https://chirps-chat.sirv.com/harambe.png" />
                        <AvatarFallback>HR</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-blue-500 border-2 border-background">
                        <MessageSquare className="w-3 h-3 text-white fill-white" />
                    </div>
                </div>
                <div className="leading-2.5">
                    <span className="font-semibold text-sm">@harambe</span> <span className="text-xs">Replied to your comment: <span className="font-medium line-clamp-1">&quot;Thanks! I appreciate your feedback on this.&quot;</span></span> <span className="text-xs opacity-75">1 hour ago</span>
                </div>
            </div>
            <div className="rounded-2xl bg-background overflow-hidden border border-input p-2">
                <ProtectedImage
                    src="https://chirps-chat.sirv.com/leopard.png"
                    alt="post"
                    width={50}
                    height={50}
                />
            </div>
        </div>
    )
}
