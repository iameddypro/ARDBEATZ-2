import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Beat, BeatPack, ClientMessage, Order, ProjectType } from '../types';
import { PROJECTS as INITIAL_PROJECTS, BEATS as INITIAL_BEATS, PACKS as INITIAL_PACKS } from '../data/content';

interface DataContextType {
  projects: Project[];
  beats: Beat[];
  packs: BeatPack[];
  messages: ClientMessage[];
  orders: Order[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addBeat: (beat: Beat) => void;
  deleteBeat: (id: string) => void;
  addMessage: (msg: ClientMessage) => void;
  addOrder: (order: Order) => void;
  updateMessageStatus: (id: string, status: ClientMessage['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Helper to initialize state from localStorage or fallback to default
  const getSavedData = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.warn(`Error reading ${key} from localStorage`, e);
      return fallback;
    }
  };

  // Initialize with persisted data
  const [projects, setProjects] = useState<Project[]>(() => getSavedData('ard_projects', INITIAL_PROJECTS));
  const [beats, setBeats] = useState<Beat[]>(() => getSavedData('ard_beats', INITIAL_BEATS));
  const [packs, setPacks] = useState<BeatPack[]>(() => getSavedData('ard_packs', INITIAL_PACKS));
  
  // Mock Initial CRM Data
  const [messages, setMessages] = useState<ClientMessage[]>(() => getSavedData('ard_messages', [
    {
      id: 'm1',
      name: 'John Doe',
      email: 'john@example.com',
      service: 'Mixing & Mastering',
      message: 'Looking for a quote on a 5 track EP.',
      date: '2023-10-24',
      status: 'New'
    },
    {
      id: 'm2',
      name: 'Alice Singer',
      email: 'alice@music.com',
      service: 'Custom Beat',
      message: 'I need an afrobeat instrumental similar to Burna Boy.',
      date: '2023-10-22',
      status: 'Replied'
    }
  ]));

  // Mock Initial Orders
  const [orders, setOrders] = useState<Order[]>(() => getSavedData('ard_orders', [
    {
      id: 'ord-123',
      customerName: 'Anonymous Client',
      productTitle: 'Midnight Drive',
      amount: 29.99,
      date: '2023-10-25',
      paymentMethod: 'M-Pesa',
      transactionId: 'QK857291',
      status: 'Verified'
    }
  ]));

  // Effects to save data whenever it changes
  useEffect(() => localStorage.setItem('ard_projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('ard_beats', JSON.stringify(beats)), [beats]);
  useEffect(() => localStorage.setItem('ard_packs', JSON.stringify(packs)), [packs]);
  useEffect(() => localStorage.setItem('ard_messages', JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem('ard_orders', JSON.stringify(orders)), [orders]);

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addBeat = (beat: Beat) => {
    setBeats(prev => [beat, ...prev]);
  };

  const deleteBeat = (id: string) => {
    setBeats(prev => prev.filter(b => b.id !== id));
  };

  const addMessage = (msg: ClientMessage) => {
    setMessages(prev => [msg, ...prev]);
  };

  const updateMessageStatus = (id: string, status: ClientMessage['status']) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      projects,
      beats,
      packs,
      messages,
      orders,
      addProject,
      deleteProject,
      addBeat,
      deleteBeat,
      addMessage,
      addOrder,
      updateMessageStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};