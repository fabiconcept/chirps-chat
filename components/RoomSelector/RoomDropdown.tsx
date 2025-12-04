"use client"

import { HugeiconsIcon } from '@hugeicons/react';
import { AngryBirdFreeIcons } from '@hugeicons/core-free-icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserPlus, Settings, Plus, Bell, Lock, Edit} from "lucide-react";

interface MenuItem {
    id: string;
    label: string;
    icon: React.ElementType;
}

const menuSections: MenuItem[][] = [
    [
        { id: "invite", label: "Invite to Server", icon: UserPlus },
        { id: "settings", label: "Server Settings", icon: Settings },
        { id: "channel", label: "Create Channel", icon: Plus },
    ],
    [
        { id: "notifications", label: "Notification Settings", icon: Bell },
        { id: "privacy", label: "Privacy Settings", icon: Lock },
    ],
    [
        { id: "profile", label: "Edit Per-server Profile", icon: Edit },
    ],
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
            <DropdownMenuContent align="start" className="w-60 p-2 bg-background/70 backdrop-blur-sm">
                {menuSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        {section.map((item) => (
                            <DropdownMenuItem 
                                key={item.id} 
                                className="cursor-pointer flex items-center justify-between px-2 py-2 rounded-sm"
                            >
                                <span className="text-sm">{item.label}</span>
                                <item.icon size={18} className="text-muted-foreground" strokeWidth={1.5} />
                            </DropdownMenuItem>
                        ))}
                        {sectionIndex < menuSections.length - 1 && (
                            <DropdownMenuSeparator className="my-1" />
                        )}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
