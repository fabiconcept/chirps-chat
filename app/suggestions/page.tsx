import HangMan from "@/components/HangMan";
import HomeHanger from "@/components/HomeHanger";

export default function SuggestionsPage() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full">
            <h1 className="flex-1">Suggestions</h1>
            <HangMan className="relative">
                <HomeHanger />
            </HangMan>
        </div>
    )
}