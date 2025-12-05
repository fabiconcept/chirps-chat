import { NextRequest, NextResponse } from "next/server";

interface Metadata {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    url: string;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    try {
        new URL(url);
    } catch {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    try {
        // Fetch the page HTML
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; LinkPreviewBot/1.0)",
            },
            // Add timeout
            signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch URL");
        }

        const html = await response.text();

        // Parse metadata from HTML
        const metadata: Metadata = {
            url,
        };

        // Extract OpenGraph tags
        const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
        const ogDescription = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
        const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
        const ogSiteName = html.match(/<meta\s+property="og:site_name"\s+content="([^"]+)"/i);

        // Extract Twitter Card tags as fallback
        const twitterTitle = html.match(/<meta\s+name="twitter:title"\s+content="([^"]+)"/i);
        const twitterDescription = html.match(/<meta\s+name="twitter:description"\s+content="([^"]+)"/i);
        const twitterImage = html.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"/i);

        // Extract standard meta tags as fallback
        const metaDescription = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
        const titleTag = html.match(/<title>([^<]+)<\/title>/i);

        // Populate metadata with priority: OpenGraph > Twitter > Standard
        metadata.title = ogTitle?.[1] || twitterTitle?.[1] || titleTag?.[1];
        metadata.description = ogDescription?.[1] || twitterDescription?.[1] || metaDescription?.[1];
        metadata.image = ogImage?.[1] || twitterImage?.[1];
        metadata.siteName = ogSiteName?.[1] || new URL(url).hostname;

        // Make image URLs absolute if they're relative
        if (metadata.image && !metadata.image.startsWith('http')) {
            const baseUrl = new URL(url);
            metadata.image = new URL(metadata.image, baseUrl.origin).toString();
        }

        return NextResponse.json(metadata);
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return NextResponse.json(
            { 
                error: "Failed to fetch metadata",
                url,
                siteName: new URL(url).hostname 
            },
            { status: 500 }
        );
    }
}
