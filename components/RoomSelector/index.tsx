import { Separator } from "../ui/separator";
import RoomDropdown from "./RoomDropdown";
import InviteUserDialog from "./InviteUserDialog";
import ChannelsList from "./ChannelsList";

export default function RoomSelector() {
    return (
        <div className="border border-input rounded-2xl bg-foreground/5 overflow-hidden h-full flex flex-col">
            <div className="p-1.5 flex items-center justify-between gap-4">
                <RoomDropdown />
                <InviteUserDialog />
            </div>
            <Separator />
            <ChannelsList />
        </div>
    )
}
