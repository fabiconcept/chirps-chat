"use client"
import { notFound, useParams } from "next/navigation";
import { useAuth } from "@/components/Providers/AuthProvider";
import RoomPage from "./components/RoomPage";
import RoomMobilePage from "./components/RoomMobilePage";

export default function Page() {
    const { roomId } = useParams<{ roomId: string }>();
    const { isMobile, isTablet } = useAuth();
    // Validate room ID pattern (must be "@room-" followed by text)
    const isValidPattern = /^@room-.+$/.test(decodeURIComponent(roomId));

    if (!isValidPattern) {
        notFound();
    }

    return (
        <div className="flex flex-row overflow-hidden items-start flex-wrap flex-1 md:h-[calc(100dvh-2.5rem)] sm:h-[calc(100dvh-1.5rem)] h-[calc(100dvh-2rem)]">
            {isMobile || isTablet ? (
                <RoomMobilePage />
            ) : (
                <RoomPage />
            )}
        </div>
    );
}