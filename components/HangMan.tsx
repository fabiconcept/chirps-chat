"use client"
import { useResized } from '@/hooks/use-resized';
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
    const resized = useResized();

    const shouldExempt = exemptFrom && exemptFrom.some((e) => pathname.includes(e));

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            setBaseWidth(ref.current.offsetWidth);
        }
    }, [ref, setBaseWidth]);

    React.useEffect(() => {
        if (resized) {
            if (ref.current) {
                setBaseWidth(ref.current.offsetWidth);
            }
        }
    }, [resized, setBaseWidth]);

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
                        <div className='w-fit fixed' ref={ref}>{children}</div>
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