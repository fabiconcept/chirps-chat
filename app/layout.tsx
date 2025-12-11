import type { Metadata } from "next";
import "./stylesheets/globals.css";
// import "./stylesheets/debug.css";
import "./stylesheets/pattern.css";
import "./stylesheets/fonts.css";
import Providers from "@/components/Providers/theme-provider";
import { RootMetadata } from "@/lib/metadata";
import GlobalHeader from "@/components/GlobalHeader";
import { ReduxProvider } from "@/components/Providers/redux-provider";
import { AuthProvider } from "@/components/Providers/AuthProvider";
import SideBar from "@/components/SideBar";
import Activities from "@/components/Activities/Index";
import { KeyBoardShortCutProvider } from "@/components/Providers/KeyBoardShortCutProvider";
import { Toaster } from "@/components/ui/sonner";
import MobileBottomNav from "@/components/MobileBottomNav";
import HangMan from "@/components/HangMan";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = RootMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`poppins antialiased`}
            >
                <NextTopLoader 
                    color="#7600c9"
                />
                <Providers>
                    <ReduxProvider>
                        <AuthProvider>
                            <KeyBoardShortCutProvider>
                                <div className="h-screen overflow-hidden relative flex not-dark:text-black debug-green">
                                    <div className="flex-1 max-h-full overflow-y-auto outline debug-blue">
                                        <GlobalHeader />
                                        <main className="flex max-h-full md:px-10 sm:px-5 px-3 md:pt-6 py-3 max-sm:pb-0 debug-purple only overflow-y-visible max-w-[100rem] w-full mx-auto">
                                            <HangMan 
                                                className="relative"
                                                exemptFrom={["/chat", "/chat/"]}
                                            >
                                                <SideBar />
                                            </HangMan>
                                            {children}
                                        </main>
                                    </div>
                                    <Activities />
                                    <MobileBottomNav />
                                </div>
                            </KeyBoardShortCutProvider>
                        </AuthProvider>
                    </ReduxProvider>
                </Providers>
                <Toaster position="top-center" richColors />
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                    <filter id="lensFilter" x="-50%" y="-50%" width="200%" height="150%" filterUnits="objectBoundingBox">
                        <feComponentTransfer in="SourceAlpha" result="alpha">
                            <feFuncA type="identity" />
                        </feComponentTransfer>

                        {/* Blur for smooth displacement */}
                        <feGaussianBlur in="alpha" stdDeviation="40" result="blur" />

                        {/* Top displacement - push content down */}
                        <feOffset in="blur" dx="0" dy="-30" result="topBlur" />

                        {/* Bottom displacement - push content up */}
                        <feOffset in="blur" dx="0" dy="30" result="bottomBlur" />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="bottomBlur"
                            scale="60"
                            xChannelSelector="A"
                            yChannelSelector="A"
                            result="bottomDisplace"
                        />

                        {/* Blend both displacements */}
                        <feBlend mode="normal" in="topDisplace" in2="bottomDisplace" />
                    </filter>
                </svg>
            </body>
        </html>
    );
}
