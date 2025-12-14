"use client"
import { useState } from 'react'
import { Collapsible, CollapsibleHeader, CollapsibleContent } from '../ui/custom-collapsable';
import { Badge } from '../ui/badge';
import NewFollower from './NewFollower';
import NewComment from './NewComment';
import PointAwarded from './PointAwarded';
import NewPurchase from './NewPurchase';
import LikePost from './LikePost';
import RepliedComment from './RepliedComment';
import LikeComment from './LikeComment';
import RoomInvite from './RoomInvite';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, removeSearchParam} from '@/lib/utils';
import { useAuth } from '../Providers/AuthProvider';
import { usePathname } from 'next/navigation';

export default function Activities({ type = "component" }: { type?: "page" | "component"}) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { isMobile } = useAuth();
    const [activities] = useState([
        { id: 1, type: 'like-post' as const },
        { id: 2, type: 'replied-comment' as const },
        { id: 3, type: 'like-comment' as const },
        { id: 4, type: 'room-invite' as const },
        { id: 5, type: 'follower' as const },
        { id: 6, type: 'comment' as const },
        { id: 7, type: 'points' as const },
        { id: 8, type: 'purchase-success' as const },
        { id: 9, type: 'purchase-failed' as const },
        { id: 10, type: 'follower' as const },
    ]);

    const renderActivity = (type: string) => {
        switch (type) {
            case 'like-post':
                return <LikePost />;
            case 'replied-comment':
                return <RepliedComment />;
            case 'like-comment':
                return <LikeComment />;
            case 'room-invite':
                return <RoomInvite />;
            case 'follower':
                return <NewFollower />;
            case 'comment':
                return <NewComment />;
            case 'points':
                return <PointAwarded />;
            case 'purchase-success':
                return <NewPurchase variant='success' />;
            case 'purchase-failed':
                return <NewPurchase variant='failed' />;
            default:
                return <NewFollower />;
        }
    };

    if (isMobile) return null;

    return (
        <Collapsible
            defaultOpen={open}
            onOpenChange={(state)=>{
                if (!state) {
                    removeSearchParam("activitybar")
                }
                setOpen(state);
            }}
            fullCollapse={(pathname === "/chat" || pathname.includes("/chat/"))}
            expandedHeight="70vh"
            collapsedHeight="4.25rem"
            className={cn('md:right-10 right-[2%] gap-3 max-w-[96%] mx-auto', type === "component" ? "max-sm:hidden" : "")}
        >
            <CollapsibleHeader
                title="My Activities"
                subtitle={'Recent notifications'}
                className='rounded-t-2xl border-t border-l border-r bg-background/95 backdrop-blur-sm hover:border-foreground/50 active:translate-y-3 transition-all py-3'
                actions={
                    <Badge variant="destructive">
                        20
                    </Badge>
                }
            />

            <CollapsibleContent className="border-r border-l bg-background/95 backdrop-blur-sm mt-2">
                <AnimatePresence mode="popLayout" initial={false}>
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{
                                layout: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 },
                                y: { duration: 0.2 }
                            }}
                        >
                            {renderActivity(activity.type)}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </CollapsibleContent>
        </Collapsible>
    )
}
