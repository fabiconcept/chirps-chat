import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

interface NewPurchaseProps {
    variant: "success" | "failed"
}

export default function NewPurchase({ variant }: NewPurchaseProps) {
    const isSuccess = variant === "success";

    return (
        <div className="cursor-pointer hover:bg-foreground/5 border-y border-input/50 p-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
                <Avatar className='h-12 w-12 p-2 bg-background border transition-colors duration-300'>
                    <AvatarImage src="/chirps-chat-logo.svg" />
                    <AvatarFallback>Chirps</AvatarFallback>
                </Avatar>
                <div className="leading-2.5">
                    <span className="font-semibold sm:text-sm text-xs">Chirps Store</span> <span className="sm:text-xs text-[12px]">
                        {isSuccess ? "Purchase successful" : "Purchase failed"}: <span className="font-medium line-clamp-1">&quot;How the H*** did you get this monster to pose like that?&quot;</span>
                    </span> <span className="sm:text-xs text-[12px] opacity-75">2 days ago</span>
                </div>
            </div>
            <div className="sm:rounded-3xl rounded-2xl bg-background overflow-hidden border border-input p-2 relative grid place-items-center">
                <Image
                    src="https://chirps-chat.sirv.com/premium/monster.png"
                    alt="monster"
                    width={50}
                    height={50}
                />
                <div className={`absolute top-0 left-0 h-full w-full backdrop-blur-[2px] ${isSuccess ? 'bg-black/40 opacity-70' : 'bg-black/50 opacity-70'}`} />
                <div className={`absolute p-1 rounded-full aspect-square grid place-items-center ${isSuccess ? 'bg-[#7600C9]' : 'bg-destructive'}`}>
                    {isSuccess ? (
                        <CheckCircle className="text-white sm:h-5 h-4 sm:w-5 w-4" />
                    ) : (
                        <XCircle className="text-white sm:h-5 h-4 sm:w-5 w-4" />
                    )}
                </div>
            </div>
        </div>
    )
}