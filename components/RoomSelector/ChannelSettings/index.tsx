"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { removeSearchParam, updateSearchParam } from "@/lib/utils";
import { SearchParamKeys } from "@/lib/enums";
import { useMemo, useEffect } from "react";
import { useKeyBoardShortCut } from "@/components/Providers/KeyBoardShortCutProvider";

export default function ChannelSettings() {
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
            <DialogContent className="sm:max-w-[calc(100%-10em)] h-full sm:max-h-[calc(100%-10em)]">
                <DialogHeader>
                    <DialogTitle>Channel Settings</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}