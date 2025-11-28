import Activities from "@/components/Activities/Index";
import ProfileCard from "@/components/ProfileCard";

export default function Page() {
    return (
        <div className="flex flex-row gap-3 items-start flex-wrap justify-center">
            {/* <div className="flex-1">
                Chirps
            </div> */}
            <ProfileCard size="lg" canFollow={false}/>
            <ProfileCard size="lg" canFollow={false}/>
            <ProfileCard size="lg" canFollow={false}/>
            <ProfileCard size="lg" canFollow={false}/>
            <ProfileCard size="lg" canFollow={false}/>
            <ProfileCard size="lg" canFollow={false}/>
            <ProfileCard size="lg" canFollow={false}/>
            <ProfileCard size="lg" canFollow={false}/>
            <Activities />
        </div>
    )
}