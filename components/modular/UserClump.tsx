import BadgeCheckIcon from '../svgs/BadgeIconSvg';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

type UserClumpSize = 'sm' | 'md' | 'lg' | "xs";
type UserClumpVariant = 'default' | 'ghost' | 'outline';

interface UserClumpProps {
    name: string;
    username: string;
    avatar: string;
    size?: UserClumpSize;
    variant?: UserClumpVariant;
    className?: string;
    isVerified?: boolean;
    clickable?: boolean;
}

const sizeClasses = {
    sm: {
        container: 'p-0.5 min-w-36 max-w-52 pr-3 gap-1.5',
        avatar: 'h-8 w-8',
        badge: "h-3 w-3",
        name: 'text-xs',
        username: 'text-[10px]'
    },
    md: {
        container: 'p-1 min-w-44 max-w-64 pr-5 gap-2',
        avatar: 'h-12 w-12',
        badge: "h-4 w-4",
        name: 'text-sm',
        username: 'text-xs'
    },
    lg: {
        container: 'p-1.5 max-w-full w-fit pr-6 gap-2',
        badge: "h-5 w-5",
        avatar: 'h-14 w-14',
        name: 'text-lg',
        username: 'text-sm'
    }
};

const variantClasses = {
    default: 'border hover:bg-gray-200 dark:hover:bg-gray-800',
    ghost: 'border-transparent hover:bg-foreground/5 dark:hover:bg-foreground/5',
    outline: 'border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
};

export default function UserClump({
    name,
    username,
    avatar,
    size = 'md',
    variant = 'default',
    isVerified = false,
    clickable = true,
    className,
}: UserClumpProps) {
    const sizes = size === "xs" ? sizeClasses["md"] : sizeClasses[size];

    return (
        <div className={cn(
            'rounded-full flex items-center transition-all duration-300 active:opacity-90 active:scale-95',
            sizes.container,
            variantClasses[variant],
            clickable ? 'cursor-pointer' : 'cursor-default hover:bg-transparent dark:hover:bg-transparent active:scale-100 active:opacity-100',
            size === "xs" && "w-fit min-w-fit pr-1",
            className
        )}>
            <Avatar className={cn(sizes.avatar, 'p-1 bg-background border transition-colors duration-300')}>
                <AvatarImage src={avatar} />
                <AvatarFallback>{username.charAt(0).toUpperCase() + username.charAt(1).toLowerCase()}</AvatarFallback>
            </Avatar>
            {size !== "xs" && <div className='flex flex-col overflow-hidden'>
                <div className='flex items-center gap-2'>
                    <span className={cn('font-semibold truncate', sizes.name)}>
                        {name}
                    </span>
                    {isVerified && <span className="text-blue-600">
                        <BadgeCheckIcon size={size} />
                    </span>}
                </div>
                <span className={cn('opacity-75 truncate text-left', sizes.username)}>{username}</span>
            </div>}
        </div>
    );
}