import UserClump from "../modular/UserClump";
import JoinButton from "./JoinButton";

interface CommunityProps {
    avatar: string;
    name: string;
    snippet: string;
    activeCount: number;
    memberCount: number;
    initialJoined?: boolean;
    onJoinChange?: (id: string, isJoined: boolean) => void;
    id: string;
}

export default function Community({
    avatar = "https://chirps-chat.sirv.com/panda.png",
    name = "Tech Enthusiasts",
    snippet = "Design talk",
    initialJoined = false,
    onJoinChange,
    id
}: CommunityProps) {
    return (
        <div className="flex items-center gap-4 p-2 border-dashed border-transparent hover:border-foreground/50 border rounded-2xl hover:bg-foreground/5 transition-colors cursor-pointer group">
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
                <JoinButton 
                    size="sm"
                    initialJoined={initialJoined}
                    onJoinChange={(isJoined) => onJoinChange?.(id, isJoined)}
                />
            </div>
        </div>
    )
}
