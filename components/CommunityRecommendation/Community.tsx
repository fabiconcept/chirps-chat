import { Button } from "../ui/button";
import UserClump from "../modular/UserClump";

interface CommunityProps {
    avatar: string;
    name: string;
    snippet: string;
    activeCount: number;
    memberCount: number;
}

export default function Community({
    avatar = "https://chirps-chat.sirv.com/panda.png",
    name = "Tech Enthusiasts",
    snippet = "Design talk",
}: CommunityProps) {
    return (
        <div className="flex items-center gap-4 p-2 border-dashed border-transparent hover:border-input border rounded-2xl hover:bg-foreground/5 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between w-full gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                    <UserClump
                        avatar={avatar}
                        name={name}
                        className="p-0"
                        username={snippet}
                        clickable={false}
                        variant="ghost"
                        size="md"
                    />
                </div>
                <Button
                    size="sm"
                    className="shrink-0"
                >
                    Join
                </Button>
            </div>
        </div>
    )
}
