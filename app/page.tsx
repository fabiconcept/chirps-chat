import Activities from "@/components/Activities/Index";
import ProfileCard from "@/components/ProfileCard";

export default function Page() {
    return (
        <div className="flex flex-row gap-3 items-start flex-wrap justify-center">
            {/* <div className="flex-1">
                Chirps
            </div> */}
            <ProfileCard canFollow={false}/>
            <ProfileCard canFollow={false}/>
            <ProfileCard canFollow={false}/>
            <ProfileCard canFollow={false}/>
            <ProfileCard canFollow={false}/>
            <ProfileCard canFollow={false}/>
            <ProfileCard canFollow={false}/>
            <ProfileCard canFollow={false}/>
            <Activities />
        </div>
    )
}