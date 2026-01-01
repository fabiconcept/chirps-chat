"use client"
import Poll from "./Poll";
import RichText from "../TextPost/RichText";

// Example end date (2 days from now)
const pollEndDate = new Date(new Date().getTime() + 490 * 24 * 60 * 60 * 1000);

export default function PollPost() {
    return (
        <>
            <Poll
                question={(
                    <RichText
                        text="What's your favorite programming language? Let me know! 🚀\n#poll #coding #developers"
                        className="sm:px-6 px-2 my-2"
                        maxLines={2}
                    />
                )}
                options={[
                    { id: "1", text: "JavaScript/TypeScript", votes: 3 },
                    { id: "2", text: "Python", votes: 4 },
                    { id: "3", text: "Go", votes: 3 },
                    { id: "4", text: "Rust", votes: 5 }
                ]}
                endDate={pollEndDate}
                onVote={(optionId) => console.log("Voted for:", optionId)}
            />
        </>
    )
}
