import ProfileAvatar from "@/components/ProfileCard/ProfileAvatar";
import ProfileBio from "@/components/ProfileCard/ProfileBio";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SearchParamKeys } from "@/lib/enums";
import { updateSearchParam } from "@/lib/utils";
import { config } from "@/middleware";
import { UserPlus, Settings, Bell } from "lucide-react";

export default function DmIntroCard({
    variant = "dm",
    isOwner = false
}: {
    variant?: "dm" | "channel";
    isOwner?: boolean;
}) {
    const isChannel = variant === "channel";
    const isMobile = useIsMobile();

    return (
        <div className="p-4 flex flex-col items-center pt-10">
            {isChannel ? (
                <div className="size-24 rounded-full bg-muted border-2 border-input/25 flex items-center justify-center mb-4">
                    <span className="text-5xl font-medium text-foreground">#</span>
                </div>
            ) : (
                <ProfileAvatar
                    avatarUrl="https://chirps-chat.sirv.com/premium/rasta.png"
                    fallback="PR"
                    size={"xl"}
                    className="rounded-full border-2 border-input/25 pointer-events-none mb-2"
                />
            )}

            {isChannel ? (
                <>
                    <h3 className="sm:text-2xl text-xl font-semibold mb-2 px-5">Welcome to #🏠 - General!</h3>
                    <p className="sm:text-sm text-xs text-muted-foreground mb-6 px-3">This is the start of the #🏠 - General channel.</p>

                    {isOwner && (
                        <div className="flex flex-col gap-2 w-full min-[900px]:max-w-md max-w-full px-5 mt-4">
                            <Button
                                variant="outline"
                                className="w-full snm:justify-start gap-3 sm:text-sm text-xs"
                                onClick={() => updateSearchParam(SearchParamKeys.INVITE, "true")}
                            >
                                <UserPlus className="size-4" />
                                Invite your friends
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full snm:justify-start gap-3 sm:text-sm text-xs"
                                onClick={() => {
                                    updateSearchParam(SearchParamKeys.CHANNEL_SETTINGS, "true")
                                    updateSearchParam(SearchParamKeys.CHANNEL_NAME, "general")
                                }}
                            >
                                <Settings className="size-4" />
                                Personalize this channel
                            </Button>
                            <Button variant="outline" className="w-full snm:justify-start gap-3 sm:text-sm text-xs" onClick={() => {
                                updateSearchParam(SearchParamKeys.NOTIFICATIONS, "true")
                            }}>
                                <Bell className="size-4" />
                                Set up notifications
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h3 className="sm:text-xl text-lg font-semibold px-5">Favour Ajokubi</h3>
                    <p className="sm:text-base text-sm font-medium text-muted-foreground cursor-pointer mb-5 px-5">@fabiconcept</p>
                    <ProfileBio
                        bio="And so begins your conversation with @fabiconcept"
                        size={"md"}
                        bioTextClass={"text-center text-muted-foreground sm:text-sm text-xs"}
                        sectionPadding={''}
                        padding={''}
                    />
                </>
            )}
        </div>
    )
}