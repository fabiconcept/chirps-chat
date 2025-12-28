// Export main container
export { default as SuggestionsContainer } from "./SuggestionsContainer";

// Export individual components
export { default as SuggestionCard } from "./components/SuggestionCard";
export { default as SuggestionsList } from "./components/SuggestionsList";
export { default as VoteButtons } from "./components/VoteButtons";
export { default as StatusBadge } from "./components/StatusBadge";
export { default as CategoryBadge } from "./components/CategoryBadge";
export { default as SuggestionsFilters } from "./components/SuggestionsFilters";
export { default as CreateSuggestionDialog } from "./components/CreateSuggestionDialog";
export { default as SuggestionDetailDialog } from "./components/SuggestionDetailDialog";
export { default as Comment } from "./components/Comment";
export { default as CommentForm } from "./components/CommentForm";

// Export types
export * from "./types";

// Export mock data (for development)
export { mockSuggestions } from "./mockData";

