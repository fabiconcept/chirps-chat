import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Feed() {
    return (
        <div className="flex-1 w-full mb-16">
            <CreatePost />
            <div className="mt-3 flex flex-col gap-3">
                <Post />
                <Post type="poll" />
                <Post />
            </div>
        </div>
    )
}
