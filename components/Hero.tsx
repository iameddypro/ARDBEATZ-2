import React from 'react';
import { Button } from './Button';
import { PlayCircle, Mic2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Studio Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ard-dark via-ard-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ard-dark via-transparent to-ard-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <div className="inline-block px-4 py-1.5 mb-6 border border-ard-primary/30 rounded-full bg-ard-primary/10 backdrop-blur-sm">
          <span className="text-ard-primary font-semibold tracking-wider text-xs uppercase">
            Sonic Perfection & Creativity
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tighter text-white">
          AMPLIFY YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ard-primary via-orange-500 to-ard-secondary">
            VISION
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate hub for chart-topping music production, pristine mixing/mastering, and professional audio services.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Explore Music
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mic2 className="w-5 h-5 mr-2" />
            View Services
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ard-dark to-transparent z-10 pointer-events-none" />
    </div>
  );
};
