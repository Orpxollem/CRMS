import React, { useState } from 'react';
import { Menu, Search, Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Navbar: React.FC = () => {
  const { user, sidebarOpen, setSidebarOpen } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-soft border-b border-neutral-100 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 lg:hidden transition-all duration-200 active:scale-95"
          >
            <Menu size={20} />
          </button>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-0 focus:border-primary-500 focus:bg-white w-64 lg:w-96 transition-all duration-200 hover:border-neutral-300"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="relative p-3 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all duration-200 active:scale-95">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error-500 rounded-full animate-pulse"></span>
          </button>

          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-neutral-100 transition-all duration-200 active:scale-95"
            >
              <img
                className="w-10 h-10 rounded-xl object-cover shadow-soft"
                src={user.avatar}
                alt={user.name}
              />
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-neutral-900">{user.name}</div>
                <div className="text-xs text-neutral-500">{user.role}</div>
              </div>
              <ChevronDown size={16} className={`text-neutral-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-large border border-neutral-100 z-50 animate-scale-in">
                <div className="py-2">
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <div className="flex items-center space-x-3">
                      <img
                        className="w-10 h-10 rounded-xl object-cover"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">{user.name}</div>
                        <div className="text-xs text-neutral-500">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors duration-200">
                    <User size={16} className="mr-3" />
                    Profile Settings
                  </a>
                  
                  <a href="/" className="flex items-center px-4 py-3 text-sm text-error-600 hover:bg-error-50 transition-colors duration-200">
                    <LogOut size={16} className="mr-3" />
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;