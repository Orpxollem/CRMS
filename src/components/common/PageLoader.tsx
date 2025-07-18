import React from 'react';
import { Sparkles } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface PageLoaderProps {
  message?: string;
  showLogo?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = 'Loading...', 
  showLogo = true 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        {showLogo && (
          <div className="flex items-center justify-center space-x-3 mb-8 animate-bounce-subtle">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center shadow-large">
              <Sparkles size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                CRMS Pro
              </h1>
              <p className="text-sm text-neutral-500">Customer Relations Management</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-center space-x-3 mb-4">
          <LoadingSpinner size="lg" color="primary" />
          <span className="text-xl font-semibold text-neutral-700">{message}</span>
        </div>
        
        <p className="text-neutral-500">Please wait while we prepare your experience</p>
        
        {/* Loading progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-20 left-20 w-32 h-32 bg-primary-500/10 rounded-full animate-float opacity-50"></div>
      <div className="fixed top-40 right-32 w-24 h-24 bg-secondary-500/10 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-32 left-32 w-40 h-40 bg-warning-500/10 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default PageLoader;