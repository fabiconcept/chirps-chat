import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import ProtectedImage from "@/components/Feed/TextPost/ProtectedImage";
import Channel from "@/components/Channel";
import RoomSelector from "@/components/RoomSelector";

export default function RoomPage() {
  const channel = useSearchParams().get("channel");
  const { theme } = useTheme();

  return (
    <>
      <RoomSelector />
      {channel ? <Channel /> : (
        <div className="flex-1 bg-background relative h-full grid place-items-center sm:rounded-r-2xl max-[900px]:rounded-2xl border border-input">
          <div className="flex flex-col items-center gap-4">
            <ProtectedImage
              src={theme === 'dark' ? "/chirps-chat-logo-white.svg" : "/chirps-chat-logo.svg"}
              alt="Chirps Logo"
              className='z-20 -mt-1 object-contain opacity-50'
              width={48}
              height={48}
              priority
            />
            <h1 className='opacity-50 text-3xl text-foreground max-sm:hidden -translate-x-2.5 z-10 text-center'>
              Open a <span className="ave">Channel</span> Now!
            </h1>
            <p className='text-sm text-muted-foreground z-10 text-center absolute bottom-10 font-semibold'>
              Connect with your community <span className="text-sm opacity-75">together</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
