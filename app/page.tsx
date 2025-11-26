import Image from "next/image";

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Image
                src="https://chirps-chat.sirv.com/premium/grinch.png"
                alt="Chirps"
                width={500}
                height={500}
            />
        </div>
    )
}
