import { getRelativeTime } from "@/lib/utils";

export enum ChatSeperatorType {
    NewMessage,
    Date
}

interface ChatSeperatorPropsNew {
    type: ChatSeperatorType.NewMessage;
}

interface ChatSeperatorPropsTimestamp {
    type: ChatSeperatorType.Date;
    date: string;
}

type ChatSeperatorProps = ChatSeperatorPropsTimestamp | ChatSeperatorPropsNew;

export default function ChatSeperator(props: ChatSeperatorProps) {
    return (
        <div>
            {props.type === ChatSeperatorType.NewMessage && (
                <div className="flex justify-end relative items-center my-3 sm:text-xs text-[12px] sm:font-semibold font-medium text-white px-2">
                    <div className="absolute bg-destructive w-[calc(100%-1rem)] h-px"/>
                    <div className="bg-destructive px-1 rounded-md z-10 relative after:content-[''] after:absolute after:top-1/2 after:-left-2 after:-rotate-90 after:border-l-transparent after:border-r-transparent after:border-b-destructive after:border-l-8 after:scale-x-85 after:border-r-8 after:border-b-8 after:-translate-y-1/2">New</div>
                </div>
            )}
            {props.type === ChatSeperatorType.Date && (
                <div className="flex justify-center items-center my-3 relative">
                    <div className="absolute bg-input w-[calc(100%-1rem)] h-px"/>
                    <span className="sm:text-xs text-[12px] font-medium px-2 py-px bg-background z-10">{getRelativeTime(props.date, true)}</span>
                </div>
            )}
        </div>
    )
}
