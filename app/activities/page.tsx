import ActivitiesHeader from '@/components/ActivitiesPage/ActivitiesHeader';
import ActivitiesList from '@/components/ActivitiesPage/ActivitiesList';

export default async function ActivitiesPage() {
    return (
        <div className="min-h-screen">
            <ActivitiesHeader />
            <ActivitiesList />
        </div>
    )
}