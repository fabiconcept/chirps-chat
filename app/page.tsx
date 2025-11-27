import ProfileCard from "@/components/feed components/ProfileCard";

export default function Page() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <ProfileCard canFollow={false} />
        </div>
    )
}