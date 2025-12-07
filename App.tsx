import React from 'react';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { BeatStore } from './components/BeatStore';
import { WifiSection } from './components/Wifi.tsx';
import { Contact } from './components/Contact';
import { ChatBot } from './components/ChatBot';
import { CurrencyProvider } from './context/CurrencyContext';

function App() {
  return (
    <CurrencyProvider>
      <div className="bg-ard-dark text-white min-h-screen font-sans selection:bg-ard-primary selection:text-white">
        <NavBar />
        <main>
          <Hero />
          <Portfolio />
          <BeatStore />
          <div className="bg-gradient-to-b from-ard-dark to-black">
            <WifiSection />
          </div>
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="bg-black py-8 text-center text-gray-600 text-sm border-t border-white/5">
          <p>&copy; {new Date().getFullYear()} ARDBEATZ. All rights reserved.</p>
        </footer>

        <ChatBot />
      </div>
    </CurrencyProvider>
  );
}

export default App;