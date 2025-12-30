"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useTheme } from "next-themes";
import { LeaderboardUser, LeaderboardCategory } from "../types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface GlobeVisualizationProps {
    users: LeaderboardUser[];
    onUserClick?: (user: LeaderboardUser) => void;
    selectedCountry?: string | null;
    activeCategory: LeaderboardCategory;
}

// SVG icon paths for each category (lucide-react icons)
const categoryIcons: Record<LeaderboardCategory, string> = {
    streak: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>', // TrendingUp
    tokens: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>', // Coins
    followers: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', // Users
    likes: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>', // Heart
    posts: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', // MessageSquare
    rooms: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>', // Home
};

const categoryConfig: Record<LeaderboardCategory, { 
    label: string; 
    accentColor: string;
    iconSvg: string;
}> = {
    streak: { label: "Days", accentColor: "#10b981", iconSvg: categoryIcons.streak },
    tokens: { label: "Tokens", accentColor: "#D4AF37", iconSvg: categoryIcons.tokens },
    followers: { label: "Followers", accentColor: "#3b82f6", iconSvg: categoryIcons.followers },
    likes: { label: "Likes", accentColor: "#f43f5e", iconSvg: categoryIcons.likes },
    posts: { label: "Posts", accentColor: "#a855f7", iconSvg: categoryIcons.posts },
    rooms: { label: "Rooms", accentColor: "#6366f1", iconSvg: categoryIcons.rooms }
};

