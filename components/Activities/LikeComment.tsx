import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";

export default function LikeComment() {
    return (
        <div className="cursor-pointer hover:bg-foreground/5 border-y border-input/50 p-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Avatar className='h-12 w-12 p-1 bg-background border transition-colors duration-300'>
                        <AvatarImage src="https://chirps-chat.sirv.com/frog.png" />
                        <AvatarFallback>FR</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#7600C9] border-2 border-background">
                        <ThumbsUp className="w-3 h-3 text-white fill-white" />
                    </div>
                </div>
                <div className="leading-2.5">
                    <span className="font-semibold text-sm">@frog</span> <span className="text-xs">Liked your comment: <span className="font-medium line-clamp-1">&quot;This is exactly what I was looking for!&quot;</span></span> <span className="text-xs opacity-75">3 hours ago</span>
                </div>
            </div>
            <div className="rounded-2xl bg-background overflow-hidden grow-0 border border-input p-2">
                <Image
                    src="https://chirps-chat.sirv.com/deer.png"
                    alt="post"
                    width={50}
                    height={50}
                />
            </div>
        </div>
    )
}
