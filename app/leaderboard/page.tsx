import LeaderboardContent from '@/components/Leaderboard/LeaderboardContent';

export default async function LeaderboardPage() {
    return (
        <div className="min-h-screen flex flex-row gap-6 items-start flex-wrap w-full">
            <LeaderboardContent />
        </div>
    )
}