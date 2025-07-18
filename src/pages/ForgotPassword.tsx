import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle, Sparkles, Shield, Clock } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft animate-bounce-subtle">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">Check Your Email</h1>
            <p className="text-neutral-600 text-lg leading-relaxed">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100 mb-6">
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-primary-50 rounded-2xl">
                <Mail className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-semibold text-primary-900">Check your inbox</p>
                  <p className="text-xs text-primary-700">Click the link in the email to reset your password</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-warning-50 rounded-2xl">
                <Clock className="w-5 h-5 text-warning-600 mr-3" />
                <div>
                  <p className="text-sm font-semibold text-warning-900">Link expires in 1 hour</p>
                  <p className="text-xs text-warning-700">Request a new link if this one expires</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Try Different Email
            </Button>
            
            <Link to="/login">
              <Button variant="ghost" className="w-full" size="lg">
                <ArrowLeft size={18} className="mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-neutral-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-6">
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
            Forgot Password?
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
              placeholder="Enter your email address"
              required
              className="mb-6"
            />

            <Button 
              type="submit" 
              className="w-full shadow-glow hover:shadow-glow-lg"
              size="lg"
              loading={isLoading}
            >
              {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-6 animate-fade-in">
          <Link 
            to="/login"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Sign In
          </Link>
        </div>

        {/* Security Note */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-2xl animate-fade-in">
          <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
            <Shield size={16} className="text-success-500" />
            <span>Your security is our priority. Reset links expire in 1 hour.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;