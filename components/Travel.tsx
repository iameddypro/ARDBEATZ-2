import React, { useState } from 'react';
import { Section } from './Section';
import { TravelCategory } from '../types';
import { MapPin, Star, Calendar, Utensils, Plane, Building2, Ticket } from 'lucide-react';
import { TRAVEL_ENTRIES } from '../data/content';

export const Travel: React.FC = () => {
  const [filter, setFilter] = useState<TravelCategory | 'All'>('All');

  const filteredEntries = filter === 'All' 
    ? TRAVEL_ENTRIES 
    : TRAVEL_ENTRIES.filter(entry => entry.category === filter);

  const getCategoryIcon = (category: TravelCategory) => {
    switch (category) {
      case 'Food': return <Utensils className="w-3 h-3" />;
      case 'Travel': return <Plane className="w-3 h-3" />;
      case 'Hotel': return <Building2 className="w-3 h-3" />;
      case 'Event': return <Ticket className="w-3 h-3" />;
    }
  };

  const categories: (TravelCategory | 'All')[] = ['All', 'Travel', 'Food', 'Hotel', 'Event'];

  return (
    <Section id="travel" title="Lifestyle & Places" subtitle="Exploring the world, one beat and bite at a time.">
      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat
                ? 'bg-gradient-to-r from-ard-primary to-ard-secondary text-white shadow-lg shadow-red-500/20'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEntries.map((entry) => (
          <div 
            key={entry.id} 
            className="group bg-ard-card rounded-2xl overflow-hidden border border-white/5 hover:border-ard-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-ard-accent/10 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={entry.imageUrl} 
                alt={entry.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              
              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-wider group-hover:border-ard-accent/50 group-hover:text-ard-accent transition-colors">
                  {getCategoryIcon(entry.category)}
                  {entry.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h3 className="text-lg font-bold text-white group-hover:text-ard-accent transition-colors line-clamp-1">{entry.title}</h3>
                   <div className="flex items-center text-xs text-gray-400 mt-1">
                     <MapPin className="w-3 h-3 mr-1 text-ard-primary" />
                     {entry.location}
                   </div>
                </div>
                {entry.rating && (
                  <div className="flex items-center bg-yellow-500/10 px-1.5 py-0.5 rounded text-yellow-500">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    <span className="text-xs font-bold">{entry.rating}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-400 text-sm mt-2 mb-4 line-clamp-3 flex-1">
                {entry.description}
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                 <div className="flex items-center">
                   <Calendar className="w-3 h-3 mr-1.5" />
                   {entry.date}
                 </div>
                 <span className="group-hover:translate-x-1 transition-transform duration-300 text-ard-accent">
                   Read More &rarr;
                 </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};