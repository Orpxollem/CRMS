import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const suggestions = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Contacts', path: '/contacts', icon: Search },
    { label: 'Deals', path: '/deals', icon: Search },
    { label: 'Tasks', path: '/tasks', icon: Search }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="mb-8 animate-fade-in">
          <div className="relative">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent animate-pulse-soft">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full animate-float"></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-warning-500 to-warning-600 rounded-full flex items-center justify-center shadow-soft animate-bounce-subtle">
              <AlertTriangle size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-lg mx-auto">
            Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            icon={<ArrowLeft size={18} />}
            className="shadow-soft hover:shadow-medium"
          >
            Go Back
          </Button>
          <Link to="/dashboard">
            <Button
              size="lg"
              icon={<Home size={18} />}
              className="shadow-glow hover:shadow-glow-lg"
            >
              Go to Dashboard
            </Button>
          </Link>
          <Button
            onClick={() => window.location.reload()}
            variant="ghost"
            size="lg"
            icon={<RefreshCw size={18} />}
          >
            Refresh Page
          </Button>
        </div>

        {/* Suggestions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Maybe you were looking for:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggestions.map((suggestion, index) => (
              <Link
                key={suggestion.path}
                to={suggestion.path}
                className="group p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 hover:from-primary-50 hover:to-primary-100 rounded-2xl border border-neutral-200 hover:border-primary-300 transition-all duration-200 hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 rounded-2xl flex items-center justify-center shadow-soft transition-all duration-200">
                    <suggestion.icon size={20} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 group-hover:text-primary-700 transition-colors duration-200">
                    {suggestion.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-neutral-500 mb-4">Still can't find what you're looking for?</p>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-neutral-600">CRMS Pro Support</span>
            </div>
            <Button variant="ghost" size="sm">
              Contact Support
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-20 left-20 w-16 h-16 bg-primary-500/10 rounded-full animate-float opacity-50"></div>
        <div className="fixed top-40 right-32 w-12 h-12 bg-secondary-500/10 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="fixed bottom-32 left-32 w-20 h-20 bg-warning-500/10 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default NotFound;