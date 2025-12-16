"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { removeSearchParam, updateSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";
import { useMemo, useEffect } from "react";
import { useKeyBoardShortCut } from "@/components/Providers/KeyBoardShortCutProvider";
import SETTINGS_TABS, { PERMISSIONS, ROLES } from "@/constants/Settings.const";
import { CustomTabs } from "./CustomTabs";

export default function RoomSettings({ userType = ROLES.OWNER }: { userType?: ROLES }) {
    const { disallowShortcuts, allowShortcuts, notoriousShortcuts } = useKeyBoardShortCut();
    const searchParams = useSearchParams();
    const isSettingsOpen = useMemo(()=> searchParams.get("settings") === "true", [searchParams]);
    
    useEffect(() => {
        if (isSettingsOpen) {
            disallowShortcuts([...notoriousShortcuts, "alt+F", "commandESC"]);
            allowShortcuts([
                "arrowDown",
                "arrowUp",
                "enter",
            ]);
        } else {
            allowShortcuts([...notoriousShortcuts, "alt+F"]);
            setTimeout(() => {
                allowShortcuts(["commandESC"]);
            }, 100);
            disallowShortcuts([
                "arrowDown",
                "arrowUp",
                "enter",
            ]);
        }
    }, [isSettingsOpen, allowShortcuts, disallowShortcuts, notoriousShortcuts]);

    return (
        <Dialog
            defaultOpen={isSettingsOpen}
            open={isSettingsOpen}
            onOpenChange={(open: boolean) => {
                if (open) {
                    updateSearchParam(SearchParamKeys.SETTINGS, "true");
                } else {
                    removeSearchParam(SearchParamKeys.SETTINGS);
                    allowShortcuts([...notoriousShortcuts, "alt+F"]);
                    setTimeout(() => {
                        allowShortcuts(["commandESC"]);
                    }, 100);
                    disallowShortcuts([
                        "arrowDown",
                        "arrowUp",
                        "enter",
                    ]);
                }
            }}
        >
            <DialogContent className="sm:max-w-[calc(100%-10em)] h-full sm:max-h-[calc(100%-10em)] flex p-0 overflow-hidden rounded-2xl">
                <CustomTabs 
                    className="w-full"
                    defaultTab={SETTINGS_TABS.find(tab => tab.permission[userType].includes(PERMISSIONS.CAN_VIEW))?.key || "room-profile"}
                    tabs={SETTINGS_TABS
                        .filter(tab => tab.permission[userType].includes(PERMISSIONS.CAN_VIEW))
                        .map(tab => ({
                            key: tab.key,
                            title: tab.title,
                            description: tab.description,
                        }))}
                />
            </DialogContent>
        </Dialog>
    )
}