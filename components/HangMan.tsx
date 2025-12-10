"use client"
import { usePathname } from 'next/navigation';
import React from 'react';

interface HangManPropsContext {
    baseWidth: number;
    setBaseWidth: (width: number) => void;
}

const HangManContext = React.createContext<HangManPropsContext>({
    baseWidth: 100,
    setBaseWidth: () => { },
});

export default function HangMan({
    children,
    className,
    exemptFrom,
}: {
    children: React.ReactNode;
    className?: string;
    exemptFrom?: string[]
}) {
    const [baseWidth, setBaseWidth] = React.useState(0);
    const pathname = usePathname();

    const shouldExempt = exemptFrom && exemptFrom.some((e) => pathname.includes(e))

    return (
        <>
            {!shouldExempt ?
                <HangManContext.Provider value={{ baseWidth, setBaseWidth }}>
                    <div
                        className={className}
                        style={{
                            width: baseWidth || undefined,
                        }}
                    >
                        {children}
                    </div>
                </HangManContext.Provider>
                :
                <>
                    {children}
                </>
            }
        </>
    )
}

export const useHangMan = () => React.useContext(HangManContext);