import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function NewComment() {
    return (
        <div className="cursor-pointer hover:bg-foreground/5 border-y border-input/50 p-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
                <Avatar className='h-12 w-12 p-1 bg-background border transition-colors duration-300'>
                    <AvatarImage src="https://chirps-chat.sirv.com/premium/god.png" />
                    <AvatarFallback>God</AvatarFallback>
                </Avatar>
                <div className="leading-2.5">
                    <span className="font-semibold text-sm">@hello-kitty</span> <span className="text-xs">Commented: <span className="font-medium line-clamp-1">&quot;How the H*** did you get this monster to pose like that lorem?&quot;</span></span> <span className="text-xs opacity-75">2 days ago.</span>
                </div>
            </div>
            <div className="rounded-2xl bg-background overflow-hidden border border-input p-2 shrink-0">
                <Image
                    src="https://chirps-chat.sirv.com/premium/monster.png"
                    alt="monster"
                    width={50}
                    height={50}
                />
            </div>
        </div>
    )
}
