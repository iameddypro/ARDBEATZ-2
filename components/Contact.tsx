import React, { useState } from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Music Production', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', service: 'Music Production', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <Section id="contact" title="Get In Touch" subtitle="Ready to start your next project? Let's make a hit.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-ard-card p-8 rounded-2xl border border-white/5">
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-ard-primary/10 rounded-lg">
                  <Mail className="w-6 h-6 text-ard-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</h4>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-white hover:text-ard-primary transition-colors">{SITE_CONFIG.email}</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-ard-secondary/10 rounded-lg">
                  <Phone className="w-6 h-6 text-ard-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone / M-Pesa</h4>
                  <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-white hover:text-ard-secondary transition-colors">{SITE_CONFIG.phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-ard-accent/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-ard-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Studio</h4>
                  <p className="text-white">{SITE_CONFIG.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-ard-card p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-6 text-white">Follow {SITE_CONFIG.title}</h3>
            <div className="flex gap-4">
              <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="p-4 bg-white/5 rounded-lg hover:bg-pink-600 hover:text-white transition-all duration-300 group">
                <Instagram className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a href={SITE_CONFIG.socials.youtube} target="_blank" rel="noreferrer" className="p-4 bg-white/5 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 group">
                <Youtube className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
              <a href={SITE_CONFIG.socials.twitter} target="_blank" rel="noreferrer" className="p-4 bg-white/5 rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300 group">
                <Twitter className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-ard-card p-8 rounded-2xl border border-white/5">
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-ard-primary focus:outline-none transition-colors"
                        placeholder="Your Name"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-ard-primary focus:outline-none transition-colors"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Interested In</label>
                    <select 
                        value={formData.service}
                        onChange={e => setFormData({...formData, service: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-ard-primary focus:outline-none transition-colors"
                    >
                        <option>Custom Beat Production</option>
                        <option>Mixing & Mastering</option>
                        <option>Executive Production</option>
                        <option>General Inquiry</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea 
                        rows={4}
                        required
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-ard-primary focus:outline-none transition-colors"
                        placeholder="Tell me about your project..."
                    />
                </div>

                <Button type="submit" className="w-full">
                    {submitted ? 'Message Sent!' : 'Send Message'}
                </Button>
            </div>
        </form>
      </div>
    </Section>
  );
};
