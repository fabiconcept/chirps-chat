import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UAParser } from 'ua-parser-js';

export function middleware(req: NextRequest) {
    const ua = req.headers.get("user-agent") || "";
    const parsed = new UAParser(ua).getResult();
    const { pathname, searchParams } = req.nextUrl;

    const isMobile = parsed.device.type === "mobile" || parsed.device.type === "tablet";
    
    // get search params 
    const activitybar = searchParams.get("activitybar");

    if (activitybar === "open" && isMobile) {
        const url = req.nextUrl.clone();
        url.pathname = "/activities";
        url.searchParams.delete("activitybar");
        return NextResponse.redirect(url);
    }

    if (pathname === "/activities" && !isMobile) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("activitybar", "open");
        return NextResponse.redirect(url);
    }


    return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
