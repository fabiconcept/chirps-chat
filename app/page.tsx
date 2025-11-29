import Feed from "@/components/Feed";
import ProfileCard from "@/components/ProfileCard";

export default function Page() {
    return (
        <div className="flex flex-row gap-3 items-start flex-wrap w-full">
            <ProfileCard />
            <Feed />
        </div>
    )
}