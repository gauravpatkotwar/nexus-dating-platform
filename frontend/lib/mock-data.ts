import { AvatarConfig } from "../components/avatar/AvatarRenderer";

export interface Candidate {
  id: string;
  username: string;
  age: number;
  distanceKm: number;
  compatibility: number;
  mood: string;
  lookingFor: string;
  onlineStatus: "online" | "away" | "offline";
  verified: boolean;
  avatar: AvatarConfig;
  bio: string;
  lifestyle: string[];
  interests: string[];
  relationshipGoal: string;
  locationName: string;
  realPhotoPlaceholderUrl: string;
  instagramHidden: string;
  voiceIntroDuration: string;
}

export interface IcebreakerQuestion {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
}

export const ICEBREAKER_QUESTIONS: IcebreakerQuestion[] = [
  {
    id: "ib-1",
    question: "How do you jumpstart your mornings?",
    optionA: "☕ Artisanal Espresso / Coffee",
    optionB: "🍵 Calming Herbal Tea",
  },
  {
    id: "ib-2",
    question: "What is your ideal weekend vibe?",
    optionA: "🏖️ Sunset Beach Walk",
    optionB: "🏔️ Mountain Cabin Hike",
  },
  {
    id: "ib-3",
    question: "When are you most alive?",
    optionA: "🌙 Cyber Night Owl (2 AM)",
    optionB: "🌅 Fresh Early Bird (6 AM)",
  },
  {
    id: "ib-4",
    question: "Friday Night energy:",
    optionA: "🍿 Cozy Movie Marathon",
    optionB: "🪩 Neon Synthwave Club",
  },
  {
    id: "ib-5",
    question: "Pet companionship preference:",
    optionA: "🐱 Independent Mystical Cats",
    optionB: "🐶 Energetic Loyal Dogs",
  },
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "usr-101",
    username: "CyberValkyrie",
    age: 25,
    distanceKm: 3.2,
    compatibility: 96,
    mood: "🎧 Listening to Synthwave",
    lookingFor: "Casual Hookups & Late Night Talks",
    onlineStatus: "online",
    verified: true,
    avatar: {
      theme: "cyberpunk",
      hairStyle: "neon-spikes",
      hairColor: "#06B6D4",
      eyeColor: "#7C3AED",
      skinTone: "#F3D0D7",
      accessory: "cyber-viser",
      outfitColor: "#1E293B",
      background: "bg-gradient",
      frame: "neon-cyan",
    },
    bio: "AI researcher by day, arcade enthusiast by night. Looking for genuine chemistry where mind meets soul first.",
    lifestyle: ["Night Owl", "Gamer", "Coffee Addict"],
    interests: ["Anime", "Cyberpunk", "EDM", "Sci-Fi Movies", "Bouldering"],
    relationshipGoal: "Casual & Exploring",
    locationName: "Downtown Cyber District",
    realPhotoPlaceholderUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop",
    instagramHidden: "@valkyrie_neon",
    voiceIntroDuration: "0:28",
  },
  {
    id: "usr-102",
    username: "PixelKnight",
    age: 28,
    distanceKm: 5.8,
    compatibility: 91,
    mood: "🎮 Hosting Coop Raid",
    lookingFor: "Long-term Chemistry or Co-op Buddy",
    onlineStatus: "online",
    verified: true,
    avatar: {
      theme: "pixel",
      hairStyle: "short-fade",
      hairColor: "#3B82F6",
      eyeColor: "#10B981",
      skinTone: "#E0AC69",
      accessory: "glasses",
      outfitColor: "#0F172A",
      background: "pixel-bg",
      frame: "gold-vip",
    },
    bio: "Indie game dev & vinyl collector. I value deep banter over superficial profile photos. Let's conquer levels together.",
    lifestyle: ["Fitness", "Coffee Lover", "Early Bird"],
    interests: ["Retro Gaming", "Coffee", "Vinyls", "Cooking", "Photography"],
    relationshipGoal: "Relationship",
    locationName: "Metropolis Hub",
    realPhotoPlaceholderUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop",
    instagramHidden: "@pixel_knight_dev",
    voiceIntroDuration: "0:35",
  },
  {
    id: "usr-103",
    username: "AstralMuse",
    age: 24,
    distanceKm: 8.1,
    compatibility: 88,
    mood: "🎨 Sketching Digital Art",
    lookingFor: "Deep Connection & Creative Partner",
    onlineStatus: "away",
    verified: false,
    avatar: {
      theme: "anime",
      hairStyle: "long-waves",
      hairColor: "#EC4899",
      eyeColor: "#06B6D4",
      skinTone: "#FFDBAC",
      accessory: "cat-ears",
      outfitColor: "#7C3AED",
      background: "anime-bg",
      frame: "holo",
    },
    bio: "Digital artist dreaming in pastel gradients. If we match on icebreaker questions, coffee is on me.",
    lifestyle: ["Creative", "Tea Lover", "Night Owl"],
    interests: ["Art", "Design", "Acoustic Music", "Astronomy", "Cats"],
    relationshipGoal: "Friends & Dating",
    locationName: "Neo Arts Quarter",
    realPhotoPlaceholderUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop",
    instagramHidden: "@astral_muse_art",
    voiceIntroDuration: "0:42",
  },
  {
    id: "usr-104",
    username: "NeonShadow",
    age: 30,
    distanceKm: 12.4,
    compatibility: 84,
    mood: "🏍️ Midnight Highway Cruise",
    lookingFor: "Casual Hookups & Spontaneous Trips",
    onlineStatus: "online",
    verified: true,
    avatar: {
      theme: "modern",
      hairStyle: "short-fade",
      hairColor: "#1E293B",
      eyeColor: "#F59E0B",
      skinTone: "#8D5524",
      accessory: "none",
      outfitColor: "#000000",
      background: "dark-bg",
      frame: "neon-purple",
    },
    bio: "Architect & motor enthusiast. Privacy-first dating is the future. Chemistry is all about conversation flow.",
    lifestyle: ["Traveler", "Nightlife", "Gym"],
    interests: ["Motorcycles", "Architecture", "Cocktails", "Techno"],
    relationshipGoal: "Casual Hookups",
    locationName: "Skyline Harbor",
    realPhotoPlaceholderUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop",
    instagramHidden: "@shadow_neon_30",
    voiceIntroDuration: "0:19",
  },
];

