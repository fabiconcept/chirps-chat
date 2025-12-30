import HangMan from "@/components/HangMan";
import { SuggestionsContainer } from "@/components/Suggestions";
import ProfileCard from "@/components/ProfileCard";

export default function SuggestionsPage() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full max-sm:px-3">
            <HangMan className="top-32 sticky max-[1200px]:hidden">
                <ProfileCard />
            </HangMan>
            <SuggestionsContainer />    
        </div>
    )
}