export type LeaderboardCategory = "streak" | "tokens" | "followers" | "likes" | "posts" | "rooms";

export interface LeaderboardUser {
    id: string;
    name: string;
    username: string;
    avatar: string;
    country: string;
    countryCode: string;
    lat: number;
    lng: number;
    stats: {
        streak: number;
        tokens: number;
        followers: number;
        likes: number;
        posts: number;
        rooms: number;
    };
    rank?: number;
    change?: number; // Position change from last period (+2, -1, 0)
}

export interface LeaderboardFilters {
    category: LeaderboardCategory;
    timeframe: "all" | "month" | "week" | "today";
    region: "global" | "continent" | "country";
}

