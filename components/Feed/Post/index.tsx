import TextPost from "../TextPost";
import Interaction from "./Interaction";
import PollPost from "../PollPost";
import PostHeader from "./PostHeader";
import PostHeaderSkeleton from "./PostHeaderSkeleton";
import TextPostSkeleton from "../TextPost/TextPostSkeleton";
import PollPostSkeleton from "../PollPost/PollPostSkeleton";
import InteractionSkeleton from "./InteractionSkeleton";
// import PollPost from "../PollPost/Index";

export default function Post({ type = "text" }: { type?: "text" | "poll" }) {
    return (
        <div className="border border-input bg-foreground/5 rounded-3xl">
            <PostHeaderSkeleton />
            {type === "text" ? <TextPostSkeleton /> : <PollPostSkeleton />}
            <InteractionSkeleton />
        </div>
    )
}
