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
import { UserPlus, Settings, Plus, Bell, Lock, Edit } from "lucide-react";
import { useCallback, useMemo } from 'react';
import { Button } from '../ui/button';
import { removeSearchParam, updateSearchParam } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";

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
}: {
    owner?: boolean;
}) {
    const searchParams = useSearchParams();
    const isOpen = useMemo(()=> searchParams.get("hide-menu") === "true", [searchParams]);
    const isSettingsOpen = useMemo(()=> searchParams.get("settings") === "true", [searchParams]);
    const isInviteOpen = useMemo(()=> searchParams.get("invite") === "true", [searchParams]);

    const handleHamburgerController = () => {
        if (isOpen) {
            removeSearchParam("hide-menu");
        } else {
            updateSearchParam("hide-menu", "true");
        }
    }

    const handleInviteToggle = useCallback(()=>{
        if (isInviteOpen) {
            removeSearchParam("invite");
        } else {
            updateSearchParam("invite", "true");
        }
    }, [isInviteOpen]);

    const handleSettingsToggle = useCallback(()=>{
        if (isSettingsOpen) {
            removeSearchParam("settings");
        } else {
            updateSearchParam("settings", "true");
        }
    }, [isSettingsOpen]);

    const handleDropMenuAction = useCallback((id: MenuItem["id"]) => {
        switch (id) {
            case "invite":
                handleInviteToggle();
                break;
            case "settings":
                handleSettingsToggle();
                break;
            case "channel":
                break;
            case "notifications":
                break;
            case "privacy":
                break;
            case "profile":
                break;
        }
    }, [handleSettingsToggle, handleInviteToggle]);


    return (
        <div className="flex items-center gap-2">
            <div className="max-[900px]:flex hidden items-center justify-center mt-1.5">
                <Button
                    size="icon-sm"
                    onClick={handleHamburgerController}
                    className="relative"
                >
                    <motion.span
                        className="absolute w-4 h-0.5 bg-current"
                        animate={{
                            rotate: !isOpen ? 45 : 0,
                            y: !isOpen ? 0 : -4,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="absolute w-4 h-0.5 bg-current"
                        animate={{
                            opacity: !isOpen ? 0 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="absolute w-4 h-0.5 bg-current"
                        animate={{
                            rotate: !isOpen ? -45 : 0,
                            y: !isOpen ? 0 : 4,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </Button>
            </div>
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
                                        onClick={() => handleDropMenuAction(item.id)}
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
        </div>
    );
}
