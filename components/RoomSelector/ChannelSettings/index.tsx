"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { removeSearchParam, updateSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";
import { useMemo, useEffect } from "react";
import { useKeyBoardShortCut } from "@/components/Providers/KeyBoardShortCutProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SETTINGS_TABS, { PERMISSIONS, ROLES } from "@/constants/Settings.const";

export default function ChannelSettings({ userType = ROLES.MEMBER }: { userType?: ROLES }) {
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
            <DialogContent className="sm:max-w-[calc(100%-10em)] h-full sm:max-h-[calc(100%-10em)] flex p-2 rounded-2xl">
                <Tabs defaultValue="room-profile">
                    <TabsList className="w-full flex">
                        {SETTINGS_TABS.filter((tab)=> tab.permission[userType].includes(PERMISSIONS.CAN_VIEW)).map((tab)=> (
                            <TabsTrigger className="flex-1 px-4" key={tab.key} value={tab.key} title={tab.description}>{tab.title}</TabsTrigger>
                        ))}
                    </TabsList>
                    {SETTINGS_TABS.filter((tab)=> tab.permission[userType].includes(PERMISSIONS.CAN_VIEW)).map((tab) => (
                        <TabsContent className="px-4 bg-foreground/5 w-full" key={tab.key} value={tab.key}>
                            <p>{tab.title}</p>
                            <p>{tab.description}</p>
                        </TabsContent>
                    ))}
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}