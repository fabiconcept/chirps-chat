import UserClump from "@/components/modular/UserClump";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { EllipsisVerticalIcon } from "lucide-react";
import ImageGallery from "./ImageGallery";
import RichText from "./RichText";

export default function TextPost() {
    return (
        <div className="border border-input bg-foreground/5 rounded-3xl p-2 pb-4">
            <div className="flex items-center gap-2 justify-between">
                <HoverCard openDelay={500}>
                    <HoverCardTrigger>
                        <UserClump
                            name="Favour Ajokubi"
                            username="Posted 2h ago"
                            className="px-2 pr-4"
                            avatar="https://chirps-chat.sirv.com/premium/hello-kitty.png"
                            variant="ghost"
                            size="lg"
                            isVerified={true}
                        />
                    </HoverCardTrigger>
                    <HoverCardContent className="p-0 bg-transparent border-none shadow-none">
                        <ProfileCard size="sm" transparent={false} />
                    </HoverCardContent>
                </HoverCard>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button size={"icon-sm"} variant={"ghost"}>
                            <EllipsisVerticalIcon/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="max-w-52">
                        hello
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <RichText 
                text="Lorem ipsum dolor sit amet, #consectetur adipisicing elit. Voluptatum, blanditiis asperiores? Voluptates iure explicabo enim ratione aliquam fugiat molestias non?\n\n#firstpost #fyp #newcomer #goodbyeheadache #sicko #gnx"
                className="px-5 my-2"
                maxLines={1}
            />

            {/* Example usage with different image counts */}
            <ImageGallery 
                images={[
                    "https://chirps-chat.sirv.com/cache/bg.jpg",
                    // "https://chirps-chat.sirv.com/premium/hello-kitty.png",
                    // "https://chirps-chat.sirv.com/bull.png",
                    "https://chirps-chat.sirv.com/deer.png",
                    // "https://chirps-chat.sirv.com/dog.png",
                ]}
                className="px-2 mt-3"
            />
        </div>
    )
}
