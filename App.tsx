import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { BeatStore } from './components/BeatStore';
import { Services } from './components/Services';
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
    if (password === 'admin123') { // Simple hardcoded password for demo
      setIsAdmin(true);
      setShowAdminLogin(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  if (isAdmin) {
    return (
        <DataProvider>
          <CurrencyProvider>
            <AdminDashboard onLogout={() => setIsAdmin(false)} />
          </CurrencyProvider>
        </DataProvider>
    );
  }

  return (
    <DataProvider>
      <CurrencyProvider>
        <div className="bg-ard-dark text-white min-h-screen font-sans selection:bg-ard-primary selection:text-white flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Hero />
            <Portfolio />
            <BeatStore />
            <Services />
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
                  className="text-gray-800 hover:text-gray-600 transition-colors"
               >
                  <Lock className="w-4 h-4" />
               </button>
            </div>
          </footer>

          <ChatBot />

          {/* Admin Login Modal */}
          {showAdminLogin && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
              <div className="bg-ard-card border border-white/10 p-8 rounded-2xl w-full max-w-sm">
                <h3 className="text-xl font-bold text-white mb-4">Admin Access</h3>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                   <input 
                     type="password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Enter Password"
                     className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:border-ard-primary focus:outline-none"
                     autoFocus
                   />
                   <div className="flex gap-2">
                     <button 
                       type="button" 
                       onClick={() => setShowAdminLogin(false)}
                       className="flex-1 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white"
                     >
                       Cancel
                     </button>
                     <button 
                       type="submit"
                       className="flex-1 py-3 rounded-lg bg-ard-primary text-white font-bold hover:bg-red-600"
                     >
                       Login
                     </button>
                   </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </CurrencyProvider>
    </DataProvider>
  );
}

export default App;