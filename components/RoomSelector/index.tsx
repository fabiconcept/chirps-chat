"use client"

import { Separator } from "../ui/separator";
import RoomDropdown from "./RoomDropdown";
import InviteUserDialog from "./InviteUserDialog";
import ChannelsList from "./ChannelsList";
import ChannelSettings from "./ChannelSettings";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { updateSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";

export default function RoomSelector() {
    return (
        <div className="border border-input sm:rounded-l-2xl max-[900px]:rounded-2xl bg-foreground/5 overflow-hidden h-full flex flex-col">
            <div className="p-1.5 flex items-center justify-between gap-4">
                <RoomDropdown owner />
                <Tooltip>
                    <TooltipTrigger className="relative" asChild>
                        <div
                            className="size-8 grid place-items-center border hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10 border-transparent hover:border-input py-2 active:rotate-0 px-2 cursor-pointer transition-all active:scale-95 rounded-full"
                            onClick={() => {
                                updateSearchParam(SearchParamKeys.INVITE, "true");
                            }}
                        >
                            <HugeiconsIcon
                                icon={UserAdd01Icon}
                                size={16}
                                color="currentColor"
                                strokeWidth={2}
                            />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent
                        side="bottom"
                        className="text-center backdrop-blur-sm"
                    >
                        <p className="font-semibold text-xs">Invite Friends to Room</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <Separator />
            <ChannelsList owner />
            <InviteUserDialog />
            <ChannelSettings />
        </div>
    )
}
