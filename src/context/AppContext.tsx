import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Contact, Deal, Task, Company, User } from '../types';
import { contacts, deals, tasks, companies, currentUser } from '../data/dummyData';

interface AppContextType {
  user: User;
  contacts: Contact[];
  deals: Deal[];
  tasks: Task[];
  companies: Company[];
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void;
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'lastUpdated'>) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user] = useState<User>(currentUser);
  const [contactsData, setContactsData] = useState<Contact[]>(contacts);
  const [dealsData, setDealsData] = useState<Deal[]>(deals);
  const [tasksData, setTasksData] = useState<Task[]>(tasks);
  const [companiesData] = useState<Company[]>(companies);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addContact = (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setContactsData(prev => [...prev, newContact]);
  };

  const addDeal = (deal: Omit<Deal, 'id' | 'createdAt' | 'lastUpdated'>) => {
    const newDeal: Deal = {
      ...deal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setDealsData(prev => [...prev, newDeal]);
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasksData(prev => [...prev, newTask]);
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasksData(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        contacts: contactsData,
        deals: dealsData,
        tasks: tasksData,
        companies: companiesData,
        sidebarOpen,
        setSidebarOpen,
        addContact,
        addDeal,
        addTask,
        updateTaskStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};