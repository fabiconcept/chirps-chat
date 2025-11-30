import ImageGallery from "./ImageGallery";
import RichText from "./RichText";

export default function TextPost() {
    return (
        <>
            <RichText
                text="Lorem ipsum dolor 💀 sit amet, #consectetur adipisicing elit. Voluptatum, blanditiis asperiores? Voluptates iure explicabo enim ratione aliquam fugiat molestias non?\n#firstpost #fyp #newcomer #goodbyeheadache #sicko #gnx"
                className="px-6 my-2"
                maxLines={1}
            />

            {/* Example usage with different image counts */}
            <ImageGallery
                images={[
                    // "https://chirps-chat.sirv.com/cache/1746031767255-u4hezhrq.jpg",
                    // "https://chirps-chat.sirv.com/cache/bg.jpg",
                    "https://chirps-chat.sirv.com/tiger.png",
                    "https://chirps-chat.sirv.com/deer.png",
                    "https://chirps-chat.sirv.com/leopard.png",
                    // "https://chirps-chat.sirv.com/.png",
                ]}
                className="px-4 mt-3"
            />
        </>
    )
}
