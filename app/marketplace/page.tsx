import MarketplaceContent from '@/components/Marketplace/MarketplaceContent';

export default async function MarketplacePage() {
    return (
        <div className="min-h-screen flex flex-row gap-6 items-start flex-wrap w-full">
            <MarketplaceContent />
        </div>
    )
}
