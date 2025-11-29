export default function Hashtag({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-medium cursor-pointer transition-colors text-[#7600C9] dark:text-[#8203dd] hover:brightness-150">{children}</span>
    )
}
