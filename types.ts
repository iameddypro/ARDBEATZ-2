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
  audioUrl?: string; // In a real app, this would be the preview file URL
}

export interface WifiPlan {
  id: string;
  name: string;
  speed: string;
  price: string;
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