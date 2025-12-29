// Suggestion Types and Interfaces

export type SuggestionStatus = "pending" | "under-review" | "planned" | "implemented" | "declined";

export type SuggestionCategory = "feature" | "improvement" | "bug-fix" | "ui-ux" | "performance" | "other";

export interface Suggestion {
    id: string;
    title: string;
    description: string;
    category: SuggestionCategory;
    status: SuggestionStatus;
    upvotes: number;
    downvotes: number;
    score: number; // upvotes - downvotes
    views: number;
    author: {
        id: string;
        name: string;
        username: string;
        avatar: string;
    };
    createdAt: string;
    implementedAt?: string;
    userVote?: "upvote" | "downvote" | null; // Current user's vote
}

export interface CreateSuggestionData {
    title: string;
    description: string;
    category: SuggestionCategory;
}

export type SortOption = "top" | "newest" | "oldest";

export type FilterOption = "all" | SuggestionCategory;

