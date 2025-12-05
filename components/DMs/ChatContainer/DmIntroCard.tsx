import ProfileAvatar from "@/components/ProfileCard/ProfileAvatar";

export default function DmIntroCard() {
    return (
        <div className="p-4">
            <ProfileAvatar
                avatarUrl="https://chirps-chat.sirv.com/parrot.png"
                fallback="PR"
                size="xl"
                className="rounded-full border-2 border-input/25 pointer-events-none mb-2"
            />
            <h3 className="text-xl font-semibold">Favour Ajokubi</h3>
            <p className="text-base font-medium text-muted-foreground cursor-pointer mb-5">@fabiconcept</p>
            <span className="text-xs">And so begins your conversation with <span className="font-semibold">@fabiconcept</span>…</span>
        </div>
    )
}