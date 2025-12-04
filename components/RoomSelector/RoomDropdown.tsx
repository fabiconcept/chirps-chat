"use client"

import { HugeiconsIcon } from '@hugeicons/react';
import { AngryBirdFreeIcons } from '@hugeicons/core-free-icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const rooms = [
    { id: "1", name: "Explorer Channels", icon: AngryBirdFreeIcons },
    { id: "2", name: "Tech Hub", icon: AngryBirdFreeIcons },
    { id: "3", name: "Design Studio", icon: AngryBirdFreeIcons },
];

export default function RoomDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex w-fit items-center gap-2 border hover:bg-foreground/10 dark:hover:bg-foreground/10 focus:bg-foreground/10 dark:focus:bg-foreground/10 border-transparent hover:border-input py-2 rounded-md active:rotate-0 px-2 cursor-pointer transition-all active:scale-95"
            >
                <HugeiconsIcon
                    icon={AngryBirdFreeIcons}
                    size={22}
                    color="currentColor"
                    strokeWidth={1.5}
                />
                <span className="flex-1 font-semibold text-left truncate">Black Bulls</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                {rooms.map((room) => (
                    <DropdownMenuItem key={room.id} className="cursor-pointer">
                        <HugeiconsIcon
                            icon={room.icon}
                            size={18}
                            color="currentColor"
                            strokeWidth={1.5}
                        />
                        <span>{room.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