export interface MessageItem {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isVoice?: boolean;
  isImage?: boolean;
  voiceUrl?: string;
  imageUrl?: string;
}

export interface ChatThread {
  id: string;
  candidate: Candidate;
  icebreakerCompleted: boolean;
  mutualRevealState: {
    userAccepted: boolean;
    candidateAccepted: boolean;
    isFullyRevealed: boolean;
  };
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: MessageItem[];
}

export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    id: "chat-1",
    candidate: MOCK_CANDIDATES[0], // CyberValkyrie
    icebreakerCompleted: true,
    mutualRevealState: {
      userAccepted: true,
      candidateAccepted: true,
      isFullyRevealed: true,
    },
    unreadCount: 0,
    lastMessage: "Both identities revealed! Here is my Instagram @valkyrie_neon ✨",
    lastTimestamp: "10:42 AM",
    messages: [
      { id: "m1", senderId: "usr-101", text: "Hey! Loved your answer to the Coffee vs Tea icebreaker ☕", timestamp: "10:30 AM" },
      { id: "m2", senderId: "me", text: "Haha thanks! Can't survive without espresso. Are you in Downtown?", timestamp: "10:32 AM" },
      { id: "m3", senderId: "usr-101", text: "Yep! I work near the Tech Plaza. I just hit the 'Reveal Identity' button!", timestamp: "10:38 AM" },
      { id: "m4", senderId: "me", text: "Just confirmed mine too! Revealing real photos...", timestamp: "10:40 AM" },
      { id: "m5", senderId: "usr-101", text: "Both identities revealed! Here is my Instagram @valkyrie_neon ✨", timestamp: "10:42 AM" },
    ],
  },
  {
    id: "chat-2",
    candidate: MOCK_CANDIDATES[1], // PixelKnight
    icebreakerCompleted: true,
    mutualRevealState: {
      userAccepted: false,
      candidateAccepted: true,
      isFullyRevealed: false,
    },
    unreadCount: 2,
    lastMessage: "PixelKnight sent a request to Reveal Identity! Click to reveal yours.",
    lastTimestamp: "Yesterday",
    messages: [
      { id: "m20", senderId: "usr-102", text: "That retro game bar downtown is amazing! Have you been?", timestamp: "Yesterday" },
      { id: "m21", senderId: "usr-102", text: "PixelKnight sent a request to Reveal Identity! Click to reveal yours.", timestamp: "Yesterday" },
    ],
  },
  {
    id: "chat-3",
    candidate: MOCK_CANDIDATES[2], // AstralMuse
    icebreakerCompleted: false,
    mutualRevealState: {
      userAccepted: false,
      candidateAccepted: false,
      isFullyRevealed: false,
    },
    unreadCount: 0,
    lastMessage: "Icebreaker Question Pending: How do you jumpstart your mornings?",
    lastTimestamp: "2 days ago",
    messages: [],
  },
];

