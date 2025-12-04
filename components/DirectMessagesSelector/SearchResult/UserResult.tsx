import ProfileAvatar from "../../ProfileCard/ProfileAvatar";

export default function UserResult() {
    return (
        <>
            <ProfileAvatar
                avatarUrl="https://chirps-chat.sirv.com/fox.png"
                size="xs"
                status="online"
                fallback="FX"
            />
            <div className="flex items-center flex-1 gap-1">
                <span className="text-sm font-medium">Favour Ajokubi</span>
                <span className="text-xs text-muted-foreground">@fabiconcept</span>
            </div>
        </>
    )
}
