import HangMan from "@/components/HangMan";
import HomeHanger from "@/components/HomeHanger";

export default function MarketplacePage() {
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap w-full">
            <h1 className="flex-1">Marketplace</h1>
            <HangMan className="relative">
                <HomeHanger />
            </HangMan>
        </div>
    )
}
