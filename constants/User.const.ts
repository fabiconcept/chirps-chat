import { UserProps } from "@/components/ChatHanger/User";

export const initialUsers: Omit<UserProps, "type">[] = [
    {
        src: "https://chirps-chat.sirv.com/termite.png",
        name: "Termite",
        status: "online",
        userType: "user",
        // hasNewMessage: true,
        messagePreview: "Hey! I just saw your latest post about the new feature. That's really cool! Can we discuss it further?",
    },
    {
        src: "https://chirps-chat.sirv.com/harambe.png",
        name: "Harambe",
        status: "online",
        userType: "room",
    },
    {
        src: "https://chirps-chat.sirv.com/frog.png",
        name: "Frog",
        status: "online",
        userType: "user",
    },
    {
        src: "https://chirps-chat.sirv.com/octopus.png",
        name: "Octopus",
        status: "online",
        userType: "user",
    },
    {
        src: "https://chirps-chat.sirv.com/parrot.png",
        name: "Parrot",
        status: "online",
        userType: "user",
    },
    {
        src: "https://chirps-chat.sirv.com/panda.png",
        name: "Panda-01",
        status: "online",
        userType: "user",
    },
    {
        src: "https://chirps-chat.sirv.com/panda.png",
        name: "Panda-02",
        status: "online",
        userType: "user",
    },
    {
        src: "https://chirps-chat.sirv.com/panda.png",
        name: "Panda-03",
        status: "online",
        userType: "bot",
    },
    {
        src: "https://chirps-chat.sirv.com/panda.png",
        name: "Panda-04",
        status: "online",
        userType: "user",
    },
    {
        src: "https://chirps-chat.sirv.com/panda.png",
        name: "Panda-05",
        status: "online",
    }
];


interface Conversation {
    id: string;
    url: string;
    size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    name: string;
    message?: string;
    hasUnread?: boolean;
    unreadCount?: number;
    timestamp?: string;
    isYou?: boolean;
    messageStatus?: "sent" | "delivered" | "seen";
    isTyping?: boolean;
}

export const InitialConversations: Conversation[] = [
    {
        id: "1",
        url: "https://chirps-chat.sirv.com/fox.png",
        size: "lg",
        name: "Guacamolli",
        message: "Great spirits have always encounte...",
        timestamp: "2025-12-03T23:30:00",
    },
    {
        id: "2",
        url: "https://chirps-chat.sirv.com/bat.png",
        size: "lg",
        name: "Flo-Jo",
        hasUnread: true,
        unreadCount: 3,
        message: "Eighty percent of success is showin...",
        timestamp: "2025-12-03T12:00:00",
    },
    {
        id: "3",
        url: "https://chirps-chat.sirv.com/bull.png",
        size: "lg",
        name: "Mattylce",
        isYou: true,
        messageStatus: "seen",
        message: "Hey!",
        timestamp: "2024-12-03T09:00:00",
    },
    {
        id: "4",
        url: "https://chirps-chat.sirv.com/bug.png",
        size: "lg",
        name: "Passage Lovers",
        message: "Guacamolli: Great spirits have alway...",
        timestamp: "2025-12-01T18:00:00",
    },
    {
        id: "5",
        url: "https://chirps-chat.sirv.com/termite.png",
        size: "lg",
        name: "TheChief",
        message: "Anyways, that's my two cents plan f...",
        timestamp: "2025-12-04T14:00:00",
    },
    {
        id: "6",
        url: "https://chirps-chat.sirv.com/frog.png",
        size: "lg",
        name: "Butterbean",
        isTyping: true,
        timestamp: "2024-12-04T00:05:00",
    },
    {
        id: "7",
        url: "https://chirps-chat.sirv.com/guinea-pig.png",
        size: "lg",
        name: "Sarah Chen",
        isYou: true,
        messageStatus: "delivered",
        message: "Thanks for the update!",
        timestamp: "2022-09-16T10:30:00",
    },
    {
        id: "8",
        url: "https://chirps-chat.sirv.com/fly.png",
        size: "lg",
        name: "Favour Ajokubi",
        message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima.",
    },
    {
        id: "9",
        url: "https://chirps-chat.sirv.com/octopus.png",
        size: "lg",
        name: "Favour Ajokubi 2",
        message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima.",
    },
    {
        id: "10",
        url: "https://chirps-chat.sirv.com/fish.png",
        size: "lg",
        name: "Favour Ajokubi 3",
        message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, minima.",
    },
];


export const allResults = [
    { id: "user-1", type: "user" as const, name: "Favour Ajokubi" },
    { id: "user-2", type: "user" as const, name: "John Doe" },
    { id: "user-3", type: "user" as const, name: "Sarah Chen" },
    { id: "room-1", type: "room" as const, name: "Octagon Squad" },
    { id: "room-2", type: "room" as const, name: "Dev Team" },
    { id: "room-3", type: "room" as const, name: "Design Hub" },
    { id: "room-4", type: "room" as const, name: "Marketing" },
    { id: "channel-1", type: "channel" as const, name: "General" },
    { id: "channel-2", type: "channel" as const, name: "Random" },
    { id: "channel-3", type: "channel" as const, name: "Announcements" },
];