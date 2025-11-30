import TextPost from "../TextPost";
import Interaction from "./Interaction";
import PollPost from "../PollPost";
import PostHeader from "./PostHeader";

export default function Post({ type = "text" }: { type?: "text" | "poll" }) {
    return (
        <div className="border border-input bg-foreground/5 rounded-3xl">
            <PostHeader />
            {type === "text" ? <TextPost /> : <PollPost />}
            <Interaction />
        </div>
    )
}
