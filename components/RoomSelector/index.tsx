"use client"

import { Separator } from "../ui/separator";
import RoomDropdown from "./RoomDropdown";
import InviteUserDialog from "./InviteUserDialog";
import ChannelsList from "./ChannelsList";
import { useRef } from "react";

export default function RoomSelector() {
    const inviteDialogRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="border border-input sm:rounded-l-2xl max-[900px]:rounded-2xl bg-foreground/5 overflow-hidden h-full flex flex-col">
            <div className="p-1.5 flex items-center justify-between gap-4">
                <RoomDropdown inviteDialogRef={inviteDialogRef} />
                <InviteUserDialog ref={inviteDialogRef} />
            </div>
            <Separator />
            <ChannelsList inviteDialogRef={inviteDialogRef} />
        </div>
    )
}
