import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

type UserClumpSize = 'sm' | 'md' | 'lg';
type UserClumpVariant = 'default' | 'ghost' | 'outline';

interface UserClumpSkeletonProps {
    size?: UserClumpSize;
    variant?: UserClumpVariant;
    className?: string;
}

const sizeClasses = {
    sm: {
        container: 'p-0.5 min-w-36 max-w-52 pr-3 gap-1.5',
        avatar: 'h-8 w-8',
        nameWidth: 'w-20',
        nameHeight: 'h-3',
        usernameWidth: 'w-16',
        usernameHeight: 'h-2.5'
    },
    md: {
        container: 'p-1 min-w-44 max-w-64 pr-5 gap-2',
        avatar: 'h-12 w-12',
        nameWidth: 'w-24',
        nameHeight: 'h-4',
        usernameWidth: 'w-20',
        usernameHeight: 'h-3'
    },
    lg: {
        container: 'p-1.5 max-w-full w-fit pr-6 gap-2',
        avatar: 'h-14 w-14',
        nameWidth: 'w-32',
        nameHeight: 'h-5',
        usernameWidth: 'w-24',
        usernameHeight: 'h-3.5'
    }
};

const variantClasses = {
    default: 'border hover:bg-gray-200 dark:hover:bg-gray-800',
    ghost: 'border-transparent hover:bg-foreground/5 dark:hover:bg-foreground/5',
    outline: 'border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
};

export default function UserClumpSkeleton({
    size = 'md',
    variant = 'default',
    className,
}: UserClumpSkeletonProps) {
    const sizes = sizeClasses[size];

    return (
        <div className={cn(
            'rounded-full flex items-center transition-all duration-300',
            sizes.container,
            variantClasses[variant],
            className
        )}>
            {/* Avatar skeleton */}
            <Skeleton className={cn(sizes.avatar, 'rounded-full')} />
            
            {/* Text content skeleton */}
            <div className='flex flex-col overflow-hidden gap-1'>
                {/* Name skeleton */}
                <Skeleton className={cn(sizes.nameHeight, sizes.nameWidth)} />
                {/* Username skeleton */}
                <Skeleton className={cn(sizes.usernameHeight, sizes.usernameWidth)} />
            </div>
        </div>
    );
}
