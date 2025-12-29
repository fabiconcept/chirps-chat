import { Suggestion } from "./types";

// Mock suggestions data
export const mockSuggestions: Suggestion[] = [
    {
        id: "1",
        title: "Dark mode theme customization",
        description: "Allow users to customize their dark mode with different color schemes and accent colors. This would make the platform more personalized.",
        category: "ui-ux",
        status: "planned",
        upvotes: 247,
        downvotes: 12,
        score: 235,
        views: 1000,
        author: {
            id: "user1",
            name: "Alice Johnson",
            username: "@alicej",
            avatar: "https://chirps-chat.sirv.com/fox.png"
        },
        createdAt: "2024-01-15T10:30:00Z",
        userVote: "upvote"
    },
    {
        id: "2",
        title: "Scheduled posts feature",
        description: "Add ability to schedule posts for future publishing. Great for content creators who want to maintain consistent posting schedules.",
        category: "feature",
        status: "under-review",
        upvotes: 189,
        downvotes: 23,
        score: 166,
        views: 3987,
        author: {
            id: "user2",
            name: "Bob Smith",
            username: "@bobsmith",
            avatar: "https://chirps-chat.sirv.com/dog.png"
        },
        createdAt: "2024-01-20T14:20:00Z",
        userVote: null
    },
    {
        id: "3",
        title: "Voice message support in DMs",
        description: "Enable voice messages in direct messages for more personal communication.",
        category: "feature",
        status: "pending",
        upvotes: 156,
        downvotes: 45,
        score: 111,
        views: 1200,
        author: {
            id: "user3",
            name: "Carol White",
            username: "@carolw",
            avatar: "https://chirps-chat.sirv.com/bug.png"
        },
        createdAt: "2024-01-22T09:15:00Z",
        userVote: "downvote"
    },
    {
        id: "4",
        title: "Improved search with filters",
        description: "Enhance search functionality with advanced filters for date, user, content type, etc.",
        category: "improvement",
        status: "pending",
        upvotes: 203,
        downvotes: 18,
        score: 185,
        views: 1500,
        author: {
            id: "user4",
            name: "David Brown",
            username: "@davidb",
            avatar: "https://chirps-chat.sirv.com/bat.png"
        },
        createdAt: "2024-01-18T16:45:00Z",
        userVote: "upvote"
    },
    {
        id: "5",
        title: "Mobile app development",
        description: "Native iOS and Android apps for better mobile experience with push notifications and offline mode.",
        category: "feature",
        status: "planned",
        upvotes: 512,
        downvotes: 34,
        score: 478,
        views: 2000,
        author: {
            id: "user5",
            name: "Emma Davis",
            username: "@emmad",
            avatar: "https://chirps-chat.sirv.com/dove.png"
        },
        createdAt: "2024-01-10T11:00:00Z",
        userVote: "upvote"
    },
    {
        id: "6",
        title: "Two-factor authentication",
        description: "Add 2FA for enhanced account security using authenticator apps or SMS.",
        category: "feature",
        status: "implemented",
        upvotes: 178,
        downvotes: 8,
        score: 170,
        views: 2500,
        author: {
            id: "user6",
            name: "Frank Miller",
            username: "@frankm",
            avatar: "https://chirps-chat.sirv.com/lioness.png"
        },
        createdAt: "2023-12-05T13:30:00Z",
        implementedAt: "2024-01-25T10:00:00Z",
        userVote: "upvote"
    },
    {
        id: "7",
        title: "Markdown support in posts",
        description: "Allow markdown formatting in posts for better text formatting and code snippets.",
        category: "improvement",
        status: "implemented",
        upvotes: 234,
        downvotes: 12,
        score: 222,
        views: 3000,
        author: {
            id: "user7",
            name: "Grace Lee",
            username: "@gracee",
            avatar: "https://chirps-chat.sirv.com/platopus.png"
        },
        createdAt: "2023-11-20T08:15:00Z",
        implementedAt: "2024-01-10T14:30:00Z",
        userVote: "upvote"
    },
    {
        id: "8",
        title: "Performance optimization for large rooms",
        description: "Improve loading times and responsiveness in rooms with thousands of messages.",
        category: "performance",
        status: "under-review",
        upvotes: 145,
        downvotes: 7,
        score: 138,
        views: 3500,
        author: {
            id: "user8",
            name: "Henry Wilson",
            username: "@henryw",
            avatar: "https://chirps-chat.sirv.com/prawn.png"
        },
        createdAt: "2024-01-21T15:20:00Z",
        userVote: null
    }
];

