import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './Button';
import { useCurrency, CurrencyCode } from '../context/CurrencyContext';

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as CurrencyCode);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-ard-dark/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollTo('hero')}>
            <h1 className="text-2xl font-display font-bold tracking-tighter">
              ARD<span className="text-ard-primary">BEATZ</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-baseline space-x-6 lg:space-x-8">
              {['Music', 'Store', 'WiFi', 'Travel', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Currency Selector */}
            <div className="relative flex items-center bg-black/40 rounded-lg px-2 border border-white/10">
              <Globe className="w-4 h-4 text-gray-400 mr-2" />
              <select 
                value={currency} 
                onChange={handleCurrencyChange}
                className="bg-transparent text-sm text-gray-300 py-2 focus:outline-none cursor-pointer hover:text-white"
              >
                <option value="USD" className="bg-ard-dark">USD ($)</option>
                <option value="TZS" className="bg-ard-dark">TZS (TSh)</option>
                <option value="KES" className="bg-ard-dark">KES (KSh)</option>
                <option value="UGX" className="bg-ard-dark">UGX (USh)</option>
                <option value="GHS" className="bg-ard-dark">GHS (₵)</option>
              </select>
            </div>

            <Button variant="primary" size="sm" onClick={() => scrollTo('contact')}>
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile Currency Selector - Compact */}
             <select 
                value={currency} 
                onChange={handleCurrencyChange}
                className="bg-black/40 text-xs text-white py-1 px-2 rounded border border-white/10 focus:outline-none"
              >
                <option value="USD" className="bg-ard-dark">USD</option>
                <option value="TZS" className="bg-ard-dark">TZS</option>
                <option value="KES" className="bg-ard-dark">KES</option>
                <option value="UGX" className="bg-ard-dark">UGX</option>
                <option value="GHS" className="bg-ard-dark">GHS</option>
              </select>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-ard-dark border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollTo('music')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Music</button>
            <button onClick={() => scrollTo('store')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Store</button>
            <button onClick={() => scrollTo('wifi')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">WiFi</button>
            <button onClick={() => scrollTo('travel')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Travel</button>
            <button onClick={() => scrollTo('contact')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
};