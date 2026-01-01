import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NewComment() {
    return (
        <div className="cursor-pointer hover:bg-foreground/5 border-y border-input/50 p-3 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
                <Avatar className='h-12 w-12 p-2 bg-background border transition-colors duration-300'>
                    <AvatarImage src="/chirps-chat-logo.svg" />
                    <AvatarFallback>Chirps</AvatarFallback>
                </Avatar>
                <div className="leading-2.5">
                    <span className="font-semibold sm:text-sm text-xs">Chirps Rewards</span> <span className="sm:text-xs text-[12px]">🎉 You&rsquo;ve earned <span className="p-1 px-2 rounded-3xl bg-[#FFD700]/10 text-[#FFD700] not-dark:bg-[#FFD700]/20 not-dark:text-[#e3a301]">+100</span> points!</span> <span className="sm:text-xs text-[12px] opacity-75">2 days ago.</span>
                </div>
            </div>
        </div>
    )
}
