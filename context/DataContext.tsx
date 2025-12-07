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
  // Initialize with static data, but allow state mutations
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [beats, setBeats] = useState<Beat[]>(INITIAL_BEATS);
  const [packs, setPacks] = useState<BeatPack[]>(INITIAL_PACKS);
  
  // Mock Initial CRM Data
  const [messages, setMessages] = useState<ClientMessage[]>([
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
  ]);

  // Mock Initial Orders
  const [orders, setOrders] = useState<Order[]>([
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
  ]);

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