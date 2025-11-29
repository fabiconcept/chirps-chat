export default function Hashtag({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-medium cursor-pointer hover:bg-input/50 transition-colors px-1 rounded-3xl text-[#7600C9] dark:text-[#8203dd]">{children}</span>
    )
}
