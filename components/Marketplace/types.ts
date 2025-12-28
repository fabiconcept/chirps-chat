export type MarketplaceItemCategory = "avatar" | "badge" | "theme" | "emote" | "banner";

export type MarketplaceItemRarity = "common" | "rare" | "epic" | "legendary" | "mythic";

export interface MarketplaceItem {
    id: string;
    name: string;
    description: string;
    category: MarketplaceItemCategory;
    rarity: MarketplaceItemRarity;
    price: number;
    image: string;
    owned: boolean;
    featured?: boolean;
    limitedEdition?: boolean;
    stock?: number;
    tags?: string[];
}

export interface MarketplaceFilters {
    category: MarketplaceItemCategory | "all";
    rarity: MarketplaceItemRarity | "all";
    priceRange: "all" | "0-100" | "100-500" | "500-1000" | "1000+";
    sortBy: "featured" | "price-low" | "price-high" | "name" | "rarity";
    showOwned: boolean;
}

export type MarketplaceView = "browse" | "owned";

