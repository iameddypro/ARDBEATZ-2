import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  darker?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '', darker = false }) => {
  return (
    <section 
      id={id} 
      className={`py-20 px-4 md:px-8 lg:px-16 ${darker ? 'bg-black/40' : 'bg-transparent'} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              {subtitle}
            </p>
          )}
          <div className="h-1 w-20 bg-gradient-to-r from-ard-primary to-ard-secondary mx-auto mt-6 rounded-full" />
        </div>
        {children}
      </div>
    </section>
  );
};