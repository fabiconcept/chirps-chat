"use client";
import { useState } from 'react'
import { Collapsible, CollapsibleHeader, CollapsibleContent } from '../ui/custom-collapsable';
import { Badge } from '../ui/badge';
import NewFollower from './NewFollower';
import NewComment from './NewComment';
import PointAwarded from './PointAwarded';
import NewPurchase from './NewPurchase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Activities() {
    const [open, setOpen] = useState(false);
    const [activities] = useState([
        { id: 1, type: 'follower' as const },
        { id: 2, type: 'follower' as const },
        { id: 3, type: 'comment' as const },
        { id: 4, type: 'points' as const },
        { id: 5, type: 'purchase-success' as const },
        { id: 6, type: 'purchase-failed' as const },
        { id: 7, type: 'follower' as const },
        { id: 8, type: 'follower' as const },
    ]);

    const renderActivity = (type: string) => {
        switch (type) {
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

    return (
        <Collapsible
            defaultOpen={open}
            onOpenChange={setOpen}
            expandedHeight="70vh"
            collapsedHeight="4.25rem"
            className='right-10 gap-3'
        >
            <CollapsibleHeader
                title="My Activities"
                subtitle='Recent notifications'
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
