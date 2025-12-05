import { Star } from "lucide-react";
import ProfileAvatar from "../ProfileCard/ProfileAvatar";
import { Button } from "../ui/button";

export default function Header() {
    return (
        <div className="flex items-center justify-between gap-5 p-2 px-0">

            <Button
                tabIndex={-1}
                variant="ghost"
                className="px-1 pr-3 py-1 border border-transparent hover:border-input/50 h-fit rounded-full"
            >
                <ProfileAvatar
                    avatarUrl={"https://chirps-chat.sirv.com/parrot.png"}
                    fallback="PL"
                    size="lg"
                />
                <div className="grid text-sm text-start">
                    <span className="font-semibold">Passage Lovers</span>
                    <span className="text-xs text-muted-foreground">Online</span>
                </div>
            </Button>

            <Button variant="ghost" size="icon">
                <Star />
            </Button>
        </div >
    )
}
