"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewFollower from '@/components/Activities/NewFollower';
import NewComment from '@/components/Activities/NewComment';
import PointAwarded from '@/components/Activities/PointAwarded';
import NewPurchase from '@/components/Activities/NewPurchase';
import LikePost from '@/components/Activities/LikePost';
import RepliedComment from '@/components/Activities/RepliedComment';
import LikeComment from '@/components/Activities/LikeComment';
import RoomInvite from '@/components/Activities/RoomInvite';

export default function ActivitiesList() {
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

    return (
        <div className="mt-6">
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
            <div className="h-24"/>
        </div>
    );
}
