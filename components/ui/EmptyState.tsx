import animationData from "@/components/lottie/empty-box.json";
import Lottie from "lottie-react";
import { CSSProperties } from "react";

export default function EmptyState({
    autoPlay = true,
    onComplete = () => { },
    loop = true,
    style = {
        animationDuration: "0.5s",
    },
}: {
    autoPlay?: boolean;
    onComplete?: () => void;
    loop?: boolean;
    style?: CSSProperties;
}) {
    return (
        <Lottie
            animationData={animationData}
            autoPlay={autoPlay}
            onComplete={onComplete}
            loop={loop}
            style={style}
        />
    )
}