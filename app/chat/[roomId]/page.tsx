import RoomSelector from "@/components/RoomSelector";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params;
    
    // Validate room ID pattern (must be "room-" followed by text)
    const isValidPattern = /^room-[a-zA-Z0-9]+$/.test(roomId);
    
    if (!isValidPattern) {
        console.log("Invalid room ID pattern", roomId);
        notFound();
    }
    
    return (
        <div className="flex flex-row gap-6 items-start flex-wrap flex-1 h-[calc(100dvh-2.5rem)]">
            <RoomSelector />
        </div>
    )
}