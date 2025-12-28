import { Transaction, QuickTransferUser } from "./types";

export const mockTransactions: Transaction[] = [
    { id: "1", type: "reward", amount: 250, description: "Daily login bonus", date: "2 hours ago" },
    { id: "2", type: "purchase", amount: -500, description: "Legendary Avatar", date: "1 day ago", hash: "0x7a8b..." },
    { id: "3", type: "receive", amount: 1000, description: "From @johndoe", date: "2 days ago", hash: "0x9c4d..." },
    { id: "4", type: "reward", amount: 150, description: "Comment liked", date: "3 days ago" },
    { id: "5", type: "send", amount: -300, description: "To @janesmith", date: "5 days ago", hash: "0x2f1e..." },
];

export const quickTransferUsers: QuickTransferUser[] = [
    { id: "1", name: "John Doe", username: "@johndoe", avatar: "https://chirps-chat.sirv.com/frog.png" },
    { id: "2", name: "Jane Smith", username: "@janesmith", avatar: "https://chirps-chat.sirv.com/tiger.png" },
    { id: "3", name: "Bob Wilson", username: "@bobwilson", avatar: "https://chirps-chat.sirv.com/octopus.png" },
    { id: "4", name: "Alice Brown", username: "@alicebrown", avatar: "https://chirps-chat.sirv.com/shark.png", status: "online" },
    { id: "5", name: "Mike Johnson", username: "@mikej", avatar: "https://chirps-chat.sirv.com/tiger.png", status: "away" },
    { id: "6", name: "Sarah Williams", username: "@sarahw", avatar: "https://chirps-chat.sirv.com/shark.png" },
];

