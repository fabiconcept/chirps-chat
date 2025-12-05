"use client";

import { useKeyBoardShortCut } from "@/components/Providers/KeyBoardShortCutProvider";
import { InputGroup, InputGroupButton } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function MessageBox() {
    const { disallowShortcuts, allowShortcuts, notoriousShortcuts } = useKeyBoardShortCut();
    return (
        <div className="p-2 bg-background border-x border-input">
            <InputGroup className="w-full">
                <Textarea
                    onFocus={()=> disallowShortcuts([...notoriousShortcuts])}
                    onBlur={()=> allowShortcuts([...notoriousShortcuts])}
                    className="max-h-64 resize-none bg-transparent border-none focus:ring-0 focus:ring-offset-0"
                />
                <InputGroupButton>
                    <Send />
                </InputGroupButton>
            </InputGroup>
        </div>
    )
}