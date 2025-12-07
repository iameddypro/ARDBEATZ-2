import React, { useState } from 'react';
import { Section } from './Section';
import { Project, ProjectType } from '../types';
import { Play, Disc, Sliders, Mic2 } from 'lucide-react';

const PROJECTS: Project[] = [
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

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<ProjectType | 'All'>('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.type === filter);

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
            className="group relative bg-ard-card rounded-2xl overflow-hidden border border-white/5 hover:border-ard-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-ard-primary/20"
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
            <div className="p-6">
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
              <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};