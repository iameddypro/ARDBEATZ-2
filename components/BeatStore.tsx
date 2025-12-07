import React, { useState } from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { Play, Pause, ShoppingCart, Music2, Tag } from 'lucide-react';
import { Beat } from '../types';
import { PaymentModal } from './PaymentModal';

const BEATS: Beat[] = [
  {
    id: '1',
    title: 'Midnight Drive',
    bpm: 140,
    key: 'Cm',
    price: 29.99,
    coverUrl: 'https://picsum.photos/seed/beat1/300/300',
    tags: ['Trap', 'Dark', 'Hard']
  },
  {
    id: '2',
    title: 'Summer Vibes',
    bpm: 98,
    key: 'G maj',
    price: 34.99,
    coverUrl: 'https://picsum.photos/seed/beat2/300/300',
    tags: ['Afrobeat', 'Chill', 'Smooth']
  },
  {
    id: '3',
    title: 'Drill Sergeant',
    bpm: 142,
    key: 'Fm',
    price: 29.99,
    coverUrl: 'https://picsum.photos/seed/beat3/300/300',
    tags: ['Drill', 'UK', 'Aggressive']
  },
  {
    id: '4',
    title: 'Cloud Nine',
    bpm: 85,
    key: 'Am',
    price: 49.99,
    coverUrl: 'https://picsum.photos/seed/beat4/300/300',
    tags: ['Lo-Fi', 'R&B', 'Soul']
  },
  {
    id: '5',
    title: 'Bongo Flava Hit',
    bpm: 102,
    key: 'C maj',
    price: 39.99,
    coverUrl: 'https://picsum.photos/seed/beat5/300/300',
    tags: ['Bongo', 'Dance', 'Pop']
  },
  {
    id: '6',
    title: 'Serengeti Trap',
    bpm: 130,
    key: 'Dm',
    price: 29.99,
    coverUrl: 'https://picsum.photos/seed/beat6/300/300',
    tags: ['Trap', 'Ethnic', 'Flute']
  },
];

export const BeatStore: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const openBuyModal = (beat: Beat) => {
    setSelectedBeat(beat);
    setIsModalOpen(true);
  };

  return (
    <Section id="store" title="Beat Store" subtitle="Purchase high-quality untagged beats instantly.">
      <div className="bg-ard-card/50 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-sm">
        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-black/20 text-sm font-semibold text-gray-400 uppercase tracking-wider">
          <div className="col-span-5 pl-4">Title</div>
          <div className="col-span-2 text-center">BPM / Key</div>
          <div className="col-span-3 text-center">Tags</div>
          <div className="col-span-2 text-right pr-4">Price</div>
        </div>

        {/* Beat List */}
        <div className="divide-y divide-white/5">
          {BEATS.map((beat) => (
            <div 
              key={beat.id} 
              className={`group flex flex-col md:grid md:grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors ${playingId === beat.id ? 'bg-ard-primary/5' : ''}`}
            >
              {/* Title & Cover */}
              <div className="col-span-5 flex items-center gap-4 w-full">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden group-hover:shadow-lg group-hover:shadow-ard-primary/20 transition-all">
                  <img src={beat.coverUrl} alt={beat.title} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => togglePlay(beat.id)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {playingId === beat.id ? (
                      <Pause className="w-6 h-6 text-white fill-current" />
                    ) : (
                      <Play className="w-6 h-6 text-white fill-current" />
                    )}
                  </button>
                  {playingId === beat.id && (
                     <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
                        <div className="w-8 h-8 rounded-full border-2 border-ard-primary animate-ping"></div>
                     </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-lg truncate ${playingId === beat.id ? 'text-ard-primary' : 'text-white'}`}>
                    {beat.title}
                  </h3>
                  <div className="md:hidden flex items-center gap-3 text-xs text-gray-400 mt-1">
                    <span>{beat.bpm} BPM</span>
                    <span>•</span>
                    <span>{beat.key}</span>
                  </div>
                </div>
              </div>

              {/* BPM / Key - Desktop */}
              <div className="hidden md:flex col-span-2 flex-col items-center justify-center text-gray-400 text-sm">
                <span className="font-mono text-white">{beat.bpm}</span>
                <span className="text-xs">BPM</span>
              </div>

              {/* Tags */}
              <div className="col-span-3 w-full flex flex-wrap items-center justify-center md:justify-center gap-2">
                {beat.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-gray-400 text-xs border border-white/5">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Price & Action */}
              <div className="col-span-2 w-full flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0">
                 <span className="md:hidden text-xl font-bold text-white">${beat.price}</span>
                 <Button 
                   size="sm" 
                   onClick={() => openBuyModal(beat)}
                   className="w-full md:w-auto min-w-[100px]"
                 >
                   <span className="hidden md:inline mr-2">${beat.price}</span>
                   <span className="md:hidden mr-2">Buy Now</span>
                   <ShoppingCart className="w-4 h-4" />
                 </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        beat={selectedBeat} 
      />
    </Section>
  );
};