import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Shield, Zap, Users, Star, Crown, Rocket, Mail, Lock, User, Building2 } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    teamSize: '1-10'
  });

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      period: 'month',
      description: 'Perfect for small teams getting started',
      icon: Rocket,
      color: 'from-success-500 to-success-600',
      popular: false,
      features: [
        'Up to 1,000 contacts',
        '5 team members',
        'Basic reporting',
        'Email support',
        'Mobile app access',
        'Basic integrations'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 79,
      period: 'month',
      description: 'Most popular for growing businesses',
      icon: Crown,
      color: 'from-primary-500 to-primary-600',
      popular: true,
      features: [
        'Up to 10,000 contacts',
        '25 team members',
        'Advanced reporting & analytics',
        'Priority support',
        'Mobile app access',
        'All integrations',
        'Custom fields',
        'Automation workflows'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      period: 'month',
      description: 'For large organizations with advanced needs',
      icon: Star,
      color: 'from-secondary-500 to-secondary-600',
      popular: false,
      features: [
        'Unlimited contacts',
        'Unlimited team members',
        'Advanced analytics & insights',
        '24/7 dedicated support',
        'Mobile app access',
        'All integrations',
        'Custom fields & objects',
        'Advanced automation',
        'Single sign-on (SSO)',
        'Custom branding'
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Handle account creation
      navigate('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const teamSizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                CRMS Pro
              </h1>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="text-neutral-600 hover:text-neutral-800 font-medium transition-colors duration-200"
          >
            Already have an account? <span className='text-primary-600 hover:text-primary-500'>Sign in</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {step === 1 ? (
          // Step 1: Choose Plan
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Choose Your Perfect Plan
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Start your journey with CRMS Pro. Select the plan that fits your team's needs and scale as you grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    className={`
                      relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border-2 transition-all duration-300 
                      animate-fade-in hover:shadow-large hover:scale-[1.02] cursor-pointer
                      ${selectedPlan === plan.id 
                        ? 'border-primary-500 shadow-glow' 
                        : 'border-neutral-200 hover:border-primary-300'
                      }
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-soft">
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-r ${plan.color} text-white shadow-soft`}>
                          <Icon size={24} />
                        </div>
                        {selectedPlan === plan.id && (
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <Check size={16} className="text-white" />
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                      <p className="text-neutral-600 mb-6">{plan.description}</p>

                      <div className="mb-8">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-neutral-900">${plan.price}</span>
                          <span className="text-neutral-500 ml-2">/{plan.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-neutral-700">
                            <Check size={16} className="text-success-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Button
                onClick={() => setStep(2)}
                size="xl"
                className="shadow-glow hover:shadow-glow-lg"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Continue with {plans.find(p => p.id === selectedPlan)?.name}
              </Button>
              <p className="text-sm text-neutral-500 mt-4">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        ) : (
          // Step 2: Account Creation
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Create Your Account
              </h2>
              <p className="text-lg text-neutral-600">
                You're almost there! Just a few details to get started.
              </p>
            </div>

            {/* Selected Plan Summary */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-6 mb-8 border border-primary-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${plans.find(p => p.id === selectedPlan)?.color} text-white`}>
                    {React.createElement(plans.find(p => p.id === selectedPlan)?.icon || Star, { size: 20 })}
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {plans.find(p => p.id === selectedPlan)?.name} Plan
                    </h3>
                    <p className="text-sm text-neutral-600">
                      ${plans.find(p => p.id === selectedPlan)?.price}/month
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  Change Plan
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100">
                <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                  <User className="mr-3 text-primary-600" size={20} />
                  Personal Information
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      icon={<User size={18} />}
                      placeholder="John"
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      icon={<User size={18} />}
                      placeholder="Doe"
                      required
                    />
                  </div>
                  
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<Mail size={18} />}
                    placeholder="john@company.com"
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      icon={<Lock size={18} />}
                      placeholder="Create a strong password"
                      required
                    />
                    <Input
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      icon={<Lock size={18} />}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100">
                <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                  <Building2 className="mr-3 text-secondary-600" size={20} />
                  Company Information
                </h3>
                
                <div className="space-y-6">
                  <Input
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    icon={<Building2 size={18} />}
                    placeholder="Your Company Inc."
                    required
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-neutral-700">
                      Team Size
                    </label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border-2 border-neutral-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-0 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-neutral-300"
                    >
                      {teamSizeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-6 bg-neutral-50 rounded-2xl">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm text-neutral-700">
                  I agree to the{' '}
                  <a href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                size="xl"
                className="w-full shadow-glow hover:shadow-glow-lg"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Start Your Free Trial
              </Button>
            </form>

            <div className="text-center mt-8">
              <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500">
                <div className="flex items-center">
                  <Shield size={16} className="mr-2 text-success-500" />
                  SSL Secured
                </div>
                <div className="flex items-center">
                  <Zap size={16} className="mr-2 text-warning-500" />
                  Instant Setup
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-2 text-primary-500" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;