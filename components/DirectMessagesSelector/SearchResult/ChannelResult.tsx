import { HashIcon } from "lucide-react";

export default function ChannelResult() {
    return (
        <>
            <HashIcon className="w-4 h-4"/>
            <div className="flex items-center justify-between text-muted-foreground flex-1 gap-1 -ml-1">
                <span className="text-xs font-semibold">Octagon Squad</span>
                <span className="text-sm">Octagon Squad</span>
            </div>
        </>
    )
}
