import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  CheckSquare, 
  Building2, 
  Settings,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Contacts', path: '/contacts', icon: Users },
  { name: 'Deals', path: '/deals', icon: DollarSign },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  { name: 'Companies', path: '/companies', icon: Building2 },
  { name: 'Settings', path: '/settings', icon: Settings }
];

const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-neutral-900/50 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-large
        transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-neutral-100
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-neutral-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                CRMS Pro
              </h1>
              <p className="text-xs text-neutral-500">Customer Relations</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition-all duration-200 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-2xl 
                    transition-all duration-200 ease-out relative overflow-hidden
                    animate-fade-in hover:scale-[1.02] active:scale-[0.98]
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft' 
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-2xl animate-pulse-soft" />
                  )}
                  
                  <Icon 
                    size={20} 
                    className={`mr-4 transition-all duration-200 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-neutral-500 group-hover:text-primary-500'
                    }`} 
                  />
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Hover effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 
                    rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    ${isActive ? 'hidden' : ''}
                  `} />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-4 border border-primary-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">Upgrade to Pro</p>
                <p className="text-xs text-neutral-600">Unlock advanced features</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;