import CreatePost from "./CreatePost";
import TextPost from "./TextPost";

export default function Feed() {
    return (
        <div className="flex-1 max-w-2xl w-full">
            <CreatePost />
            <div className="mt-3 flex flex-col gap-3">
                <TextPost />
                <TextPost />
                <TextPost />
            </div>
        </div>
    )
}
