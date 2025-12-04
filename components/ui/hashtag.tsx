export default function Hashtag({ children }: { children: React.ReactNode }) {
    return (
        <p className="inline font-medium cursor-pointer transition-all text-[#7600C9] dark:text-[#8203dd] hover:brightness-150">{children}</p>
    )
}
