"use client"
import Poll from "./Poll";
import RichText from "../TextPost/RichText";

// Example end date (2 days from now)
const pollEndDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);

export default function PollPost() {
    return (
        <>
            <RichText
                text="What's your favorite programming language? Let me know! 🚀\n#poll #coding #developers"
                className="px-6 my-2"
                maxLines={2}
            />

            <Poll
                question="Which programming language do you prefer for web development?"
                options={[
                    { id: "1", text: "JavaScript/TypeScript", votes: 45230 },
                    { id: "2", text: "Python", votes: 28940 },
                    { id: "3", text: "Go", votes: 15670 },
                    { id: "4", text: "Rust", votes: 12450 }
                ]}
                endDate={pollEndDate}
                onVote={(optionId) => console.log("Voted for:", optionId)}
            />
        </>
    )
}
