import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Project, Beat, ProjectType } from '../types';
import { Button } from './Button';
import { 
  LayoutDashboard, Music, Disc, DollarSign, Users, 
  Trash2, Plus, X, Search, CheckCircle, Clock, Smartphone,
  ExternalLink, ArrowLeft, Lock
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = 'dashboard' | 'projects' | 'beats' | 'orders';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { 
    projects, beats, messages, orders, 
    deleteProject, deleteBeat, addProject, addBeat, updateMessageStatus 
  } = useData();
  const { formatPrice } = useCurrency();
  
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'beat' | null>(null);

  // Form State
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemType, setNewItemType] = useState('Produced');

  // CRM Stats
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.amount, 0);
  const newMessages = messages.filter(m => m.status === 'New').length;
  const totalSales = orders.length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'project') {
      const newProject: Project = {
        id: Date.now().toString(),
        title: newItemTitle,
        artist: 'Unknown Artist',
        type: newItemType as ProjectType,
        coverUrl: `https://picsum.photos/seed/${Date.now()}/400/400`,
        description: 'Newly added project description placeholder.',
        releaseDate: new Date().getFullYear().toString(),
        biography: 'Biography pending update.'
      };
      addProject(newProject);
    } else if (modalType === 'beat') {
      const newBeat: Beat = {
        id: Date.now().toString(),
        title: newItemTitle,
        bpm: 140,
        key: 'Cm',
        price: parseFloat(newItemPrice) || 29.99,
        coverUrl: `https://picsum.photos/seed/${Date.now()}/300/300`,
        tags: ['New', 'Trap'],
        previewUrl: '', // In real app, allow upload
        audioUrl: ''
      };
      addBeat(newBeat);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewItemTitle('');
    setNewItemPrice('');
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-ard-dark text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-display font-bold">Admin<span className="text-ard-primary">Panel</span></h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-ard-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-ard-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <DollarSign className="w-5 h-5 mr-3" />
            Orders & Payments
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-ard-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Disc className="w-5 h-5 mr-3" />
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('beats')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'beats' ? 'bg-ard-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Music className="w-5 h-5 mr-3" />
            Beat Store
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={onLogout} className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-8">
           <h2 className="text-xl font-bold">Admin Panel</h2>
           <button onClick={onLogout} className="text-sm text-gray-400">Logout</button>
        </div>

        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">CRM Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-ard-card p-6 rounded-2xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <h3 className="text-3xl font-bold text-white">{formatPrice(totalRevenue)}</h3>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-lg text-green-500">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-xs text-green-400 flex items-center">
                  <span className="bg-green-500/20 px-1.5 py-0.5 rounded mr-2">+12%</span>
                  from last month
                </div>
              </div>

              <div className="bg-ard-card p-6 rounded-2xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">New Leads</p>
                    <h3 className="text-3xl font-bold text-white">{newMessages}</h3>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
                 <p className="text-xs text-gray-400">Unread messages in inbox</p>
              </div>

              <div className="bg-ard-card p-6 rounded-2xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Total Sales</p>
                    <h3 className="text-3xl font-bold text-white">{totalSales}</h3>
                  </div>
                  <div className="p-3 bg-ard-primary/20 rounded-lg text-ard-primary">
                    <Music className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-gray-400">Beats & Packs sold</p>
              </div>
            </div>

            {/* Messages / Leads */}
            <div className="bg-ard-card rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold">Recent Inquiries</h3>
              </div>
              <div className="divide-y divide-white/5">
                {messages.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No messages yet.</div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className="p-6 hover:bg-white/5 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold">
                             {msg.name.charAt(0)}
                           </div>
                           <div>
                             <h4 className="font-bold text-white">{msg.name}</h4>
                             <p className="text-xs text-gray-400">{msg.email}</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className={`text-xs px-2 py-1 rounded border ${msg.status === 'New' ? 'border-ard-primary text-ard-primary bg-ard-primary/10' : 'border-gray-600 text-gray-400'}`}>
                             {msg.status}
                           </span>
                           <span className="text-xs text-gray-500">{msg.date}</span>
                         </div>
                      </div>
                      <div className="bg-black/20 p-3 rounded-lg border border-white/5 mb-3">
                        <p className="text-sm text-gray-300">
                          <span className="text-ard-accent font-semibold mr-2">{msg.service}:</span>
                          {msg.message}
                        </p>
                      </div>
                      {msg.status === 'New' && (
                        <div className="flex gap-2">
                           <Button size="sm" variant="outline" onClick={() => updateMessageStatus(msg.id, 'Replied')}>
                             Mark as Replied
                           </Button>
                           <Button size="sm" variant="ghost" className="text-ard-primary" onClick={() => updateMessageStatus(msg.id, 'Archived')}>
                             Archive
                           </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
           <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
               <h2 className="text-3xl font-bold">Transactions</h2>
             </div>

             <div className="bg-ard-card rounded-2xl border border-white/10 overflow-hidden">
               <table className="w-full text-left">
                 <thead className="bg-black/40 text-xs uppercase text-gray-400">
                   <tr>
                     <th className="p-4">ID</th>
                     <th className="p-4">Product</th>
                     <th className="p-4">Amount</th>
                     <th className="p-4">Method</th>
                     <th className="p-4">Status</th>
                     <th className="p-4 text-right">Proof</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                   {orders.map((order) => (
                     <tr key={order.id} className="hover:bg-white/5">
                       <td className="p-4 font-mono text-xs">{order.id}</td>
                       <td className="p-4 text-white font-medium">{order.productTitle}</td>
                       <td className="p-4">{formatPrice(order.amount)}</td>
                       <td className="p-4">
                         <div className="flex items-center gap-2">
                            {order.paymentMethod === 'M-Pesa' ? <Smartphone className="w-4 h-4 text-green-500" /> : <ExternalLink className="w-4 h-4 text-blue-500" />}
                            {order.paymentMethod}
                         </div>
                         {order.transactionId && <div className="text-xs text-gray-500 font-mono mt-1">{order.transactionId}</div>}
                       </td>
                       <td className="p-4">
                         {order.status === 'Verified' ? (
                           <span className="text-green-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Paid</span>
                         ) : (
                           <span className="text-yellow-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
                         )}
                       </td>
                       <td className="p-4 text-right">
                         <button className="text-ard-accent hover:underline text-xs">View Screenshot</button>
                       </td>
                     </tr>
                   ))}
                   {orders.length === 0 && (
                     <tr>
                       <td colSpan={6} className="p-8 text-center text-gray-500">No orders found.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
           </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Projects</h2>
              <Button onClick={() => { setModalType('project'); setIsModalOpen(true); }} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-ard-card p-4 rounded-xl border border-white/10 flex flex-col">
                   <div className="flex items-center gap-4 mb-4">
                     <img src={project.coverUrl} alt="" className="w-16 h-16 rounded object-cover" />
                     <div>
                       <h4 className="font-bold text-white line-clamp-1">{project.title}</h4>
                       <p className="text-xs text-gray-400">{project.type}</p>
                     </div>
                   </div>
                   <div className="mt-auto flex justify-end">
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- BEATS TAB --- */}
        {activeTab === 'beats' && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Beat Store</h2>
              <Button onClick={() => { setModalType('beat'); setIsModalOpen(true); }} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Beat
              </Button>
            </div>

            <div className="bg-ard-card rounded-xl border border-white/10 overflow-hidden">
               {beats.map((beat) => (
                 <div key={beat.id} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden">
                         <img src={beat.coverUrl} alt="" className="w-full h-full object-cover" />
                       </div>
                       <div>
                         <h4 className="font-bold text-white">{beat.title}</h4>
                         <p className="text-xs text-gray-400">{beat.bpm} BPM • {beat.key}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <span className="font-bold text-white">{formatPrice(beat.price)}</span>
                       <button 
                        onClick={() => deleteBeat(beat.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </main>

      {/* --- ADD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-ard-card border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-xl font-bold mb-6">Add New {modalType === 'project' ? 'Project' : 'Beat'}</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input 
                  type="text" 
                  value={newItemTitle} 
                  onChange={e => setNewItemTitle(e.target.value)} 
                  className="w-full bg-black/40 border border-white/20 rounded p-2 text-white" 
                  required
                />
              </div>
              
              {modalType === 'project' && (
                 <div>
                  <label className="block text-sm text-gray-400 mb-1">Type</label>
                  <select 
                    value={newItemType}
                    onChange={e => setNewItemType(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded p-2 text-white"
                  >
                    <option>Produced</option>
                    <option>Mixed</option>
                    <option>Mastered</option>
                  </select>
                 </div>
              )}

              {modalType === 'beat' && (
                 <div>
                  <label className="block text-sm text-gray-400 mb-1">Price (USD)</label>
                  <input 
                    type="number" 
                    value={newItemPrice} 
                    onChange={e => setNewItemPrice(e.target.value)} 
                    className="w-full bg-black/40 border border-white/20 rounded p-2 text-white" 
                    step="0.01"
                    required
                  />
                 </div>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={closeModal}>Cancel</Button>
                <Button type="submit">Save Item</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};