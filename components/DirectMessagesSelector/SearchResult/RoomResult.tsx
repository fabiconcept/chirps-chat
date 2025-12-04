import ProfileAvatar from "../../ProfileCard/ProfileAvatar";

export default function RoomResult() {
    return (
        <>
            <ProfileAvatar
                avatarUrl="https://chirps-chat.sirv.com/octopus.png"
                size="xs"
                fallback="FX"
            />
            <div className="flex items-center flex-1 gap-1">
                <span className="text-sm font-medium">* Octagon Squad</span>
            </div>
        </>
    )
}
