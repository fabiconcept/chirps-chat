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