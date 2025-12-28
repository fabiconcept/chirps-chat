import { MarketplaceItem } from "./types";

export const mockMarketplaceItems: MarketplaceItem[] = [
    // Avatars
    {
        id: "avatar-1",
        name: "Cosmic Phoenix",
        description: "A majestic phoenix avatar with cosmic energy effects",
        category: "avatar",
        rarity: "legendary",
        price: 2500,
        image: "https://chirps-chat.sirv.com/premium/rasta.png",
        owned: false,
        featured: true,
        limitedEdition: true,
        stock: 50,
        tags: ["animated", "particles", "exclusive"]
    },
    {
        id: "avatar-2",
        name: "Cyber Samurai",
        description: "Futuristic samurai with neon accents",
        category: "avatar",
        rarity: "epic",
        price: 1200,
        image: "https://chirps-chat.sirv.com/parrot.png",
        owned: true,
        tags: ["animated", "cyberpunk"]
    },
    {
        id: "avatar-3",
        name: "Pixel Wizard",
        description: "8-bit style wizard with magical effects",
        category: "avatar",
        rarity: "rare",
        price: 500,
        image: "https://chirps-chat.sirv.com/frog.png",
        owned: false,
        tags: ["retro", "magic"]
    },
    {
        id: "avatar-4",
        name: "Galaxy Cat",
        description: "Adorable cat with galaxy patterns",
        category: "avatar",
        rarity: "epic",
        price: 1500,
        image: "https://chirps-chat.sirv.com/premium/cat.png",
        owned: false,
        featured: true,
        tags: ["cute", "space"]
    },
    {
        id: "avatar-5",
        name: "Neon Dragon",
        description: "Fierce dragon with glowing neon scales",
        category: "avatar",
        rarity: "legendary",
        price: 3000,
        image: "https://chirps-chat.sirv.com/premium/dragon.png",
        owned: false,
        limitedEdition: true,
        stock: 25,
        tags: ["animated", "exclusive"]
    },
    {
        id: "avatar-6",
        name: "Forest Guardian",
        description: "Nature spirit with woodland creatures",
        category: "avatar",
        rarity: "rare",
        price: 800,
        image: "https://chirps-chat.sirv.com/premium/owl.png",
        owned: true,
        tags: ["nature", "peaceful"]
    },
    
    // Badges
    {
        id: "badge-1",
        name: "Verified Creator",
        description: "Official verified creator badge",
        category: "badge",
        rarity: "epic",
        price: 1000,
        image: "https://chirps-chat.sirv.com/badges/verified.png",
        owned: false,
        tags: ["status", "creator"]
    },
    {
        id: "badge-2",
        name: "Early Supporter",
        description: "Exclusive badge for early platform supporters",
        category: "badge",
        rarity: "legendary",
        price: 2000,
        image: "https://chirps-chat.sirv.com/badges/supporter.png",
        owned: false,
        limitedEdition: true,
        stock: 100,
        tags: ["exclusive", "limited"]
    },
    
    // Banners
    {
        id: "banner-1",
        name: "Aurora Borealis",
        description: "Stunning northern lights profile banner",
        category: "banner",
        rarity: "epic",
        price: 900,
        image: "https://chirps-chat.sirv.com/banners/aurora.png",
        owned: false,
        tags: ["nature", "beautiful"]
    },
    {
        id: "banner-2",
        name: "Digital Matrix",
        description: "Animated matrix-style banner",
        category: "banner",
        rarity: "legendary",
        price: 1800,
        image: "https://chirps-chat.sirv.com/banners/matrix.png",
        owned: false,
        limitedEdition: true,
        stock: 75,
        tags: ["animated", "tech"]
    }
];

