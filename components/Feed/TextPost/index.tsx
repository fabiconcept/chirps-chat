import ImageGallery from "./ImageGallery";
import RichText from "./RichText";

export default function TextPost() {
    return (
        <>
            <RichText
                text="Excited to join the platform! 🚀\nLooking forward to connecting with everyone and sharing great moments. #firstpost #hello #community"
                className="sm:px-6 px-3 my-2"
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
                className="sm:px-4 px-2 mt-3"
            />
        </>
    )
}
