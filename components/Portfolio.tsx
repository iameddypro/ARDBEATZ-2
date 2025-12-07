import React, { useState } from 'react';
import { Section } from './Section';
import { ProjectType } from '../types';
import { Play, Disc, Sliders, Mic2, ChevronDown, ChevronUp } from 'lucide-react';
import { PROJECTS } from '../data/content';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<ProjectType | 'All'>('All');
  const [expandedBioId, setExpandedBioId] = useState<string | null>(null);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.type === filter);

  const toggleBio = (id: string) => {
    setExpandedBioId(prev => prev === id ? null : id);
  };

  const getIcon = (type: ProjectType) => {
    switch (type) {
      case ProjectType.PRODUCED: return <Disc className="w-4 h-4" />;
      case ProjectType.MIXED: return <Sliders className="w-4 h-4" />;
      case ProjectType.MASTERED: return <Mic2 className="w-4 h-4" />;
    }
  };

  return (
    <Section id="music" title="Selected Works" subtitle="A curation of sound designed to move the world.">
      {/* Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {['All', ...Object.values(ProjectType)].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as ProjectType | 'All')}
            className={`px-6 py-2 rounded-full border transition-all duration-300 ${
              filter === type
                ? 'bg-white text-black border-white font-bold'
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="group relative bg-ard-card rounded-2xl overflow-hidden border border-white/5 hover:border-ard-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-ard-primary/20 flex flex-col"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={project.coverUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <button className="bg-ard-primary rounded-full p-4 transform scale-50 group-hover:scale-100 transition-transform duration-300 hover:bg-white hover:text-ard-primary">
                  <Play className="w-8 h-8 fill-current translate-x-1" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ard-primary bg-ard-primary/10 px-2 py-1 rounded">
                  {getIcon(project.type)}
                  {project.type}
                </span>
                <span className="text-xs text-gray-500">{project.releaseDate}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-ard-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3">{project.artist}</p>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{project.description}</p>

              {/* Biography Toggle */}
              <div className="mt-auto pt-4 border-t border-white/5">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleBio(project.id);
                    }}
                    className="flex items-center text-xs font-bold text-ard-accent hover:text-white transition-colors uppercase tracking-wider focus:outline-none"
                >
                    {expandedBioId === project.id ? 'Hide Bio' : 'Artist Bio'}
                    {expandedBioId === project.id ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                </button>
                
                {expandedBioId === project.id && (
                    <div className="mt-3 text-sm text-gray-400 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5 animate-pulse-slow">
                        {project.biography || "Biography not available."}
                    </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};