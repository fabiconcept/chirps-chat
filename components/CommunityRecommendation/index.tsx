import { cn } from "@/lib/utils";
import { HousePlus } from "lucide-react";
import Community from "./Community";

interface RecommendationProps {
    size?: "sm" | "md" | "lg";
    transparent?: boolean;
}

const sizeConfig = {
    sm: {
        container: "max-w-64",
        banner: "max-h-16",
        avatar: "-mt-6 h-12 w-12",
        rankBadge: "h-6 w-6 p-1",
        avatarPadding: "p-1.5",
        title: "text-sm p-2",
        usernameText: "text-xs",
        bioText: "text-xs",
        sectionPadding: "py-2",
        padding: "p-2"
    },
    md: {
        container: "max-w-80",
        banner: "max-h-24",
        avatar: "-mt-10 h-16 w-16",
        rankBadge: "h-8 w-8 p-1",
        avatarPadding: "p-2",
        title: "text-base p-2",
        usernameText: "text-sm",
        bioText: "text-sm",
        sectionPadding: "py-3",
        padding: "p-3"
    },
    lg: {
        container: "max-w-96",
        banner: "max-h-32",
        avatar: "-mt-12 h-20 w-20",
        rankBadge: "h-10 w-10 p-1",
        avatarPadding: "p-2.5",
        title: "text-lg p-2",
        usernameText: "text-base",
        bioText: "text-base",
        sectionPadding: "py-4",
        padding: "p-4"
    }
};

export default function CommunityRecommendation({ size = "md", transparent = true }: RecommendationProps) {
    const config = sizeConfig[size]

    return (
        <div className={`p-2 w-full ${config.container} rounded-4xl border border-input ${transparent ? "bg-foreground/5" : "bg-background/80 backdrop-blur-md"}`}>
            <h3 
                className={cn("font-semibold max-w-[80%] truncate px-2", config.title)}
            ><HousePlus className="font-light inline w-5 h-5 mr-2" strokeWidth={2} />Rooms Suggestions</h3>
            <div className="flex flex-col gap-2 mt-2">
                <Community 
                    avatar="https://chirps-chat.sirv.com/panda.png"
                    name="Tech Enthusiasts"
                    snippet="Design talk"
                    activeCount={1234}
                    memberCount={45678}
                />
                <Community 
                    avatar="https://chirps-chat.sirv.com/harambe.png"
                    name="Crypto Traders"
                    snippet="Crypto chat"
                    activeCount={892}
                    memberCount={23456}
                />
                <Community 
                    avatar="https://chirps-chat.sirv.com/frog.png"
                    name="Meme Lords"
                    snippet="Memes"
                    activeCount={3421}
                    memberCount={89012}
                />
            </div>
        </div>
    )
}
