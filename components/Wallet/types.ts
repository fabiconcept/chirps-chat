export type Transaction = {
    id: string;
    type: "reward" | "purchase" | "receive" | "send";
    amount: number;
    description: string;
    date: string;
    hash?: string;
};

export type QuickTransferUser = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    status?: "online" | "away" | "offline";
    balance?: number;
};

