export enum ProjectType {
  PRODUCED = 'Produced',
  MIXED = 'Mixed',
  MASTERED = 'Mastered',
}

export interface Project {
  id: string;
  title: string;
  artist: string;
  type: ProjectType;
  coverUrl: string;
  description: string;
  releaseDate: string;
}

export interface Beat {
  id: string;
  title: string;
  bpm: number;
  key: string;
  price: number;
  coverUrl: string;
  tags: string[];
  audioUrl?: string; // Legacy field
  previewUrl?: string; // New field for audio preview
}

export interface BeatPack {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  coverUrl: string;
  description: string;
  beatsIncluded: string[];
  fileUrl?: string;
}

export interface WifiPlan {
  id: string;
  name: string;
  speed: string;
  price: number; // Changed from string to number
  features: string[];
  recommended?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Icon name
}

export type TravelCategory = 'Hotel' | 'Food' | 'Travel' | 'Event';

export interface TravelEntry {
  id: string;
  title: string;
  category: TravelCategory;
  imageUrl: string;
  location: string;
  description: string;
  date: string;
  rating?: number; // 1-5
}