export default function GlobeVisualization({ users, onUserClick, selectedCountry, activeCategory }: GlobeVisualizationProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const globeInstanceRef = useRef<any>(null);
    const onUserClickRef = useRef(onUserClick);
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ensure theme is mounted
    useEffect(() => {
        setMounted(true);
    }, []);

    // Update the ref when onUserClick changes
    useEffect(() => {
        onUserClickRef.current = onUserClick;
    }, [onUserClick]);

    // Get current theme (fallback to 'dark')
    const currentTheme = mounted ? (resolvedTheme || theme || 'dark') : 'dark';

    // Memoize globe data to prevent unnecessary updates
    const globeData = useMemo(() => {
        const config = categoryConfig[activeCategory];
        
        // Sort users by active category to determine colors
        const sortedByCategory = [...users].sort((a, b) => 
            b.stats[activeCategory] - a.stats[activeCategory]
        );
        
        return users.map((user) => {
            const isSelected = selectedCountry && user.country === selectedCountry;
            const categoryRank = sortedByCategory.findIndex(u => u.id === user.id) + 1;
            const categoryValue = user.stats[activeCategory];
            
            // Normalize size based on category value (relative to max)
            const maxValue = Math.max(...users.map(u => u.stats[activeCategory]));
            const minValue = Math.min(...users.map(u => u.stats[activeCategory]));
            const normalizedValue = (categoryValue - minValue) / (maxValue - minValue);
            const size = 0.5 + (normalizedValue * 2); // 0.5 to 2.5 range
            
            // Use category accent color for top ranks, fade for lower
            let color = config.accentColor;
            if (categoryRank > 3) {
                // Fade color for ranks below top 3
                color = categoryRank <= 10 ? `${config.accentColor}CC` : `${config.accentColor}99`;
            }
            
            return {
                ...user,
                size,
                color,
                isSelected,
                categoryValue,
                categoryRank,
                categoryLabel: config.label,
                categoryIconSvg: config.iconSvg
            };
        });
    }, [users.length, selectedCountry, activeCategory, users.map(u => u.id).join(',')]); // Only update when actual data changes

    // Initialize globe only once
    useEffect(() => {
        if (typeof window === "undefined" || !globeRef.current || !containerRef.current) return;

        let mounted = true;

        const initGlobe = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Dynamically import globe.gl
                const Globe = (await import("globe.gl")).default;

                if (!mounted || !globeRef.current || !containerRef.current) return;

                // Get container dimensions
                const width = containerRef.current.offsetWidth;
                const height = 600;

                // Theme-based configuration
                const isDark = currentTheme === 'dark';
                const globeImage = isDark
                    ? '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg'
                    : '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg';
                const atmosphereColor = isDark ? '#7600C9' : '#4F46E5';
                const backgroundColor = isDark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)';

                // MapMarker SVG icon
                const markerSvg = `<svg viewBox="-4 0 36 36">
                    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
                    <circle fill="black" cx="14" cy="14" r="7"></circle>
                </svg>`;

                // Use memoized data
                const gData = globeData;

                // Initialize globe with 'new' keyword
                const globe = new Globe(globeRef.current)
                    .width(width)
                    .height(height)
                    // .backgroundImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
                    .globeImageUrl(globeImage)
                    .backgroundColor(backgroundColor)
                    .showAtmosphere(true)
                    .atmosphereColor(atmosphereColor)
                    .atmosphereAltitude(0.15)
                    // Use points layer for fixed markers with tooltips
                    .pointsData(gData)
                    .pointLat((d: unknown) => (d as { lat: number }).lat as number)
                    .pointLng((d: unknown) => (d as { lng: number }).lng as number)
                    .pointColor((d: unknown) => (d as { color: string }).color as string)
                    .pointAltitude((d: unknown) => (d as { size: number }).size * 0.03) // Longer pointers (3x taller)
                    .pointRadius(0.5) // Fixed radius in angular degrees
                    .pointResolution(16) // Smooth circular points
                    .pointsMerge(false) // Keep points separate for interactions
                    .pointLabel((d: unknown) => `
                        <div style="
                            backdrop-filter: blur(10px);
                            border: 1px solid ${(d as { color: string }).color};
                            border-radius: 12px;
                            padding: 12px 16px;
                            color: white;
                            font-family: system-ui, -apple-system, sans-serif;
                            max-width: 250px;
                        ">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                                <img src="${(d as { avatar: string }).avatar}" alt="${(d as { name: string }).name}" style="
                                    width: 32px;
                                    height: 32px;
                                    border-radius: 50%;
                                    border: 2px solid ${(d as { color: string }).color};
                                " />
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">${(d as { name: string }).name}</div>
                                    <div style="font-size: 11px; color: rgba(255,255,255,0.7);">@${(d as { username: string }).username}</div>
                                </div>
                            </div>
                            
                            <!-- Active Category Highlight -->
                            <div style="
                                background: ${(d as { color: string }).color}15;
                                border: 2px solid ${(d as { color: string }).color};
                                border-radius: 8px;
                                padding: 8px 12px;
                                margin-bottom: 8px;
                                text-align: center;
                            ">
                                <div style="display: flex; justify-content: center; margin-bottom: 4px; color: ${(d as { color: string }).color};">
                                    ${(d as { categoryIconSvg: string }).categoryIconSvg}
                                </div>
                                <div style="font-size: 18px; font-weight: 700; color: ${(d as { color: string }).color};">
                                    ${(d as { categoryValue: number }).categoryValue.toLocaleString()}
                                </div>
                                <div style="font-size: 10px; color: rgba(255,255,255,0.7);">
                                    ${(d as { categoryLabel: string }).categoryLabel}
                                </div>
                            </div>
                            
                            <div style="
                                font-size: 10px;
                                color: ${(d as { color: string }).color};
                                text-align: center;
                                font-weight: 600;
                            ">
                                ${(d as { country: string }).country} • Rank #${(d as { categoryRank: number }).categoryRank}
                            </div>
                        </div>
                    `)
                    .onPointClick((point: unknown) => {
                        if (onUserClickRef.current) {
                            onUserClickRef.current(point as LeaderboardUser);
                        }
                    })
                    .onPointHover((point: unknown) => {
                        if (globeRef.current) {
                            globeRef.current.style.cursor = point ? 'pointer' : 'grab';
                        }
                    })
                // Add HTML elements layer for MapMarker icons on top
                .htmlElement((d: unknown) => {
                    const el = document.createElement('div');
                    el.innerHTML = markerSvg;
                    el.style.color = (d as { color: string }).color;
                    el.style.width = `${(d as { size: number }).size}px`;
                    el.style.transition = 'opacity 500ms'; // Longer transition for hover
              
                    el.style.pointerEvents = 'auto';
                    el.style.cursor = 'pointer';
                    // @ts-ignore
                    el.onclick = () => console.info(d);
                    return el;
                  })
                  .htmlElementVisibilityModifier((el: HTMLElement, isVisible: boolean) => {
                    (el as HTMLDivElement).style.opacity = isVisible ? '1' : '0';
                  })
                globe.controls().autoRotate = true;
                globe.controls().autoRotateSpeed = 0.5;
                globe.controls().enableZoom = true;

                // Pause rotation on hover
                const handleMouseEnter = () => {
                    if (globe.controls()) {
                        globe.controls().autoRotate = false;
                    }
                };

                const handleMouseLeave = () => {
                    if (globe.controls()) {
                        globe.controls().autoRotate = true;
                    }
                };

                // Add hover listeners
                if (globeRef.current) {
                    globeRef.current.addEventListener('mouseenter', handleMouseEnter);
                    globeRef.current.addEventListener('mouseleave', handleMouseLeave);
                }

                globeInstanceRef.current = isDark ? globe : globe.globeTileEngineUrl((x: number, y: number, l: number) => `https://tile.openstreetmap.org/${l}/${x}/${y}.png`);
                setIsLoading(false);

                // Cleanup function
                return () => {
                    if (globeRef.current) {
                        globeRef.current.removeEventListener('mouseenter', handleMouseEnter);
                        globeRef.current.removeEventListener('mouseleave', handleMouseLeave);
                    }
                };
            } catch (err) {
                console.error("Error initializing globe:", err);
                setError("Failed to load globe visualization");
                setIsLoading(false);
            }
        };

        let cleanup: (() => void) | undefined;

        initGlobe().then((cleanupFn) => {
            cleanup = cleanupFn;
        });

        return () => {
            mounted = false;
            if (cleanup) cleanup();
            if (globeInstanceRef.current) {
                // Cleanup if needed
                globeInstanceRef.current = null;
            }
        };
    }, [currentTheme]); // Reinitialize when theme changes

    // Update data when globeData changes (memoized), without recreating the globe
    useEffect(() => {
        if (!globeInstanceRef.current) return;

        // Update both points and HTML elements data without recreating the globe
        globeInstanceRef.current.pointsData(globeData);
        globeInstanceRef.current.htmlElementsData(globeData);
    }, [globeData]);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10"
                >
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-[#7600C9]" />
                        <p className="text-sm text-muted-foreground">Loading globe...</p>
                    </div>
                </motion.div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10"
                >
                    <div className="text-center space-y-2">
                        <p className="text-lg font-semibold text-destructive">{error}</p>
                        <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
                    </div>
                </motion.div>
            )}

            <div
                ref={globeRef}
                className="w-full flex items-center justify-center"
                style={{ minHeight: '600px', height: '600px' }}
            />
        </div>
    );
}

