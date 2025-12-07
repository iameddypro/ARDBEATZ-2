import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { BeatStore } from './components/BeatStore';
import { Services } from './components/Services';
import { WifiSection } from './components/Wifi';
import { SocialHub } from './components/SocialHub';
import { Travel } from './components/Travel.tsx';
import { Contact } from './components/Contact';
import { ChatBot } from './components/ChatBot';
import { CurrencyProvider } from './context/CurrencyContext';
import { DataProvider } from './context/DataContext';
import { AdminDashboard } from './components/AdminDashboard';
import { Lock } from 'lucide-react';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { 
      setIsAdmin(true);
      setShowAdminLogin(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <DataProvider>
      <CurrencyProvider>
        {isAdmin ? (
          <AdminDashboard onLogout={() => setIsAdmin(false)} />
        ) : (
          <div className="bg-ard-dark text-white min-h-screen font-sans selection:bg-ard-primary selection:text-white flex flex-col">
            <NavBar />
            <main className="flex-grow">
              <Hero />
              <Portfolio />
              <BeatStore />
              <Services />
              <WifiSection />
              <div className="bg-gradient-to-b from-ard-dark to-black">
                <SocialHub />
              </div>
              <Travel />
              <Contact />
            </main>
            
            {/* Footer */}
            <footer className="bg-black py-8 text-center text-gray-600 text-sm border-t border-white/5 relative">
              <p>&copy; {new Date().getFullYear()} ARDBEATZ. All rights reserved.</p>
              
              {/* Admin Toggle */}
              <div className="absolute bottom-4 right-4">
                 <button 
                    onClick={() => setShowAdminLogin(true)}
                    className="text-gray-700 hover:text-white transition-colors p-2"
                    title="Admin Login"
                 >
                    <Lock className="w-4 h-4" />
                 </button>
              </div>
            </footer>

            <ChatBot />

            {/* Admin Login Modal */}
            {showAdminLogin && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-ard-card border border-white/10 p-8 rounded-2xl w-full max-w-sm shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-ard-primary" />
                    Admin Access
                  </h3>
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                     <div>
                       <label className="block text-sm text-gray-400 mb-1">Password</label>
                       <input 
                         type="password" 
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         placeholder="Enter Password"
                         className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:border-ard-primary focus:outline-none transition-colors"
                         autoFocus
                       />
                     </div>
                     <div className="flex gap-3 pt-2">
                       <button 
                         type="button" 
                         onClick={() => setShowAdminLogin(false)}
                         className="flex-1 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                       >
                         Cancel
                       </button>
                       <button 
                         type="submit"
                         className="flex-1 py-3 rounded-lg bg-ard-primary text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-600/20"
                       >
                         Login
                       </button>
                     </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </CurrencyProvider>
    </DataProvider>
  );
}

export default App;