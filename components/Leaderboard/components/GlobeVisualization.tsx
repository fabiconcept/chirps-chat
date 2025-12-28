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

const categoryConfig: Record<LeaderboardCategory, { 
    label: string; 
    accentColor: string;
    emoji: string;
}> = {
    streak: { label: "Day Streak", accentColor: "#10b981", emoji: "🔥" },
    tokens: { label: "Tokens", accentColor: "#D4AF37", emoji: "💰" },
    followers: { label: "Followers", accentColor: "#3b82f6", emoji: "👥" },
    likes: { label: "Likes", accentColor: "#f43f5e", emoji: "❤️" },
    posts: { label: "Posts", accentColor: "#a855f7", emoji: "💬" },
    rooms: { label: "Rooms", accentColor: "#6366f1", emoji: "🏠" }
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
                categoryEmoji: config.emoji
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
                    ? '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg'
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
                    .globeImageUrl(globeImage)
                    .backgroundColor(backgroundColor)
                    .showAtmosphere(true)
                    .atmosphereColor(atmosphereColor)
                    .atmosphereAltitude(0.15)
                    // Use points layer for fixed markers with tooltips
                    .pointsData(gData)
                    .pointLat((d: any) => d.lat)
                    .pointLng((d: any) => d.lng)
                    .pointColor((d: any) => d.color)
                    .pointAltitude((d: any) => d.size * 0.03) // Longer pointers (3x taller)
                    .pointRadius(0.5) // Fixed radius in angular degrees
                    .pointResolution(16) // Smooth circular points
                    .pointsMerge(false) // Keep points separate for interactions
                    .pointLabel((d: any) => `
                        <div style="
                            background: rgba(0, 0, 0, 0.9);
                            backdrop-filter: blur(10px);
                            border: 1px solid ${d.color};
                            border-radius: 12px;
                            padding: 12px 16px;
                            color: white;
                            font-family: system-ui, -apple-system, sans-serif;
                            max-width: 250px;
                        ">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                                <img src="${d.avatar}" alt="${d.name}" style="
                                    width: 32px;
                                    height: 32px;
                                    border-radius: 50%;
                                    border: 2px solid ${d.color};
                                " />
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">${d.name}</div>
                                    <div style="font-size: 11px; color: rgba(255,255,255,0.7);">@${d.username}</div>
                                </div>
                            </div>
                            
                            <!-- Active Category Highlight -->
                            <div style="
                                background: ${d.color}15;
                                border: 2px solid ${d.color};
                                border-radius: 8px;
                                padding: 8px 12px;
                                margin-bottom: 8px;
                                text-align: center;
                            ">
                                <div style="font-size: 20px; margin-bottom: 4px;">${d.categoryEmoji}</div>
                                <div style="font-size: 18px; font-weight: 700; color: ${d.color};">
                                    ${d.categoryValue.toLocaleString()}
                                </div>
                                <div style="font-size: 10px; color: rgba(255,255,255,0.7);">
                                    ${d.categoryLabel}
                                </div>
                            </div>
                            
                            <div style="
                                font-size: 10px;
                                color: ${d.color};
                                text-align: center;
                                font-weight: 600;
                            ">
                                ${d.country} • Rank #${d.categoryRank}
                            </div>
                        </div>
                    `)
                    .onPointClick((point: any) => {
                        if (onUserClickRef.current) {
                            onUserClickRef.current(point as LeaderboardUser);
                        }
                    })
                    .onPointHover((point: any) => {
                        if (globeRef.current) {
                            globeRef.current.style.cursor = point ? 'pointer' : 'grab';
                        }
                    })
                // Add HTML elements layer for MapMarker icons on top
                .htmlElement(d => {
                    const el = document.createElement('div');
                    el.innerHTML = markerSvg;
                    el.style.color = (d as any).color;
                    el.style.width = `${(d as any).size}px`;
                    el.style.transition = 'opacity 250ms';
              
                    (el as any).style['pointer-events'] = 'auto';
                    el.style.cursor = 'pointer';
                    el.onclick = () => console.info(d);
                    return el;
                  })
                  .htmlElementVisibilityModifier((el: any, isVisible: boolean) => el.style.opacity = isVisible ? '1' : '0')
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

                globeInstanceRef.current = isDark ? globe : globe.globeTileEngineUrl((x, y, l) => `https://tile.openstreetmap.org/${l}/${x}/${y}.png`);
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

