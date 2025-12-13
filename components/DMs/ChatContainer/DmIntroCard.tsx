import ProfileAvatar from "@/components/ProfileCard/ProfileAvatar";
import { Button } from "@/components/ui/button";
import { SearchParamKeys } from "@/lib/enums";
import { updateSearchParam } from "@/lib/utils";
import { UserPlus, Settings, Bell } from "lucide-react";

export default function DmIntroCard({
    variant = "dm",
    isOwner = false
}: {
    variant?: "dm" | "channel";
    isOwner?: boolean;
}) {
    const isChannel = variant === "channel";
    
    return (
        <div className="p-4 flex flex-col items-center pt-10">
            {isChannel ? (
                <div className="size-24 rounded-full bg-muted border-2 border-input/25 flex items-center justify-center mb-4">
                    <span className="text-5xl font-medium text-foreground">#</span>
                </div>
            ) : (
                <ProfileAvatar
                    avatarUrl="https://chirps-chat.sirv.com/parrot.png"
                    fallback="PR"
                    size="xl"
                    className="rounded-full border-2 border-input/25 pointer-events-none mb-2"
                />
            )}
            
            {isChannel ? (
                <>
                    <h3 className="text-2xl font-semibold mb-2">Welcome to #🏠 - General!</h3>
                    <p className="text-sm text-muted-foreground mb-6">This is the start of the #🏠 - General channel.</p>
                    
                    {isOwner && (
                        <div className="flex flex-col gap-2 w-full min-[900px]:max-w-md max-w-full px-5 mt-4">
                            <Button 
                                variant="outline" 
                                className="w-full justify-start gap-3"
                                onClick={() => updateSearchParam(SearchParamKeys.INVITE, "true")}
                            >
                                <UserPlus className="size-4" />
                                Invite your friends
                            </Button>
                            <Button 
                                variant="outline" 
                                className="w-full justify-start gap-3"
                            >
                                <Settings className="size-4" />
                                Personalize this channel
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Bell className="size-4" />
                                Set up notifications
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h3 className="text-xl font-semibold">Favour Ajokubi</h3>
                    <p className="text-base font-medium text-muted-foreground cursor-pointer mb-5">@fabiconcept</p>
                    <span className="text-xs">And so begins your conversation with <span className="font-semibold">@fabiconcept</span>…</span>
                </>
            )}
        </div>
    )
}