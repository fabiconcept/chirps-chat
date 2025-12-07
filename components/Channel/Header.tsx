import { Star, Users } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
    return (
        <div className="flex items-center justify-between gap-5 p-3 px-5 border-b border-input">
            <h3 className="flex gap-1 items-center text-lg">
                <span className="text-muted-foreground">#</span>
                <span className="font-semibold">General</span>
            </h3>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Star />
                </Button>
                <Button variant="ghost" size="icon">
                    <Users />
                </Button>
            </div>
        </div >
    )
}
