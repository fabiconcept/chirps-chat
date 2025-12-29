import WalletHeader from '@/components/WalletPage/WalletHeader';
import WalletContent from '@/components/WalletPage/WalletContent';

export default async function WalletPage() {
    return (
        <div className="min-h-screen w-full">
            <WalletHeader />
            <WalletContent />
        </div>
    )
}

