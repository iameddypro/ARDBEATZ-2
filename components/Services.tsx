import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { Check, Clock, Zap } from 'lucide-react';
import { SERVICES } from '../data/content';
import { useCurrency } from '../context/CurrencyContext';

export const Services: React.FC = () => {
  const { formatPrice } = useCurrency();

  const handleBookNow = (serviceName: string) => {
    // Scroll to contact and try to pre-fill subject if possible (via URL or state, 
    // for now just simple scroll)
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="services" title="Studio Packages" subtitle="Professional services to take your sound to the next level." darker>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col ${
              pkg.popular 
                ? 'bg-ard-card border-ard-primary shadow-2xl shadow-ard-primary/10 transform md:-translate-y-4' 
                : 'bg-black/20 border-white/10 hover:border-white/20'
            }`}
          >
            {pkg.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-ard-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-red-500/20">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{formatPrice(pkg.price)}</span>
                <span className="text-gray-400 text-sm">/ project</span>
              </div>
              <p className="mt-4 text-gray-400 text-sm">{pkg.description}</p>
            </div>

            <div className="mb-6 space-y-4 flex-1">
              <div className="flex items-center text-ard-accent text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Delivery: {pkg.deliveryTime}
              </div>
              <ul className="space-y-3">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              variant={pkg.popular ? 'primary' : 'outline'} 
              className="w-full"
              onClick={() => handleBookNow(pkg.title)}
            >
              Book Now
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
};
