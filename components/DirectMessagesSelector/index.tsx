import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function DirectMessagesSelector() {
    return (
        <div className="border border-input min-w-xs rounded-2xl bg-foreground/5">
            <div className="p-3">
                <Button
                    variant="outline"
                    className="w-full p-2"
                >
                    Find or start a conversation
                </Button>
            </div>
            <Separator />
            <div className="p-3">
                
            </div>
        </div>
    )
}
