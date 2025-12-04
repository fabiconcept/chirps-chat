import UserResult from "./UserResult";
import RoomResult from "./RoomResult";
import ChannelResult from "./ChannelResult";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SearchResultProps {
    type?: "user" | "room" | "channel"
    selected?: boolean
    onFocus?: () => void
}

const SearchResult = forwardRef<HTMLButtonElement, SearchResultProps>(({
    type = "user",
    selected = false,
    onFocus,
}, ref) => {
    return (
        <button
            ref={ref}
            onFocus={onFocus}
            className={cn(
                "w-full flex items-center gap-2 cursor-pointer hover:bg-foreground/5 focus:bg-foreground/5 px-2 rounded-sm py-2 transition-transition-[transform,translate,scale,rotate,color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to] active:scale-[0.98] duration-200",
                selected && "bg-foreground/10 hover:bg-foreground/10"
            )}
        >
            {type === "user" ? <UserResult /> : type === "room" ? <RoomResult /> : <ChannelResult />}
        </button>
    )
});

SearchResult.displayName = "SearchResult";

export default SearchResult;
