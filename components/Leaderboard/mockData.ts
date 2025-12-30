import { LeaderboardUser } from "./types";

// Current logged-in user (rank 8 in this example)
export const currentUser: LeaderboardUser = {
    id: "current-user",
    name: "You",
    username: "yourhandle",
    avatar: "https://chirps-chat.sirv.com/premium/afro-mask.png",
    country: "Nigeria",
    countryCode: "NG",
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
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/decision.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/frankenstein.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/freddy.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/gachi.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/hazard.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/grinch.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/ironman.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/joker.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/ninja.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/mummy.png",
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
        avatar: "https://chirps-chat.sirv.com/premium/skull.png",
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
    // NIGERIA - Heavy representation
    {
        id: "user-16",
        name: "Chinedu Okafor",
        username: "chineduok",
        avatar: "https://chirps-chat.sirv.com/premium/troll.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 6.5244,
        lng: 3.3792, // Lagos
        stats: {
            streak: 342,
            tokens: 112300,
            followers: 41200,
            likes: 723450,
            posts: 3180,
            rooms: 24
        },
        change: 2
    },
    {
        id: "user-17",
        name: "Ngozi Adeyemi",
        username: "ngoziadeyemi",
        avatar: "https://chirps-chat.sirv.com/premium/robin.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 6.5244,
        lng: 3.3792, // Lagos
        stats: {
            streak: 289,
            tokens: 95670,
            followers: 38450,
            likes: 645890,
            posts: 2890,
            rooms: 21
        },
        change: 1
    },
    {
        id: "user-18",
        name: "Oluwaseun Bakare",
        username: "oluwaseunb",
        avatar: "https://chirps-chat.sirv.com/premium/james-brown.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 7.3775,
        lng: 3.9470, // Ibadan
        stats: {
            streak: 267,
            tokens: 88940,
            followers: 35120,
            likes: 589230,
            posts: 2670,
            rooms: 19
        },
        change: 0
    },
    {
        id: "user-19",
        name: "Amaka Nwosu",
        username: "amakanwosu",
        avatar: "https://chirps-chat.sirv.com/premium/emily-bronte.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 9.0579,
        lng: 7.4951, // Abuja
        stats: {
            streak: 254,
            tokens: 82100,
            followers: 32890,
            likes: 534670,
            posts: 2490,
            rooms: 18
        },
        change: -1
    },
    {
        id: "user-20",
        name: "Emeka Eze",
        username: "emekaeze",
        avatar: "https://chirps-chat.sirv.com/premium/genie.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 6.2649,
        lng: 7.4004, // Enugu
        stats: {
            streak: 238,
            tokens: 75890,
            followers: 29340,
            likes: 487650,
            posts: 2210,
            rooms: 16
        },
        change: 3
    },
    {
        id: "user-21",
        name: "Blessing Okoro",
        username: "blessingok",
        avatar: "https://chirps-chat.sirv.com/premium/clown.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 4.8156,
        lng: 7.0498, // Port Harcourt
        stats: {
            streak: 226,
            tokens: 69450,
            followers: 27120,
            likes: 445890,
            posts: 2050,
            rooms: 15
        },
        change: 1
    },
    {
        id: "user-22",
        name: "Tunde Ajayi",
        username: "tundeajayi",
        avatar: "https://chirps-chat.sirv.com/premium/god.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 12.0022,
        lng: 8.5919, // Kano
        stats: {
            streak: 215,
            tokens: 64780,
            followers: 25340,
            likes: 412340,
            posts: 1920,
            rooms: 14
        },
        change: 0
    },
    {
        id: "user-23",
        name: "Chioma Okonkwo",
        username: "chiomaokonkwo",
        avatar: "https://chirps-chat.sirv.com/premium/halloween.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 6.5244,
        lng: 3.3792, // Lagos
        stats: {
            streak: 203,
            tokens: 59670,
            followers: 23120,
            likes: 389450,
            posts: 1780,
            rooms: 13
        },
        change: -2
    },
    {
        id: "user-24",
        name: "Ibrahim Yusuf",
        username: "ibrahimy",
        avatar: "https://chirps-chat.sirv.com/premium/jack-skellington.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 9.0579,
        lng: 7.4951, // Abuja
        stats: {
            streak: 192,
            tokens: 55120,
            followers: 21450,
            likes: 356780,
            posts: 1650,
            rooms: 12
        },
        change: 2
    },
    {
        id: "user-25",
        name: "Ada Obiora",
        username: "adaobiora",
        avatar: "https://chirps-chat.sirv.com/premium/jack-o-lantern.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 6.5244,
        lng: 3.3792, // Lagos
        stats: {
            streak: 183,
            tokens: 51890,
            followers: 19780,
            likes: 334560,
            posts: 1520,
            rooms: 11
        },
        change: 1
    },
    // GHANA - West Africa
    {
        id: "user-26",
        name: "Kwame Mensah",
        username: "kwamemensah",
        avatar: "https://chirps-chat.sirv.com/premium/mabel-pines.png",
        country: "Ghana",
        countryCode: "GH",
        lat: 5.6037,
        lng: -0.1870, // Accra
        stats: {
            streak: 271,
            tokens: 86340,
            followers: 33450,
            likes: 567890,
            posts: 2540,
            rooms: 17
        },
        change: 0
    },
    {
        id: "user-27",
        name: "Akosua Boateng",
        username: "akosuab",
        avatar: "https://chirps-chat.sirv.com/premium/native-american.png",
        country: "Ghana",
        countryCode: "GH",
        lat: 5.6037,
        lng: -0.1870, // Accra
        stats: {
            streak: 198,
            tokens: 57230,
            followers: 22100,
            likes: 378950,
            posts: 1690,
            rooms: 13
        },
        change: 2
    },
    {
        id: "user-28",
        name: "Kofi Asante",
        username: "kofiasante",
        avatar: "https://chirps-chat.sirv.com/premium/trollface.png",
        country: "Ghana",
        countryCode: "GH",
        lat: 6.6885,
        lng: -1.6244, // Kumasi
        stats: {
            streak: 175,
            tokens: 49560,
            followers: 18890,
            likes: 312450,
            posts: 1480,
            rooms: 10
        },
        change: -1
    },
    // SENEGAL - West Africa
    {
        id: "user-29",
        name: "Aminata Diallo",
        username: "aminatadiallo",
        avatar: "https://chirps-chat.sirv.com/premium/santa.png",
        country: "Senegal",
        countryCode: "SN",
        lat: 14.6928,
        lng: -17.4467, // Dakar
        stats: {
            streak: 243,
            tokens: 77120,
            followers: 30120,
            likes: 498760,
            posts: 2230,
            rooms: 16
        },
        change: 1
    },
    {
        id: "user-30",
        name: "Ousmane Sow",
        username: "ousmanesow",
        avatar: "https://chirps-chat.sirv.com/premium/spa-mask.png",
        country: "Senegal",
        countryCode: "SN",
        lat: 14.6928,
        lng: -17.4467, // Dakar
        stats: {
            streak: 186,
            tokens: 52670,
            followers: 20340,
            likes: 345120,
            posts: 1570,
            rooms: 12
        },
        change: 0
    },
    // IVORY COAST - West Africa
    {
        id: "user-31",
        name: "Adjoua Kouassi",
        username: "adjouakouassi",
        avatar: "https://chirps-chat.sirv.com/premium/orthodox.png",
        country: "Ivory Coast",
        countryCode: "CI",
        lat: 5.3599,
        lng: -4.0083, // Abidjan
        stats: {
            streak: 219,
            tokens: 66890,
            followers: 26120,
            likes: 429340,
            posts: 1940,
            rooms: 14
        },
        change: 2
    },
    {
        id: "user-32",
        name: "Yao N'Guessan",
        username: "yaonguessan",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Ivory Coast",
        countryCode: "CI",
        lat: 5.3599,
        lng: -4.0083, // Abidjan
        stats: {
            streak: 171,
            tokens: 48340,
            followers: 18120,
            likes: 298670,
            posts: 1420,
            rooms: 10
        },
        change: -1
    },
    // CAMEROON - Central/West Africa
    {
        id: "user-33",
        name: "Nadia Mbah",
        username: "nadiambah",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Cameroon",
        countryCode: "CM",
        lat: 3.8480,
        lng: 11.5021, // Yaoundé
        stats: {
            streak: 207,
            tokens: 61230,
            followers: 23890,
            likes: 396780,
            posts: 1810,
            rooms: 13
        },
        change: 1
    },
    {
        id: "user-34",
        name: "Pascal Etame",
        username: "pascaletame",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Cameroon",
        countryCode: "CM",
        lat: 4.0511,
        lng: 9.7679, // Douala
        stats: {
            streak: 164,
            tokens: 45670,
            followers: 17120,
            likes: 281340,
            posts: 1350,
            rooms: 9
        },
        change: 0
    },
    // KENYA - East Africa
    {
        id: "user-35",
        name: "Amani Ochieng",
        username: "amaniochieng",
        avatar: "https://chirps-chat.sirv.com/premium/slenderman.png",
        country: "Kenya",
        countryCode: "KE",
        lat: -1.2864,
        lng: 36.8172, // Nairobi
        stats: {
            streak: 232,
            tokens: 72340,
            followers: 28670,
            likes: 467890,
            posts: 2120,
            rooms: 15
        },
        change: 2
    },
    {
        id: "user-36",
        name: "Wanjiku Mwangi",
        username: "wanjikumwangi",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Kenya",
        countryCode: "KE",
        lat: -1.2864,
        lng: 36.8172, // Nairobi
        stats: {
            streak: 179,
            tokens: 50890,
            followers: 19560,
            likes: 323450,
            posts: 1490,
            rooms: 11
        },
        change: -2
    },
    // SOUTH AFRICA
    {
        id: "user-37",
        name: "Thabo Khumalo",
        username: "thabokhumalo",
        avatar: "https://chirps-chat.sirv.com/premium/mexican.png",
        country: "South Africa",
        countryCode: "ZA",
        lat: -26.2041,
        lng: 28.0473, // Johannesburg
        stats: {
            streak: 260,
            tokens: 83670,
            followers: 32450,
            likes: 543210,
            posts: 2450,
            rooms: 18
        },
        change: 1
    },
    {
        id: "user-38",
        name: "Zanele Ndlovu",
        username: "zanelendlovu",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "South Africa",
        countryCode: "ZA",
        lat: -33.9249,
        lng: 18.4241, // Cape Town
        stats: {
            streak: 195,
            tokens: 56230,
            followers: 21780,
            likes: 361240,
            posts: 1640,
            rooms: 12
        },
        change: 0
    },
    // MORE NIGERIA
    {
        id: "user-39",
        name: "Folake Adebayo",
        username: "folakeadebayo",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 6.5244,
        lng: 3.3792, // Lagos
        stats: {
            streak: 169,
            tokens: 47120,
            followers: 17890,
            likes: 293450,
            posts: 1380,
            rooms: 10
        },
        change: 1
    },
    {
        id: "user-40",
        name: "Victor Nnamdi",
        username: "victornnamdi",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 9.0579,
        lng: 7.4951, // Abuja
        stats: {
            streak: 157,
            tokens: 43780,
            followers: 16450,
            likes: 271890,
            posts: 1280,
            rooms: 9
        },
        change: -1
    },
    // ETHIOPIA - East Africa
    {
        id: "user-41",
        name: "Selam Tesfaye",
        username: "selamtesfaye",
        avatar: "https://chirps-chat.sirv.com/premium/carnival-queen.png",
        country: "Ethiopia",
        countryCode: "ET",
        lat: 9.0320,
        lng: 38.7469, // Addis Ababa
        stats: {
            streak: 281,
            tokens: 91450,
            followers: 35670,
            likes: 612340,
            posts: 2710,
            rooms: 20
        },
        change: 3
    },
    {
        id: "user-42",
        name: "Dawit Alemayehu",
        username: "dawitalemayehu",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Ethiopia",
        countryCode: "ET",
        lat: 9.0320,
        lng: 38.7469, // Addis Ababa
        stats: {
            streak: 208,
            tokens: 62340,
            followers: 24120,
            likes: 401230,
            posts: 1850,
            rooms: 14
        },
        change: 0
    },
    {
        id: "user-43",
        name: "Hiwot Bekele",
        username: "hiwotbekele",
        avatar: "https://chirps-chat.sirv.com/premium/god.png",
        country: "Ethiopia",
        countryCode: "ET",
        lat: 8.5588,
        lng: 39.2720, // Dire Dawa
        stats: {
            streak: 174,
            tokens: 49230,
            followers: 18670,
            likes: 308940,
            posts: 1460,
            rooms: 11
        },
        change: -1
    },
    {
        id: "user-44",
        name: "Yohannes Haile",
        username: "yohanneshaile",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Ethiopia",
        countryCode: "ET",
        lat: 13.4967,
        lng: 39.4754, // Mekelle
        stats: {
            streak: 162,
            tokens: 44890,
            followers: 16890,
            likes: 279450,
            posts: 1330,
            rooms: 9
        },
        change: 1
    },
    // TANZANIA - East Africa
    {
        id: "user-45",
        name: "Juma Mwinyimkuu",
        username: "jumamwinyimkuu",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Tanzania",
        countryCode: "TZ",
        lat: -6.7924,
        lng: 39.2083, // Dar es Salaam
        stats: {
            streak: 249,
            tokens: 79560,
            followers: 31230,
            likes: 521780,
            posts: 2340,
            rooms: 17
        },
        change: 2
    },
    {
        id: "user-46",
        name: "Amina Hassan",
        username: "aminahassan",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Tanzania",
        countryCode: "TZ",
        lat: -6.7924,
        lng: 39.2083, // Dar es Salaam
        stats: {
            streak: 196,
            tokens: 57890,
            followers: 22340,
            likes: 371290,
            posts: 1720,
            rooms: 13
        },
        change: -1
    },
    {
        id: "user-47",
        name: "Said Ramadhani",
        username: "saidramadhani",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Tanzania",
        countryCode: "TZ",
        lat: -3.3869,
        lng: 36.6830, // Arusha
        stats: {
            streak: 181,
            tokens: 51670,
            followers: 19890,
            likes: 329450,
            posts: 1580,
            rooms: 12
        },
        change: 0
    },
    {
        id: "user-48",
        name: "Asha Selemani",
        username: "ashaselemani",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Tanzania",
        countryCode: "TZ",
        lat: -6.1630,
        lng: 39.1991, // Zanzibar
        stats: {
            streak: 168,
            tokens: 46780,
            followers: 17670,
            likes: 291340,
            posts: 1410,
            rooms: 10
        },
        change: 2
    },
    // UGANDA - East Africa
    {
        id: "user-49",
        name: "Nakato Sophia",
        username: "nakatosophia",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Uganda",
        countryCode: "UG",
        lat: 0.3476,
        lng: 32.5825, // Kampala
        stats: {
            streak: 237,
            tokens: 74890,
            followers: 29450,
            likes: 489230,
            posts: 2180,
            rooms: 16
        },
        change: 1
    },
    {
        id: "user-50",
        name: "Ronald Okello",
        username: "ronaldokello",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Uganda",
        countryCode: "UG",
        lat: 0.3476,
        lng: 32.5825, // Kampala
        stats: {
            streak: 193,
            tokens: 55890,
            followers: 21560,
            likes: 357890,
            posts: 1680,
            rooms: 12
        },
        change: 0
    },
    {
        id: "user-51",
        name: "Patricia Namuddu",
        username: "patricianamuddu",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Uganda",
        countryCode: "UG",
        lat: 2.7747,
        lng: 32.2990, // Gulu
        stats: {
            streak: 172,
            tokens: 48560,
            followers: 18340,
            likes: 303450,
            posts: 1440,
            rooms: 11
        },
        change: -2
    },
    {
        id: "user-52",
        name: "David Mukasa",
        username: "davidmukasa",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Uganda",
        countryCode: "UG",
        lat: 0.0600,
        lng: 32.4500, // Entebbe
        stats: {
            streak: 159,
            tokens: 43450,
            followers: 16340,
            likes: 269780,
            posts: 1310,
            rooms: 9
        },
        change: 1
    },
    // MOROCCO - North Africa
    {
        id: "user-53",
        name: "Youssef Benali",
        username: "youssefbenali",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Morocco",
        countryCode: "MA",
        lat: 33.9716,
        lng: -6.8498, // Rabat
        stats: {
            streak: 263,
            tokens: 85230,
            followers: 33120,
            likes: 556780,
            posts: 2480,
            rooms: 19
        },
        change: 2
    },
    {
        id: "user-54",
        name: "Fatima Zahra El Alaoui",
        username: "fatimazahra",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Morocco",
        countryCode: "MA",
        lat: 33.5731,
        lng: -7.5898, // Casablanca
        stats: {
            streak: 211,
            tokens: 63890,
            followers: 24780,
            likes: 412340,
            posts: 1890,
            rooms: 14
        },
        change: 0
    },
    {
        id: "user-55",
        name: "Omar Benjelloun",
        username: "omarbenjelloun",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Morocco",
        countryCode: "MA",
        lat: 31.6295,
        lng: -7.9811, // Marrakech
        stats: {
            streak: 187,
            tokens: 53670,
            followers: 20670,
            likes: 343210,
            posts: 1620,
            rooms: 12
        },
        change: -1
    },
    {
        id: "user-56",
        name: "Amal Idrissi",
        username: "amalidrissi",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Morocco",
        countryCode: "MA",
        lat: 34.0209,
        lng: -6.8416, // Fes
        stats: {
            streak: 166,
            tokens: 45890,
            followers: 17230,
            likes: 284560,
            posts: 1370,
            rooms: 10
        },
        change: 1
    },
    // ALGERIA - North Africa
    {
        id: "user-57",
        name: "Karim Boumediene",
        username: "karimboumediene",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Algeria",
        countryCode: "DZ",
        lat: 36.7538,
        lng: 3.0588, // Algiers
        stats: {
            streak: 229,
            tokens: 71230,
            followers: 27890,
            likes: 467340,
            posts: 2140,
            rooms: 15
        },
        change: 3
    },
    {
        id: "user-58",
        name: "Nadia Kaci",
        username: "nadiakaci",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Algeria",
        countryCode: "DZ",
        lat: 36.7538,
        lng: 3.0588, // Algiers
        stats: {
            streak: 191,
            tokens: 55120,
            followers: 21340,
            likes: 354670,
            posts: 1670,
            rooms: 12
        },
        change: 0
    },
    {
        id: "user-59",
        name: "Mehdi Brahimi",
        username: "mehdibrahimi",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Algeria",
        countryCode: "DZ",
        lat: 35.6969,
        lng: -0.6331, // Oran
        stats: {
            streak: 176,
            tokens: 50120,
            followers: 19230,
            likes: 318450,
            posts: 1510,
            rooms: 11
        },
        change: -1
    },
    {
        id: "user-60",
        name: "Samia Hadji",
        username: "samiahadji",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Algeria",
        countryCode: "DZ",
        lat: 36.3650,
        lng: 6.6147, // Constantine
        stats: {
            streak: 163,
            tokens: 44670,
            followers: 16780,
            likes: 276890,
            posts: 1340,
            rooms: 9
        },
        change: 2
    },
    // TUNISIA - North Africa
    {
        id: "user-61",
        name: "Sami Trabelsi",
        username: "samitrabelsi",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Tunisia",
        countryCode: "TN",
        lat: 36.8065,
        lng: 10.1815, // Tunis
        stats: {
            streak: 218,
            tokens: 66450,
            followers: 25890,
            likes: 428670,
            posts: 1970,
            rooms: 14
        },
        change: 1
    },
    {
        id: "user-62",
        name: "Leila Ben Amor",
        username: "leilabenamor",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Tunisia",
        countryCode: "TN",
        lat: 36.8065,
        lng: 10.1815, // Tunis
        stats: {
            streak: 184,
            tokens: 52340,
            followers: 20120,
            likes: 334560,
            posts: 1600,
            rooms: 12
        },
        change: 0
    },
    {
        id: "user-63",
        name: "Youssef Chahed",
        username: "youssefchahed",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Tunisia",
        countryCode: "TN",
        lat: 35.8256,
        lng: 10.6369, // Sousse
        stats: {
            streak: 170,
            tokens: 47670,
            followers: 18010,
            likes: 297890,
            posts: 1430,
            rooms: 10
        },
        change: -2
    },
    {
        id: "user-64",
        name: "Ines Jendoubi",
        username: "inesjendoubi",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Tunisia",
        countryCode: "TN",
        lat: 34.7406,
        lng: 10.7603, // Sfax
        stats: {
            streak: 154,
            tokens: 42120,
            followers: 15890,
            likes: 262340,
            posts: 1270,
            rooms: 9
        },
        change: 1
    },
    // RWANDA - East/Central Africa
    {
        id: "user-65",
        name: "Jean-Claude Nkusi",
        username: "jeanclaudenk",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Rwanda",
        countryCode: "RW",
        lat: -1.9403,
        lng: 29.8739, // Kigali
        stats: {
            streak: 241,
            tokens: 76890,
            followers: 30120,
            likes: 501230,
            posts: 2260,
            rooms: 16
        },
        change: 2
    },
    {
        id: "user-66",
        name: "Grace Uwase",
        username: "graceuwase",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Rwanda",
        countryCode: "RW",
        lat: -1.9403,
        lng: 29.8739, // Kigali
        stats: {
            streak: 199,
            tokens: 58340,
            followers: 22560,
            likes: 374890,
            posts: 1730,
            rooms: 13
        },
        change: 0
    },
    {
        id: "user-67",
        name: "Eric Habimana",
        username: "erichabimana",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Rwanda",
        countryCode: "RW",
        lat: -2.5955,
        lng: 29.7489, // Butare
        stats: {
            streak: 177,
            tokens: 50670,
            followers: 19450,
            likes: 322340,
            posts: 1530,
            rooms: 11
        },
        change: -1
    },
    {
        id: "user-68",
        name: "Diane Mukeshimana",
        username: "dianemukeshimana",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Rwanda",
        countryCode: "RW",
        lat: -1.6786,
        lng: 29.2339, // Gisenyi
        stats: {
            streak: 161,
            tokens: 44230,
            followers: 16670,
            likes: 275450,
            posts: 1320,
            rooms: 10
        },
        change: 1
    },
    // More GHANA
    {
        id: "user-69",
        name: "Ama Ofori",
        username: "amaofori",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Ghana",
        countryCode: "GH",
        lat: 5.6037,
        lng: -0.1870, // Accra
        stats: {
            streak: 205,
            tokens: 60890,
            followers: 23670,
            likes: 393450,
            posts: 1830,
            rooms: 13
        },
        change: 2
    },
    // More SENEGAL
    {
        id: "user-70",
        name: "Fatou Ndiaye",
        username: "fatoundiaye",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Senegal",
        countryCode: "SN",
        lat: 14.6928,
        lng: -17.4467, // Dakar
        stats: {
            streak: 214,
            tokens: 64560,
            followers: 25120,
            likes: 417890,
            posts: 1910,
            rooms: 14
        },
        change: 1
    },
    {
        id: "user-71",
        name: "Moussa Sall",
        username: "moussasall",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Senegal",
        countryCode: "SN",
        lat: 14.6928,
        lng: -17.4467, // Dakar
        stats: {
            streak: 173,
            tokens: 48890,
            followers: 18560,
            likes: 307230,
            posts: 1450,
            rooms: 11
        },
        change: 0
    },
    // More KENYA
    {
        id: "user-72",
        name: "Kevin Otieno",
        username: "kevinotieno",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Kenya",
        countryCode: "KE",
        lat: -1.2864,
        lng: 36.8172, // Nairobi
        stats: {
            streak: 222,
            tokens: 68340,
            followers: 26780,
            likes: 445670,
            posts: 2030,
            rooms: 15
        },
        change: 1
    },
    {
        id: "user-73",
        name: "Faith Akinyi",
        username: "faithakinyi",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Kenya",
        countryCode: "KE",
        lat: -0.0917,
        lng: 34.7680, // Kisumu
        stats: {
            streak: 188,
            tokens: 54120,
            followers: 20890,
            likes: 346780,
            posts: 1640,
            rooms: 12
        },
        change: -1
    },
    // More SOUTH AFRICA
    {
        id: "user-74",
        name: "Sipho Mthembu",
        username: "siphomthembu",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "South Africa",
        countryCode: "ZA",
        lat: -29.8587,
        lng: 31.0218, // Durban
        stats: {
            streak: 227,
            tokens: 70560,
            followers: 27670,
            likes: 459230,
            posts: 2110,
            rooms: 15
        },
        change: 2
    },
    {
        id: "user-75",
        name: "Nomvula Zulu",
        username: "nomvulazulu",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "South Africa",
        countryCode: "ZA",
        lat: -25.7479,
        lng: 28.2293, // Pretoria
        stats: {
            streak: 190,
            tokens: 54890,
            followers: 21230,
            likes: 352340,
            posts: 1660,
            rooms: 12
        },
        change: 0
    },
    // ZIMBABWE - Southern Africa
    {
        id: "user-76",
        name: "Tapiwa Moyo",
        username: "tapiwamoyo",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Zimbabwe",
        countryCode: "ZW",
        lat: -17.8252,
        lng: 31.0335, // Harare
        stats: {
            streak: 235,
            tokens: 73450,
            followers: 28890,
            likes: 476230,
            posts: 2190,
            rooms: 16
        },
        change: 1
    },
    {
        id: "user-77",
        name: "Rudo Ncube",
        username: "rudoncube",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Zimbabwe",
        countryCode: "ZW",
        lat: -17.8252,
        lng: 31.0335, // Harare
        stats: {
            streak: 202,
            tokens: 59670,
            followers: 23120,
            likes: 384560,
            posts: 1790,
            rooms: 13
        },
        change: 0
    },
    {
        id: "user-78",
        name: "Tendai Chikwanha",
        username: "tendaichikwanha",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Zimbabwe",
        countryCode: "ZW",
        lat: -20.1392,
        lng: 28.5789, // Bulawayo
        stats: {
            streak: 182,
            tokens: 51890,
            followers: 20010,
            likes: 331240,
            posts: 1590,
            rooms: 12
        },
        change: -1
    },
    {
        id: "user-79",
        name: "Tsitsi Mlambo",
        username: "tsitsimlambo",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Zimbabwe",
        countryCode: "ZW",
        lat: -18.9787,
        lng: 32.6707, // Mutare
        stats: {
            streak: 165,
            tokens: 45340,
            followers: 17120,
            likes: 282450,
            posts: 1360,
            rooms: 10
        },
        change: 2
    },
    {
        id: "user-80",
        name: "Farai Sibanda",
        username: "faraisibanda",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Zimbabwe",
        countryCode: "ZW",
        lat: -17.8252,
        lng: 31.0335, // Harare
        stats: {
            streak: 153,
            tokens: 41670,
            followers: 15780,
            likes: 260890,
            posts: 1260,
            rooms: 9
        },
        change: 0
    },
    {
        id: "user-81",
        name: "Chipo Dube",
        username: "chipodube",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Zimbabwe",
        countryCode: "ZW",
        lat: -19.4500,
        lng: 29.8167, // Gweru
        stats: {
            streak: 148,
            tokens: 39890,
            followers: 15120,
            likes: 249670,
            posts: 1210,
            rooms: 9
        },
        change: 1
    },
    // ZAMBIA - Southern Africa
    {
        id: "user-82",
        name: "Mwape Banda",
        username: "mwapebanda",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Zambia",
        countryCode: "ZM",
        lat: -15.4167,
        lng: 28.2833, // Lusaka
        stats: {
            streak: 224,
            tokens: 69230,
            followers: 27120,
            likes: 451890,
            posts: 2070,
            rooms: 15
        },
        change: 2
    },
    {
        id: "user-83",
        name: "Chilufya Mulenga",
        username: "chilufyamulenga",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Zambia",
        countryCode: "ZM",
        lat: -15.4167,
        lng: 28.2833, // Lusaka
        stats: {
            streak: 197,
            tokens: 57560,
            followers: 22340,
            likes: 370120,
            posts: 1710,
            rooms: 13
        },
        change: 0
    },
    {
        id: "user-84",
        name: "Mutale Phiri",
        username: "mutalephiri",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Zambia",
        countryCode: "ZM",
        lat: -12.9704,
        lng: 28.6396, // Ndola
        stats: {
            streak: 180,
            tokens: 51120,
            followers: 19670,
            likes: 326780,
            posts: 1560,
            rooms: 11
        },
        change: -1
    },
    {
        id: "user-85",
        name: "Bwalya Sakala",
        username: "bwalyasakala",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Zambia",
        countryCode: "ZM",
        lat: -12.8089,
        lng: 28.2040, // Kitwe
        stats: {
            streak: 167,
            tokens: 46120,
            followers: 17450,
            likes: 287340,
            posts: 1390,
            rooms: 10
        },
        change: 1
    },
    {
        id: "user-86",
        name: "Thandiwe Zulu",
        username: "thandiwezulu",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Zambia",
        countryCode: "ZM",
        lat: -15.4167,
        lng: 28.2833, // Lusaka
        stats: {
            streak: 155,
            tokens: 42560,
            followers: 16120,
            likes: 266450,
            posts: 1280,
            rooms: 9
        },
        change: 0
    },
    {
        id: "user-87",
        name: "Chipego Mwansa",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        username: "chipegomwansa",
        country: "Zambia",
        countryCode: "ZM",
        lat: -14.4469,
        lng: 28.8467, // Kabwe
        stats: {
            streak: 142,
            tokens: 38230,
            followers: 14560,
            likes: 240670,
            posts: 1170,
            rooms: 8
        },
        change: -2
    },
    // MOZAMBIQUE - Southern Africa
    {
        id: "user-88",
        name: "Amelia Macamo",
        username: "ameliamacamo",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Mozambique",
        countryCode: "MZ",
        lat: -25.9655,
        lng: 32.5832, // Maputo
        stats: {
            streak: 216,
            tokens: 65670,
            followers: 25560,
            likes: 423450,
            posts: 1950,
            rooms: 14
        },
        change: 1
    },
    {
        id: "user-89",
        name: "João Sithole",
        username: "joaosithole",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Mozambique",
        countryCode: "MZ",
        lat: -25.9655,
        lng: 32.5832, // Maputo
        stats: {
            streak: 194,
            tokens: 56340,
            followers: 21780,
            likes: 361890,
            posts: 1690,
            rooms: 12
        },
        change: 0
    },
    {
        id: "user-90",
        name: "Graça Nhantumbo",
        username: "gracanhantumbo",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Mozambique",
        countryCode: "MZ",
        lat: -19.8436,
        lng: 34.8389, // Beira
        stats: {
            streak: 175,
            tokens: 49780,
            followers: 19120,
            likes: 316890,
            posts: 1520,
            rooms: 11
        },
        change: -1
    },
    {
        id: "user-91",
        name: "Pedro Cossa",
        username: "pedrocossa",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Mozambique",
        countryCode: "MZ",
        lat: -15.1165,
        lng: 39.2666, // Nampula
        stats: {
            streak: 163,
            tokens: 44890,
            followers: 16890,
            likes: 279120,
            posts: 1350,
            rooms: 10
        },
        change: 2
    },
    {
        id: "user-92",
        name: "Sandra Mahumane",
        username: "sandramahumane",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Mozambique",
        countryCode: "MZ",
        lat: -23.8574,
        lng: 35.3830, // Inhambane
        stats: {
            streak: 150,
            tokens: 40670,
            followers: 15340,
            likes: 253450,
            posts: 1230,
            rooms: 9
        },
        change: 0
    },
    {
        id: "user-93",
        name: "Armando Chissano",
        username: "armandochissano",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Mozambique",
        countryCode: "MZ",
        lat: -25.9655,
        lng: 32.5832, // Maputo
        stats: {
            streak: 145,
            tokens: 38890,
            followers: 14670,
            likes: 242120,
            posts: 1180,
            rooms: 8
        },
        change: 1
    },
    // BOTSWANA - Southern Africa
    {
        id: "user-94",
        name: "Kgosi Molosiwa",
        username: "kgosimolosiwa",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Botswana",
        countryCode: "BW",
        lat: -24.6282,
        lng: 25.9231, // Gaborone
        stats: {
            streak: 209,
            tokens: 62120,
            followers: 24230,
            likes: 401670,
            posts: 1860,
            rooms: 13
        },
        change: 2
    },
    {
        id: "user-95",
        name: "Lesego Kgaswe",
        username: "lesegokgaswe",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Botswana",
        countryCode: "BW",
        lat: -24.6282,
        lng: 25.9231, // Gaborone
        stats: {
            streak: 185,
            tokens: 53230,
            followers: 20560,
            likes: 341230,
            posts: 1610,
            rooms: 12
        },
        change: 0
    },
    {
        id: "user-96",
        name: "Thabo Mmusi",
        username: "thabommusi",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Botswana",
        countryCode: "BW",
        lat: -21.1594,
        lng: 27.5136, // Francistown
        stats: {
            streak: 171,
            tokens: 48120,
            followers: 18340,
            likes: 303670,
            posts: 1460,
            rooms: 11
        },
        change: -1
    },
    {
        id: "user-97",
        name: "Neo Khutsafalo",
        username: "neokhutsafalo",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Botswana",
        countryCode: "BW",
        lat: -24.6282,
        lng: 25.9231, // Gaborone
        stats: {
            streak: 158,
            tokens: 43340,
            followers: 16340,
            likes: 269890,
            posts: 1300,
            rooms: 9
        },
        change: 1
    },
    {
        id: "user-98",
        name: "Mpho Segale",
        username: "mphosegale",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Botswana",
        countryCode: "BW",
        lat: -19.9529,
        lng: 23.4116, // Maun
        stats: {
            streak: 146,
            tokens: 39230,
            followers: 14890,
            likes: 245670,
            posts: 1190,
            rooms: 8
        },
        change: 0
    },
    {
        id: "user-99",
        name: "Kitso Mogomotsi",
        username: "kitsomogomotsi",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Botswana",
        countryCode: "BW",
        lat: -22.5597,
        lng: 27.1767, // Selebi-Phikwe
        stats: {
            streak: 139,
            tokens: 37120,
            followers: 14010,
            likes: 231450,
            posts: 1140,
            rooms: 8
        },
        change: -2
    },
    // NAMIBIA - Southern Africa
    {
        id: "user-100",
        name: "Andreas Shikongo",
        username: "andreasshikongo",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Namibia",
        countryCode: "NA",
        lat: -22.5597,
        lng: 17.0832, // Windhoek
        stats: {
            streak: 200,
            tokens: 58670,
            followers: 22780,
            likes: 378340,
            posts: 1760,
            rooms: 13
        },
        change: 1
    },
    {
        id: "user-101",
        name: "Maria Nghipunya",
        username: "marianghipunya",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Namibia",
        countryCode: "NA",
        lat: -22.5597,
        lng: 17.0832, // Windhoek
        stats: {
            streak: 178,
            tokens: 50890,
            followers: 19560,
            likes: 324560,
            posts: 1540,
            rooms: 11
        },
        change: 0
    },
    {
        id: "user-102",
        name: "Sakeus Iilonga",
        username: "sakeus_iilonga",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Namibia",
        countryCode: "NA",
        lat: -17.7833,
        lng: 15.9167, // Oshakati
        stats: {
            streak: 164,
            tokens: 45230,
            followers: 17010,
            likes: 281670,
            posts: 1360,
            rooms: 10
        },
        change: -1
    },
    {
        id: "user-103",
        name: "Hilma Ndapewa",
        username: "hilmandapewa",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Namibia",
        countryCode: "NA",
        lat: -22.9576,
        lng: 14.5053, // Walvis Bay
        stats: {
            streak: 151,
            tokens: 41230,
            followers: 15560,
            likes: 257890,
            posts: 1250,
            rooms: 9
        },
        change: 2
    },
    {
        id: "user-104",
        name: "Johannes Hamutenya",
        username: "johanneshamutenya",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Namibia",
        countryCode: "NA",
        lat: -26.5833,
        lng: 18.1333, // Keetmanshoop
        stats: {
            streak: 143,
            tokens: 38560,
            followers: 14340,
            likes: 237450,
            posts: 1160,
            rooms: 8
        },
        change: 0
    },
    {
        id: "user-105",
        name: "Selma Nangolo",
        username: "selmanangolo",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Namibia",
        countryCode: "NA",
        lat: -22.5597,
        lng: 17.0832, // Windhoek (CORRECTED)
        stats: {
            streak: 137,
            tokens: 36670,
            followers: 13780,
            likes: 227890,
            posts: 1120,
            rooms: 8
        },
        change: 1
    },
    // MALI - West Africa
    {
        id: "user-106",
        name: "Aminata Traoré",
        username: "aminatatraore",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Mali",
        countryCode: "ML",
        lat: 12.6392,
        lng: -8.0029, // Bamako
        stats: {
            streak: 135,
            tokens: 35890,
            followers: 13450,
            likes: 223450,
            posts: 1090,
            rooms: 8
        },
        change: 2
    },
    {
        id: "user-107",
        name: "Moussa Keita",
        username: "moussakeita",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Mali",
        countryCode: "ML",
        lat: 12.6392,
        lng: -8.0029, // Bamako
        stats: {
            streak: 130,
            tokens: 34560,
            followers: 12890,
            likes: 214560,
            posts: 1050,
            rooms: 7
        },
        change: 0
    },
    {
        id: "user-108",
        name: "Fatoumata Diarra",
        username: "fatoumatodiarra",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Mali",
        countryCode: "ML",
        lat: 14.4942,
        lng: -4.2037, // Sikasso
        stats: {
            streak: 126,
            tokens: 33120,
            followers: 12340,
            likes: 206780,
            posts: 1010,
            rooms: 7
        },
        change: -1
    },
    // BURKINA FASO - West Africa
    {
        id: "user-109",
        name: "Jean-Baptiste Ouedraogo",
        username: "jbouedraogo",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Burkina Faso",
        countryCode: "BF",
        lat: 12.3714,
        lng: -1.5197, // Ouagadougou
        stats: {
            streak: 123,
            tokens: 32340,
            followers: 11890,
            likes: 199450,
            posts: 980,
            rooms: 7
        },
        change: 1
    },
    {
        id: "user-110",
        name: "Awa Sawadogo",
        username: "awasawadogo",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Burkina Faso",
        countryCode: "BF",
        lat: 12.3714,
        lng: -1.5197, // Ouagadougou
        stats: {
            streak: 119,
            tokens: 31120,
            followers: 11340,
            likes: 191230,
            posts: 950,
            rooms: 7
        },
        change: 0
    },
    {
        id: "user-111",
        name: "Pierre Kaboré",
        username: "pierrekabore",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Burkina Faso",
        countryCode: "BF",
        lat: 11.1827,
        lng: -4.2992, // Bobo-Dioulasso
        stats: {
            streak: 115,
            tokens: 29890,
            followers: 10780,
            likes: 183450,
            posts: 920,
            rooms: 6
        },
        change: -2
    },
    // NIGER - West Africa
    {
        id: "user-112",
        name: "Aissata Moussa",
        username: "aissatamoussa",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Niger",
        countryCode: "NE",
        lat: 13.5127,
        lng: 2.1126, // Niamey
        stats: {
            streak: 112,
            tokens: 28670,
            followers: 10230,
            likes: 175670,
            posts: 890,
            rooms: 6
        },
        change: 1
    },
    {
        id: "user-113",
        name: "Ibrahim Mahamadou",
        username: "ibrahimmahamadou",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Niger",
        countryCode: "NE",
        lat: 13.5127,
        lng: 2.1126, // Niamey
        stats: {
            streak: 108,
            tokens: 27450,
            followers: 9670,
            likes: 167890,
            posts: 860,
            rooms: 6
        },
        change: 0
    },
    // BENIN - West Africa
    {
        id: "user-114",
        name: "Céline Hounnou",
        username: "celinehounnou",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Benin",
        countryCode: "BJ",
        lat: 6.4969,
        lng: 2.6289, // Porto-Novo
        stats: {
            streak: 104,
            tokens: 26230,
            followers: 9120,
            likes: 160120,
            posts: 830,
            rooms: 6
        },
        change: 2
    },
    {
        id: "user-115",
        name: "Serge Akpovi",
        username: "sergeakpovi",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Benin",
        countryCode: "BJ",
        lat: 6.3654,
        lng: 2.4183, // Cotonou
        stats: {
            streak: 101,
            tokens: 25010,
            followers: 8560,
            likes: 152340,
            posts: 800,
            rooms: 5
        },
        change: -1
    },
    // TOGO - West Africa
    {
        id: "user-116",
        name: "Edem Koffi",
        username: "edemkoffi",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Togo",
        countryCode: "TG",
        lat: 6.1256,
        lng: 1.2254, // Lomé
        stats: {
            streak: 97,
            tokens: 23790,
            followers: 8010,
            likes: 144560,
            posts: 770,
            rooms: 5
        },
        change: 0
    },
    {
        id: "user-117",
        name: "Akosua Mensah",
        username: "akosuamensah",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Togo",
        countryCode: "TG",
        lat: 6.1256,
        lng: 1.2254, // Lomé
        stats: {
            streak: 93,
            tokens: 22570,
            followers: 7450,
            likes: 136780,
            posts: 740,
            rooms: 5
        },
        change: 1
    },
    // GUINEA - West Africa
    {
        id: "user-118",
        name: "Mamadou Diallo",
        username: "mamadoudiallo",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Guinea",
        countryCode: "GN",
        lat: 9.6412,
        lng: -13.5784, // Conakry
        stats: {
            streak: 89,
            tokens: 21340,
            followers: 6890,
            likes: 128990,
            posts: 710,
            rooms: 5
        },
        change: -2
    },
    {
        id: "user-119",
        name: "Aissatou Bah",
        username: "aissatoubah",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Guinea",
        countryCode: "GN",
        lat: 9.6412,
        lng: -13.5784, // Conakry
        stats: {
            streak: 86,
            tokens: 20120,
            followers: 6340,
            likes: 121230,
            posts: 680,
            rooms: 5
        },
        change: 0
    },
    // SIERRA LEONE - West Africa
    {
        id: "user-120",
        name: "Mohamed Kamara",
        username: "mohamedkamara",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Sierra Leone",
        countryCode: "SL",
        lat: 8.4657,
        lng: -13.2317, // Freetown
        stats: {
            streak: 82,
            tokens: 18900,
            followers: 5780,
            likes: 113450,
            posts: 650,
            rooms: 4
        },
        change: 1
    },
    {
        id: "user-121",
        name: "Mariama Sesay",
        username: "mariamasesay",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Sierra Leone",
        countryCode: "SL",
        lat: 8.4657,
        lng: -13.2317, // Freetown
        stats: {
            streak: 79,
            tokens: 17680,
            followers: 5230,
            likes: 105670,
            posts: 620,
            rooms: 4
        },
        change: 0
    },
    // LIBERIA - West Africa
    {
        id: "user-122",
        name: "John Doe",
        username: "johndoe_lr",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Liberia",
        countryCode: "LR",
        lat: 6.3156,
        lng: -10.8074, // Monrovia
        stats: {
            streak: 75,
            tokens: 16450,
            followers: 4670,
            likes: 97890,
            posts: 590,
            rooms: 4
        },
        change: -1
    },
    {
        id: "user-123",
        name: "Ruth Johnson",
        username: "ruthjohnson",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Liberia",
        countryCode: "LR",
        lat: 6.3156,
        lng: -10.8074, // Monrovia
        stats: {
            streak: 72,
            tokens: 15230,
            followers: 4120,
            likes: 90120,
            posts: 560,
            rooms: 4
        },
        change: 2
    },
    // MAURITANIA - West Africa
    {
        id: "user-124",
        name: "Fatima Mint Ahmed",
        username: "fatimamintahmed",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Mauritania",
        countryCode: "MR",
        lat: 18.0735,
        lng: -15.9582, // Nouakchott
        stats: {
            streak: 68,
            tokens: 14010,
            followers: 3560,
            likes: 82340,
            posts: 530,
            rooms: 3
        },
        change: 0
    },
    {
        id: "user-125",
        name: "Mohamed Ould Cheikh",
        username: "mohamedouldcheikh",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Mauritania",
        countryCode: "MR",
        lat: 18.0735,
        lng: -15.9582, // Nouakchott
        stats: {
            streak: 65,
            tokens: 12790,
            followers: 3010,
            likes: 74560,
            posts: 500,
            rooms: 3
        },
        change: 1
    },
    // GAMBIA - West Africa
    {
        id: "user-126",
        name: "Binta Jallow",
        username: "bintajallow",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Gambia",
        countryCode: "GM",
        lat: 13.4549,
        lng: -16.5790, // Banjul
        stats: {
            streak: 61,
            tokens: 11570,
            followers: 2460,
            likes: 66780,
            posts: 470,
            rooms: 3
        },
        change: -2
    },
    {
        id: "user-127",
        name: "Lamin Ceesay",
        username: "laminceesay",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Gambia",
        countryCode: "GM",
        lat: 13.4549,
        lng: -16.5790, // Banjul
        stats: {
            streak: 58,
            tokens: 10340,
            followers: 1910,
            likes: 59120,
            posts: 440,
            rooms: 3
        },
        change: 0
    },
    // CABO VERDE (Cape Verde) - West Africa
    {
        id: "user-128",
        name: "Maria da Silva",
        username: "mariadasilva",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Cabo Verde",
        countryCode: "CV",
        lat: 14.9330,
        lng: -23.5133, // Praia
        stats: {
            streak: 54,
            tokens: 9120,
            followers: 1360,
            likes: 51340,
            posts: 410,
            rooms: 2
        },
        change: 1
    },
    {
        id: "user-129",
        name: "José Lopes",
        username: "joselopes",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Cabo Verde",
        countryCode: "CV",
        lat: 14.9330,
        lng: -23.5133, // Praia
        stats: {
            streak: 51,
            tokens: 7900,
            followers: 810,
            likes: 43560,
            posts: 380,
            rooms: 2
        },
        change: 0
    },
    // More NIGERIA - Additional cities
    {
        id: "user-130",
        name: "Chiamaka Nnadi",
        username: "chiamakannadi",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 5.4527,
        lng: 7.5248, // Calabar
        stats: {
            streak: 149,
            tokens: 40120,
            followers: 15230,
            likes: 251890,
            posts: 1220,
            rooms: 9
        },
        change: 2
    },
    {
        id: "user-131",
        name: "Usman Abubakar",
        username: "usmanabubakar",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 10.5105,
        lng: 7.4165, // Kaduna
        stats: {
            streak: 141,
            tokens: 37890,
            followers: 14340,
            likes: 239120,
            posts: 1160,
            rooms: 8
        },
        change: 0
    },
    {
        id: "user-132",
        name: "Nnenna Obi",
        username: "nnennaobi",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Nigeria",
        countryCode: "NG",
        lat: 6.3350,
        lng: 5.6037, // Benin City
        stats: {
            streak: 134,
            tokens: 35670,
            followers: 13450,
            likes: 227340,
            posts: 1100,
            rooms: 8
        },
        change: 1
    },
    // CONGO (DRC) - Central Africa
    {
        id: "user-133",
        name: "Jean-Pierre Kalala",
        username: "jeanpierrekalala",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "DR Congo",
        countryCode: "CD",
        lat: -4.3276,
        lng: 15.3136, // Kinshasa
        stats: {
            streak: 204,
            tokens: 60230,
            followers: 23340,
            likes: 390120,
            posts: 1820,
            rooms: 13
        },
        change: 3
    },
    {
        id: "user-134",
        name: "Cécile Mbuyi",
        username: "cecilembuyi",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "DR Congo",
        countryCode: "CD",
        lat: -4.3276,
        lng: 15.3136, // Kinshasa
        stats: {
            streak: 180,
            tokens: 51450,
            followers: 19890,
            likes: 328670,
            posts: 1570,
            rooms: 11
        },
        change: 0
    },
    {
        id: "user-135",
        name: "Patrick Tshisekedi",
        username: "patricktshisekedi",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "DR Congo",
        countryCode: "CD",
        lat: -11.6645,
        lng: 27.4794, // Lubumbashi
        stats: {
            streak: 166,
            tokens: 45560,
            followers: 17230,
            likes: 283450,
            posts: 1370,
            rooms: 10
        },
        change: -1
    },
    {
        id: "user-136",
        name: "Marie Kabila",
        username: "mariekabila",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "DR Congo",
        countryCode: "CD",
        lat: -1.6792,
        lng: 29.2228, // Goma
        stats: {
            streak: 152,
            tokens: 41010,
            followers: 15560,
            likes: 256780,
            posts: 1240,
            rooms: 9
        },
        change: 1
    },
    // ANGOLA - Southern Africa
    {
        id: "user-137",
        name: "Carlos Santos",
        username: "carlossantos",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Angola",
        countryCode: "AO",
        lat: -8.8383,
        lng: 13.2344, // Luanda
        stats: {
            streak: 192,
            tokens: 55670,
        followers: 21450,
            likes: 358900,
            posts: 1680,
            rooms: 12
        },
        change: 2
    },
    {
        id: "user-138",
        name: "Isabel Fernandes",
        username: "isabelfernandes",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Angola",
        countryCode: "AO",
        lat: -8.8383,
        lng: 13.2344, // Luanda
        stats: {
            streak: 173,
            tokens: 48780,
            followers: 18670,
            likes: 306120,
            posts: 1470,
            rooms: 11
        },
        change: 0
    },
    {
        id: "user-139",
        name: "António Neto",
        username: "antonioneto",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Angola",
        countryCode: "AO",
        lat: -12.5844,
        lng: 13.5757, // Benguela
        stats: {
            streak: 160,
            tokens: 43890,
            followers: 16560,
            likes: 274560,
            posts: 1320,
            rooms: 9
        },
        change: -2
    },
    // MADAGASCAR - East Africa (Island)
    {
        id: "user-140",
        name: "Hery Rasolofo",
        username: "heryrasolofo",
        avatar: "https://chirps-chat.sirv.com/parrot.png",
        country: "Madagascar",
        countryCode: "MG",
        lat: -18.8792,
        lng: 47.5079, // Antananarivo
        stats: {
            streak: 186,
            tokens: 52890,
            followers: 20340,
            likes: 343450,
            posts: 1610,
            rooms: 12
        },
        change: 1
    },
    {
        id: "user-141",
        name: "Fara Rakotomalala",
        username: "fararakotomalala",
        avatar: "https://chirps-chat.sirv.com/premium/dragon.png",
        country: "Madagascar",
        countryCode: "MG",
        lat: -18.8792,
        lng: 47.5079, // Antananarivo
        stats: {
            streak: 169,
            tokens: 46890,
            followers: 17890,
            likes: 293670,
            posts: 1410,
            rooms: 10
        },
        change: 0
    },
    {
        id: "user-142",
        name: "Tiana Andrianasolo",
        username: "tianaadrianasolo",
        avatar: "https://chirps-chat.sirv.com/frog.png",
        country: "Madagascar",
        countryCode: "MG",
        lat: -21.4599,
        lng: 47.0857, // Fianarantsoa
        stats: {
            streak: 154,
            tokens: 42010,
            followers: 15890,
            likes: 262780,
            posts: 1270,
            rooms: 9
        },
        change: 1
    },
    // MALAWI - Southern/East Africa
    {
        id: "user-143",
        name: "Chisomo Banda",
        username: "chisomobanda",
        avatar: "https://chirps-chat.sirv.com/premium/batman.png",
        country: "Malawi",
        countryCode: "MW",
        lat: -13.9626,
        lng: 33.7741, // Lilongwe
        stats: {
            streak: 147,
            tokens: 39450,
            followers: 14990,
            likes: 247890,
            posts: 1200,
            rooms: 8
        },
        change: 2
    },
    {
        id: "user-144",
        name: "Thoko Phiri",
        username: "thokophiri",
        avatar: "https://chirps-chat.sirv.com/premium/rasta.png",
        country: "Malawi",
        countryCode: "MW",
        lat: -15.7861,
        lng: 35.0058, // Blantyre
        stats: {
            streak: 140,
            tokens: 37670,
            followers: 14230,
            likes: 238450,
            posts: 1150,
            rooms: 8
        },
        change: 0
    },
    // BURUNDI - East/Central Africa
    {
        id: "user-145",
        name: "Pierre Niyonkuru",
        username: "pierreniyonkuru",
        avatar: "https://chirps-chat.sirv.com/premium/jolly-roger.png",
        country: "Burundi",
        countryCode: "BI",
        lat: -3.3822,
        lng: 29.3644, // Bujumbura
        stats: {
            streak: 133,
            tokens: 35230,
            followers: 13340,
            likes: 225670,
            posts: 1090,
            rooms: 7
        },
        change: 1
    },
    currentUser,
];

