import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Dot } from "lucide-react";

export default function Banner({ bg, name, isSelected, onClick }: { bg: string, name?: string, onClick?: () => void, isSelected?: boolean }) {
    return (
        <button
            className={cn(
                "w-full neumorph ring-4 shadow shadow-foreground group ring-offset-2 overflow-hidden h-20 rounded-lg relative cursor-pointer",
                "after:absolute after:inset-0 after:bg-white/50 hover:after:bg-white/75 hover:after:blur-3xl after:transition-all after:w-44 after:aspect-square after:rounded-full after:blur-2xl after:left-1/2 after:-translate-x-1/2 after:top-32 after:-translate-y-1/2 after:z-0",
            )}
            onClick={onClick}
            style={{ backgroundColor: bg }}
        >
            <div className="absolute top-0 left-0 h-full w-full bg-black/50 mix-blend-darken z-10 opacity-0 group-focus:opacity-100 transition-opacity" />
            <div className={cn(
                "absolute top-2 right-2 z-20 h-5 w-5 border border-background grid place-items-center rounded-full bg-black/50",
                isSelected && "bg-green-500"
            )}>
                <AnimatePresence mode="popLayout">
                    {!isSelected ? (
                        <motion.div
                            key="dot"
                            initial={{ opacity: 0, scale: 0, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0, rotate: -45 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Dot className="w-3 h-3 text-background" strokeWidth={20} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0, rotate: -45 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Check className="w-3 h-3 text-background" strokeWidth={4} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <span className="sr-only">{name}</span>
        </button>
    )
}