import { LeaderboardUser } from "./types";

// Current logged-in user (rank 8 in this example)
export const currentUser: LeaderboardUser = {
    id: "current-user",
    name: "You",
    username: "yourhandle",
    avatar: "https://chirps-chat.sirv.com/premium/owl.png",
    country: "Canada",
    countryCode: "CA",
    lat: 43.6532,
    lng: -79.3832,
    stats: {
        streak: 223,
        tokens: 68450,
        followers: 27340,
        likes: 456780,
        posts: 2450,
        rooms: 18
    },
    change: 1
};

export const mockLeaderboardUsers: LeaderboardUser[] = [
    {
        id: "user-1",
        name: "Alex Thunder",
        username: "alexthunder",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "United States",
        countryCode: "US",
        lat: 40.7128,
        lng: -74.0060,
        stats: {
            streak: 365,
            tokens: 125847,
            followers: 45230,
            likes: 892340,
            posts: 3420,
            rooms: 28
        },
        change: 0
    },
    {
        id: "user-2",
        name: "Sakura Yamamoto",
        username: "sakura_y",
        avatar: "https://chirps-chat.sirv.com/premium/cat.png",
        country: "Japan",
        countryCode: "JP",
        lat: 35.6762,
        lng: 139.6503,
        stats: {
            streak: 328,
            tokens: 118900,
            followers: 38450,
            likes: 756200,
            posts: 2890,
            rooms: 22
        },
        change: 2
    },
    {
        id: "user-3",
        name: "Marcus Silva",
        username: "marcussilva",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Brazil",
        countryCode: "BR",
        lat: -23.5505,
        lng: -46.6333,
        stats: {
            streak: 298,
            tokens: 98750,
            followers: 42100,
            likes: 678450,
            posts: 3150,
            rooms: 19
        },
        change: -1
    },
    {
        id: "user-4",
        name: "Emma Wilson",
        username: "emmawilson",
        avatar: "https://chirps-chat.sirv.com/premium/owl.png",
        country: "United Kingdom",
        countryCode: "GB",
        lat: 51.5074,
        lng: -0.1278,
        stats: {
            streak: 275,
            tokens: 89640,
            followers: 36780,
            likes: 598320,
            posts: 2670,
            rooms: 25
        },
        change: 1
    },
    {
        id: "user-5",
        name: "Raj Patel",
        username: "rajpatel",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "India",
        countryCode: "IN",
        lat: 19.0760,
        lng: 72.8777,
        stats: {
            streak: 256,
            tokens: 87200,
            followers: 39200,
            likes: 567890,
            posts: 2980,
            rooms: 17
        },
        change: -2
    },
    {
        id: "user-6",
        name: "Sophie Martin",
        username: "sophiemartin",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "France",
        countryCode: "FR",
        lat: 48.8566,
        lng: 2.3522,
        stats: {
            streak: 245,
            tokens: 76340,
            followers: 31450,
            likes: 512340,
            posts: 2340,
            rooms: 21
        },
        change: 3
    },
    {
        id: "user-7",
        name: "Kim Min-jun",
        username: "kimminj",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "South Korea",
        countryCode: "KR",
        lat: 37.5665,
        lng: 126.9780,
        stats: {
            streak: 234,
            tokens: 72890,
            followers: 28900,
            likes: 489230,
            posts: 2120,
            rooms: 16
        },
        change: 0
    },
    {
        id: "user-8",
        name: "Lucas Schmidt",
        username: "lucasschmidt",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Germany",
        countryCode: "DE",
        lat: 52.5200,
        lng: 13.4050,
        stats: {
            streak: 223,
            tokens: 68450,
            followers: 27340,
            likes: 456780,
            posts: 2450,
            rooms: 18
        },
        change: 1
    },
    {
        id: "user-9",
        name: "Isabella Rossi",
        username: "isabellarossi",
        avatar: "https://chirps-chat.sirv.com/premium/cat.png",
        country: "Italy",
        countryCode: "IT",
        lat: 41.9028,
        lng: 12.4964,
        stats: {
            streak: 212,
            tokens: 65230,
            followers: 25670,
            likes: 432190,
            posts: 2280,
            rooms: 14
        },
        change: -1
    },
    {
        id: "user-10",
        name: "Mohammed Al-Rashid",
        username: "mohammedalrashid",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "UAE",
        countryCode: "AE",
        lat: 25.2048,
        lng: 55.2708,
        stats: {
            streak: 201,
            tokens: 61780,
            followers: 24120,
            likes: 408560,
            posts: 2090,
            rooms: 20
        },
        change: 2
    },
    {
        id: "user-11",
        name: "Ana Costa",
        username: "anacosta",
        avatar: "https://chirps-chat.sirv.com/premium/owl.png",
        country: "Portugal",
        countryCode: "PT",
        lat: 38.7223,
        lng: -9.1393,
        stats: {
            streak: 195,
            tokens: 58900,
            followers: 22890,
            likes: 389450,
            posts: 1980,
            rooms: 15
        },
        change: 0
    },
    {
        id: "user-12",
        name: "Chen Wei",
        username: "chenwei",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "China",
        countryCode: "CN",
        lat: 39.9042,
        lng: 116.4074,
        stats: {
            streak: 189,
            tokens: 56340,
            followers: 21450,
            likes: 367890,
            posts: 1870,
            rooms: 13
        },
        change: 1
    },
    {
        id: "user-13",
        name: "Olga Ivanova",
        username: "olgaivanova",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Russia",
        countryCode: "RU",
        lat: 55.7558,
        lng: 37.6173,
        stats: {
            streak: 178,
            tokens: 53120,
            followers: 20100,
            likes: 345670,
            posts: 1760,
            rooms: 12
        },
        change: -2
    },
    {
        id: "user-14",
        name: "Carlos Hernandez",
        username: "carlosh",
        avatar: "https://chirps-chat.sirv.com/premium/cat.png",
        country: "Mexico",
        countryCode: "MX",
        lat: 19.4326,
        lng: -99.1332,
        stats: {
            streak: 167,
            tokens: 49890,
            followers: 18760,
            likes: 323450,
            posts: 1650,
            rooms: 11
        },
        change: 3
    },
    {
        id: "user-15",
        name: "Fatima Ahmed",
        username: "fatimaahmed",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Egypt",
        countryCode: "EG",
        lat: 30.0444,
        lng: 31.2357,
        stats: {
            streak: 156,
            tokens: 46780,
            followers: 17340,
            likes: 301230,
            posts: 1540,
            rooms: 10
        },
        change: 0
    },
    currentUser,
];

