"use client"
import { FolderOpenIcon, FolderOpenIconHandle } from "@/components/FolderOpenIcon";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn, updateSearchParam } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { initialUsers } from "@/constants/User.const";


export default function DirectMessages() {
    const searchParams = useSearchParams();
    const animRef = useRef<FolderOpenIconHandle>(null);
    const chatParam = searchParams.get('chat');
    
    // Check if chatParam is a valid user
    const allUsers = [...initialUsers, ...initialUsers.map((user, id) => ({ ...user, name: `${user.name} ${id} ru` }))];
    const isValidUser = chatParam && chatParam !== 'direct-messages' && allUsers.some(user => user.name === chatParam);
    
    // Selected if no param, 'direct-messages', or invalid user (fallback)
    const selected = !chatParam || chatParam === 'direct-messages' || !isValidUser;
    
    // Auto-correct invalid params to direct-messages
    useEffect(() => {
        if (chatParam && chatParam !== 'direct-messages' && !isValidUser) {
            updateSearchParam('chat', 'direct-messages');
        }
    }, [chatParam, isValidUser]);

    const handleMouseEnter = () => {
        if (!animRef.current) return;
        animRef.current.startAnimation();
    };

    const handleMouseLeave = () => {
        if (!animRef.current) return;
        animRef.current.stopAnimation();
    };

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div 
                    className="shadow-lg aspect-square shadow-foreground/5 rounded-full border border-input grid place-items-center overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => updateSearchParam('chat', 'direct-messages')}
                >
                    <div className={cn("w-14 h-14 border border-input p-2 rounded-full hover:border-ring cursor-pointer transition-all duration-300 active:scale-95 grid place-items-center hover:bg-[#7600C9] bg-[#7600C9]/5  hover:text-white", {
                        "bg-[#7600C9] text-white": selected,
                    })}
                    >
                        <FolderOpenIcon ref={animRef} size={24} color="#fff" />
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent
                side="right"
                align="start"
                sideOffset={15}
                className="w-fit mt-2 p-4 relative bg-background/90 rounded-2xl border border-input backdrop-blur-sm overflow-visible"
            >
                <>
                    <div className={"absolute -left-3 top-[30%] w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-r-12 border-r-border"} />
                    {/* Arrow pointer - inner fill */}
                    <div className="absolute -left-[10px] top-[30%] w-0 h-0 border-t-12 border-t-transparent border-b-12 border-b-transparent border-r-12 border-r-background" />
                </>

                <span>Direct Message</span>
            </HoverCardContent>
        </HoverCard>
    )
}