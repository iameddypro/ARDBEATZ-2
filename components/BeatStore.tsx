import React, { useState, useRef, useEffect } from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { Play, Pause, ShoppingCart, Music2, Tag, Package, CheckCircle2 } from 'lucide-react';
import { Beat, BeatPack } from '../types';
import { PaymentModal } from './PaymentModal';
import { BEATS, PACKS } from '../data/content';

export const BeatStore: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Beat | BeatPack | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'beats' | 'packs'>('beats');
  
  // Audio Playback Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = (id: string) => {
    const beat = BEATS.find(b => b.id === id);
    if (!beat) return;

    // If clicking the currently playing beat, stop it
    if (playingId === id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingId(null);
    } else {
      // If a new beat is clicked, stop previous one first
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Play new beat
      if (beat.previewUrl) {
        const audio = new Audio(beat.previewUrl);
        audio.volume = 0.7;
        
        // Reset state when audio ends
        audio.onended = () => {
          setPlayingId(null);
        };

        audio.play().catch(error => {
          console.error("Error playing audio preview:", error);
          setPlayingId(null);
        });

        audioRef.current = audio;
        setPlayingId(id);
      } else {
        console.warn("No preview URL for this beat");
      }
    }
  };

  const openBuyModal = (product: Beat | BeatPack) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <Section id="store" title="Beat Store" subtitle="Purchase high-quality untagged beats instantly.">
      
      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-black/30 p-1 rounded-xl flex gap-1 border border-white/5">
          <button 
            onClick={() => setActiveTab('beats')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'beats' 
                ? 'bg-ard-primary text-white shadow-lg shadow-red-500/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Beats
          </button>
          <button 
            onClick={() => setActiveTab('packs')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'packs' 
                ? 'bg-ard-primary text-white shadow-lg shadow-red-500/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4" />
            Bundles & Packs
          </button>
        </div>
      </div>

      <div className="bg-ard-card/50 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-sm min-h-[400px]">
        
        {activeTab === 'beats' ? (
          <>
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
                  className={`group flex flex-col md:grid md:grid-cols-12 gap-4 p-4 items-center rounded-xl transition-all duration-300 border border-transparent hover:bg-white/5 hover:scale-[1.01] hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/40 hover:z-10 relative ${playingId === beat.id ? 'bg-ard-primary/10 border-ard-primary/30' : ''}`}
                >
                  {/* Title & Cover */}
                  <div className="col-span-5 flex items-center gap-4 w-full">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all">
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
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-full h-full border-2 border-ard-primary rounded-lg animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-lg truncate transition-colors ${playingId === beat.id ? 'text-ard-primary' : 'text-white group-hover:text-ard-accent'}`}>
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
                      <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-gray-400 text-xs border border-white/5 group-hover:border-ard-accent/30 group-hover:text-ard-accent transition-colors">
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
                      className="w-full md:w-auto min-w-[100px] group-hover:from-ard-accent group-hover:to-orange-600 group-hover:shadow-orange-500/30"
                    >
                      <span className="hidden md:inline mr-2">${beat.price}</span>
                      <span className="md:hidden mr-2">Buy Now</span>
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {PACKS.map((pack) => (
              <div key={pack.id} className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden hover:border-ard-accent/50 hover:shadow-2xl hover:shadow-ard-accent/10 transition-all duration-300 flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                  <img src={pack.coverUrl} alt={pack.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div className="w-full">
                       <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-ard-accent transition-colors">{pack.title}</h3>
                       <p className="text-sm text-gray-300 line-clamp-1">{pack.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6 flex-1">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Includes</h4>
                    <ul className="space-y-2">
                      {pack.beatsIncluded.map((beatName, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-ard-accent mr-2" />
                          {beatName}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                       <span className="text-xs text-gray-500 line-through">${pack.originalPrice}</span>
                       <span className="text-2xl font-bold text-ard-primary">${pack.price}</span>
                    </div>
                    <Button onClick={() => openBuyModal(pack)} className="group-hover:from-ard-accent group-hover:to-orange-600 group-hover:shadow-orange-500/30">
                      Buy Pack
                      <Package className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />
    </Section>
  );
};