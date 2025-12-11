import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Channel from "@/components/Channel";
import RoomSelector from "@/components/RoomSelector";

const cardShuffleVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
    rotateY: direction > 0 ? 15 : -15,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
    rotateY: direction < 0 ? 15 : -15,
    scale: 0.9,
  }),
};

const transition = {
  x: { type: "spring" as const, stiffness: 500, damping: 35, duration: 0.25 },
  opacity: { duration: 0.2 },
  rotateY: { duration: 0.05 },
  scale: { duration: 0.05 },
};

export default function RoomMobilePage() {
  const channel = useSearchParams().get("channel");

  return (
    <AnimatePresence mode="popLayout" initial={false} custom={channel ? 1 : -1}>
      {channel ? (
        <motion.div
          key="channel"
          custom={1}
          variants={cardShuffleVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full h-full"
          style={{ perspective: 1000 }}
        >
          <Channel />
        </motion.div>
      ) : (
        <motion.div
          key="selector"
          custom={-1}
          variants={cardShuffleVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full h-full"
          style={{ perspective: 1000 }}
        >
          <RoomSelector />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
