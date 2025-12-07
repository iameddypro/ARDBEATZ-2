import React from 'react';
import { Section } from './Section';
import { Instagram, Youtube, Twitter, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';

export const SocialHub: React.FC = () => {
  return (
    <Section id="social" title="Connect With Me" subtitle="Follow the journey, see the studio life, and stay updated.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Instagram */}
        <a 
          href={SITE_CONFIG.socials.instagram} 
          target="_blank" 
          rel="noreferrer"
          className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-pink-900/40 group-hover:opacity-100 transition-opacity" />
          <img 
            src="https://picsum.photos/seed/insta/600/600" 
            alt="Instagram" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-pink-600/30">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
            <p className="text-gray-300 text-sm mb-4">Behind the scenes & studio vibes.</p>
            <span className="text-pink-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Follow <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </a>

        {/* YouTube */}
        <a 
          href={SITE_CONFIG.socials.youtube} 
          target="_blank" 
          rel="noreferrer"
          className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-orange-900/40 group-hover:opacity-100 transition-opacity" />
          <img 
            src="https://picsum.photos/seed/yt/600/600" 
            alt="YouTube" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
             <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-red-600/30">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">YouTube</h3>
            <p className="text-gray-300 text-sm mb-4">Beat making videos & tutorials.</p>
            <span className="text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Subscribe <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </a>

        {/* Twitter */}
        <a 
          href={SITE_CONFIG.socials.twitter} 
          target="_blank" 
          rel="noreferrer"
          className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 group-hover:opacity-100 transition-opacity" />
          <img 
            src="https://picsum.photos/seed/twitter/600/600" 
            alt="Twitter" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
             <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
              <Twitter className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Twitter / X</h3>
            <p className="text-gray-300 text-sm mb-4">Thoughts, updates & quick tips.</p>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Follow <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </a>

      </div>
    </Section>
  );
};
