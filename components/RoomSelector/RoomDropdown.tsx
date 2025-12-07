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
import { RefObject } from 'react';

interface MenuItem {
    id: string;
    ownerOnly?: boolean;
    label: string;
    icon: React.ElementType;
}

const menuSections: MenuItem[][] = [
    [
        { id: "invite", ownerOnly: true, label: "Invite to Server", icon: UserPlus },
        { id: "settings", ownerOnly: true, label: "Server Settings", icon: Settings },
        { id: "channel", ownerOnly: true, label: "Create Channel", icon: Plus },
    ],
    [
        { id: "notifications", label: "Notification Settings", icon: Bell },
        { id: "privacy", label: "Privacy Settings", icon: Lock },
    ],
    [
        { id: "profile", label: "Edit Per-server Profile", icon: Edit },
    ],
];

export default function RoomDropdown({
    owner,
    inviteDialogRef,
}: {
    owner?: boolean;
    inviteDialogRef?: RefObject<HTMLButtonElement | null>;
}) {
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
                        {section.map((item) => {
                            if (item.ownerOnly && !owner) return null;
                            return (
                                <DropdownMenuItem 
                                    key={item.id} 
                                    onClick={() => {
                                        if (item.id === "invite") {
                                            inviteDialogRef?.current?.click();
                                        }
                                    }}
                                    className="cursor-pointer flex items-center justify-between px-2 py-2 rounded-sm"
                                >
                                    <span className="text-sm">{item.label}</span>
                                    <item.icon size={18} className="text-muted-foreground" strokeWidth={1.5} />
                                </DropdownMenuItem>
                            );
                        })}
                        {(sectionIndex < menuSections.length - 1) && 
                         section.some(item => !item.ownerOnly || owner) && (
                            <DropdownMenuSeparator className="my-1" />
                        )}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
