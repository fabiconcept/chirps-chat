import type { Metadata } from "next";
import "./stylesheets/globals.css";
import "./stylesheets/fonts.css";
import Providers from "@/components/theme-provider";
import { RootMetadata } from "@/lib/metadata";

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
                    {children}
                </Providers>
            </body>
        </html>
    );
}
