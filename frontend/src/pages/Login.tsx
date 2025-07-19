import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Sparkles, ArrowRight, Shield, Zap, Users } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useApp();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      setError(null);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for seamless user experience'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built for teams with advanced collaboration features'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">CRMS Pro</h1>
                <p className="text-primary-200 text-sm">Customer Relations Management</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Customer Relations
              </span>
            </h2>
            
            <p className="text-xl text-primary-100 mb-12 leading-relaxed">
              Streamline your sales process, manage contacts effortlessly, and boost your team's productivity with our modern CRM platform.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 animate-slide-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-primary-200 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  CRMS Pro
                </h1>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              Welcome back
            </h2>
            <p className="text-neutral-600">
              Sign in to your account to continue
            </p>
          </div>
          
          <form className="space-y-6 animate-slide-up" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail size={18} />}
              placeholder="Enter your email"
              required
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              icon={<Lock size={18} />}
              placeholder="Enter your password"
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              size="lg"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Sign in to your account
            </Button>
          </form>
          {error && (
            <p className="text-red-600 text-sm mt-2 text-center" role="alert">
              {error}
            </p>
          )}

          <div className="mt-8 text-center animate-fade-in">
            <p className="text-sm text-neutral-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
                Sign up now
              </a>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-2xl animate-fade-in">
            <p className="text-xs text-neutral-600 text-center">
              <strong>Demo:</strong> Use any email and password to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