export interface CommunityGroup {
  id: string;
  title: string;
  category: string;
  membersCount: number;
  onlineCount: number;
  description: string;
  icon: string;
  bannerGradient: string;
  posts: {
    id: string;
    authorName: string;
    authorAvatarTheme: AvatarConfig["theme"];
    title: string;
    content: string;
    upvotes: number;
    commentsCount: number;
    timestamp: string;
  }[];
}

export const MOCK_COMMUNITIES: CommunityGroup[] = [
  {
    id: "comm-gamers",
    title: "Cyber Gamers & Streamers",
    category: "Gaming",
    membersCount: 14200,
    onlineCount: 1840,
    description: "Connect with PC gamers, console enthusiasts, and coop raiding partners in your city.",
    icon: "🎮",
    bannerGradient: "from-purple-900 to-blue-900",
    posts: [
      {
        id: "p1",
        authorName: "NeonRider",
        authorAvatarTheme: "cyberpunk",
        title: "Anyone up for midnight Helldivers 2 or Valorant squad?",
        content: "Looking for chill anonymous teammates (18+). Microphones optional, good vibes required!",
        upvotes: 48,
        commentsCount: 19,
        timestamp: "2 hours ago",
      },
      {
        id: "p2",
        authorName: "RetroQueen",
        authorAvatarTheme: "pixel",
        title: "Best Arcade Bar in the city for a first date?",
        content: "What are your top secret arcade venues with good cocktails and classic cabinets?",
        upvotes: 82,
        commentsCount: 34,
        timestamp: "5 hours ago",
      },
    ],
  },
  {
    id: "comm-nightlife",
    title: "Night Owls & Techno Underground",
    category: "Nightlife",
    membersCount: 8900,
    onlineCount: 930,
    description: "Rave culture, rooftop lounges, speakeasies, and after-hours music lovers.",
    icon: "🪩",
    bannerGradient: "from-cyan-900 to-slate-900",
    posts: [
      {
        id: "p10",
        authorName: "BassSeeker",
        authorAvatarTheme: "modern",
        title: "Warehouse Secret Rave location dropping tonight at 11 PM",
        content: "DM for invitation code. Respect privacy, zero photo policy on dancefloor.",
        upvotes: 112,
        commentsCount: 45,
        timestamp: "1 hour ago",
      },
    ],
  },
  {
    id: "comm-travelers",
    title: "Nomads & Spontaneous Travelers",
    category: "Travel",
    membersCount: 11400,
    onlineCount: 650,
    description: "Weekend road trips, flight deals, hostel stories, and international dating tips.",
    icon: "✈️",
    bannerGradient: "from-emerald-900 to-teal-900",
    posts: [
      {
        id: "p20",
        authorName: "WanderlustX",
        authorAvatarTheme: "minimal",
        title: "Spontaneous coastal road trip this weekend — 2 spots open",
        content: "Verified Nexus members only. Leaving Saturday 8 AM, back Sunday evening.",
        upvotes: 64,
        commentsCount: 22,
        timestamp: "4 hours ago",
      },
    ],
  },
];

export interface NexusEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  hostName: string;
  hostVerified: boolean;
  attendeesCount: number;
  maxCapacity: number;
  description: string;
  badge: string;
}

export const MOCK_EVENTS: NexusEvent[] = [
  {
    id: "evt-1",
    title: "Cyberpunk Arcade & Cocktail Mixer",
    category: "Night Out",
    date: "This Friday",
    time: "8:00 PM",
    location: "Glitch Arcade Lounge (Downtown)",
    hostName: "Nexus Official",
    hostVerified: true,
    attendeesCount: 28,
    maxCapacity: 40,
    description: "Meet local NEXUS members in a private reserved arcade area. Anonymous badges provided on entry!",
    badge: "Official Mixer",
  },
  {
    id: "evt-2",
    title: "Sunset Rooftop Coffee & Board Games",
    category: "Coffee Meetup",
    date: "Saturday",
    time: "4:00 PM",
    location: "Aether Skyline Café",
    hostName: "PixelKnight",
    hostVerified: true,
    attendeesCount: 14,
    maxCapacity: 20,
    description: "Casual afternoon session with artisanal coffee, board games, and great music.",
    badge: "Community Event",
  },
];
