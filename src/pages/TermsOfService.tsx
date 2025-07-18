import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Shield, Users, Globe, FileText, Clock, AlertTriangle } from 'lucide-react';
import Button from '../components/common/Button';

const TermsOfService: React.FC = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: `By accessing and using CRMS Pro, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: 'description',
      title: 'Service Description',
      icon: Globe,
      content: `CRMS Pro is a customer relationship management platform that helps businesses manage their contacts, deals, tasks, and sales pipeline. We provide cloud-based software solutions for business productivity and customer management.`
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      icon: Users,
      content: `You are responsible for safeguarding the password and for maintaining the confidentiality of your account. You agree not to disclose your password to any third party and to take sole responsibility for activities that occur under your account.`
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use Policy',
      icon: Shield,
      content: `You may not use our service for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction including but not limited to copyright laws, data protection laws, and privacy regulations.`
    },
    {
      id: 'data-privacy',
      title: 'Data Privacy & Security',
      icon: Shield,
      content: `We take data security seriously and implement industry-standard security measures to protect your information. Your data remains your property, and we will never sell or share your personal information with third parties without your explicit consent.`
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      icon: FileText,
      content: `Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change our pricing with 30 days notice to existing customers.`
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: AlertTriangle,
      content: `Either party may terminate this agreement at any time. Upon termination, your right to use the service will cease immediately. We may terminate or suspend your account if you violate these terms.`
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      icon: Shield,
      content: `CRMS Pro shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-soft border-b border-neutral-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  CRMS Pro
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <Clock size={14} />
              <span>Last updated: January 2024</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using CRMS Pro. These terms govern your use of our service.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 mb-8 animate-slide-up">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center p-3 bg-neutral-50 hover:bg-primary-50 rounded-2xl transition-all duration-200 hover:scale-[1.02] group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <section.icon size={16} className="text-neutral-500 group-hover:text-primary-600 mr-2 transition-colors duration-200" />
                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-700 transition-colors duration-200">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Terms Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100 hover:shadow-medium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-4 shadow-soft">
                  <section.icon size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">{section.title}</h2>
              </div>
              <p className="text-neutral-700 leading-relaxed text-lg">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-3xl p-8 text-white shadow-large animate-fade-in">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Questions About Our Terms?</h3>
            <p className="text-primary-100 mb-6 text-lg">
              If you have any questions about these Terms of Service, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                size="lg"
              >
                Contact Support
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20"
                size="lg"
              >
                Email: legal@crms-pro.com
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-neutral-200">
          <p className="text-neutral-500">
            © 2024 CRMS Pro. All rights reserved. |{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;