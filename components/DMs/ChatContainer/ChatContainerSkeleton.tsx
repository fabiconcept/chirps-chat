"use client";

import ChatBubbleSkeleton from "./ChatBubbleSkeleton";
import ChatSeperatorSkeleton from "./ChatSeperatorSkeleton";
import DmIntroCardSkeleton from "./DmIntroCardSkeleton";
import TypingIndicatorSkeleton from "./TypingIndicatorSkeleton";

interface ChatContainerSkeletonProps {
    messageCount?: number;
}

export default function ChatContainerSkeleton({ messageCount = 5 }: ChatContainerSkeletonProps) {
    return (
        <div className="flex-1 bg-background rounded-t-3xl relative overflow-y-auto border border-b-0 border-input">
            <div className="no-scrollbar flex flex-col justify-end">
                {/* DM Intro Card Skeleton */}
                <DmIntroCardSkeleton />

                {/* Date Separator Skeleton */}
                <ChatSeperatorSkeleton type="date" />

                {/* Message Skeletons */}
                {Array.from({ length: messageCount }).map((_, index) => (
                    <div key={index}>
                        {/* Randomly add reply skeleton to some messages */}
                        <ChatBubbleSkeleton hasReply={index % 3 === 0} />
                    </div>
                ))}

                {/* New Message Separator Skeleton */}
                <ChatSeperatorSkeleton type="newMessage" />

                {/* More Message Skeletons */}
                <ChatBubbleSkeleton />
                <ChatBubbleSkeleton hasReply />

                {/* Typing Indicator Skeleton */}
                <TypingIndicatorSkeleton />
            </div>
        </div>
    );
}
