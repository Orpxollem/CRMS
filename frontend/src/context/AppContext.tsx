import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Contact, Deal, Task, Company, User } from '../types';
import { contacts, deals, tasks, companies } from '../data/dummyData';
import { useNavigate } from 'react-router-dom';

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
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
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refetchUser: () => void;
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

export const AppProvider: React.FC<AppProviderProps> = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [contactsData, setContactsData] = useState<Contact[]>(contacts);
  const [dealsData, setDealsData] = useState<Deal[]>(deals);
  const [tasksData, setTasksData] = useState<Task[]>(tasks);
  const [companiesData] = useState<Company[]>(companies);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRefreshToken = localStorage.getItem('refresh_token');
    const savedUser = localStorage.getItem('user');

    const refreshAccessToken = async () => {
      console.log('Attempting to refresh access token...');
      if (!savedRefreshToken) {
        console.log('No refresh token found, logging out.');
        logout();
        setInitializing(false);
        return;
      }
      try {
        const apiBaseUrl = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiBaseUrl}/token/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refresh_token: savedRefreshToken })
        });
        if (!response.ok) {
          console.log('Refresh token invalid or expired, logging out.');
          logout();
          setInitializing(false);
          return;
        }
        const data = await response.json();
        console.log('Access token refreshed successfully.');
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
        setInitializing(false);
      } catch (error) {
        console.error('Error refreshing access token:', error);
        logout();
        setInitializing(false);
      }
    };

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // Optionally verify token expiration here and refresh if needed
      // For simplicity, always refresh token on app start
      refreshAccessToken();
    } else {
      setInitializing(false);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (initializing) {
      console.log('Still initializing, skipping logout check.');
      return;
    }
    // Check token expiration or validity here if token exists
    // For simplicity, if token is null or empty, logout and redirect
    if (!token) {
      console.log('Token missing after initialization, logging out.');
      logout();
      navigate('/login');
    }
  }, [token, navigate, initializing]);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Attempting login for user:', email);
    try {
      const apiBaseUrl = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiBaseUrl}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          username: email,
          password: password
        })
      });
      if (!response.ok) {
        console.log('Login failed with status:', response.status);
        return false;
      }
      const data = await response.json();
      console.log('Login successful, received tokens.');
      setToken(data.access_token);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      const userResponse = await fetch(`${apiBaseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      });
      if (!userResponse.ok) {
        console.log('Failed to fetch user details after login.');
        return false;
      }
      const userDetails = await userResponse.json();
      setUser(userDetails);

      localStorage.setItem('user', JSON.stringify(userDetails));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out user.');
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

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
    setTasksData(prev => prev.map((task: Task) => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const refetchUser = async () => {
    console.log('Refetching user data...');
    if (!token) {
      console.log('No token available, cannot refetch user.');
      return;
    }
    try {
      const apiBaseUrl = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiBaseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        console.log('Failed to refetch user data.');
        return;
      }
      const userDetails = await response.json();
      setUser(userDetails);
      localStorage.setItem('user', JSON.stringify(userDetails));
      console.log('User data refetched and updated.');
    } catch (error) {
      console.error('Error refetching user data:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        contacts: contactsData,
        deals: dealsData,
        tasks: tasksData,
        companies: companiesData,
        sidebarOpen,
        setSidebarOpen,
        addContact,
        addDeal,
        addTask,
        updateTaskStatus,
        login,
        logout,
        refetchUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
