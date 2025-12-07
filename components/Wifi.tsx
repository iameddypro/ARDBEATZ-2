import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { Wifi, Check, Zap } from 'lucide-react';
import { WifiPlan } from '../types';

const PLANS: WifiPlan[] = [
  {
    id: 'basic',
    name: 'Streamer Starter',
    speed: '50 Mbps',
    price: '$29',
    features: ['Unlimited Data', 'No Contracts', 'Standard Support', 'Ideal for Music Streaming'],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Studio Pro',
    speed: '200 Mbps',
    price: '$49',
    features: ['Unlimited Data', 'Low Latency for Collabs', 'Priority Support', 'Static IP Available', 'Free Installation'],
    recommended: true
  },
  {
    id: 'elite',
    name: 'Master Grade',
    speed: '1 Gbps',
    price: '$89',
    features: ['Unlimited Data', 'Fiber Optic Speeds', '24/7 Dedicated Support', 'Mesh System Included', 'Lowest Ping'],
    recommended: false
  }
];

export const WifiSection: React.FC = () => {
  return (
    <Section id="wifi" title="ARDBEATZ Connect" subtitle="High-speed internet solutions tailored for creators and businesses." darker>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col ${
              plan.recommended 
                ? 'bg-ard-card border-ard-accent shadow-2xl shadow-ard-accent/10 transform md:-translate-y-4' 
                : 'bg-black/20 border-white/10 hover:border-white/20'
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-ard-accent text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Best Value
                </span>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <div className="mt-4 flex items-center text-ard-accent">
                <Zap className="w-5 h-5 mr-2 fill-current" />
                <span className="font-bold text-lg">{plan.speed}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="w-5 h-5 mr-3 text-ard-accent flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              variant={plan.recommended ? 'secondary' : 'outline'} 
              className="w-full"
            >
              Check Availability
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-gradient-to-r from-ard-card to-black p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-ard-accent/10 rounded-full">
            <Wifi className="w-8 h-8 text-ard-accent" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-1">Coverage Area</h4>
            <p className="text-gray-400">Serving the greater metro area with reliable uptime.</p>
          </div>
        </div>
        <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 mb-2">Need a custom enterprise solution?</p>
            <a href="#contact" className="text-ard-accent hover:text-white transition-colors font-medium">Contact Sales &rarr;</a>
        </div>
      </div>
    </Section>
  );
};