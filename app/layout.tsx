import type { Metadata } from "next";
import "./stylesheets/globals.css";
// import "./stylesheets/debug.css";
import "./stylesheets/fonts.css";
import Providers from "@/components/Providers/theme-provider";
import { RootMetadata } from "@/lib/metadata";
import GlobalHeader from "@/components/GlobalHeader";
import { ReduxProvider } from "@/components/Providers/redux-provider";
import { AuthProvider } from "@/components/Providers/AuthProvider";
import SideBar from "@/components/SideBar";

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
                <Providers>
                    <ReduxProvider>
                        <AuthProvider>
                            <div className="min-h-screen relative flex">
                                <SideBar />
                                <div className="flex-1">
                                    <GlobalHeader />
                                    <main className="flex px-10 py-6 gap-4 ">
                                        {children}
                                    </main>
                                </div>
                            </div>
                        </AuthProvider>
                    </ReduxProvider>
                </Providers>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                    <filter id="lensFilter" x="-50%" y="-50%" width="200%" height="150%" filterUnits="objectBoundingBox">
                        {/* Create alpha channel for displacement */}
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
