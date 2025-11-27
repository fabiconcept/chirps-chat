import React from 'react';
import Image from 'next/image';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type RankKey =
    | 'private'
    | 'corporal'
    | 'sergeant'
    | 'staff-sergeant'
    | 'master-sergeant'
    | 'first-sergeant'
    | 'sergeant-major'
    | 'command-sergeant-major'
    | 'sergeant-major-of-army'
    | 'lieutenant'
    | 'captain'
    | 'major'
    | 'colonel'
    | 'general';

type RankSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RankVariant = 'default' | 'muted';

interface RankData {
    name: string;
    abbreviation: string;
    image: string;
    description: string;
}

interface RankBadgeProps {
    rank?: RankKey;
    size?: RankSize;
    variant?: RankVariant;
    earnedDate?: string;
    showHover?: boolean;
    className?: string;
}

const RANKS: Record<RankKey, RankData> = {
    private: {
        name: 'Private',
        abbreviation: 'PVT',
        image: 'https://chirps-chat.sirv.com/ranks/private-pv2.png',
        description: 'New member of the community.',
    },
    corporal: {
        name: 'Corporal',
        abbreviation: 'CPL',
        image: 'https://chirps-chat.sirv.com/ranks/corporal-cpl.png',
        description: 'Active contributor showing promise.',
    },
    sergeant: {
        name: 'Sergeant',
        abbreviation: 'SGT',
        image: 'https://chirps-chat.sirv.com/ranks/sergeant-sgt.png',
        description: 'Experienced member with consistent contributions.',
    },
    'staff-sergeant': {
        name: 'Staff Sergeant',
        abbreviation: 'SSG',
        image: 'https://chirps-chat.sirv.com/ranks/staff-sergeant-ssg.png',
        description: 'Dedicated member with significant impact.',
    },
    'master-sergeant': {
        name: 'Master Sergeant',
        abbreviation: 'MSG',
        image: 'https://chirps-chat.sirv.com/ranks/master-sergeant-msg.png',
        description: 'Expert contributor with mastery in their field.',
    },
    'first-sergeant': {
        name: 'First Sergeant',
        abbreviation: '1SG',
        image: 'https://chirps-chat.sirv.com/ranks/first-sergeant-1sg.png',
        description: 'Leader who helps guide other members.',
    },
    'sergeant-major': {
        name: 'Sergeant Major',
        abbreviation: 'SGM',
        image: 'https://chirps-chat.sirv.com/ranks/sergeant-major-sgt.png',
        description: 'Highly respected veteran of the community.',
    },
    'command-sergeant-major': {
        name: 'Command Sergeant Major',
        abbreviation: 'CSM',
        image: 'https://chirps-chat.sirv.com/ranks/command-sergeant-major-csm.png',
        description: 'Elite member with exceptional contributions.',
    },
    'sergeant-major-of-army': {
        name: 'Sergeant Major of Army',
        abbreviation: 'SMA',
        image: 'https://chirps-chat.sirv.com/ranks/sergeant-major-of-army-sma.png',
        description: 'Legendary contributor at the pinnacle of achievement.',
    },
    lieutenant: {
        name: 'Lieutenant',
        abbreviation: 'LT',
        image: 'https://chirps-chat.sirv.com/ranks/lieutenant-of-the-canadian-navy.png',
        description: 'Officer showing leadership potential.',
    },
    captain: {
        name: 'Captain',
        abbreviation: 'CPT',
        image: 'https://chirps-chat.sirv.com/ranks/captain-of-the-canadian-navy.png',
        description: 'Proven leader with command experience.',
    },
    major: {
        name: 'Major',
        abbreviation: 'MAJ',
        image: 'https://chirps-chat.sirv.com/ranks/rear-admiral-of-the-canadian-navy.png',
        description: 'Senior officer with strategic influence.',
    },
    colonel: {
        name: 'Colonel',
        abbreviation: 'COL',
        image: 'https://chirps-chat.sirv.com/ranks/commodore-of-the-canadian-navy.png',
        description: 'Distinguished leader shaping community direction.',
    },
    general: {
        name: 'General',
        abbreviation: 'GEN',
        image: 'https://chirps-chat.sirv.com/ranks/admiral-of-the-canadian-navy.png',
        description: 'Supreme commander with unmatched expertise.',
    },
};

const SIZE_CONFIG: Record<RankSize, { dimension: number; className: string }> = {
    xs: { dimension: 12, className: 'h-3 w-3' },
    sm: { dimension: 16, className: 'h-4 w-4' },
    md: { dimension: 24, className: 'h-6 w-6' },
    lg: { dimension: 32, className: 'h-8 w-8' },
    xl: { dimension: 40, className: 'h-10 w-10' },
};

export default function RankBadge({
    rank = 'sergeant-major-of-army',
    size = 'sm',
    variant = 'default',
    earnedDate = 'November 27, 2025',
    showHover = true,
    className = '',
}: RankBadgeProps) {
    const rankData = RANKS[rank] || RANKS['private'];
    const sizeConfig = SIZE_CONFIG[size];

    const badgeImage = (
        <Image
            src={rankData.image}
            alt={rankData.name}
            width={sizeConfig.dimension}
            height={sizeConfig.dimension}
            className={`object-contain ${sizeConfig.className} ${variant === 'muted' ? 'opacity-60' : ''
                } ${showHover ? 'cursor-help' : ''} ${className}`}
        />
    );

    if (!showHover) {
        return badgeImage;
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="inline-block">{badgeImage}</div>
            </HoverCardTrigger>
            <HoverCardContent className="w-72 bg-background/70 relative border border-input rounded-lg p-2 overflow-hidden">
                <div className="absolute filter-ios top-0 left-0 w-full h-full z-[-1]"></div>
                <div className="flex justify-between gap-4">
                    <Avatar>
                        <AvatarImage src={rankData.image} />
                        <AvatarFallback>{rankData.abbreviation}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{rankData.name}</h4>
                        <p className="text-sm">{rankData.description}</p>
                        <div className="text-muted-foreground text-xs">
                            Earned {earnedDate}
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}