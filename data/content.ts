import { Project, ProjectType, Beat, BeatPack, WifiPlan } from '../types';

// ==================================================================================
// GENERAL SITE CONFIGURATION
// ==================================================================================
export const SITE_CONFIG = {
  title: "ARDBEATZ",
  description: "Professional Music Production & WiFi Solutions Portfolio",
  email: "ardbeatz5@gmail.com",
  phone: "+255 769 728 869",
  phoneRaw: "+255769728869", // For links (no spaces)
  location: "Dar es Salaam, Tanzania",
  payment: {
    paypalEmail: "ardbeatz5@gmail.com",
    mpesaNumber: "+255769728869",
    mpesaName: "ARDBEATZ"
  },
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com"
  },
  chatbot: {
    systemInstruction: `
      You are "ArdBot", the virtual studio assistant for the website "ARDBEATZ".
      ARDBEATZ is a brand owned by a professional music producer, mixing/mastering engineer, and WiFi business owner.

      Your goal is to assist visitors with:
      1. Music Production: Suggesting lyrical rhymes, song concepts, or explaining mixing/mastering terms.
      2. WiFi Services: Explaining basic internet troubleshooting or describing why high-speed internet is good for streaming music.
      3. Engaging with the brand: Encouraging them to book a session or buy a WiFi plan.

      Tone: Cool, professional, creative, slightly urban but polite.
      Keep answers concise (under 100 words) unless asked for lyrics.
    `
  }
};

// ==================================================================================
// PORTFOLIO PROJECTS
// ==================================================================================
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Nights',
    artist: 'Luna Ray',
    type: ProjectType.PRODUCED,
    coverUrl: 'https://picsum.photos/seed/music1/400/400',
    description: 'Synthwave production with deep bass and retro drums.',
    releaseDate: '2023'
  },
  {
    id: '2',
    title: 'Urban Jungle',
    artist: 'The Collective',
    type: ProjectType.MIXED,
    coverUrl: 'https://picsum.photos/seed/music2/400/400',
    description: 'Complete mixdown for a 12-track Hip Hop album.',
    releaseDate: '2023'
  },
  {
    id: '3',
    title: 'Acoustic Soul',
    artist: 'Sarah Jenkins',
    type: ProjectType.MASTERED,
    coverUrl: 'https://picsum.photos/seed/music3/400/400',
    description: 'Mastering for streaming platforms ensuring -14 LUFS compliance.',
    releaseDate: '2024'
  },
  {
    id: '4',
    title: 'Future Bass Vol. 1',
    artist: 'ARDBEATZ Exclusives',
    type: ProjectType.PRODUCED,
    coverUrl: 'https://picsum.photos/seed/music4/400/400',
    description: 'High energy future bass instrumental pack.',
    releaseDate: '2024'
  },
  {
    id: '5',
    title: 'Trap Anthem',
    artist: 'Lil Zenith',
    type: ProjectType.MIXED,
    coverUrl: 'https://picsum.photos/seed/music5/400/400',
    description: 'Vocal production and beat mixing.',
    releaseDate: '2023'
  },
  {
    id: '6',
    title: 'Ethereal',
    artist: 'Void Walker',
    type: ProjectType.MASTERED,
    coverUrl: 'https://picsum.photos/seed/music6/400/400',
    description: 'Stem mastering for cinematic trailer music.',
    releaseDate: '2024'
  },
];

// ==================================================================================
// BEAT STORE
// ==================================================================================
export const BEATS: Beat[] = [
  {
    id: '1',
    title: 'Midnight Drive',
    bpm: 140,
    key: 'Cm',
    price: 29.99,
    coverUrl: 'https://picsum.photos/seed/beat1/300/300',
    tags: ['Trap', 'Dark', 'Hard'],
    previewUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_0656a2977d.mp3', 
    audioUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_0656a2977d.mp3'
  },
  {
    id: '2',
    title: 'Summer Vibes',
    bpm: 98,
    key: 'G maj',
    price: 34.99,
    coverUrl: 'https://picsum.photos/seed/beat2/300/300',
    tags: ['Afrobeat', 'Chill', 'Smooth'],
    previewUrl: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3', 
    audioUrl: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'
  },
  {
    id: '3',
    title: 'Drill Sergeant',
    bpm: 142,
    key: 'Fm',
    price: 29.99,
    coverUrl: 'https://picsum.photos/seed/beat3/300/300',
    tags: ['Drill', 'UK', 'Aggressive'],
    previewUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_0656a2977d.mp3',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_0656a2977d.mp3'
  },
  {
    id: '4',
    title: 'Cloud Nine',
    bpm: 85,
    key: 'Am',
    price: 49.99,
    coverUrl: 'https://picsum.photos/seed/beat4/300/300',
    tags: ['Lo-Fi', 'R&B', 'Soul'],
    previewUrl: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'
  },
  {
    id: '5',
    title: 'Bongo Flava Hit',
    bpm: 102,
    key: 'C maj',
    price: 39.99,
    coverUrl: 'https://picsum.photos/seed/beat5/300/300',
    tags: ['Bongo', 'Dance', 'Pop'],
    previewUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_0656a2977d.mp3',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_0656a2977d.mp3'
  },
  {
    id: '6',
    title: 'Serengeti Trap',
    bpm: 130,
    key: 'Dm',
    price: 29.99,
    coverUrl: 'https://picsum.photos/seed/beat6/300/300',
    tags: ['Trap', 'Ethnic', 'Flute'],
    previewUrl: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'
  },
];

export const PACKS: BeatPack[] = [
  {
    id: 'p1',
    title: 'Essentials Trap Pack',
    price: 59.99,
    originalPrice: 89.97,
    coverUrl: 'https://picsum.photos/seed/pack1/400/400',
    description: 'The ultimate toolkit for modern trap production. Includes 3 of our hardest hitting beats.',
    beatsIncluded: ['Midnight Drive', 'Drill Sergeant', 'Serengeti Trap'],
    fileUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_0656a2977d.mp3' 
  },
  {
    id: 'p2',
    title: 'Chill Vibes Bundle',
    price: 64.99,
    originalPrice: 99.99,
    coverUrl: 'https://picsum.photos/seed/pack2/400/400',
    description: 'Smooth melodies and laid back rhythms perfect for your next R&B or Afrobeat hit.',
    beatsIncluded: ['Summer Vibes', 'Cloud Nine', 'Bongo Flava Hit'],
    fileUrl: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3' 
  }
];

// ==================================================================================
// WIFI PLANS
// ==================================================================================
export const WIFI_PLANS: WifiPlan[] = [
  {
    id: 'basic',
    name: 'Streamer Starter',
    speed: '50 Mbps',
    price: 29, // Converted to number
    features: ['Unlimited Data', 'No Contracts', 'Standard Support', 'Ideal for Music Streaming'],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Studio Pro',
    speed: '200 Mbps',
    price: 49, // Converted to number
    features: ['Unlimited Data', 'Low Latency for Collabs', 'Priority Support', 'Static IP Available', 'Free Installation'],
    recommended: true
  },
  {
    id: 'elite',
    name: 'Master Grade',
    speed: '1 Gbps',
    price: 89, // Converted to number
    features: ['Unlimited Data', 'Fiber Optic Speeds', '24/7 Dedicated Support', 'Mesh System Included', 'Lowest Ping'],
    recommended: false
  }
];