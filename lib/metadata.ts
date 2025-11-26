import type { Metadata } from "next";

export const RootMetadata: Metadata = {
    title: "Chirps",
    description: "Nothing deep, just chirps.",
    openGraph: {
        title: "Chirps",
        description: "Nothing deep, just chirps.",
        siteName: "Chirps",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Chirps",
        description: "Nothing deep, just chirps.",
    }
};

export function generatePageMetadata(
    title: string,
    description: string,
    opts?: {
        ogImage?: string;
        twitterImage?: string;
    }
): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [opts?.ogImage ?? "/default-og.png"]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [opts?.twitterImage ?? "/default-twitter.png"]
        }
    };
}
